"""Dimsum Hallo Dek voice host using the avatar part of Archava, with no onchain flow."""

import logging
import os
from pathlib import Path

from dotenv import load_dotenv
from livekit import agents
from livekit.agents import Agent, AgentSession, room_io
from livekit.plugins import google, spatius
from google.genai import types as genai_types

load_dotenv(os.environ.get('ARCHAVA_ENV_FILE') or Path(__file__).resolve().parent.parent / '.env')
logger = logging.getLogger('minsum.latency')

INSTRUCTIONS = """
You are Minsum, the friendly Indonesian voice guide for Dimsum Hallo Dek.
Speak natural Bahasa Indonesia. Keep answers brief and useful. Help visitors understand this website and choose the right contact path.
You represent Dimsum Hallo Dek, not Archava's onchain product. Never mention wallets, blockchain, tokens, minute packs, or other Archava products unless directly asked about the avatar technology; then say the avatar is powered by Archava.

Verified business facts:
- Dimsum Hallo Dek sells prepared dimsum menu items, including Mentai Tartar, Carbonara, and Hot Lava Mentai.
- The business offers three partnership types: Flexible, Collaborative, and Full Managed. The exact roles, facilities, terms, and official prices must be confirmed with the partnership team.
- Event orders are available for weddings, school events, office events, khitanan, and lamaran. Quantity, date, location, and quote need confirmation.
- Other products include Dimsum Cake with name decoration, Dimsum Bouquet with name decoration, and Dimsum Frozen.
- The website shows sample prices only for presentation. Do not quote them as official prices or imply that an order is confirmed.
- For product and event questions, refer visitors to WhatsApp +62 858-6364-6267. For partnership questions, refer to +62 858-0285-4744.
- The website has a menu showcase, product cards, events, partnership plans, and store locator. The Minsum avatar stays available in the lower-right corner while visitors move between menu slides or scroll the page.

Never invent stock, current prices, delivery coverage, branch status, partnership returns, or event availability. If asked for those, say the team will confirm directly. Do not take payment or promise a booking.
Start with one brief greeting: 'Halo, aku Minsum. Mau tanya menu, event, atau kemitraan?'
"""


async def entrypoint(ctx: agents.JobContext) -> None:
    await ctx.connect()
    model = os.getenv('GEMINI_MODEL', 'gemini-3.8-live')
    model_options = dict(
        model=model,
        voice=os.getenv('GEMINI_VOICE', 'Kore'),
        api_key=os.environ['GEMINI_API_KEY'],
        realtime_input_config=genai_types.RealtimeInputConfig(
            automatic_activity_detection=genai_types.AutomaticActivityDetection(
                silence_duration_ms=500,
            ),
        ),
        instructions=INSTRUCTIONS,
    )
    if model.startswith('gemini-2.5'):
        model_options['thinking_config'] = genai_types.ThinkingConfig(thinking_budget=0)
    session = AgentSession(llm=google.realtime.RealtimeModel(**model_options))

    @session.on('user_state_changed')
    def log_user_state(event) -> None:
        logger.info('user_state=%s', event.new_state)

    @session.on('agent_state_changed')
    def log_agent_state(event) -> None:
        logger.info('agent_state=%s', event.new_state)

    @session.on('metrics_collected')
    def log_latency(event) -> None:
        metric = event.metrics
        if metric.type == 'realtime_model_metrics':
            logger.info('gemini_first_audio_s=%.3f', metric.ttft)
        elif metric.type == 'avatar_metrics':
            logger.info('spatius_playback_s=%.3f', metric.playback_latency)

    avatar = spatius.AvatarSession(
        api_key=os.environ['SPATIUS_API_KEY'],
        app_id=os.environ['SPATIUS_APP_ID'],
        avatar_id=os.environ['SPATIUS_AVATAR_ID'],
    )
    await avatar.start(session, room=ctx.room)
    await avatar.wait_for_join(timeout=20)
    await session.start(
        room=ctx.room,
        agent=Agent(instructions=INSTRUCTIONS),
        room_options=room_io.RoomOptions(audio_output=False, close_on_disconnect=True),
    )
    session.generate_reply(instructions="Say your short greeting in Bahasa Indonesia now.")


if __name__ == '__main__':
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint, agent_name='dimsum-host'))
