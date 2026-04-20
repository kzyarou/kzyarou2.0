import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
// Cinematic multi-act intro.
// Act 1 (0.0s)   heartbeat ember + metadata lines type in
// Act 2 (1.1s)   letterbox bars slide in, coordinates lock
// Act 3 (1.7s)   huge name reveal, letter-by-letter mask + slow zoom
// Act 4 (2.8s)   tagline rises, progress finishes
// Act 5 (3.4s)   curtain splits vertically — reveal site
const TOTAL_MS = 3600;
export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [act, setAct] = useState(0);
  const progress = useMotionValue(0);
  const [pctText, setPctText] = useState('000');
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timers = [
    setTimeout(() => setAct(1), 900),
    setTimeout(() => setAct(2), 1700),
    setTimeout(() => setAct(3), 2800),
    setTimeout(() => setVisible(false), TOTAL_MS)];

    const controls = animate(progress, 100, {
      duration: TOTAL_MS / 1000 - 0.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setPctText(String(Math.round(v)).padStart(3, '0'))
    });
    return () => {
      timers.forEach(clearTimeout);
      controls.stop();
      document.body.style.overflow = original;
    };
  }, [progress]);
  useEffect(() => {
    if (!visible) document.body.style.overflow = '';
  }, [visible]);
  const name = 'kzyarou';
  const coords = useMemo(
    () => [
    {
      k: 'SIGNAL',
      v: 'ACQUIRED'
    },
    {
      k: 'LAT',
      v: '11.2423° N'
    },
    {
      k: 'LON',
      v: '125.4671° E'
    },
    {
      k: 'SUBJECT',
      v: 'Z. P. RAPIS'
    }],

    []
  );
  return (
    <AnimatePresence>
      {visible &&
      <motion.div
        key="splash"
        className="fixed inset-0 z-[100] bg-obsidian text-bone overflow-hidden"
        aria-hidden>
        
          {/* Vertical curtain reveal — two panels split apart at the end */}
          <motion.div
          initial={{
            x: 0
          }}
          animate={{
            x: act >= 3 ? '-101%' : 0
          }}
          transition={{
            duration: 1.1,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.1
          }}
          className="absolute top-0 bottom-0 left-0 w-1/2 bg-obsidian z-[5]" />
        
          <motion.div
          initial={{
            x: 0
          }}
          animate={{
            x: act >= 3 ? '101%' : 0
          }}
          transition={{
            duration: 1.1,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.1
          }}
          className="absolute top-0 bottom-0 right-0 w-1/2 bg-obsidian z-[5]" />
        
          {/* Ember seam where the curtain splits */}
          <motion.div
          initial={{
            scaleY: 0,
            opacity: 0
          }}
          animate={{
            scaleY: act >= 3 ? 1 : 0,
            opacity: act >= 3 ? [0, 1, 1, 0] : 0
          }}
          transition={{
            duration: 1.1,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.1
          }}
          className="absolute top-0 bottom-0 left-1/2 w-px bg-ember z-[6] origin-center -translate-x-1/2"
          style={{
            boxShadow: '0 0 40px rgba(255,59,47,0.9)'
          }} />
        

          {/* Ambient ember glow */}
          <motion.div
          initial={{
            opacity: 0,
            scale: 0.6
          }}
          animate={{
            opacity: act >= 2 ? 0.45 : act >= 1 ? 0.18 : 0.08,
            scale: act >= 2 ? 1.2 : 1
          }}
          transition={{
            duration: 1.4,
            ease: 'easeOut'
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[70vw] md:h-[70vw] rounded-full pointer-events-none"
          style={{
            background:
            'radial-gradient(circle, rgba(255,59,47,0.35) 0%, rgba(255,59,47,0) 60%)',
            filter: 'blur(20px)'
          }} />
        

          {/* Scanline vignette */}
          <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
            'repeating-linear-gradient(0deg, rgba(242,239,232,0.6) 0px, rgba(242,239,232,0.6) 1px, transparent 1px, transparent 3px)'
          }} />
        

          {/* Letterbox bars */}
          <motion.div
          initial={{
            y: '-100%'
          }}
          animate={{
            y: act >= 1 ? 0 : '-100%'
          }}
          transition={{
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1]
          }}
          className="absolute top-0 left-0 right-0 h-[8vh] bg-graphite border-b border-hairline z-[4]" />
        
          <motion.div
          initial={{
            y: '100%'
          }}
          animate={{
            y: act >= 1 ? 0 : '100%'
          }}
          transition={{
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1]
          }}
          className="absolute bottom-0 left-0 right-0 h-[8vh] bg-graphite border-t border-hairline z-[4]" />
        

          {/* Top metadata */}
          <div className="absolute top-0 left-0 right-0 h-[8vh] flex items-center justify-between px-6 md:px-12 font-mono text-[10px] tracking-[0.3em] uppercase z-[7]">
            <motion.div
            initial={{
              opacity: 0,
              x: -10
            }}
            animate={{
              opacity: act >= 1 ? 1 : 0,
              x: act >= 1 ? 0 : -10
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
            className="flex items-center gap-3 text-muted">
            
              <motion.span
              animate={{
                scale: [1, 1.6, 1],
                opacity: [1, 0.4, 1]
              }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-1.5 h-1.5 rounded-full bg-ember inline-block"
              style={{
                boxShadow: '0 0 8px rgba(255,59,47,0.9)'
              }} />
            
              <span className="text-ember">REC</span>
              <span>·</span>
              <span>TITLE 001</span>
            </motion.div>
            <motion.div
            initial={{
              opacity: 0,
              x: 10
            }}
            animate={{
              opacity: act >= 1 ? 1 : 0,
              x: act >= 1 ? 0 : 10
            }}
            transition={{
              duration: 0.5,
              delay: 0.3
            }}
            className="text-muted hidden sm:block">
            
              MMXXVI · MANILA — PH
            </motion.div>
          </div>

          {/* Coordinates block (stage left) */}
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-[7] hidden md:block">
            <div className="space-y-2 font-mono text-[10px] tracking-[0.25em] uppercase">
              {coords.map((c, i) =>
            <motion.div
              key={c.k}
              initial={{
                opacity: 0,
                y: 6
              }}
              animate={{
                opacity: act >= 1 && act < 3 ? 1 : 0,
                y: act >= 1 ? 0 : 6
              }}
              transition={{
                duration: 0.4,
                delay: 0.2 + i * 0.12
              }}
              className="flex items-center gap-3">
              
                  <span className="text-muted/60 w-16">{c.k}</span>
                  <span className="w-4 h-px bg-ember/60" />
                  <span className="text-bone">{c.v}</span>
                </motion.div>
            )}
            </div>
          </div>

          {/* Crosshair accents at corners */}
          {[
        'top-[12vh] left-6 md:left-12',
        'top-[12vh] right-6 md:right-12',
        'bottom-[12vh] left-6 md:left-12',
        'bottom-[12vh] right-6 md:right-12'].
        map((pos, i) =>
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0.6
          }}
          animate={{
            opacity: act >= 1 && act < 3 ? 1 : 0,
            scale: act >= 1 ? 1 : 0.6
          }}
          transition={{
            duration: 0.4,
            delay: 0.4 + i * 0.08
          }}
          className={`absolute ${pos} w-4 h-4 z-[7]`}>
          
              <span className="absolute top-0 left-0 w-full h-px bg-ember" />
              <span className="absolute top-0 left-0 h-full w-px bg-ember" />
            </motion.div>
        )}

          {/* Centerpiece: tiny intro, huge name, tagline */}
          <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 z-[7]"
          animate={{
            scale: act >= 2 ? 1 : 0.97
          }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1]
          }}>
          
            <motion.div
            initial={{
              opacity: 0,
              y: 8
            }}
            animate={{
              opacity: act >= 1 && act < 3 ? 1 : 0,
              y: act >= 1 ? 0 : 8
            }}
            transition={{
              duration: 0.5,
              delay: 0.1
            }}
            className="font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase text-ember mb-8 md:mb-12">
            
              — a portfolio by —
            </motion.div>

            <h1 className="font-display font-normal text-[22vw] md:text-[15vw] leading-[0.82] tracking-tight text-center">
              {name.split('').map((ch, i) =>
            <span key={i} className="reveal-mask">
                  <motion.span
                initial={{
                  y: '110%'
                }}
                animate={{
                  y: act >= 2 ? 0 : '110%'
                }}
                transition={{
                  duration: 1.1,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={
                i >= 3 ? 'italic text-ember inline-block' : 'inline-block'
                }
                style={
                i >= 3 ?
                {
                  textShadow: '0 0 40px rgba(255,59,47,0.4)'
                } :
                undefined
                }>
                
                    {ch}
                  </motion.span>
                </span>
            )}
            </h1>

            <div className="overflow-hidden mt-8 md:mt-10">
              <motion.p
              initial={{
                y: '110%'
              }}
              animate={{
                y: act >= 2 ? 0 : '110%'
              }}
              transition={{
                duration: 0.9,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted">
              
                Zachary Paul Rapis
              </motion.p>
            </div>

            {/* Underline draw */}
            <motion.div
            initial={{
              scaleX: 0
            }}
            animate={{
              scaleX: act >= 2 ? 1 : 0
            }}
            transition={{
              duration: 0.9,
              delay: 1.1,
              ease: [0.76, 0, 0.24, 1]
            }}
            className="mt-6 h-px w-40 md:w-64 bg-ember origin-center"
            style={{
              boxShadow: '0 0 12px rgba(255,59,47,0.6)'
            }} />
          
          </motion.div>

          {/* Bottom: progress bar inside letterbox */}
          <div className="absolute bottom-0 left-0 right-0 h-[8vh] flex items-center justify-between gap-6 px-6 md:px-12 z-[7]">
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: act >= 1 ? 1 : 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.3
            }}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted hidden md:block">
            
              Full-stack · Research · Broadcast
            </motion.div>
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: act >= 1 ? 1 : 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.3
            }}
            className="flex-1 max-w-md flex items-center gap-4">
            
              <div className="relative h-px bg-hairline flex-1 overflow-hidden">
                <motion.div
                className="absolute inset-y-0 left-0 bg-ember"
                style={{
                  width: `${pctText}%`
                }} />
              
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ember tabular-nums">
                {pctText}
              </span>
            </motion.div>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}