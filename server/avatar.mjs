import http from 'node:http';
import { randomBytes } from 'node:crypto';
import { RoomServiceClient, AgentDispatchClient, AccessToken } from 'livekit-server-sdk';
import { config as loadEnv } from 'dotenv';

loadEnv({ path: process.env.ARCHAVA_ENV_FILE || '.env' });

const port = Number(process.env.PORT || process.env.AVATAR_API_PORT || 5005);
const webOrigins = new Set((process.env.WEB_ORIGIN || 'http://localhost:5174').split(',').map((origin) => origin.trim()).filter(Boolean));
const livekitUrl = process.env.LIVEKIT_URL || '';
const key = process.env.LIVEKIT_API_KEY || '';
const secret = process.env.LIVEKIT_API_SECRET || '';
const appId = process.env.SPATIUS_APP_ID || '';
const avatarId = process.env.SPATIUS_AVATAR_ID || '';
const enabled = process.env.AVATAR_DEMO_ENABLED === 'true' && Boolean(livekitUrl && key && secret && appId && avatarId);
const maxActive = 2;
const durationSeconds = 120;
const active = new Map();
const lastOpened = new Map();
const httpUrl = livekitUrl.replace(/^wss:/, 'https:').replace(/^ws:/, 'http:');
const rooms = enabled ? new RoomServiceClient(httpUrl, key, secret) : null;
const dispatch = enabled ? new AgentDispatchClient(httpUrl, key, secret) : null;

function respond(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(body));
}

function clientAddress(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return (typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : '') || req.socket.remoteAddress || 'unknown';
}

async function closeSession(ticket) {
  const session = active.get(ticket);
  if (!session) return false;
  active.delete(ticket);
  await rooms.deleteRoom(session.roomName).catch(() => {});
  return true;
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin;
  if (origin && !webOrigins.has(origin)) return respond(res, 403, { error: 'Origin tidak diizinkan.' });
  const path = new URL(req.url || '/', 'http://localhost').pathname;
  if (req.method === 'GET' && path === '/api/archava/config') {
    return respond(res, 200, { ready: enabled, appId: enabled ? appId : '', avatarId: enabled ? avatarId : '', durationSeconds });
  }
  if (req.method === 'GET' && path === '/api/archava/health') return respond(res, 200, { ok: true, ready: enabled });
  if (req.method === 'POST' && path === '/api/archava/session') {
    if (!enabled) return respond(res, 503, { error: 'Demo avatar live belum dikonfigurasi.' });
    const address = clientAddress(req);
    if (active.size >= maxActive) return respond(res, 429, { error: 'Demo sedang penuh. Coba lagi sebentar.' });
    if ([...active.values()].some((session) => session.address === address)) return respond(res, 429, { error: 'Satu sesi demo per pengunjung.' });
    if (Date.now() - (lastOpened.get(address) || 0) < 30000) return respond(res, 429, { error: 'Tunggu sebentar sebelum memulai lagi.' });
    const roomName = `dimsum-demo-${randomBytes(12).toString('hex')}`;
    const ticket = randomBytes(24).toString('hex');
    const endsAt = Math.floor(Date.now() / 1000) + durationSeconds;
    try {
      await rooms.createRoom({ name: roomName, emptyTimeout: 60, departureTimeout: 15, maxParticipants: 4, metadata: JSON.stringify({ product: 'dimsum-hallo-dek', endsAt }) });
      await dispatch.createDispatch(roomName, 'dimsum-host');
      const token = new AccessToken(key, secret, { identity: `guest-${randomBytes(8).toString('hex')}`, name: 'Pengunjung Dimsum Hallo Dek', ttl: durationSeconds });
      token.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true, canPublishData: false });
      active.set(ticket, { roomName, address });
      lastOpened.set(address, Date.now());
      const timer = setTimeout(() => { void closeSession(ticket); }, durationSeconds * 1000);
      timer.unref();
      return respond(res, 200, { serverUrl: livekitUrl, token: await token.toJwt(), ticket, endsAt, appId, avatarId });
    } catch (error) {
      active.delete(ticket);
      await rooms.deleteRoom(roomName).catch(() => {});
      console.error('Avatar session failed:', error);
      return respond(res, 502, { error: 'Sesi avatar gagal dibuka. Coba lagi nanti.' });
    }
  }
  if (req.method === 'POST' && path === '/api/archava/end') {
    let raw = '';
    for await (const chunk of req) {
      raw += chunk;
      if (raw.length > 2048) return respond(res, 413, { error: 'Request terlalu besar.' });
    }
    let ticket;
    try { ticket = JSON.parse(raw).ticket; } catch { return respond(res, 400, { error: 'Request tidak valid.' }); }
    const closed = await closeSession(ticket);
    return respond(res, closed ? 200 : 404, { ok: closed });
  }
  return respond(res, 404, { error: 'Tidak ditemukan.' });
});

server.listen(port, () => console.log(`Dimsum avatar API running on port ${port}; live demo ${enabled ? 'ready' : 'disabled'}`));
