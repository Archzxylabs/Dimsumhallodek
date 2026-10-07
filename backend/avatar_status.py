"""Persist safe voice status so a late-joining browser can see startup failures."""

import asyncio
import json


def failure_code(error):
    seen = set()
    messages = []
    while error is not None and id(error) not in seen:
        seen.add(id(error))
        messages.append(str(error).lower())
        error = getattr(error, '__cause__', None) or getattr(error, '__context__', None)
    text = ' '.join(messages)
    if 'creditsexhausted' in text or 'insufficient credits' in text:
        return 'provider_credits'
    if 'unauthorized' in text or 'invalid api key' in text:
        return 'provider_auth'
    return 'voice_unavailable'


class AvatarStatusReporter:
    def __init__(self, metadata, publish):
        try:
            saved = json.loads(metadata or '{}')
            self._metadata = saved if isinstance(saved, dict) else {}
        except (ValueError, TypeError):
            self._metadata = {}
        self._publish = publish
        self._lock = asyncio.Lock()
        self._failed = False

    def fail(self, error):
        # Set synchronously so a queued ready update cannot hide a failure.
        self._failed = True
        return self._send({'version': 1, 'state': 'error', 'code': failure_code(error)})

    async def ready(self):
        await self._send({'version': 1, 'state': 'ready'})

    async def _send(self, status):
        async with self._lock:
            if self._failed and status['state'] == 'ready':
                return
            metadata = {**self._metadata, 'voice': status}
            await self._publish(json.dumps(metadata, ensure_ascii=False))
