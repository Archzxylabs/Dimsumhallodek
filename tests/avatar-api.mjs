import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const loader = fileURLToPath(new URL('./fixtures/avatar-loader.mjs', import.meta.url));
const processUnderTest = spawn(process.execPath, ['--no-warnings', '--loader', loader, 'server/avatar.mjs'], {
  cwd: projectRoot, stdio: ['ignore','pipe','pipe'],
  env: { ...process.env, PORT:'5026', ARCHAVA_ENV_FILE:fileURLToPath(new URL('./fixtures/no-env', import.meta.url)), LIVEKIT_URL:'wss://test.invalid', LIVEKIT_API_KEY:'test', LIVEKIT_API_SECRET:'test', SPATIUS_APP_ID:'test', SPATIUS_AVATAR_ID:'test', AVATAR_DEMO_ENABLED:'true' },
});
try {
  await new Promise((resolve,reject) => { processUnderTest.stdout.on('data',(data)=>{if(data.toString().includes('API running'))resolve();});processUnderTest.once('error',reject);processUnderTest.once('exit',(code)=>reject(new Error('Server exited '+code))); });
  const post = async (path,body,address='new') => {
    const response = await fetch('http://127.0.0.1:5026/api/archava/'+path,{method:'POST',headers:{'Content-Type':'application/json','X-Forwarded-For':address},body:JSON.stringify(body),signal:AbortSignal.timeout(5000)});
    return {status:response.status,data:await response.json()};
  };
  const created=await post('session',{startOnConnect:true});
  assert.equal(created.status,200);assert.equal(created.data.requiresStart,true);assert.equal(created.data.durationSeconds,120);
  assert.ok(Math.abs(created.data.endsAt-Math.floor(Date.now()/1000)-165)<=1);
  await new Promise(resolve=>setTimeout(resolve,2100));
  const started=await post('start',{ticket:created.data.ticket});
  assert.equal(started.status,200);assert.ok(Math.abs(started.data.endsAt-Math.floor(Date.now()/1000)-120)<=1);
  const again=await post('start',{ticket:created.data.ticket});assert.equal(again.data.endsAt,started.data.endsAt);
  const legacy=await post('session',{},'legacy');assert.equal(legacy.status,200);assert.equal(legacy.data.requiresStart,false);assert.ok(Math.abs(legacy.data.endsAt-Math.floor(Date.now()/1000)-120)<=1);
  assert.equal((await post('session',{},'third')).status,429);
  assert.equal((await post('start',{ticket:'wrong'})).status,400);
  assert.equal((await post('start',null)).status,400);
  assert.equal((await post('end',{ticket:created.data.ticket})).status,200);
  assert.equal((await post('start',{ticket:created.data.ticket})).status,404);
  assert.equal((await post('end',{ticket:legacy.data.ticket})).status,200);
  console.log('PASS: startup allowance, 120-second activation, idempotency, legacy client, session cap, malformed requests, cleanup');
} finally { processUnderTest.kill('SIGTERM'); }
