import React, { useEffect, useState } from 'react';
import {
  GithubIcon,
  HeartIcon,
  TerminalIcon,
  WifiIcon,
  ShieldCheckIcon } from
'lucide-react';
export function Footer() {
  const [sessionTime, setSessionTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).
    toString().
    padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };
  return (
    <footer className="mt-12 mb-6 relative z-10">
      <div className="bg-gh-surface border border-gh-border rounded-lg overflow-hidden shadow-lg shadow-black/10">
        {/* Fake Terminal Prompt */}
        <div className="p-4 border-b border-gh-border/50 font-mono text-sm flex flex-col gap-2">
          <div className="text-gh-muted">
            System shutting down... Saving session data.
          </div>
          <div className="flex items-center gap-2 text-gh-text">
            <span className="text-gh-accent">kzyarou@dev</span>
            <span className="text-gh-blue">~</span>
            <span className="text-gh-muted">$</span>
            <span className="w-2 h-4 bg-gh-muted animate-blink" />
          </div>
        </div>

        {/* System Status Bar */}
        <div className="bg-gh-bg px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gh-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gh-text">
              <TerminalIcon className="w-3.5 h-3.5 text-gh-accent" />
              SESSION: {formatTime(sessionTime)}
            </span>
            <span className="hidden sm:inline text-gh-border">|</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-gh-blue" />
              SECURE
            </span>
            <span className="hidden sm:inline text-gh-border">|</span>
            <span className="flex items-center gap-1.5">
              <WifiIcon className="w-3.5 h-3.5 text-gh-accent" />
              12ms
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              Built with <HeartIcon className="w-3 h-3 text-red-500" /> React
            </span>
            <a
              href="#"
              className="hover:text-gh-text transition-colors flex items-center gap-1.5 bg-gh-surface px-2 py-1 rounded border border-gh-border"
              aria-label="GitHub Profile">
              
              <GithubIcon className="w-3.5 h-3.5" />
              <span>kzyarou</span>
            </a>
          </div>
        </div>
      </div>
    </footer>);

}