import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
const CODE_SNIPPETS = [
`interface User {
  id: string;
  email: string;
  role: 'producer' | 'consumer';
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
}`,
`const calculateTotal = (items: CartItem[]) => {
  return items.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);
};`,
`export function AppSidebar() {
  const { user } = useAuth();
  return (
    <aside className="w-64 border-r border-gh-border">
      <Nav items={menuItems} />
    </aside>
  );
}`,
`type HarvestStatus = 'available' | 'sold';
interface Harvest {
  id: string;
  title: string;
  price: number;
  status: HarvestStatus;
}`,
`@Injectable()
export class AnalyticsService {
  constructor(private db: Database) {}
  
  async trackEvent(name: string) {
    await this.db.insert('events', { name });
  }
}`,
`function usePresence(userId: string) {
  const [isOnline, setIsOnline] = useState(false);
  
  useEffect(() => {
    return subscribeToPresence(userId, setIsOnline);
  }, [userId]);
  
  return isOnline;
}`];

export function CodeBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-[0.04]">
      <div className="absolute inset-0 flex justify-between gap-8 px-4 sm:px-12">
        {[0, 1, 2, 3].map((colIndex) =>
        <motion.div
          key={colIndex}
          className="flex flex-col gap-12 text-gh-accent font-mono text-xs sm:text-sm whitespace-pre"
          initial={{
            y: colIndex % 2 === 0 ? -1000 : 0
          }}
          animate={{
            y: colIndex % 2 === 0 ? 0 : -1000
          }}
          transition={{
            repeat: Infinity,
            duration: 40 + colIndex * 10,
            ease: 'linear'
          }}>
          
            {[...CODE_SNIPPETS, ...CODE_SNIPPETS, ...CODE_SNIPPETS].map(
            (snippet, i) =>
            <div key={i}>{snippet}</div>

          )}
          </motion.div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-gh-bg via-transparent to-gh-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-gh-bg via-transparent to-gh-bg" />
    </div>);

}