import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRightIcon,
  GithubIcon,
  InstagramIcon,
  MailIcon } from
'lucide-react';
import { SectionHeader } from './SectionHeader';
import { MagneticButton } from './MagneticButton';
function TikTokIcon({ className }: {className?: string;}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden>
      
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>);

}
export function Contact() {
  const socials = [
  {
    icon: GithubIcon,
    label: 'GitHub',
    href: 'https://github.com/kzyarou',
    handle: '@kzyarou'
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    href: 'https://www.instagram.com/kzyr_u',
    handle: '@kzyr_u'
  },
  {
    icon: TikTokIcon,
    label: 'TikTok',
    href: 'https://tiktok.com/@kzyarou',
    handle: '@kzyarou'
  }];

  return (
    <section
      id="contact"
      className="relative bg-obsidian py-32 md:py-48 overflow-hidden vignette">
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative">
        <SectionHeader
          number="06"
          label="Contact"
          title={<span className="sr-only">Contact</span>} />
        

        <h2 className="font-display font-normal text-[16vw] md:text-[11vw] leading-[0.85] tracking-tight text-bone -mt-20">
          <motion.span
            initial={{
              opacity: 0,
              y: 60
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="block">
            
            Let's build
          </motion.span>
          <motion.span
            initial={{
              opacity: 0,
              y: 60
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="italic text-ember relative inline-block">
            
            something.
            <motion.span
              initial={{
                scaleX: 0
              }}
              whileInView={{
                scaleX: 1
              }}
              viewport={{
                once: true,
                margin: '-100px'
              }}
              transition={{
                duration: 1.2,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute left-0 -bottom-2 md:-bottom-4 h-[3px] md:h-[5px] w-full bg-ember origin-left" />
            
          </motion.span>
        </h2>

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
            className="lg:col-span-7">
            
            <p className="font-display text-2xl md:text-3xl text-muted max-w-2xl leading-[1.3]">
              Currently available for freelance commissions and programming
              tutoring. If you have an idea worth shipping, or someone eager to
              learn — I'd love to hear about it.
            </p>
            <div className="mt-14">
              <MagneticButton
                as="a"
                href="#/contact"
                className="ember-glow inline-flex items-center gap-4 bg-ember text-obsidian px-10 py-6 font-mono text-sm tracking-[0.2em] uppercase hover:bg-ember-glow transition-colors">
                
                <MailIcon className="w-4 h-4" />
                hello@kzyarou.dev
                <ArrowUpRightIcon className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8,
              delay: 0.4
            }}
            className="lg:col-span-5">
            
            <div className="font-mono text-[10px] tracking-widest uppercase text-muted mb-6">
              — Elsewhere —
            </div>
            <ul className="divide-y divide-hairline border-y border-hairline">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label} className="group relative overflow-hidden">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-6 text-bone transition-colors relative">
                      
                      <motion.div
                        className="absolute inset-0 bg-ember origin-left"
                        initial={{
                          scaleX: 0
                        }}
                        whileHover={{
                          scaleX: 1
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.76, 0, 0.24, 1]
                        }} />
                      
                      <span className="relative flex items-center gap-4 group-hover:text-obsidian transition-colors duration-500">
                        <Icon className="w-5 h-5" />
                        <span className="font-display text-3xl md:text-4xl">
                          {s.label}
                        </span>
                        <span className="font-mono text-xs text-muted group-hover:text-obsidian/70 transition-colors hidden sm:inline">
                          {s.handle}
                        </span>
                      </span>
                      <ArrowUpRightIcon className="relative w-5 h-5 group-hover:text-obsidian group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500" />
                    </a>
                  </li>);

              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>);

}