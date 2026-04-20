import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);
  const links = [
  {
    label: 'Work',
    href: '#work'
  },
  {
    label: 'About',
    href: '#about'
  },
  {
    label: 'Skills',
    href: '#skills'
  },
  {
    label: 'Services',
    href: '#services'
  },
  {
    label: 'Contact',
    href: '#contact'
  }];

  return (
    <>
      <motion.header
        initial={{
          y: -40,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.8,
          delay: 2.3,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
        
        <motion.nav
          layout
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
          }}
          className={
          scrolled ?
          'flex items-center gap-2 md:gap-6 px-4 md:px-6 py-3 bg-graphite/70 backdrop-blur-xl border border-hairline/80 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]' :
          'flex items-center gap-6 md:gap-10 w-full max-w-[1600px] px-4 md:px-8 py-3'
          }>
          
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-xs tracking-tight text-bone hover:text-ember transition-colors shrink-0">
            
            <motion.span
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0.6, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-1.5 h-1.5 rounded-full bg-ember inline-block"
              style={{
                boxShadow: '0 0 8px rgba(255,59,47,0.8)'
              }} />
            
            <span>kzyarou</span>
          </Link>

          {/* Desktop/tablet links */}
          <ul
            className={`hidden md:flex items-center gap-4 md:gap-7 ${scrolled ? '' : 'ml-auto'}`}>
            
            {links.map((l) =>
            <li key={l.label}>
                <a
                href={l.href}
                className="group relative font-mono text-[11px] md:text-xs text-muted hover:text-bone transition-colors tracking-wide">
                
                  <span>{l.label}</span>
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-ember origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </a>
              </li>
            )}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="md:hidden ml-auto p-1.5 text-bone hover:text-ember transition-colors">
            
            <MenuIcon className="w-5 h-5" />
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.3
          }}
          className="fixed inset-0 z-[60] md:hidden bg-obsidian/98 backdrop-blur-xl flex flex-col">
          
            <div className="flex items-center justify-between px-6 pt-6">
              <div className="flex items-center gap-2 font-mono text-xs tracking-tight text-bone">
                <span
                className="w-1.5 h-1.5 rounded-full bg-ember inline-block"
                style={{
                  boxShadow: '0 0 8px rgba(255,59,47,0.8)'
                }} />
              
                <span>kzyarou</span>
              </div>
              <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-1.5 text-bone hover:text-ember transition-colors">
              
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8">
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-ember mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-ember" />
                Navigate
              </div>
              <ul className="space-y-5">
                {links.map((l, i) =>
              <motion.li
                key={l.label}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1]
                }}>
                
                    <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 font-display text-5xl sm:text-6xl text-bone hover:text-ember transition-colors">
                  
                      <span className="font-mono text-xs text-muted group-hover:text-ember transition-colors">
                        0{i + 1}
                      </span>
                      <span className="group-hover:italic transition-all">
                        {l.label}
                      </span>
                    </a>
                  </motion.li>
              )}
              </ul>
            </nav>

            <div className="px-8 pb-10 font-mono text-[10px] tracking-[0.3em] uppercase text-muted">
              Portfolio — MMXXVI
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}