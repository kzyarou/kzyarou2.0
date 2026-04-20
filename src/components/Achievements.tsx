import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrophyIcon,
  RadioIcon,
  SparklesIcon,
  ArrowUpRightIcon } from
'lucide-react';
import { SectionHeader } from './SectionHeader';
import { Marquee } from './Marquee';
interface Stage {
  level: string;
  location: string;
  year: string;
  accolades: string[];
}
const markItJourney: Stage[] = [
{
  level: 'Division',
  location: 'Division Science & Technology Fair',
  year: '2025',
  accolades: ['Best Poster', 'Best Presenter', 'Best Paper']
},
{
  level: 'Regional',
  location: 'Regional Science & Technology Fair',
  year: '2025',
  accolades: [
  'Best Poster',
  'Best Paper',
  'Qualified for Nationals · Representing Region 8']

},
{
  level: 'National',
  location: 'National Science & Technology Fair',
  year: '2026',
  accolades: [
  'Top 3 Best Project',
  'Best CISTEM Changemaker Award',
  'Innovator of the Year']

}];

const otherWins = [
{
  icon: RadioIcon,
  title: '2nd Place — Best Overall Production',
  context: 'Radio Broadcasting Competition · Dolores, Eastern Samar',
  year: '2024'
},
{
  icon: SparklesIcon,
  title: 'Five Production-Ready Apps Shipped',
  context: 'Independent development under the handle kzyarou',
  year: 'Ongoing'
}];

export function Achievements() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="relative bg-graphite py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative">
        <SectionHeader
          number="03"
          label="Recognition"
          title={
          <>
              From a school project to a{' '}
              <span className="italic text-ember">national stage.</span>
            </>
          } />
        

        {/* MarkIt journey */}
        <div className="mb-32 md:mb-40">
          <motion.div
            initial={{
              opacity: 0,
              y: 12
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
              duration: 0.6
            }}
            className="flex items-center gap-4 mb-12">
            
            <span className="font-mono text-xs text-ember tracking-[0.3em]">
              CASE · MARKIT
            </span>
            <span className="flex-1 h-px bg-edge" />
            <span className="font-mono text-xs text-muted tracking-[0.3em] uppercase">
              Division → Regional → National
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {markItJourney.map((stage, i) => {
              const isPeak = i === 2;
              return (
                <motion.div
                  key={stage.level}
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
                    duration: 0.8,
                    delay: i * 0.15
                  }}
                  className={`relative bg-obsidian border p-8 md:p-10 flex flex-col h-full ${isPeak ? 'border-ember/70 lg:col-span-6 lg:-translate-y-8 lg:min-h-[480px]' : 'border-hairline lg:col-span-3 lg:min-h-[380px]'}`}
                  style={
                  isPeak ?
                  {
                    boxShadow:
                    '0 0 60px -10px rgba(255,59,47,0.35), inset 0 0 40px -20px rgba(255,59,47,0.2)'
                  } :
                  undefined
                  }>
                  
                  {isPeak &&
                  <motion.div
                    animate={{
                      opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity
                    }}
                    className="absolute -top-3 left-8 font-mono text-[10px] tracking-widest uppercase bg-ember text-obsidian px-3 py-1">
                    
                      ◉ Peak
                    </motion.div>
                  }
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
                      Stage 0{i + 1}
                    </span>
                    <span className="font-mono text-xs text-ember">
                      {stage.year}
                    </span>
                  </div>
                  <h3
                    className={`font-display font-normal text-bone leading-[0.95] mb-2 ${isPeak ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'}`}>
                    
                    {isPeak ?
                    <span className="italic text-ember">{stage.level}</span> :

                    stage.level
                    }
                  </h3>
                  <p className="text-muted text-sm font-light mb-8">
                    {stage.location}
                  </p>
                  <ul className="space-y-3 mt-auto">
                    {stage.accolades.map((a) =>
                    <li key={a} className="flex items-start gap-3 text-bone">
                        <TrophyIcon
                        className={`w-4 h-4 mt-1.5 shrink-0 ${isPeak ? 'text-ember-glow' : 'text-ember'}`} />
                      
                        <span
                        className={`font-display font-normal leading-snug ${isPeak ? 'text-xl md:text-2xl' : 'text-lg'}`}>
                        
                          {a}
                        </span>
                      </li>
                    )}
                  </ul>
                </motion.div>);

            })}
          </div>
        </div>

        {/* Beyond the lab — editorial hover-expand list */}
        <motion.div
          initial={{
            opacity: 0,
            y: 12
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
            duration: 0.6
          }}
          className="flex items-center gap-4 mb-6">
          
          <span className="font-mono text-xs text-ember tracking-[0.3em]">
            BEYOND THE LAB
          </span>
          <span className="flex-1 h-px bg-edge" />
        </motion.div>

        <ul className="divide-y divide-hairline border-y border-hairline">
          {otherWins.map((item, i) => {
            const Icon = item.icon;
            const isOpen = open === i;
            return (
              <li
                key={item.title}
                onMouseEnter={() => setOpen(i)}
                onMouseLeave={() => setOpen(null)}
                className="relative group">
                
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20
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
                    duration: 0.6,
                    delay: i * 0.08
                  }}
                  className="py-8 md:py-14 md:grid md:grid-cols-12 md:gap-8 md:items-center">
                  
                  {/* Mobile: stacked layout */}
                  <div className="md:hidden">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-xs text-ember">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <Icon className="w-5 h-5 text-ember" />
                      <span className="ml-auto font-mono text-[10px] tracking-widest uppercase text-muted">
                        {item.year}
                      </span>
                    </div>
                    <motion.div
                      animate={{
                        x: isOpen ? 12 : 0
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="font-display text-3xl sm:text-4xl text-bone leading-tight mb-3">
                      
                      {item.title}
                    </motion.div>
                    <div className="text-muted text-sm font-light">
                      {item.context}
                    </div>
                  </div>

                  {/* Tablet+ : editorial grid */}
                  <div className="hidden md:block col-span-1 font-mono text-xs text-ember">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="hidden md:block col-span-1">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-ember" />
                  </div>
                  <div className="hidden md:block col-span-7">
                    <motion.div
                      animate={{
                        x: isOpen ? 16 : 0
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="font-display text-5xl text-bone leading-tight">
                      
                      {item.title}
                    </motion.div>
                  </div>
                  <div className="hidden md:block col-span-2 text-muted text-base font-light">
                    {item.context}
                  </div>
                  <div className="hidden md:flex col-span-1 justify-end font-mono text-xs text-muted">
                    {item.year}
                  </div>
                </motion.div>
                <motion.div
                  className="absolute left-0 right-0 bottom-0 h-px bg-ember origin-left"
                  initial={{
                    scaleX: 0
                  }}
                  animate={{
                    scaleX: isOpen ? 1 : 0
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }} />
                
              </li>);

          })}
        </ul>
      </div>

      {/* Marquee of honors */}
      <div className="mt-32 border-y border-hairline py-6">
        <Marquee
          items={[
          'Innovator of the Year',
          'Top 3 Best Project',
          'Best CISTEM Changemaker',
          'Best Overall Production',
          'Best Paper',
          'Best Poster']
          }
          separator="◆"
          itemClassName="font-display italic text-4xl md:text-6xl text-bone/80" />
        
      </div>
    </section>);

}