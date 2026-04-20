import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
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
        <ul
          className={`flex items-center gap-4 md:gap-7 ${scrolled ? '' : 'ml-auto'}`}>
          
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
      </motion.nav>
    </motion.header>);

}