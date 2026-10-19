'use client';

import { useState } from 'react';
import { track } from '@/lib/track';
import styles from './ChatButton.module.css';

/*
 * Live chat with our ElevenLabs agent, as text.
 *
 * Nothing from ElevenLabs loads until the visitor clicks: no script, no
 * cookie, no request. That keeps the page fast and needs no cookie consent;
 * clicking "Chat" is the visitor asking for it. The script version is pinned.
 *
 * Off until NEXT_PUBLIC_ELEVENLABS_AGENT_ID is set (the agent id is public;
 * it is in the page either way). Set the agent to text-only and add the shop
 * domain to its allowlist in the ElevenLabs console.
 */
const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
const SCRIPT = 'https://unpkg.com/@elevenlabs/convai-widget-embed@0.18.3/dist/index.js';

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  if (!AGENT_ID) return null;

  const start = () => {
    if (open) return;
    setOpen(true);
    track('chat_open');
    document.body.classList.add('as24-chat-open');
    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', AGENT_ID);
    widget.setAttribute('default-expanded', 'true');
    widget.setAttribute('text-input', 'true');
    document.body.appendChild(widget);
    if (!document.getElementById('el-convai')) {
      const s = document.createElement('script');
      s.id = 'el-convai';
      s.src = SCRIPT;
      s.async = true;
      document.body.appendChild(s);
    }
  };

  if (open) return null;
  return (
    <button type="button" onClick={start} className={styles.btn} aria-label="Chat met ons">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span className={styles.label}>Chat</span>
    </button>
  );
}
