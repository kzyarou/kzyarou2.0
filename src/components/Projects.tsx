import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { projects, Project } from '../data/projects';
function ProjectCard({ p, index }: {p: Project;index: number;}) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({
    x: 50,
    y: 50,
    on: false
  });
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSpot({
      x: (e.clientX - r.left) / r.width * 100,
      y: (e.clientY - r.top) / r.height * 100,
      on: true
    });
  };
  return (
    <Link
      to={`/projects/${p.slug}`}
      className="group relative block h-full w-[88vw] md:w-[72vw] lg:w-[58vw] xl:w-[52vw] shrink-0 mr-6 md:mr-8">
      
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() =>
        setSpot((s) => ({
          ...s,
          on: false
        }))
        }
        className="h-full bg-graphite border border-hairline p-5 md:p-8 lg:p-10 xl:p-14 flex flex-col relative overflow-hidden transition-colors duration-500 group-hover:border-ember/60">
        
        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, rgba(255,59,47,0.12), transparent 40%)`
          }}
          aria-hidden />
        

        {/* Ghost numeral */}
        <div
          className="absolute -top-8 -right-4 md:-top-16 md:-right-8 font-display text-[36vw] md:text-[18vw] lg:text-[14vw] leading-[0.8] select-none pointer-events-none"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(242,239,232,0.04)'
          }}>
          
          {p.num}
        </div>
        <div className="absolute -top-8 -right-4 md:-top-16 md:-right-8 font-display text-[36vw] md:text-[18vw] lg:text-[14vw] leading-[0.8] select-none pointer-events-none text-ember/10 italic transition-opacity duration-500 opacity-0 group-hover:opacity-100">
          {p.num}
        </div>

        {/* Top-left: view project indicator */}
        <div className="absolute top-4 left-4 md:top-6 md:left-8 lg:top-10 lg:left-12 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-ember">
            View project <ArrowUpRightIcon className="w-3 h-3" />
          </div>
        </div>

        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 min-h-0 mt-4 overflow-hidden">
          <div className="lg:col-span-5 flex flex-col min-h-0 overflow-hidden">
            <div className="font-mono text-xs text-ember tracking-[0.3em] mb-2 lg:mb-4 shrink-0">
              PROJECT · {p.num}
            </div>
            <h3 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.9] text-bone mb-3 lg:mb-6 group-hover:text-ember-glow transition-colors duration-500 shrink-0">
              {p.name}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3 lg:mb-6 shrink-0">
              <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 border border-edge text-muted">
                {p.category}
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 bg-ember text-obsidian">
                {p.status}
              </span>
              {p.version &&
              <span className="font-mono text-[10px] tracking-widest px-3 py-1 text-muted">
                  {p.version}
                </span>
              }
            </div>
            <p className="text-muted leading-relaxed text-sm font-light max-w-md line-clamp-3 lg:line-clamp-5 shrink-0">
              {p.description}
            </p>
            <div className="mt-auto pt-4 lg:pt-6 shrink-0">
              <div className="font-mono text-[10px] tracking-widest uppercase text-muted/60 mb-2">
                Architecture
              </div>
              <div className="font-mono text-sm text-ember">
                {p.architecture}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-6 min-h-0 overflow-hidden">
            <div className="min-h-0 overflow-hidden flex-1">
              <div className="font-mono text-[10px] tracking-widest uppercase text-muted/60 mb-2 lg:mb-3 shrink-0">
                Key Features
              </div>
              <ul className="space-y-1.5 lg:space-y-2 overflow-hidden">
                {p.features.slice(0, 4).map((f, i) =>
                <li
                  key={i}
                  className="flex gap-3 text-bone text-sm lg:text-base xl:text-lg font-display leading-snug">
                  
                    <span className="font-mono text-ember text-xs mt-1.5 lg:mt-2 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="line-clamp-2">{f}</span>
                  </li>
                )}
              </ul>
            </div>
            <div className="shrink-0">
              <div className="font-mono text-[10px] tracking-widest uppercase text-muted/60 mb-2 lg:mb-3">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-1.5 lg:gap-2">
                {p.tech.map((t) =>
                <span
                  key={t}
                  className="font-mono text-[11px] lg:text-xs px-2 lg:px-3 py-1 lg:py-1.5 bg-panel border border-hairline text-bone">
                  
                    {t}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>);

}
export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const x = useMotionValue(0);
  const progressWidth = useMotionValue('0%');
  // Measure the horizontal overflow distance
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const trackWidth = track.scrollWidth;
      const vw = window.innerWidth;
      const d = Math.max(0, trackWidth - vw);
      distanceRef.current = d;
      // Section height = viewport height (for the pin) + horizontal distance
      setSectionHeight(window.innerHeight + d);
    };
    // Multiple measurement passes to handle fonts/layout settling
    measure();
    requestAnimationFrame(measure);
    const t1 = setTimeout(measure, 300);
    const t2 = setTimeout(measure, 800);
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  // Manual scroll-driven pinning using position:fixed via JS
  // This avoids all CSS sticky issues with overflow ancestors
  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const vh = window.innerHeight;
        const distance = distanceRef.current;
        if (sectionTop > 0) {
          // Before section: panel flows normally at top of section
          panel.style.position = 'absolute';
          panel.style.top = '0px';
          panel.style.bottom = 'auto';
          x.set(0);
          progressWidth.set('0%');
        } else if (sectionBottom <= vh) {
          // After section: panel sits at bottom of section
          panel.style.position = 'absolute';
          panel.style.top = 'auto';
          panel.style.bottom = '0px';
          x.set(-distance);
          progressWidth.set('100%');
        } else {
          // In section: panel is fixed to viewport
          panel.style.position = 'fixed';
          panel.style.top = '0px';
          panel.style.bottom = 'auto';
          // Calculate progress: how far we've scrolled into the section
          const scrolled = -sectionTop; // pixels scrolled past section top
          const maxScroll = distance; // total scrollable distance
          const progress = Math.min(1, Math.max(0, scrolled / maxScroll));
          x.set(-progress * distance);
          progressWidth.set(`${progress * 100}%`);
        }
      });
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll(); // Initial call
    return () => window.removeEventListener('scroll', onScroll);
  }, [x, progressWidth, sectionHeight]);
  return (
    <section id="work" className="relative bg-obsidian">
      {/* JS-pinned horizontal scroll — all breakpoints */}
      <div
        ref={sectionRef}
        className="relative"
        style={{
          height: sectionHeight > 0 ? `${sectionHeight}px` : '300vh'
        }}>
        
        <div
          ref={panelRef}
          className="left-0 w-full h-screen overflow-hidden flex flex-col"
          style={{
            position: 'absolute',
            top: 0
          }}>
          
          <div className="max-w-[1600px] mx-auto px-4 md:px-12 pt-16 md:pt-20 lg:pt-24 pb-2 md:pb-4 w-full shrink-0">
            <SectionHeader
              number="02"
              label="Selected Work"
              compact
              title={
              <>
                  Five production apps,{' '}
                  <span className="italic text-ember">built end-to-end.</span>
                </>
              } />
            
          </div>
          <div className="flex-1 flex items-center overflow-hidden min-h-0">
            <motion.div
              ref={trackRef}
              style={{
                x
              }}
              className="flex items-stretch h-full pl-4 md:pl-12 will-change-transform">
              
              {projects.map((p, i) =>
              <ProjectCard key={p.num} p={p} index={i} />
              )}
              <div className="shrink-0 w-8 md:w-24" aria-hidden />
            </motion.div>
          </div>
          <div className="relative pb-4 md:pb-6 px-4 md:px-12 shrink-0">
            <div className="flex items-center justify-between mb-3 font-mono text-[10px] tracking-widest uppercase text-muted/60">
              <span>Scroll to navigate · Click a card to explore</span>
              <span>{projects.length} projects</span>
            </div>
            <div className="h-px bg-hairline w-full relative overflow-hidden">
              <motion.div
                style={{
                  width: progressWidth
                }}
                className="absolute inset-y-0 left-0 bg-ember" />
              
            </div>
          </div>
        </div>
      </div>
    </section>);

}