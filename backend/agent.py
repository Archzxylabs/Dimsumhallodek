"""Dimsum Hallo Dek voice host using the avatar part of Archava, with no onchain flow."""

import logging
import os
import json
from pathlib import Path

from dotenv import load_dotenv
from livekit import agents, rtc
from livekit.agents import Agent, AgentSession, RunContext, function_tool, room_io
from livekit.plugins import google, spatius
from google.genai import types as genai_types

load_dotenv(os.environ.get('ARCHAVA_ENV_FILE') or Path(__file__).resolve().parent.parent / '.env')
logger = logging.getLogger('minsum.latency')

KNOWLEDGE = json.loads((Path(__file__).with_name('knowledge.json')).read_text(encoding='utf-8'))

INSTRUCTIONS = f"""
You are Minsum, the friendly Indonesian voice sales concierge for Dimsum Hallo Dek.
Speak natural Bahasa Indonesia, briefly: normally one or two short sentences, then at most one relevant question. Answer the visitor's question first. Do not interrogate someone who is just browsing.
You represent Dimsum Hallo Dek. Do not mention wallets, blockchain, tokens, minute packs, or other Archava products unless directly asked about the avatar technology; then say the avatar is powered by Archava.

Use ONLY these business facts as authoritative. Treat the unconfirmed list as unknown, not as facts to guess:
{json.dumps(KNOWLEDGE, ensure_ascii=False, indent=2)}

Conversation flow when the visitor shows buying or partnership intent:
- Event: find the event type, date, location, and approximate guest count. Ask for missing details one at a time; a budget is optional.
- If the visitor has not decided a date, location, guest count, or partnership type, accept that and continue. Do not repeatedly ask for an undecided detail; prepare a consultation summary with the details they do know.
- Partnership: find the city/location, preferred type if any, and how involved they want to be in daily operations. Describe the three types only as options, since official terms are unconfirmed.
- Cake or Bouquet: find the product, desired date, name for decoration if any, and approximate quantity. Design preferences are optional.
- Frozen or ready-to-eat menu: find the product/flavor, approximate quantity, and location. Offer a flavor recommendation only from the known menu descriptions.
- If the visitor asks for prices, availability, or a quote, explain that the team will confirm. Never use demo prices as official prices.

When there is a clear purchase/partnership request and at least one useful detail, or the visitor asks to continue on WhatsApp, call prepare_whatsapp_handoff. Summarize only details actually stated by the visitor. Do this early enough in the short session; do not wait for every field. If the visitor adds or corrects a detail, call the tool again with the complete updated summary. If a detail is missing, leave it out. Then tell the visitor a WhatsApp button with their summary is ready below the avatar. The visitor must click it themselves; you cannot send a message or finalize an order.
Never request payment, personal phone number, or sensitive details. Never promise a booking, delivery coverage, outlet status, stock, partnership returns, or a confirmed quote.
The website has Menu Dimsum, Hadiah & Frozen, Event, Kemitraan, and Cari Gerai pages. Product order plans, event plans, and partnership plans can be prepared as visitor-reviewed WhatsApp messages. The store list searches addresses by name and region; it does not calculate distance. Outlet hours must be confirmed with the team. The voice demo lasts two minutes after connecting. The avatar stays in the lower-right corner as the visitor browses.
Start with one brief greeting: 'Halo, aku Minsum. Mau tanya menu, event, atau kemitraan?'
"""

HANDOFF_CATEGORIES = {'event', 'partnership', 'cake', 'bouquet', 'frozen', 'menu', 'other'}


def make_handoff_tool(room: rtc.Room):
    @function_tool()
    async def prepare_whatsapp_handoff(context: RunContext, category: str, summary: str) -> str:
        """Show a visitor-reviewed WhatsApp handoff card based on their stated needs.

        Args:
            category: One of event, partnership, cake, bouquet, frozen, menu, or other.
            summary: A concise Bahasa Indonesia summary containing only details the visitor stated.
        """
        normalized_category = category.strip().lower()
        if normalized_category not in HANDOFF_CATEGORIES:
            normalized_category = 'other'
        clean_summary = ' '.join(summary.split())[:600]
        if not clean_summary:
            return 'Belum ada detail untuk dirangkum. Tanyakan kebutuhan pengunjung dulu.'
        payload = json.dumps({
            'type': 'minsum_handoff',
            'category': normalized_category,
            'summary': clean_summary,
        }, ensure_ascii=False)
        try:
            await room.local_participant.publish_data(
                payload.encode('utf-8'), reliable=True, topic='minsum.handoff.v1'
            )
        except Exception:
            logger.exception('Could not publish Minsum handoff')
            return 'Tombol ringkasan belum siap. Arahkan pengunjung ke WhatsApp yang sesuai secara manual.'
        return 'Ringkasan siap di panel. Minta pengunjung meninjau lalu menekan tombol WhatsApp.'

    return prepare_whatsapp_handoff


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
        agent=Agent(instructions=INSTRUCTIONS, tools=[make_handoff_tool(ctx.room)]),
        room_options=room_io.RoomOptions(audio_output=False, close_on_disconnect=True),
    )
    session.generate_reply(instructions="Say your short greeting in Bahasa Indonesia now.")


if __name__ == '__main__':
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint, agent_name='dimsum-host'))
