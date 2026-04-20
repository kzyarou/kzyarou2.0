import React, {
  useEffect,
  useState,
  useRef,
  createContext,
  useContext } from
'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
const DisplayedLocationContext = createContext<ReturnType<
  typeof useLocation> |
null>(null);
export function useDisplayedLocation() {
  return useContext(DisplayedLocationContext);
}
const COVER_MS = 500;
const REVEAL_MS = 550;
export function RouteTransitionProvider({
  children


}: {children: React.ReactNode;}) {
  const realLocation = useLocation();
  const [displayedLocation, setDisplayedLocation] = useState(realLocation);
  const [phase, setPhase] = useState<'idle' | 'covering' | 'revealing'>('idle');
  const [label, setLabel] = useState('');
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (realLocation.key === displayedLocation.key) return;
    const path = realLocation.pathname;
    let l = 'Home';
    if (path.startsWith('/projects/')) l = path.split('/')[2] || 'Project';else
    if (path.startsWith('/contact')) l = 'Contact';else
    if (path.startsWith('/admin')) l = 'Admin';else
    if (path.startsWith('/login')) l = 'Login';
    setLabel(l);
    setPhase('covering');
    const coverTimer = setTimeout(() => {
      setDisplayedLocation(realLocation);
      requestAnimationFrame(() => {
        setPhase('revealing');
        const revealTimer = setTimeout(() => setPhase('idle'), REVEAL_MS);
        cleanup.current = () => clearTimeout(revealTimer);
      });
    }, COVER_MS);
    const cleanup = {
      current: () => clearTimeout(coverTimer)
    };
    return () => cleanup.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realLocation.key]);
  const overlayVisible = phase !== 'idle';
  const coverDur = COVER_MS / 1000;
  const revealDur = REVEAL_MS / 1000;
  return (
    <DisplayedLocationContext.Provider value={displayedLocation}>
      {children}
      <AnimatePresence>
        {overlayVisible &&
        <motion.div
          key="route-overlay"
          className="fixed inset-0 z-[95] pointer-events-none">
          
            {/* Top curtain — descends to middle, then retracts up */}
            <motion.div
            initial={{
              y: '-100%'
            }}
            animate={
            phase === 'covering' ?
            {
              y: '0%'
            } :
            {
              y: '-100%'
            }
            }
            transition={{
              duration: phase === 'covering' ? coverDur : revealDur,
              ease: [0.76, 0, 0.24, 1]
            }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-graphite" />
          
            {/* Bottom curtain — ascends to middle, then retracts down */}
            <motion.div
            initial={{
              y: '100%'
            }}
            animate={
            phase === 'covering' ?
            {
              y: '0%'
            } :
            {
              y: '100%'
            }
            }
            transition={{
              duration: phase === 'covering' ? coverDur : revealDur,
              ease: [0.76, 0, 0.24, 1]
            }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-graphite" />
          
            {/* Ember seam — thin line where the curtains meet */}
            <motion.div
            initial={{
              scaleX: 0
            }}
            animate={
            phase === 'covering' ?
            {
              scaleX: 1
            } :
            {
              scaleX: 0
            }
            }
            transition={{
              duration:
              phase === 'covering' ? coverDur * 0.8 : revealDur * 0.6,
              delay: phase === 'covering' ? coverDur * 0.3 : 0,
              ease: [0.76, 0, 0.24, 1]
            }}
            className="absolute top-1/2 left-0 right-0 h-px bg-ember origin-center -translate-y-1/2"
            style={{
              boxShadow: '0 0 24px rgba(255,59,47,0.8)'
            }} />
          
            {/* Destination label */}
            <AnimatePresence>
              {phase === 'covering' &&
            <motion.div
              key="label"
              initial={{
                opacity: 0,
                y: 12
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -12
              }}
              transition={{
                duration: 0.3,
                delay: 0.28
              }}
              className="absolute inset-0 flex items-center justify-center">
              
                  <span className="font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase text-ember">
                    — {label} —
                  </span>
                </motion.div>
            }
            </AnimatePresence>
          </motion.div>
        }
      </AnimatePresence>
    </DisplayedLocationContext.Provider>);

}