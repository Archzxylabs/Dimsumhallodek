import asyncio
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / 'backend'))
from avatar_status import AvatarStatusReporter, failure_code


async def main():
    nested = RuntimeError('insufficient credits (4/10) credential=DO_NOT_PUBLISH')
    wrapped = RuntimeError('Could not start avatar')
    wrapped.__cause__ = nested
    assert failure_code(wrapped) == 'provider_credits'
    assert failure_code(RuntimeError('unauthorized')) == 'provider_auth'
    assert failure_code(RuntimeError('network down')) == 'voice_unavailable'
    results = []
    async def publish(metadata):
        results.append(metadata)
    reporter = AvatarStatusReporter('{"product":"dimsum","endsAt":100}', publish)
    await reporter.fail(wrapped)
    await reporter.ready()
    assert len(results) == 1
    metadata = json.loads(results[0])
    assert metadata['product'] == 'dimsum' and metadata['endsAt'] == 100
    assert metadata['voice']['state'] == 'error'
    assert metadata['voice']['code'] == 'provider_credits'
    assert 'DO_NOT_PUBLISH' not in results[0] and '4/10' not in results[0]
    reporter = AvatarStatusReporter('invalid', publish)
    await reporter.ready()
    assert json.loads(results[-1])['voice']['state'] == 'ready'
    await reporter.fail(RuntimeError('runtime failure'))
    assert json.loads(results[-1])['voice']['state'] == 'error'
    print('PASS: wrapped provider errors, sanitized persistent metadata, terminal failures, readiness and runtime failures.')

asyncio.run(main())
