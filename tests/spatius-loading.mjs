import assert from 'node:assert/strict';
import { prepareSpatiusAvatar } from '../src/lib/spatius.ts';
import { sdkTest } from './fixtures/spatius-sdk.mjs';

// Advance only the application's watchdog timers, without real SDK/network work.
const originalSetTimeout = globalThis.setTimeout;
const originalClearTimeout = globalThis.clearTimeout;
const timers = new Map();
let now = 0, sequence = 0;
globalThis.RTCRtpScriptTransform = class {};
globalThis.setTimeout = (callback, delay) => { const id = ++sequence; timers.set(id, { callback, at: now + delay }); return id; };
globalThis.clearTimeout = (id) => timers.delete(id);
const flush = async () => { for (let i = 0; i < 10; i++) await Promise.resolve(); };
const advance = async (milliseconds) => {
  const target = now + milliseconds;
  while (true) {
    const next = [...timers.entries()].filter(([, timer]) => timer.at <= target).sort((a, b) => a[1].at - b[1].at)[0];
    if (!next) break;
    now = next[1].at; timers.delete(next[0]); next[1].callback(); await flush();
  }
  now = target; await flush();
};
try {
  const warm = prepareSpatiusAvatar('app', 'continuing');
  await flush();
  const phases = [];
  let completed = false;
  const live = prepareSpatiusAvatar('app', 'continuing', { onProgress: (progress) => phases.push(progress) }).then((avatar) => { completed = true; return avatar; });
  await flush();
  await advance(45000); sdkTest.progress('continuing', 0.25);
  await advance(45000); sdkTest.progress('continuing', 0.5);
  assert.equal(completed, false); assert.equal(sdkTest.cancellations, 0);
  sdkTest.complete('continuing');
  assert.equal((await live).id, 'continuing'); await warm;
  assert.ok(phases.some((phase) => phase.progress === 0.5));
  await prepareSpatiusAvatar('app', 'continuing');
  assert.equal(sdkTest.loads, 1); assert.equal(sdkTest.initializations, 1);

  const stalled = prepareSpatiusAvatar('app', 'stalled', {});
  const failure = assert.rejects(stalled, /Unduhan avatar terlalu lama/);
  await flush(); await advance(60001); await failure;
  assert.equal(sdkTest.cancellations, 1);
  const retry = prepareSpatiusAvatar('app', 'stalled', {});
  await flush(); sdkTest.complete('stalled'); assert.equal((await retry).id, 'stalled');

  const controller = new AbortController(); let updates = 0;
  const closing = prepareSpatiusAvatar('app', 'closed', { signal: controller.signal, onProgress: () => updates++ });
  const aborted = assert.rejects(closing, { name: 'AbortError' });
  await flush(); controller.abort(); await aborted;
  const before = updates; sdkTest.progress('closed', 0.5); sdkTest.complete('closed'); await flush();
  assert.equal(updates, before); assert.equal(sdkTest.cancellations, 1);
  assert.equal((await prepareSpatiusAvatar('app', 'closed')).id, 'closed');
  assert.equal(timers.size, 0);
  console.log('PASS: progressing cold download survives 40 seconds, shared warm cache, stalled download retry, close removes progress listeners and timers');
} finally {
  globalThis.setTimeout = originalSetTimeout;
  globalThis.clearTimeout = originalClearTimeout;
  delete globalThis.RTCRtpScriptTransform;
}
