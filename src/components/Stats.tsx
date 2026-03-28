import React, { useEffect, useState, useRef, Children } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { ActivityIcon, ServerIcon, DatabaseIcon, CpuIcon } from 'lucide-react';
interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
  metric: string;
  color: string;
}
const STATS: StatItem[] = [
{
  value: 5,
  label: 'Projects Built',
  icon: ServerIcon,
  metric: 'deployments: OK',
  color: 'text-gh-accent'
},
{
  value: 10,
  suffix: '+',
  label: 'Technologies',
  icon: DatabaseIcon,
  metric: 'modules: LOADED',
  color: 'text-gh-blue'
},
{
  value: 4,
  label: 'Production Apps',
  icon: ActivityIcon,
  metric: 'status: ACTIVE',
  color: 'text-yellow-500'
},
{
  value: 1,
  label: 'ML Project',
  icon: CpuIcon,
  metric: 'tensors: READY',
  color: 'text-purple-500'
}];

function AnimatedNumber({
  value,
  suffix = '',
  inView




}: {value: number;suffix?: string;inView: boolean;}) {
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1
  });
  const displayValue = useTransform(springValue, (current) =>
  Math.round(current)
  );
  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);
  return (
    <span className="text-3xl sm:text-4xl font-bold font-mono text-gh-text tabular-nums flex items-center relative">
      <motion.span
        animate={{
          opacity: [1, 0.8, 1, 0.9, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}>
        
        {displayValue}
      </motion.span>
      {suffix}
    </span>);

}
export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3
  });
  const [liveReqs, setLiveReqs] = useState(142);
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveReqs((prev) => prev + Math.floor(Math.random() * 5 - 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };
  return (
    <motion.section
      ref={ref}
      className="py-10 relative z-10 border-t border-gh-border/50"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.3
      }}
      variants={containerVariants}>
      
      <div className="flex items-center gap-2 mb-6 text-sm font-mono text-gh-muted uppercase tracking-wider">
        <ActivityIcon className="w-4 h-4 text-gh-accent animate-pulse" />
        <span>~/system/metrics</span>
      </div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) =>
        <motion.div
          key={stat.label}
          className="flex flex-col bg-gh-surface border border-gh-border rounded-lg overflow-hidden relative group"
          variants={cardVariants}>
          
            {/* Widget Header */}
            <div className="bg-gh-bg border-b border-gh-border px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-gh-muted">
              <span className="flex items-center gap-1.5">
                <stat.icon className={`w-3 h-3 ${stat.color}`} />
                [MONITOR_{i + 1}]
              </span>
              <span className="animate-pulse text-gh-accent">●</span>
            </div>

            <div className="p-4 relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <AnimatedNumber
                value={stat.value}
                suffix={stat.suffix}
                inView={isInView} />
              
                <span className="text-xs font-mono text-gh-muted mt-1 block uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-gh-bg rounded-full overflow-hidden">
                  <motion.div
                  className="h-full bg-gh-border relative"
                  initial={{
                    width: 0
                  }}
                  animate={
                  isInView ?
                  {
                    width: '100%'
                  } :
                  {
                    width: 0
                  }
                  }
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    ease: 'easeOut'
                  }}>
                  
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 blur-[2px]" />
                  </motion.div>
                </div>

                {/* Secondary Metric */}
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-gh-muted">{stat.metric}</span>
                  <span className="text-gh-text">
                    {i === 0 ? `${liveReqs} req/s` : '100%'}
                  </span>
                </div>
              </div>
            </div>

            {/* Hover Scanline */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
          </motion.div>
        )}
      </motion.div>
    </motion.section>);

}