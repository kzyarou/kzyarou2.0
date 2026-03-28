import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, Code2Icon, RocketIcon } from 'lucide-react';
const highlights = [
{
  icon: MapPinIcon,
  text: 'Philippines-based'
},
{
  icon: Code2Icon,
  text: 'Full-stack developer'
},
{
  icon: RocketIcon,
  text: '5 projects shipped'
}];

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};
const lineVariants = {
  hidden: {
    opacity: 0,
    x: -10
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};
export function About() {
  return (
    <motion.section
      className="py-10 relative z-10 border-t border-gh-border/50"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.3
      }}
      variants={containerVariants}>
      
      <div className="bg-gh-surface border border-gh-border rounded-lg overflow-hidden shadow-lg shadow-black/10">
        {/* Terminal Chrome */}
        <div className="bg-gh-bg border-b border-gh-border px-4 py-2 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gh-border" />
            <div className="w-3 h-3 rounded-full bg-gh-border" />
            <div className="w-3 h-3 rounded-full bg-gh-border" />
          </div>
          <div className="text-xs font-mono text-gh-muted">cat ~/about.md</div>
          <div className="w-12" /> {/* Spacer for centering */}
        </div>

        {/* File Metadata */}
        <div className="bg-gh-bg/50 border-b border-gh-border/50 px-4 py-1.5 text-[10px] sm:text-xs font-mono text-gh-muted flex flex-wrap gap-4">
          <span>File: about.md</span>
          <span className="hidden sm:inline">|</span>
          <span>Size: 1.2KB</span>
          <span className="hidden sm:inline">|</span>
          <span>Modified: {new Date().toISOString().split('T')[0]}</span>
          <span className="hidden sm:inline">|</span>
          <span className="text-gh-accent">[READ ONLY]</span>
        </div>

        {/* Editor Content */}
        <div className="flex font-mono text-sm sm:text-base">
          {/* Line Numbers */}
          <div className="py-4 px-3 sm:px-4 bg-gh-bg/30 border-r border-gh-border/50 text-gh-border text-right select-none flex flex-col gap-3">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
          </div>

          {/* Text Content */}
          <div className="p-4 space-y-3 flex-1 overflow-x-auto">
            <motion.div
              variants={lineVariants}
              className="text-gh-blue font-bold">
              
              # Developer from the Philippines.
            </motion.div>

            <motion.div variants={lineVariants} className="text-gh-text">
              I build applications that solve real-world problems — from
            </motion.div>
            <motion.div variants={lineVariants} className="text-gh-text">
              connecting farmers to markets, to translating sign language with
              ML.
            </motion.div>

            <motion.div
              variants={lineVariants}
              className="text-gh-muted italic">
              
              // Focused on clean architecture, minimal design,
            </motion.div>
            <motion.div
              variants={lineVariants}
              className="text-gh-muted italic">
              
              // and shipping production-ready code.
            </motion.div>

            <motion.div
              variants={lineVariants}
              className="text-gh-text pt-2 flex items-center gap-2">
              
              <span className="text-gh-accent">const</span> highlights = [
            </motion.div>

            <motion.div
              variants={lineVariants}
              className="flex flex-wrap gap-3 pl-4">
              
              {highlights.map((item, i) =>
              <div
                key={item.text}
                className="flex items-center gap-2 text-xs font-mono text-gh-text bg-gh-bg border border-gh-border px-2.5 py-1 rounded">
                
                  <item.icon className="w-3 h-3 text-gh-accent" />
                  <span>'{item.text}'</span>
                  {i < highlights.length - 1 &&
                <span className="text-gh-muted">,</span>
                }
                </div>
              )}
            </motion.div>

            <motion.div
              variants={lineVariants}
              className="text-gh-text flex items-center gap-1">
              
              ]{' '}
              <span className="w-2 h-4 bg-gh-muted animate-blink inline-block ml-1" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>);

}