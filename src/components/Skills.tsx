import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
const groups: {
  label: string;
  items: string[];
}[] = [
{
  label: 'Languages',
  items: ['JavaScript', 'TypeScript', 'Java', 'Go', 'PHP', 'C#', 'Python']
},
{
  label: 'Web & Mobile',
  items: [
  'React',
  'Next.js',
  'React Native',
  'Node.js',
  'Spring Boot',
  'Django',
  'Tailwind CSS']

},
{
  label: 'Cloud & Infra',
  items: [
  'AWS',
  'Google Cloud',
  'Firebase',
  'Docker',
  'Kubernetes',
  'Capacitor']

},
{
  label: 'ML & Data',
  items: ['TensorFlow', 'PyTorch', 'MediaPipe', 'Hugging Face']
}];

export function Skills() {
  return (
    <section id="skills" className="relative bg-obsidian py-32 md:py-48">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <SectionHeader
          number="04"
          label="Toolkit"
          title={
          <>
              Fluent across the stack —{' '}
              <span className="italic text-ember">and still learning.</span>
            </>
          } />
        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Press-release style certification */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30
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
              duration: 0.8
            }}
            className="lg:col-span-4 lg:sticky lg:top-32">
            
            <div className="relative bg-graphite border border-hairline p-8 md:p-10">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-ember mb-6 flex items-center gap-2">
                <span className="w-6 h-px bg-ember" />
                FOR IMMEDIATE RELEASE
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-muted mb-3">
                freeCodeCamp — 2024
              </div>
              <h3 className="font-display text-4xl md:text-5xl text-bone leading-[0.95] mb-4">
                Certified in{' '}
                <span className="italic text-ember">Responsive Web Design</span>
                .
              </h3>
              <p className="text-muted font-light leading-relaxed text-sm mb-8 border-l border-ember/60 pl-4">
                300+ hours of coursework covering semantic HTML, modern CSS,
                accessibility, and responsive layout fundamentals.
              </p>
              <a
                href="https://www.freecodecamp.org/certification/kzyarou/responsive-web-design"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-ember hover:text-ember-glow transition-colors">
                
                View credential
                <ArrowUpRightIcon className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Typographic groups */}
          <div className="lg:col-span-8 space-y-14">
            {groups.map((group, i) =>
            <motion.div
              key={group.label}
              initial={{
                opacity: 0,
                y: 30
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
                duration: 0.7,
                delay: i * 0.1
              }}
              className="border-b border-hairline pb-10 last:border-b-0">
              
                <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
                  <h4 className="font-display text-4xl md:text-6xl text-bone">
                    {group.label}
                  </h4>
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, '0')} / {groups.length}
                  </span>
                </div>
                <p className="font-display text-2xl md:text-4xl leading-[1.25] text-muted">
                  {group.items.map((item, idx) =>
                <motion.span
                  key={item}
                  initial={{
                    opacity: 0,
                    y: 8
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1 + idx * 0.05
                  }}
                  className="inline-block mr-3 hover:text-ember hover:italic transition-all duration-300 cursor-default">
                  
                      {item}
                      {idx < group.items.length - 1 &&
                  <span className="text-ember/40"> ·</span>
                  }
                    </motion.span>
                )}
                </p>
              </motion.div>
            )}
            <p className="font-mono text-xs text-muted/60 tracking-wider">
              — and always expanding —
            </p>
          </div>
        </div>
      </div>
    </section>);

}