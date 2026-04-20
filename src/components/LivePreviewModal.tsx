import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  ArrowUpRightIcon,
  RefreshCwIcon,
  LoaderIcon } from
'lucide-react';
interface Props {
  url: string;
  name: string;
  open: boolean;
  onClose: () => void;
}
export function LivePreviewModal({ url, name, open, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
  useEffect(() => {
    if (open) setLoading(true);
  }, [open, key]);
  const reload = () => setKey((k) => k + 1);
  return (
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
        className="fixed inset-0 z-[90] bg-abyss/95 backdrop-blur-md flex flex-col">
        
          {/* Top bar */}
          <motion.div
          initial={{
            y: -40,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          exit={{
            y: -40,
            opacity: 0
          }}
          transition={{
            duration: 0.4,
            ease: [0.65, 0, 0.35, 1]
          }}
          className="shrink-0 border-b border-forest bg-deep">
          
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-moss" />
                <span className="w-3 h-3 rounded-full bg-moss" />
                <span className="w-3 h-3 rounded-full bg-amber" />
              </div>
              <div className="flex-1 min-w-0 flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest uppercase text-amber shrink-0">
                  Live preview
                </span>
                <span className="hidden sm:inline font-mono text-xs text-cream-dim truncate">
                  {url}
                </span>
              </div>
              <button
              onClick={reload}
              aria-label="Reload preview"
              className="p-2 text-cream-dim hover:text-amber transition-colors">
              
                <RefreshCwIcon className="w-4 h-4" />
              </button>
              <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-cream-dim hover:text-amber transition-colors">
              
                Open in new tab
                <ArrowUpRightIcon className="w-3 h-3" />
              </a>
              <button
              onClick={onClose}
              aria-label="Close preview"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-3 py-2 border border-moss text-cream hover:border-amber hover:text-amber transition-colors">
              
                <XIcon className="w-3 h-3" />
                Close
              </button>
            </div>
          </motion.div>

          {/* Iframe container */}
          <motion.div
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          exit={{
            y: 20,
            opacity: 0
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.65, 0, 0.35, 1]
          }}
          className="flex-1 relative bg-cream overflow-hidden">
          
            {loading &&
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-abyss text-cream z-10">
                <motion.div
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'linear'
              }}>
              
                  <LoaderIcon className="w-6 h-6 text-amber" />
                </motion.div>
                <p className="mt-4 font-mono text-[10px] tracking-widest uppercase text-cream-dim">
                  Loading {name}…
                </p>
              </div>
          }
            <iframe
            key={key}
            src={url}
            title={`${name} live preview`}
            onLoad={() => setLoading(false)}
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
            allow="clipboard-read; clipboard-write" />
          
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}