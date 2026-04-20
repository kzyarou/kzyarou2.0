import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, LockIcon, LoaderIcon } from 'lucide-react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, ADMIN_EMAIL } from '../lib/firebase';
export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // If already signed in as admin, skip straight to dashboard
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user && user.email === ADMIN_EMAIL) {
        navigate('/admin', {
          replace: true
        });
      }
    });
    return () => unsub();
  }, [navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (cred.user.email !== ADMIN_EMAIL) {
        // Not the admin account — sign out immediately
        await signOut(auth);
        setError('Access denied.');
        setLoading(false);
        return;
      }
      navigate('/admin', {
        replace: true
      });
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/user-not-found') {
        setError(
          'No account found — create this user in Firebase Console → Authentication → Users.'
        );
      } else if (
      code === 'auth/wrong-password' ||
      code === 'auth/invalid-credential')
      {
        setError(
          'Wrong password. Double-check the password in Firebase Console.'
        );
      } else if (code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Wait a moment and try again.');
      } else {
        setError(`Auth error: ${code || err?.message || 'Unknown error'}`);
      }
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-abyss text-cream flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}
          className="w-full max-w-md">
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-cream-dim hover:text-amber transition-colors tracking-widest uppercase mb-12">
            
            <ArrowLeftIcon className="w-3 h-3" />
            Back home
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <LockIcon className="w-4 h-4 text-amber" />
            <span className="font-mono text-xs text-amber tracking-[0.3em] uppercase">
              Restricted · Admin
            </span>
          </div>

          <h1 className="font-display font-normal text-6xl md:text-7xl leading-[0.9] tracking-tight text-bone mb-10">
            Sign <span className="italic text-ember">in.</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <label className="block">
              <span className="block font-mono text-[10px] tracking-widest uppercase text-cream-dim mb-3">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-transparent border-0 border-b border-forest text-cream font-serif text-xl font-light py-3 focus:outline-none focus:border-amber transition-colors" />
              
            </label>

            <label className="block">
              <span className="block font-mono text-[10px] tracking-widest uppercase text-cream-dim mb-3">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-transparent border-0 border-b border-forest text-cream font-serif text-xl font-light py-3 focus:outline-none focus:border-amber transition-colors" />
              
            </label>

            {error &&
            <div className="font-mono text-xs text-red-400 tracking-wider">
                {error}
              </div>
            }

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center gap-4 bg-amber text-abyss px-8 py-5 font-mono text-sm tracking-wider uppercase hover:bg-amber-bright transition-colors disabled:opacity-60">
              
              {loading ?
              <>
                  <LoaderIcon className="w-4 h-4 animate-spin" />
                  Authenticating
                </> :

              <>
                  <LockIcon className="w-4 h-4" />
                  Enter
                </>
              }
            </button>
          </form>

          <p className="mt-16 font-mono text-[10px] tracking-widest uppercase text-cream-dim/40">
            — Authorized personnel only —
          </p>
        </motion.div>
      </div>
    </div>);

}