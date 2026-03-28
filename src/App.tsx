import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CodeBackground } from './components/CodeBackground';
import { SplashScreen } from './components/SplashScreen';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { Login } from './pages/Login';
import { Feedback } from './pages/Feedback';
import { Inquiry } from './pages/Inquiry';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthProvider } from './lib/AuthContext';
import { Navbar } from './components/Navbar';
import { trackVisit } from './lib/firestore';
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>);

}
export function App() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    trackVisit();
  }, []);
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gh-bg relative selection:bg-gh-accent/30">
        <AnimatePresence>
          {showSplash &&
          <SplashScreen onComplete={() => setShowSplash(false)} />
          }
        </AnimatePresence>
        {!showSplash &&
        <BrowserRouter>
            <CodeBackground />
            <Navbar />
            <AnimatedRoutes />
          </BrowserRouter>
        }
      </div>
    </AuthProvider>);

}