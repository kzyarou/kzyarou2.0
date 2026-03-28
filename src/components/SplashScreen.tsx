import React, { useEffect, useState, useRef, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Matrix Rain Effect Component
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    const draw = () => {
      ctx.fillStyle = 'rgba(13, 17, 23, 0.05)'; // gh-bg with opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#3fb950'; // gh-accent
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-20 pointer-events-none" />);


};
const ASCII_LOGO = `
██╗  ██╗███████╗██╗   ██╗ █████╗ ██████╗  ██████╗ ██╗   ██╗
██║ ██╔╝╚══███╔╝╚██╗ ██╔╝██╔══██╗██╔══██╗██╔═══██╗██║   ██║
█████╔╝   ███╔╝  ╚████╔╝ ███████║██████╔╝██║   ██║██║   ██║
██╔═██╗  ███╔╝    ╚██╔╝  ██╔══██║██╔══██╗██║   ██║██║   ██║
██║  ██╗███████╗   ██║   ██║  ██║██║  ██║╚██████╔╝╚██████╔╝
╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ 
`;
const BOOT_PHASES = [
{
  id: 'init',
  duration: 1500,
  lines: [
  {
    text: 'BIOS Date 03/28/26 14:32:11 Ver 1.0.4',
    color: 'text-gh-muted'
  },
  {
    text: 'CPU: Quantum Core i9-9900K @ 3.60GHz',
    color: 'text-gh-text'
  },
  {
    text: 'Memory Test: 65536K OK',
    color: 'text-gh-text'
  },
  {
    text: 'Initializing USB Controllers .. Done.',
    color: 'text-gh-text'
  }]

},
{
  id: 'kernel',
  duration: 2000,
  lines: [
  {
    text: '[ OK ] Reached target Local File Systems.',
    color: 'text-gh-accent'
  },
  {
    text: '[ OK ] Started Create Volatile Files and Directories.',
    color: 'text-gh-accent'
  },
  {
    text: '[ OK ] Started Network Time Synchronization.',
    color: 'text-gh-accent'
  },
  {
    text: '[WARN] Failed to mount /sys/kernel/debug.',
    color: 'text-yellow-500'
  },
  {
    text: '[ OK ] Reached target System Initialization.',
    color: 'text-gh-accent'
  }]

},
{
  id: 'modules',
  duration: 2500,
  lines: [
  {
    text: 'Loading module: core_ui.so ...',
    color: 'text-gh-blue'
  },
  {
    text: 'Loading module: project_data.db ...',
    color: 'text-gh-blue'
  },
  {
    text: 'Loading module: auth_service.ts ...',
    color: 'text-gh-blue'
  },
  {
    text: 'Establishing secure connection to Firebase...',
    color: 'text-gh-text'
  },
  {
    text: 'Connection established. Latency: 12ms',
    color: 'text-gh-accent'
  }]

},
{
  id: 'launch',
  duration: 1500,
  lines: [
  {
    text: 'Decrypting payload...',
    color: 'text-gh-text'
  },
  {
    text: 'Payload decrypted successfully.',
    color: 'text-gh-accent'
  },
  {
    text: 'Executing launch sequence...',
    color: 'text-gh-text'
  }]

}];

export function SplashScreen({ onComplete }: {onComplete: () => void;}) {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<
    {
      text: string;
      color: string;
    }[]>(
    []);
  const [progress, setProgress] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(12);
  const [ramUsage, setRamUsage] = useState(45);
  const [showLogo, setShowLogo] = useState(false);
  // Diagnostics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 40) + 10);
      setRamUsage((prev) => Math.min(100, prev + Math.floor(Math.random() * 5)));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  // Boot sequence logic
  useEffect(() => {
    let totalTimeElapsed = 0;
    const totalDuration = BOOT_PHASES.reduce(
      (acc, phase) => acc + phase.duration,
      0
    );
    const runPhase = async (index: number) => {
      if (index >= BOOT_PHASES.length) {
        setShowLogo(true);
        setTimeout(onComplete, 2000);
        return;
      }
      setCurrentPhaseIndex(index);
      const phase = BOOT_PHASES[index];
      // Add lines one by one with a slight delay
      for (let i = 0; i < phase.lines.length; i++) {
        await new Promise((resolve) =>
        setTimeout(resolve, phase.duration / phase.lines.length)
        );
        setDisplayedLines((prev) => [...prev, phase.lines[i]]);
      }
      totalTimeElapsed += phase.duration;
      setProgress(totalTimeElapsed / totalDuration * 100);
      runPhase(index + 1);
    };
    runPhase(0);
  }, [onComplete]);
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gh-bg flex flex-col justify-center items-center p-4 sm:p-8 font-mono text-sm sm:text-base overflow-hidden"
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: 'blur(10px)',
        transition: {
          duration: 0.8,
          ease: 'easeInOut'
        }
      }}>
      
      <MatrixRain />
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30 z-10" />

      {/* Diagnostics Panel */}
      <div className="absolute top-4 right-4 z-20 border border-gh-border bg-gh-surface/80 backdrop-blur p-3 rounded text-xs text-gh-muted hidden sm:block">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span>CPU</span>
          <div className="w-24 h-1.5 bg-gh-bg rounded overflow-hidden">
            <div
              className="h-full bg-gh-accent transition-all duration-300"
              style={{
                width: `${cpuUsage}%`
              }} />
            
            <span className="ml-2">{`${cpuUsage}%`}</span>
          </div>
          <span className="w-8 text-right">{cpuUsage}%</span>
        </div>
        <div className="flex items-center justify-between gap-4 mb-2">
          <span>RAM</span>
          <div className="w-24 h-1.5 bg-gh-bg rounded overflow-hidden">
            <div
              className="h-full bg-gh-blue transition-all duration-300"
              style={{
                width: `${ramUsage}%`
              }} />
            
            <span className="ml-2">{`${ramUsage}%`}</span>
          </div>
          <span className="w-8 text-right">{ramUsage}%</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span>NET</span>
          <span className="text-gh-accent animate-pulse">CONNECTED</span>
        </div>
      </div>

      <div className="w-full max-w-4xl relative z-20 flex flex-col h-full justify-center">
        <AnimatePresence>
          {!showLogo ?
          <motion.div
            className="flex-grow flex flex-col justify-end pb-12"
            exit={{
              opacity: 0,
              y: -20
            }}>
            
              <div className="space-y-1">
                {displayedLines.map((line, i) =>
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: -10
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                className={line.color}>
                
                    {line.text}
                  </motion.div>
              )}
                <motion.div
                animate={{
                  opacity: [1, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  ease: 'linear'
                }}
                className="w-2.5 h-4 bg-gh-text inline-block mt-1" />
              
              </div>
            </motion.div> :

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: 'blur(5px)'
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)'
            }}
            className="flex-grow flex flex-col items-center justify-center">
            
              <pre className="text-gh-accent font-bold text-[8px] sm:text-[10px] md:text-xs leading-none drop-shadow-[0_0_10px_rgba(63,185,80,0.5)]">
                {ASCII_LOGO}
              </pre>
              <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.5
              }}
              className="mt-8 text-gh-text tracking-[0.5em] uppercase text-sm">
              
                Access Granted
              </motion.div>
            </motion.div>
          }
        </AnimatePresence>

        {/* Bottom Progress Bar */}
        <div className="mt-auto w-full">
          <div className="flex justify-between text-xs text-gh-muted mb-2 uppercase tracking-wider">
            <span>System Boot Sequence</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1 bg-gh-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gh-accent relative"
              initial={{
                width: 0
              }}
              animate={{
                width: `${progress}%`
              }}
              transition={{
                ease: 'linear',
                duration: 0.1
              }}>
              
              <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-[2px]" />
            </motion.div>
          </div>
          <div className="flex gap-1 mt-2">
            {BOOT_PHASES.map((phase, i) =>
            <div
              key={phase.id}
              className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${i <= currentPhaseIndex ? 'bg-gh-blue' : 'bg-gh-border'}`} />

            )}
          </div>
        </div>
      </div>
    </motion.div>);

}