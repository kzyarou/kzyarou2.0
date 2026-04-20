import React from 'react';
import { motion } from 'framer-motion';
import { CodeIcon, GraduationCapIcon, LayersIcon } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
const services = [
{
  icon: CodeIcon,
  title: 'Freelance Development',
  description:
  'Commissioned builds — landing pages, web apps, mobile-first PWAs. Delivered with modern stacks and production-grade polish.',
  tags: ['Commissions', 'Web · Mobile', 'PWA']
},
{
  icon: GraduationCapIcon,
  title: 'Programming Tutoring',
  description:
  'One-on-one and group sessions for learners getting started — from first-principles of code to shipping their first real project.',
  tags: ['Beginner-friendly', '1:1 · Group', 'Projects']
},
{
  icon: LayersIcon,
  title: 'Full-Stack Product Builds',
  description:
  'End-to-end product work: architecture, UI, backend, auth, analytics and deployment. I ship things that are actually used.',
  tags: ['React', 'Firebase', 'Capacitor']
}];

export function Services() {
  return (
    <section id="services" className="relative bg-graphite py-32 md:py-48">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <SectionHeader
          number="05"
          label="Services"
          title={
          <>
              What I make, teach, and{' '}
              <span className="italic text-ember">take on.</span>
            </>
          } />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{
                  opacity: 0,
                  y: 40
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
                  duration: 0.8,
                  delay: i * 0.12
                }}
                className="group relative bg-obsidian border border-hairline p-8 md:p-12 flex flex-col h-full min-h-[520px] hover:border-ember/60 transition-colors duration-500 overflow-hidden">
                
                {/* Animated corner mark */}
                <div className="absolute top-0 right-0 w-10 h-10">
                  <motion.div
                    initial={{
                      scaleX: 0
                    }}
                    whileInView={{
                      scaleX: 1
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.12 + 0.3
                    }}
                    className="absolute top-0 right-0 w-10 h-px bg-ember origin-right" />
                  
                  <motion.div
                    initial={{
                      scaleY: 0
                    }}
                    whileInView={{
                      scaleY: 1
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.12 + 0.4
                    }}
                    className="absolute top-0 right-0 h-10 w-px bg-ember origin-top" />
                  
                </div>

                <div className="flex items-baseline justify-between mb-12">
                  <span className="font-display text-2xl text-ember">
                    0{i + 1}
                  </span>
                  <Icon className="w-5 h-5 text-muted group-hover:text-ember transition-colors" />
                </div>

                <div className="font-mono text-[10px] tracking-widest uppercase text-muted mb-3">
                  Offering
                </div>
                <h3 className="font-display text-5xl md:text-6xl text-bone mb-6 leading-[0.95] group-hover:italic group-hover:text-ember-glow transition-all duration-500">
                  {s.title}
                </h3>
                <p className="text-muted leading-relaxed font-light flex-1">
                  {s.description}
                </p>
                <div className="mt-10 pt-6 border-t border-hairline flex flex-wrap gap-4">
                  {s.tags.map((t) =>
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-wider text-muted">
                    
                      {t}
                    </span>
                  )}
                </div>
              </motion.div>);

          })}
        </div>
      </div>
    </section>);

}