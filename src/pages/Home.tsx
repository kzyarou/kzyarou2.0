import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Stats } from '../components/Stats';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Footer } from '../components/Footer';
import { ActivityIcon, CpuIcon, NetworkIcon } from 'lucide-react';
function LiveDiagnostics() {
  const [uptime, setUptime] = useState(0);
  const [mem, setMem] = useState(45);
  const [net, setNet] = useState(12);
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
      setMem((prev) =>
      Math.max(20, Math.min(95, prev + (Math.random() * 10 - 5)))
      );
      setNet((prev) =>
      Math.max(5, Math.min(150, prev + (Math.random() * 20 - 10)))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };
  return (
    <div className="fixed bottom-6 right-6 z-50 border border-gh-border bg-gh-surface/80 backdrop-blur p-4 rounded-lg text-xs text-gh-muted hidden lg:block shadow-2xl shadow-black/50 w-64">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gh-border/50 text-gh-text">
        <ActivityIcon className="w-4 h-4 text-gh-accent" />
        <span className="font-semibold uppercase tracking-wider font-mono">
          System Monitor
        </span>
      </div>
      <div className="space-y-3 font-mono">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <CpuIcon className="w-3 h-3" /> UPTIME
          </span>
          <span className="text-gh-text">{formatUptime(uptime)}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <ActivityIcon className="w-3 h-3" /> MEMORY
          </span>
          <div className="flex-1 mx-2 h-1.5 bg-gh-bg rounded overflow-hidden">
            <div
              className="h-full bg-gh-blue transition-all duration-500 relative"
              style={{
                width: `${mem}%`
              }}>
              
              <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]" />
            </div>
          </div>
          <span className="text-gh-text w-8 text-right">
            {Math.round(mem)}%
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <NetworkIcon className="w-3 h-3" /> NET
          </span>
          <span className="text-gh-accent">{Math.round(net)} ms</span>
        </div>
      </div>
    </div>);

}
export function Home() {
  return (
    <motion.main
      className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 pt-16"
      initial={{
        opacity: 0,
        scale: 0.98
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      exit={{
        opacity: 0,
        scale: 0.98
      }}
      transition={{
        duration: 0.4,
        type: 'spring',
        bounce: 0.2
      }}>
      
      {/* Persistent Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-[0.15] z-50" />

      <LiveDiagnostics />

      <Hero />
      <About />
      <Stats />
      <Skills />
      <Projects />
      <Footer />
    </motion.main>);

}