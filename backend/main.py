"""Railpack entrypoint for the Dimsum voice worker."""

import sys

from livekit import agents
from agent import entrypoint

if __name__ == '__main__':
    if len(sys.argv) == 1:
        sys.argv.append('start')
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint, agent_name='dimsum-host'))
