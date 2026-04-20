import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
// Saves scroll position per navigation key (not path — so the same path visited
// twice via different history entries restores independently) and restores on
// back/forward. Forward navigations start at the top.
const STORE_KEY = 'kzyarou:scroll-positions';
function readStore(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) || '{}');
  } catch {
    return {};
  }
}
function writeStore(store: Record<string, number>) {
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {}
}
export function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType(); // 'POP' | 'PUSH' | 'REPLACE'
  const prevKey = useRef<string | null>(null);
  const currentKeyRef = useRef<string>(location.key);
  currentKeyRef.current = location.key;
  // Continuously persist the current route's scroll position (throttled via RAF).
  // This ensures the latest position is always saved, even if navigation is
  // triggered externally (browser back button, etc.) before our route effect runs.
  useEffect(() => {
    let ticking = false;
    const save = () => {
      ticking = false;
      const store = readStore();
      store[currentKeyRef.current] = window.scrollY;
      writeStore(store);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(save);
    };
    const onHide = () => {
      const store = readStore();
      store[currentKeyRef.current] = window.scrollY;
      writeStore(store);
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('beforeunload', onHide);
    window.addEventListener('pagehide', onHide);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('beforeunload', onHide);
      window.removeEventListener('pagehide', onHide);
    };
  }, []);
  useEffect(() => {
    // Save outgoing position one last time under the previous key
    if (prevKey.current && prevKey.current !== location.key) {
      const store = readStore();
      store[prevKey.current] = window.scrollY;
      writeStore(store);
    }
    const store = readStore();
    const saved = store[location.key];
    if (navType === 'POP' && typeof saved === 'number') {
      // Restore across multiple frames — pages with async layout
      // (e.g. horizontal scroll section measuring its height) settle late.
      const target = saved;
      const restore = () => window.scrollTo(0, target);
      restore();
      requestAnimationFrame(restore);
      const timers = [60, 160, 320, 600, 1000, 1600].map((ms) =>
      setTimeout(restore, ms)
      );
      prevKey.current = location.key;
      return () => timers.forEach(clearTimeout);
    }
    // New navigation — start at top
    window.scrollTo(0, 0);
    prevKey.current = location.key;
  }, [location.key, navType]);
  return null;
}