import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOutIcon, TerminalIcon, UserIcon, ShieldIcon } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
export function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const isAdmin = user?.email === 'kzyaroudev@gmail.com';
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-gh-bg/80 backdrop-blur-md border-b border-gh-border/50"
      initial={{
        y: -100
      }}
      animate={{
        y: 0
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}>
      
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-gh-text font-mono font-semibold group">
          
          <TerminalIcon className="w-5 h-5 text-gh-accent group-hover:animate-pulse" />
          <span>kzyarou</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-sm">
          <div className="hidden md:flex items-center gap-4 mr-2">
            {isAdmin &&
            <Link
              to="/admin"
              className={`hover:text-gh-accent transition-colors flex items-center gap-1.5 ${location.pathname === '/admin' ? 'text-gh-accent' : 'text-gh-muted'}`}>
              
                <ShieldIcon className="w-3.5 h-3.5" />
                ~/admin
              </Link>
            }
            <Link
              to="/feedback"
              className={`hover:text-gh-text transition-colors ${location.pathname === '/feedback' ? 'text-gh-text' : 'text-gh-muted'}`}>
              
              ~/feedback
            </Link>
            <Link
              to="/inquiry"
              className={`hover:text-gh-text transition-colors ${location.pathname === '/inquiry' ? 'text-gh-text' : 'text-gh-muted'}`}>
              
              ~/inquiry
            </Link>
          </div>
          {user ?
          <div className="flex items-center gap-4">
              <span className="text-gh-muted hidden sm:inline-flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                {user.email}
              </span>
              <button
              onClick={handleLogout}
              className="text-gh-muted hover:text-gh-text flex items-center gap-2 transition-colors">
              
                <LogOutIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div> :

          location.pathname !== '/login' &&
          <Link
            to="/login"
            className="text-gh-muted hover:text-gh-text transition-colors">
            
                ~/login
              </Link>

          }
        </div>
      </div>
    </motion.nav>);

}