import React, { useState, useEffect } from 'react';
import { BackgroundParticles } from './components/three/BackgroundParticles';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { ExperienceEducation } from './sections/ExperienceEducation';
import { Achievements } from './sections/Achievements';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

export function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('nikhil_portfolio_theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('nikhil_portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('nikhil_portfolio_theme', 'light');
    }
  };

  // Keyboard shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`relative min-h-screen ${isDark ? 'dark bg-[#030712]' : 'light bg-[#f8fafc]'} selection:bg-cyan-500/30 selection:text-cyan-300 font-sans transition-colors duration-300`}>
      {/* Ambient Interactive Particle Canvas */}
      <BackgroundParticles isDark={isDark} />

      {/* Adaptive Custom Desktop Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar & Navigation Tracker */}
      <ScrollProgress />

      {/* Floating Glassmorphism Navbar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Main Experience Flow */}
      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero isDark={isDark} onOpenResume={() => setIsResumeModalOpen(true)} />
        <About />
        <Skills />
        <Projects isDark={isDark} />
        <ExperienceEducation />
        <Achievements />
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Spotlight Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* In-Browser Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

export default App;
