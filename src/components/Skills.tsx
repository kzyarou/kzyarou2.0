import React, { useEffect, useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalIcon, Loader2Icon } from 'lucide-react';
interface SkillCategory {
  name: string;
  items: {
    name: string;
    version: string;
    proficiency: number;
  }[];
}
const SKILL_CATEGORIES: SkillCategory[] = [
{
  name: 'Languages',
  items: [
  {
    name: 'TypeScript',
    version: 'v5.3.3',
    proficiency: 95
  },
  {
    name: 'JavaScript',
    version: 'ES2023',
    proficiency: 98
  },
  {
    name: 'Python',
    version: 'v3.12.1',
    proficiency: 85
  },
  {
    name: 'HTML/CSS',
    version: 'HTML5',
    proficiency: 90
  }]

},
{
  name: 'Frontend',
  items: [
  {
    name: 'React',
    version: 'v18.2.0',
    proficiency: 95
  },
  {
    name: 'React Native',
    version: 'v0.73.0',
    proficiency: 88
  },
  {
    name: 'TailwindCSS',
    version: 'v3.4.1',
    proficiency: 92
  },
  {
    name: 'Framer Motion',
    version: 'v11.0.3',
    proficiency: 85
  }]

},
{
  name: 'Backend & Data',
  items: [
  {
    name: 'Firebase',
    version: 'v10.8.0',
    proficiency: 90
  },
  {
    name: 'Firestore',
    version: 'NoSQL',
    proficiency: 88
  },
  {
    name: 'Node.js',
    version: 'v20.11.0',
    proficiency: 85
  },
  {
    name: 'REST APIs',
    version: 'HTTP/2',
    proficiency: 95
  }]

}];

export function Skills() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
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
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20
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
  return (
    <motion.section
      className="py-10 relative z-10 border-t border-gh-border/50"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2
      }}>
      
      <div className="bg-gh-surface border border-gh-border rounded-lg overflow-hidden shadow-lg shadow-black/10">
        {/* Terminal Chrome */}
        <div className="bg-gh-bg border-b border-gh-border px-4 py-2 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gh-border" />
            <div className="w-3 h-3 rounded-full bg-gh-border" />
            <div className="w-3 h-3 rounded-full bg-gh-border" />
          </div>
          <div className="text-xs font-mono text-gh-muted flex items-center gap-2">
            <TerminalIcon className="w-3 h-3" />
            dpkg --list | grep skills
          </div>
          <div className="w-12" />
        </div>

        <div className="p-4 sm:p-6 font-mono text-sm">
          <AnimatePresence mode="wait">
            {loading ?
            <motion.div
              key="loading"
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              className="flex flex-col items-center justify-center py-12 text-gh-muted space-y-4">
              
                <Loader2Icon className="w-6 h-6 animate-spin text-gh-accent" />
                <div className="space-y-1 text-center text-xs">
                  <div>Reading package lists... Done</div>
                  <div>Building dependency tree... Done</div>
                  <div>Reading state information... Done</div>
                </div>
              </motion.div> :

            <motion.div
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8">
              
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-[2fr_1fr_2fr] gap-4 text-xs text-gh-muted uppercase tracking-wider border-b border-gh-border/50 pb-2">
                  <div>Name</div>
                  <div>Version</div>
                  <div>Proficiency</div>
                </div>

                {SKILL_CATEGORIES.map((category) =>
              <div key={category.name} className="space-y-3">
                    <div className="text-xs text-gh-accent font-bold uppercase tracking-wider flex items-center gap-2">
                      <span className="text-gh-border">#</span> {category.name}
                    </div>

                    <div className="space-y-2">
                      {category.items.map((skill) =>
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_2fr] gap-2 sm:gap-4 items-center group hover:bg-gh-bg/50 p-2 rounded transition-colors">
                    
                          <div className="flex items-center gap-2">
                            <span className="text-gh-accent text-xs">ii</span>
                            <span className="text-gh-text font-bold">
                              {skill.name}
                            </span>
                          </div>

                          <div className="text-gh-muted text-xs">
                            {skill.version}
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-gh-bg rounded overflow-hidden border border-gh-border/50">
                              <motion.div
                          className="h-full bg-gh-blue relative"
                          initial={{
                            width: 0
                          }}
                          animate={{
                            width: `${skill.proficiency}%`
                          }}
                          transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: 'easeOut'
                          }}>
                          
                                <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]" />
                              </motion.div>
                            </div>
                            <span className="text-xs text-gh-muted w-8 text-right">
                              {skill.proficiency}%
                            </span>
                          </div>
                        </motion.div>
                  )}
                    </div>
                  </div>
              )}

                <div className="pt-4 flex items-center gap-2 text-gh-text">
                  <span className="text-gh-accent">kzyarou@dev</span>
                  <span className="text-gh-blue">~</span>
                  <span className="text-gh-muted">$</span>
                  <span className="w-2 h-4 bg-gh-muted animate-blink" />
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </motion.section>);

}