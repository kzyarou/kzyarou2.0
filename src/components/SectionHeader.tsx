import React from 'react';
import { motion } from 'framer-motion';
interface Props {
  number: string;
  label: string;
  title: React.ReactNode;
  compact?: boolean;
}
export function SectionHeader({ number, label, title, compact }: Props) {
  return (
    <div
      className={compact ? 'mb-4 md:mb-6 lg:mb-10' : 'mb-10 md:mb-16 lg:mb-24'}>
      
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
          margin: '-100px'
        }}
        transition={{
          duration: 0.6
        }}
        className={
        compact ?
        'flex items-center gap-4 mb-2 md:mb-4' :
        'flex items-center gap-4 mb-4 md:mb-8'
        }>
        
        <span className="font-mono text-xs text-ember tracking-[0.3em]">
          {number}
        </span>
        <motion.span
          initial={{
            scaleX: 0
          }}
          whileInView={{
            scaleX: 1
          }}
          viewport={{
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.76, 0, 0.24, 1]
          }}
          className="w-20 h-px bg-edge origin-left" />
        
        <span className="font-mono text-xs text-muted tracking-[0.3em] uppercase">
          {label}
        </span>
      </motion.div>
      <h2
        className={`font-display font-normal leading-[0.95] tracking-tight text-bone max-w-5xl ${compact ? 'text-[8vw] md:text-4xl lg:text-5xl xl:text-6xl' : 'text-[10vw] md:text-6xl lg:text-7xl xl:text-8xl'}`}>
        
        <motion.span
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
            margin: '-100px'
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block">
          
          {title}
        </motion.span>
      </h2>
    </div>);

}