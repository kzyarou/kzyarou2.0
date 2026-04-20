import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { NoiseOverlay } from './components/NoiseOverlay';
import {
  RouteTransitionProvider,
  useDisplayedLocation } from
'./components/RouteTransition';
import { ScrollManager } from './components/ScrollManager';
import { VisitTracker } from './components/VisitTracker';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { ContactPage } from './pages/Contact';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
function Chrome({ children }: {children: React.ReactNode;}) {
  const location = useLocation();
  const hideChrome =
  location.pathname.startsWith('/admin') ||
  location.pathname.startsWith('/login');
  return (
    <div className="bg-obsidian text-bone min-h-screen font-sans relative">
      {!hideChrome && <Navbar />}
      <main>{children}</main>
      {!hideChrome && <Footer />}
    </div>);

}
function AppRoutes() {
  const displayed = useDisplayedLocation();
  const location = useLocation();
  const routeLocation = displayed ?? location;
  return (
    <Chrome>
      <Routes location={routeLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Chrome>);

}
export function App() {
  return (
    <HashRouter>
      <SplashScreen />
      <ScrollManager />
      <VisitTracker />
      <RouteTransitionProvider>
        <AppRoutes />
      </RouteTransitionProvider>
      <NoiseOverlay />
    </HashRouter>);

}