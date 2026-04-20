import React, { useEffect, useState, useRef } from 'react';
const CHARS = '!<>-_\\/[]{}—=+*^?#________';
interface Props {
  text: string;
  className?: string;
  duration?: number;
  trigger?: 'mount' | 'view' | 'hover';
  as?: keyof JSX.IntrinsicElements;
}
/** Scrambles random chars then settles into the final text. */
export function ScrambleText({
  text,
  className = '',
  duration = 900,
  trigger = 'view',
  as: Tag = 'span'
}: Props) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const hasRun = useRef(false);
  const run = () => {
    if (hasRun.current && trigger !== 'hover') return;
    hasRun.current = true;
    const start = performance.now();
    const final = text;
    const len = final.length;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(t * len);
      let out = '';
      for (let i = 0; i < len; i++) {
        if (i < revealed || final[i] === ' ') out += final[i];else
        out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      if (t < 1) rafRef.current = requestAnimationFrame(step);else
      setDisplay(final);
    };
    rafRef.current = requestAnimationFrame(step);
  };
  useEffect(() => {
    if (trigger === 'mount') run();else
    if (trigger === 'view') {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              run();
              io.disconnect();
            }
          });
        },
        {
          threshold: 0.3
        }
      );
      io.observe(el);
      return () => io.disconnect();
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);
  return (
    <Tag
      ref={ref as any}
      className={className}
      onMouseEnter={trigger === 'hover' ? run : undefined}>
      
      {display}
    </Tag>);

}