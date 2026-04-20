import React from 'react';
interface Props {
  items: string[];
  speed?: 'slow' | 'normal';
  separator?: string;
  className?: string;
  itemClassName?: string;
  reverse?: boolean;
}
/** Infinite horizontal marquee. Duplicates content for seamless loop. */
export function Marquee({
  items,
  speed = 'normal',
  separator = '·',
  className = '',
  itemClassName = '',
  reverse = false
}: Props) {
  const animClass =
  speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee';
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${animClass}`}
        style={{
          animationDirection: reverse ? 'reverse' : 'normal'
        }}>
        
        {[0, 1].map((dup) =>
        <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
            {items.map((item, i) =>
          <span
            key={`${dup}-${i}`}
            className={`flex items-center shrink-0 ${itemClassName}`}>
            
                <span className="px-8">{item}</span>
                <span className="text-ember/60 select-none">{separator}</span>
              </span>
          )}
          </div>
        )}
      </div>
    </div>);

}