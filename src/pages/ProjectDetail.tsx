import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowUpRightIcon, ArrowRightIcon } from 'lucide-react';
import { getProjectBySlug, projects } from '../data/projects';
export function ProjectDetail() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  if (!project) return <Navigate to="/" replace />;
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];
  return (
    <article className="bg-abyss text-cream min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs text-cream-dim hover:text-amber transition-colors tracking-widest uppercase mb-16">
            
            <ArrowLeftIcon className="w-4 h-4" />
            Back to work
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end relative">
            <div className="lg:col-span-8">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.6
                }}
                className="flex items-center gap-4 mb-6">
                
                <span className="font-mono text-xs text-amber tracking-[0.3em]">
                  PROJECT · {project.num}
                </span>
                <span className="w-16 h-px bg-moss" />
                <span className="font-mono text-xs text-cream-dim tracking-[0.3em] uppercase">
                  {project.category}
                </span>
              </motion.div>
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 30
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.1
                }}
                className="font-display font-normal text-[16vw] md:text-[12vw] leading-[0.85] tracking-tight text-bone">
                
                {project.name}
              </motion.h1>
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3
                }}
                className="mt-8 max-w-2xl font-serif italic text-2xl md:text-3xl text-amber-bright font-light leading-snug">
                
                {project.tagline}
              </motion.p>

              {project.liveUrl &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.45
                }}
                className="mt-10 flex flex-wrap items-center gap-5">
                
                  <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 bg-amber text-abyss px-7 py-4 font-mono text-xs md:text-sm tracking-widest uppercase hover:bg-amber-bright transition-colors">
                  
                    <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Visit live site
                  </a>
                </motion.div>
              }
            </div>
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                duration: 0.8,
                delay: 0.4
              }}
              className="lg:col-span-4 flex flex-wrap gap-2">
              
              <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 bg-moss/40 text-amber-bright">
                {project.status}
              </span>
              {project.version &&
              <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 border border-moss text-cream-dim">
                  {project.version}
                </span>
              }
              <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 border border-moss text-cream-dim">
                {project.year}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <section className="border-y border-forest bg-deep">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4">
          {[
          {
            l: 'Role',
            v: project.role
          },
          {
            l: 'Architecture',
            v: project.architecture
          },
          {
            l: 'Year',
            v: project.year
          },
          {
            l: 'Status',
            v: project.status
          }].
          map((item, i) =>
          <div
            key={i}
            className={`py-6 md:py-8 px-4 md:px-8 md:first:pl-0 border-forest
                ${i % 2 === 1 ? 'border-l md:border-l' : ''}
                ${i < 2 ? 'border-b md:border-b-0' : ''}
                ${i >= 2 ? 'md:border-l' : ''}
              `}>
            
              <div className="font-mono text-[10px] tracking-widest uppercase text-cream-dim/60 mb-2">
                {item.l}
              </div>
              <div className="font-serif text-base md:text-xl text-cream font-light break-words">
                {item.v}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs text-amber tracking-[0.3em]">
                  01
                </span>
                <span className="w-16 h-px bg-moss" />
              </div>
              <h2 className="font-serif font-light text-4xl md:text-5xl text-cream leading-tight">
                Overview
              </h2>
            </div>
          </div>
          <div className="lg:col-span-8">
            <p className="text-cream-dim text-xl md:text-2xl font-light leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32 bg-deep">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-amber tracking-[0.3em]">
              02
            </span>
            <span className="w-16 h-px bg-moss" />
            <span className="font-mono text-xs text-cream-dim tracking-[0.3em] uppercase">
              Key Features
            </span>
          </div>
          <div className="divide-y divide-forest border-y border-forest">
            {project.features.map((f, i) =>
            <motion.div
              key={i}
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
                duration: 0.5,
                delay: i * 0.05
              }}
              className="grid grid-cols-12 gap-4 py-6 md:py-8 items-center">
              
                <div className="col-span-2 md:col-span-1 font-mono text-xs text-amber">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="col-span-10 md:col-span-11 font-serif text-xl md:text-3xl text-cream font-light leading-tight">
                  {f}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-amber tracking-[0.3em]">
              03
            </span>
            <span className="w-16 h-px bg-moss" />
            <span className="font-mono text-xs text-cream-dim tracking-[0.3em] uppercase">
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((t) =>
            <span
              key={t}
              className="font-mono text-sm px-5 py-3 bg-forest/60 border border-moss/60 text-cream">
              
                {t}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="border-t border-forest bg-deep">
        <Link
          to={`/projects/${next.slug}`}
          className="group block py-16 md:py-24">
          
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
            <div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-cream-dim/60 mb-3">
                Next Project · {next.num}
              </div>
              <div className="font-serif text-5xl md:text-7xl font-light text-cream group-hover:text-amber-bright transition-colors">
                {next.name}
              </div>
            </div>
            <ArrowRightIcon className="w-8 h-8 md:w-12 md:h-12 text-amber group-hover:translate-x-2 transition-transform shrink-0" />
          </div>
        </Link>
      </section>
    </article>);

}