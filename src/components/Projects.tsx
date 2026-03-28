import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2Icon, GitBranchIcon, GitCommitIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  }
};
// Generate fake activity graph data
const generateActivity = () =>
Array.from({
  length: 28
}).map(() => Math.random() > 0.6);
export function Projects() {
  return (
    <motion.section
      className="py-12 relative z-10 border-t border-gh-border/50"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.1
      }}
      variants={containerVariants}>
      
      <div className="flex items-center gap-2 mb-6 text-sm font-mono text-gh-muted uppercase tracking-wider">
        <FolderGit2Icon className="w-4 h-4 text-gh-accent" />
        <span>~/projects/repositories</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => {
          const activity = generateActivity();
          const progress =
          project.status === 'Production Ready' ||
          project.status === 'Production' ||
          project.status === 'Stable' ?
          100 :
          65;
          return (
            <Link
              to={`/project/${project.slug}`}
              key={project.slug}
              className="block group h-full">
              
              <motion.div
                className="relative flex flex-col h-full bg-gh-surface border border-gh-border rounded-lg transition-all duration-300 overflow-hidden shadow-lg shadow-black/10"
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  borderColor: '#58a6ff',
                  boxShadow: '0 10px 30px -10px rgba(88, 166, 255, 0.15)'
                }}>
                
                {/* Terminal Chrome Header */}
                <div className="bg-gh-bg border-b border-gh-border px-3 py-2 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gh-border group-hover:bg-red-500/80 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-gh-border group-hover:bg-yellow-500/80 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-gh-border group-hover:bg-green-500/80 transition-colors" />
                  </div>
                  <div className="text-[10px] font-mono text-gh-muted flex items-center gap-1">
                    {project.slug}.git
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow relative z-10">
                  {/* Title & Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-gh-blue font-mono font-bold text-lg">
                      <span className="group-hover:underline decoration-gh-blue/50 underline-offset-4">
                        {project.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono bg-gh-bg px-2 py-1 rounded border border-gh-border">
                      <span
                        className={`w-2 h-2 rounded-full ${project.statusColor.replace('text-', 'bg-')} animate-pulse`} />
                      
                      <span className="text-gh-text">{project.status}</span>
                    </div>
                  </div>

                  {/* Git Metadata */}
                  <div className="flex items-center gap-4 text-[10px] font-mono text-gh-muted mb-4">
                    <span className="flex items-center gap-1">
                      <GitBranchIcon className="w-3 h-3" /> main
                    </span>
                    <span className="flex items-center gap-1">
                      <GitCommitIcon className="w-3 h-3" />{' '}
                      {Math.random().toString(16).slice(2, 9)}
                    </span>
                  </div>

                  <p className="text-gh-muted text-sm mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Activity Graph & Tech */}
                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech) =>
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-gh-text bg-gh-bg border border-gh-border px-2 py-0.5 rounded">
                          
                            {tech}
                          </span>
                        )}
                      </div>

                      {/* Mini Activity Graph */}
                      <div className="flex gap-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
                        {activity.map((isActive, i) =>
                        <div
                          key={i}
                          className={`w-1.5 h-3 rounded-sm ${isActive ? 'bg-gh-accent' : 'bg-gh-bg border border-gh-border/50'}`} />

                        )}
                      </div>
                    </div>

                    {/* Completion Progress */}
                    <div className="w-full h-1 bg-gh-bg rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gh-blue relative"
                        initial={{
                          width: 0
                        }}
                        whileInView={{
                          width: `${progress}%`
                        }}
                        viewport={{
                          once: true
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.2
                        }}>
                        
                        <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Hover Scanline */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              </motion.div>
            </Link>);

        })}
      </div>
    </motion.section>);

}