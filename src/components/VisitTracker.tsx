import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { logVisit } from '../lib/analytics';
// Logs a visit to Firestore on every route change.
// Skips admin/login routes so internal checks don't pollute analytics.
export function VisitTracker() {
  const location = useLocation();
  const lastLogged = useRef<string | null>(null);
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/admin') || path.startsWith('/login')) return;
    if (lastLogged.current === path) return;
    lastLogged.current = path;
    logVisit(path);
  }, [location.pathname]);
  return null;
}