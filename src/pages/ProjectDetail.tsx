import React, { Children } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  CircleDotIcon,
  CpuIcon,
  CheckCircle2Icon,
  LayersIcon } from
'lucide-react';
import { PROJECTS } from '../data/projects';
import { Footer } from '../components/Footer';
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};
const itemVariants = {
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
      damping: 25
    }
  }
};
export function ProjectDetail() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    return <Navigate to="/" replace />;
  }
  return (
    <motion.main
      className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 pt-24 pb-12 min-h-screen flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit">
      
      <motion.div variants={itemVariants}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gh-muted hover:text-gh-text font-mono text-sm mb-8 transition-colors w-fit group">
          
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          cd ..
        </Link>
      </motion.div>

      <motion.div
        className="bg-gh-surface border border-gh-border rounded-lg p-6 sm:p-8 mb-8 shadow-xl shadow-black/20"
        variants={itemVariants}>
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gh-text font-mono mb-2 tracking-tight">
              {project.name}
            </h1>
            <div className="text-gh-blue font-mono text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gh-blue/50" />
              {project.category}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono bg-gh-bg px-3 py-1.5 rounded-full border border-gh-border shadow-sm">
              <CircleDotIcon className={`w-3 h-3 ${project.statusColor}`} />
              <span className="text-gh-text">{project.status}</span>
            </div>
            {project.version &&
            <div className="text-xs font-mono bg-gh-bg px-3 py-1.5 rounded-full border border-gh-border text-gh-muted shadow-sm">
                {project.version}
              </div>
            }
          </div>
        </div>

        <p className="text-gh-text leading-relaxed mb-10 text-lg sm:text-xl font-medium text-gh-muted">
          {project.longDescription}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div variants={itemVariants}>
            <h3 className="flex items-center gap-2 text-gh-text font-mono font-semibold mb-5 border-b border-gh-border pb-3">
              <CheckCircle2Icon className="w-4 h-4 text-gh-accent" />
              Key Features
            </h3>
            <ul className="space-y-4">
              {project.features.map((feature, i) =>
              <li
                key={i}
                className="flex items-start gap-3 text-gh-muted text-sm sm:text-base">
                
                  <span className="text-gh-accent mt-0.5 font-mono">{'>'}</span>
                  <span>{feature}</span>
                </li>
              )}
            </ul>
          </motion.div>

          <div className="space-y-10">
            <motion.div variants={itemVariants}>
              <h3 className="flex items-center gap-2 text-gh-text font-mono font-semibold mb-5 border-b border-gh-border pb-3">
                <CpuIcon className="w-4 h-4 text-gh-accent" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {project.tech.map((tech) =>
                <span
                  key={tech}
                  className="text-xs sm:text-sm font-mono text-gh-text bg-gh-bg border border-gh-border px-3.5 py-1.5 rounded-full shadow-sm">
                  
                    {tech}
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="flex items-center gap-2 text-gh-text font-mono font-semibold mb-5 border-b border-gh-border pb-3">
                <LayersIcon className="w-4 h-4 text-gh-accent" />
                Architecture
              </h3>
              <p className="text-gh-muted text-sm sm:text-base font-mono bg-gh-bg p-4 rounded-md border border-gh-border shadow-inner">
                {project.architecture}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div className="mt-auto" variants={itemVariants}>
        <Footer />
      </motion.div>
    </motion.main>);

}