import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Marquee } from './Marquee';
export function Footer() {
  const navigate = useNavigate();
  const clicks = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hint, setHint] = useState('');
  const handleSecretClick = () => {
    clicks.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      clicks.current = 0;
      setHint('');
    }, 2000);
    const remaining = 10 - clicks.current;
    if (remaining > 0 && clicks.current >= 5) setHint(`${remaining} more…`);
    if (clicks.current >= 10) {
      clicks.current = 0;
      setHint('');
      if (timer.current) clearTimeout(timer.current);
      navigate('/login');
    }
  };
  return (
    <footer className="bg-obsidian border-t border-hairline">
      <div className="py-6 border-b border-hairline">
        <Marquee
          items={[
          'kzyarou — MMXXVI',
          'Zachary Paul Rapis',
          'Made in the Philippines',
          'Always building']
          }
          separator="◆"
          itemClassName="font-display italic text-3xl md:text-4xl text-muted/60" />
        
      </div>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="font-mono text-xs text-muted tracking-wider">
          © 2026 Zachary Paul Rapis ·{' '}
          <button
            onClick={handleSecretClick}
            className="text-ember hover:text-ember-glow transition-colors cursor-pointer select-none"
            aria-label="kzyarou">
            
            kzyarou
          </button>
          {hint &&
          <span className="ml-2 font-mono text-[10px] text-muted/60 tracking-widest uppercase">
              · {hint}
            </span>
          }
        </div>
        <div className="font-mono text-[10px] text-muted/60 tracking-widest uppercase">
          Designed & built from scratch
        </div>
      </div>
    </footer>);

}