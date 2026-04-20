import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Marquee } from './Marquee';
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Clamp to ±15px — with scale-105 buffer this never exposes edges.
      setParallax({
        x: (e.clientX / w - 0.5) * 15,
        y: (e.clientY / h - 0.5) * 15
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  const roles = [
  'Full-stack developer',
  'Student researcher',
  'Journalist',
  'Innovator of the Year',
  'Based in the Philippines',
  'Shipping five apps & counting'];

  return (
    <section
      id="top"
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden bg-obsidian">
      
      {/* Image layer — contained inset-0, scale-105 buffer, clamped parallax. */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            x: parallax.x,
            y: parallax.y
          }}
          transition={{
            type: 'spring',
            stiffness: 40,
            damping: 20
          }}>
          
          <motion.div
            initial={{
              scale: 1.05
            }}
            animate={{
              scale: 1.12
            }}
            transition={{
              duration: 22,
              ease: 'easeOut',
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="absolute inset-0">
            
            <img
              src="/pasted-image.jpg"
              alt="Zachary Paul Rapis underwater portrait"
              className="w-full h-full object-cover" />
            
          </motion.div>
        </motion.div>

        {/* Warm, gentle wash — lifts the image without making it ghostly. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
            'linear-gradient(180deg, rgba(6,6,10,0.15) 0%, rgba(6,6,10,0) 30%, rgba(6,6,10,0) 55%, rgba(6,6,10,0.75) 100%)'
          }} />
        
        {/* Left-side readability gradient for the name, softer than before. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
            'linear-gradient(90deg, rgba(6,6,10,0.55) 0%, rgba(6,6,10,0.2) 40%, rgba(6,6,10,0) 70%)'
          }} />
        
      </div>

      {/* Vertical side label */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-left z-10 hidden md:block">
        <motion.div
          initial={{
            opacity: 0,
            x: -20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            duration: 0.8,
            delay: 2.8
          }}
          className="font-mono text-[10px] tracking-[0.5em] uppercase text-bone/70 whitespace-nowrap flex items-center gap-4">
          
          <span className="w-10 h-px bg-ember" />
          Portfolio — MMXXVI
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-20 min-h-screen flex flex-col justify-between pt-32 pb-8">
        <div className="flex-1 flex flex-col justify-center py-16">
          {/* Handle */}
          <motion.div
            initial={{
              opacity: 0,
              y: 12
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 2.6
            }}
            className="font-mono text-xs text-ember tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
            
            <span className="w-8 h-px bg-ember" />
            Known online as kzyarou
          </motion.div>

          {/* Name — letter-stagger mask reveal */}
          <h1 className="font-display font-normal text-[16vw] md:text-[11vw] leading-[0.82] tracking-tight text-bone drop-shadow-[0_2px_30px_rgba(6,6,10,0.5)]">
            {['Zachary', 'Paul', 'Rapis'].map((word, wIdx) =>
            <span key={wIdx} className="block">
                {word.split('').map((ch, i) =>
              <span key={i} className="reveal-mask">
                    <motion.span
                  initial={{
                    y: '110%'
                  }}
                  animate={{
                    y: 0
                  }}
                  transition={{
                    duration: 1.1,
                    delay: 2.5 + wIdx * 0.15 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className={
                  wIdx === 1 ?
                  'italic text-ember inline-block' :
                  'inline-block'
                  }>
                  
                      {ch}
                    </motion.span>
                  </span>
              )}
              </span>
            )}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{
              opacity: 0,
              y: 12
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 3.4
            }}
            className="mt-10 max-w-xl font-sans text-sm md:text-base text-bone/75 leading-relaxed">
            
            A portfolio of things built with code, curiosity, and a camera.
            Currently shipping from the Philippines.
          </motion.p>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.8,
            delay: 3.6
          }}
          className="flex items-end justify-between gap-8">
          
          <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-bone/60">
            <motion.div
              animate={{
                scaleY: [1, 0.3, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-px h-10 bg-ember mb-3 origin-top" />
            
            Scroll
          </div>
        </motion.div>
      </div>

      {/* Full-width marquee strip — lighter bar */}
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 0.8,
          delay: 3.8
        }}
        className="absolute bottom-0 left-0 right-0 border-y border-bone/10 bg-obsidian/40 backdrop-blur-md py-4 z-10">
        
        <Marquee
          items={roles}
          speed="slow"
          itemClassName="font-display italic text-2xl md:text-4xl text-bone" />
        
      </motion.div>
    </section>);

}