import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
interface Props {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'a' | 'div';
  href?: string;
  onClick?: () => void;
  strength?: number;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}
export function MagneticButton({
  children,
  className = '',
  as = 'button',
  href,
  onClick,
  strength = 0.35,
  target,
  rel,
  type,
  disabled
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({
    x: 0,
    y: 0
  });
  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({
      x: x * strength,
      y: y * strength
    });
  };
  const reset = () =>
  setOffset({
    x: 0,
    y: 0
  });
  const MotionTag: any =
  as === 'a' ? motion.a : as === 'div' ? motion.div : motion.button;
  return (
    <MotionTag
      ref={ref as any}
      href={href}
      target={target}
      rel={rel}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{
        x: offset.x,
        y: offset.y
      }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 18,
        mass: 0.5
      }}
      className={className}>
      
      <motion.span
        animate={{
          x: offset.x * 0.4,
          y: offset.y * 0.4
        }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 18
        }}
        className="inline-flex items-center gap-4">
        
        {children}
      </motion.span>
    </MotionTag>);

}