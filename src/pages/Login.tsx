import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword } from
'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { TerminalIcon, AlertCircleIcon, Loader2Icon } from 'lucide-react';
export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.main
      className="min-h-screen flex items-center justify-center px-6 relative z-10 pt-16"
      initial={{
        opacity: 0,
        scale: 0.95
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      exit={{
        opacity: 0,
        scale: 0.95
      }}
      transition={{
        duration: 0.4,
        type: 'spring',
        bounce: 0.2
      }}>
      
      <div className="w-full max-w-md bg-gh-surface border border-gh-border rounded-lg overflow-hidden shadow-2xl shadow-black/50">
        <div className="bg-gh-border/30 px-4 py-3 border-b border-gh-border flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-gh-muted" />
          <span className="font-mono text-xs text-gh-muted">
            {isLogin ? 'auth/login.sh' : 'auth/register.sh'}
          </span>
        </div>
        <div className="p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gh-text font-mono mb-2">
              {isLogin ? 'Authenticate' : 'Initialize User'}
            </h1>
            <p className="text-gh-muted font-mono text-sm">
              Enter your credentials to continue.
            </p>
          </div>

          {error &&
          <motion.div
            initial={{
              opacity: 0,
              y: -10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded flex items-start gap-3 text-red-400 font-mono text-xs">
            
              <AlertCircleIcon className="w-4 h-4 shrink-0 mt-0.5" />
              <span>ERR: {error}</span>
            </motion.div>
          }

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-mono text-gh-muted uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gh-accent font-mono">
                  {'>'}
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gh-bg border border-gh-border rounded px-8 py-2.5 text-sm font-mono text-gh-text focus:outline-none focus:border-gh-accent focus:ring-1 focus:ring-gh-accent transition-all"
                  placeholder="user@domain.com"
                  required />
                
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-mono text-gh-muted uppercase tracking-wider">
                Password
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gh-accent font-mono">
                  {'>'}
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gh-bg border border-gh-border rounded px-8 py-2.5 text-sm font-mono text-gh-text focus:outline-none focus:border-gh-accent focus:ring-1 focus:ring-gh-accent transition-all"
                  placeholder="••••••••"
                  required />
                
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gh-accent hover:bg-gh-accent/90 text-gh-bg font-mono font-bold py-2.5 rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
              
              {loading ?
              <Loader2Icon className="w-4 h-4 animate-spin" /> :

              <span>{isLogin ? './execute_login' : './execute_signup'}</span>
              }
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-mono text-gh-muted hover:text-gh-text transition-colors">
              
              {isLogin ?
              'Need an account? Sign up' :
              'Already have an account? Log in'}
            </button>
          </div>
        </div>
      </div>
    </motion.main>);

}