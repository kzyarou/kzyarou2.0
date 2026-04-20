import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
const photos = ["/1a7f049d-f9b9-4de2-9f31-c70495f46f5e.jpg", "/a095ad0e-ed48-43a2-869a-71abb42fdf06.jpg", "/bd1e9df5-3e92-4e75-91f6-9e7923b40a1d.jpg", "/f450746b-7c07-4f34-a2af-42e03c8f7ae9.jpg"];





function PhotoStack() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), 3400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative w-full aspect-[4/5]">
      {/* Ghost back frames (polaroid tilt) */}
      <div
        className="absolute inset-0 bg-panel border border-hairline"
        style={{
          transform: 'rotate(-4deg) translate(-2%, 3%)'
        }}
        aria-hidden />
      
      <div
        className="absolute inset-0 bg-panel border border-hairline"
        style={{
          transform: 'rotate(3deg) translate(3%, -2%)'
        }}
        aria-hidden />
      

      {/* Active polaroid */}
      <motion.div
        key={index}
        initial={{
          opacity: 0,
          scale: 0.96,
          rotate: -2
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="relative w-full h-full bg-panel border border-edge p-3 md:p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        
        <AnimatePresence mode="sync">
          <motion.img
            key={photos[index]}
            src={photos[index]}
            alt={`Zachary Paul Rapis — frame ${index + 1}`}
            initial={{
              opacity: 0,
              scale: 1.08
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 1.1,
              ease: [0.65, 0, 0.35, 1]
            }}
            className="absolute inset-3 md:inset-4 w-[calc(100%-1.5rem)] md:w-[calc(100%-2rem)] h-[calc(100%-5rem)] object-cover grayscale-[20%]" />
          
        </AnimatePresence>

        {/* Caption — now playing style */}
        <div className="absolute inset-x-3 md:inset-x-4 bottom-3 md:bottom-4 h-14 flex items-center justify-between gap-3 font-mono text-[10px] tracking-widest uppercase text-muted">
          <div className="flex items-center gap-2">
            <motion.span
              animate={{
                opacity: [1, 0.3, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
              className="w-1.5 h-1.5 rounded-full bg-ember" />
            
            Now showing
          </div>
          <div className="flex gap-1">
            {photos.map((_, i) =>
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`View ${i + 1}`}
              className={`h-px transition-all duration-500 ${i === index ? 'w-6 bg-ember' : 'w-3 bg-muted/40 hover:bg-muted'}`} />

            )}
          </div>
          <span className="tabular-nums">
            {String(index + 1).padStart(2, '0')}/
            {String(photos.length).padStart(2, '0')}
          </span>
        </div>
      </motion.div>
    </div>);

}
export function About() {
  return (
    <section id="about" className="relative bg-obsidian py-32 md:py-48">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <SectionHeader
          number="01"
          label="About"
          title={
          <>
              A student shaped by{' '}
              <span className="italic text-ember">curiosity</span>, shipping
              across code, research, and the airwaves.
            </>
          } />
        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 0.9
            }}
            className="lg:col-span-7 space-y-8">
            
            <p className="font-display text-3xl md:text-5xl leading-[1.15] text-bone font-normal">
              I'm a college student and full-stack developer from the
              Philippines. Under the handle{' '}
              <span className="italic text-ember">kzyarou</span>, I've shipped
              five production-ready applications spanning agriculture,
              education, finance, accessibility, and health.
            </p>

            <div className="space-y-5 text-muted text-lg md:text-xl leading-relaxed font-light max-w-2xl">
              <p>
                As a student researcher I was recognized as{' '}
                <span className="text-bone">Innovator of the Year</span>, placed
                in the <span className="text-bone">Top 3 Best Project</span> and
                received the{' '}
                <span className="text-bone">Best CISTEM Changemaker Award</span>{' '}
                at the National Science and Technology Fair.
              </p>
              <p>
                As a journalist, I compete in radio broadcasting — earning{' '}
                <span className="text-bone">
                  2nd place for Best Overall Production
                </span>
                . On the side, I take commissioned freelance work and teach
                programming to students learning to build their first things.
              </p>
            </div>

            <div className="pt-10 grid grid-cols-3 gap-6 border-t border-hairline">
              {[
              {
                n: '05',
                l: 'Apps shipped'
              },
              {
                n: '04+',
                l: 'Awards'
              },
              {
                n: '100%',
                l: 'Self-taught'
              }].
              map((s, i) =>
              <motion.div
                key={s.l}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1
                }}>
                
                  <div className="font-display text-5xl md:text-6xl text-bone mb-1">
                    {s.n}
                  </div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-muted">
                    {s.l}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-80px'
            }}
            transition={{
              duration: 1
            }}
            className="lg:col-span-5 lg:sticky lg:top-28">
            
            <PhotoStack />
          </motion.div>
        </div>
      </div>
    </section>);

}