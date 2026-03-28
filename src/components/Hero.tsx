import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
const ASCII_ART = `
    .----.
   /      \\
  |  o  o  |
  |   __   |
   \\      /
    '----'
`;
export function Hero() {
  const [step, setStep] = useState(0);
  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 1600);
    const timer3 = setTimeout(() => setStep(3), 2400);
    const uptimeInterval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(uptimeInterval);
    };
  }, []);
  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    return `${d} days, ${h} hours, ${m} mins`;
  };
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };
  return (
    <motion.section
      className="pt-24 pb-12 relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      
      <div className="bg-gh-surface border border-gh-border rounded-lg overflow-hidden shadow-2xl shadow-gh-accent/5">
        {/* Terminal Chrome */}
        <div className="bg-gh-bg border-b border-gh-border px-4 py-2.5 flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center text-xs font-mono text-gh-muted flex items-center justify-center gap-2">
            <span>kzyarou@macbook-pro</span>
            <span className="text-gh-border">|</span>
            <span>~</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 sm:p-8 font-mono text-sm sm:text-base">
          {/* Command 1 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-gh-text">
              <span className="text-gh-accent">kzyarou@macbook-pro</span>
              <span className="text-gh-blue">~</span>
              <span className="text-gh-muted">$</span>
              <motion.span
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                transition={{
                  duration: 0.1
                }}>
                
                whoami
              </motion.span>
            </div>
            {step >= 1 &&
            <motion.div
              initial={{
                opacity: 0,
                x: -10
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              className="mt-1 text-gh-muted">
              
                Zachary Paul Rapis
              </motion.div>
            }
          </div>

          {/* Command 2 */}
          {step >= 1 &&
          <div className="mb-6">
              <div className="flex items-center gap-2 text-gh-text">
                <span className="text-gh-accent">kzyarou@macbook-pro</span>
                <span className="text-gh-blue">~</span>
                <span className="text-gh-muted">$</span>
                <motion.span
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                transition={{
                  duration: 0.1
                }}>
                
                  neofetch
                </motion.span>
              </div>

              {step >= 2 &&
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="mt-4 flex flex-col md:flex-row gap-8 items-start">
              
                  {/* Profile Photo */}
                  <div className="hidden sm:block shrink-0">
                    <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-gh-accent/50 shadow-[0_0_15px_rgba(63,185,80,0.3)]">
                      <img
                    src="/bsns_pfp.jpg"
                    alt="Zachary Paul Rapis"
                    className="w-full h-full object-cover" />
                  
                    </div>
                  </div>

                  {/* System Info */}
                  <div className="flex-1 w-full">
                    <div className="mb-2">
                      <motion.span
                    className="text-gh-accent font-bold text-lg"
                    animate={{
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear'
                    }}>
                    
                        kzyarou
                      </motion.span>
                      <span className="text-gh-text">@</span>
                      <span className="text-gh-blue font-bold text-lg">
                        dev-machine
                      </span>
                    </div>
                    <div className="text-gh-border mb-2">
                      -------------------
                    </div>

                    <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                      <span className="text-gh-accent font-bold">OS</span>
                      <span className="text-gh-text">Developer OS v1.0.4</span>

                      <span className="text-gh-accent font-bold">Host</span>
                      <span className="text-gh-text">Philippines</span>

                      <span className="text-gh-accent font-bold">Kernel</span>
                      <span className="text-gh-text">React/TypeScript</span>

                      <span className="text-gh-accent font-bold">Uptime</span>
                      <span className="text-gh-text">
                        {formatUptime(uptime + 124500)}
                      </span>

                      <span className="text-gh-accent font-bold">Packages</span>
                      <span className="text-gh-text">
                        142 (npm), 5 (projects)
                      </span>

                      <span className="text-gh-accent font-bold">Shell</span>
                      <span className="text-gh-text">zsh 5.8.1</span>

                      <span className="text-gh-accent font-bold">Status</span>
                      <span className="text-gh-text flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gh-accent animate-pulse" />
                        Building software that matters.
                      </span>
                    </div>

                    <div className="mt-4 flex gap-1">
                      <div className="w-4 h-4 bg-gh-bg" />
                      <div className="w-4 h-4 bg-red-500" />
                      <div className="w-4 h-4 bg-green-500" />
                      <div className="w-4 h-4 bg-yellow-500" />
                      <div className="w-4 h-4 bg-gh-blue" />
                      <div className="w-4 h-4 bg-purple-500" />
                      <div className="w-4 h-4 bg-cyan-500" />
                      <div className="w-4 h-4 bg-gh-text" />
                    </div>
                  </div>
                </motion.div>
            }
            </div>
          }

          {/* Active Prompt */}
          {step >= 3 &&
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            className="flex items-center gap-2 text-gh-text mt-4">
            
              <span className="text-gh-accent">kzyarou@macbook-pro</span>
              <span className="text-gh-blue">~</span>
              <span className="text-gh-muted">$</span>
              <span className="w-2 h-4 bg-gh-muted animate-blink" />
            </motion.div>
          }
        </div>
      </div>
    </motion.section>);

}