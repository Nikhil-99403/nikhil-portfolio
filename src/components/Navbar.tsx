import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Search, 
  FileText, 
  Menu, 
  X, 
  ExternalLink,
  Code2,
  Sparkles
} from 'lucide-react';
import { soundEffects } from '../utils/sound';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenCommandPalette,
  onOpenResume
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEffects.isMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEffects.setMuted(next);
    if (!next) soundEffects.playSuccess();
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Timeline', href: '#experience' },
    { label: 'DSA', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-2xl backdrop-blur-xl border border-white/10 dark:border-white/10 dark:bg-[#0b0f19]/80 bg-white/80'
            : 'bg-transparent border border-transparent'
        } max-w-6xl w-full`}
      >
        {/* Monogram / Brand */}
        <a
          href="#hero"
          onClick={() => soundEffects.playClick()}
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 group-hover:border-cyan-400 transition-all duration-300 group-hover:scale-105">
            <span className="font-mono text-sm font-bold text-cyan-400 group-hover:text-cyan-300">
              KN
            </span>
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors">
              Karrolla Nikhil
            </span>
            <span className="text-[10px] font-mono text-cyan-400/80">
              CBIT CSE '28
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 rounded-xl bg-slate-900/40 dark:bg-slate-900/50 light:bg-slate-200/50 p-1 border border-white/5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => soundEffects.playClick()}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white light:text-slate-600 light:hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-lg bg-cyan-500/10 border border-cyan-500/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right Controls & Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Search / Command Palette (⌘K) */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenCommandPalette();
            }}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
            title="Open Command Palette (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[11px] text-slate-400 hidden lg:inline">Quick Jump</span>
            <kbd className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-white/10 text-slate-300 border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl text-slate-300 hover:text-cyan-400 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            aria-label="Toggle sound effects"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onToggleTheme();
            }}
            className="p-2 rounded-xl text-slate-300 hover:text-amber-400 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle color theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Resume Modal Trigger Button */}
          <button
            onClick={() => {
              soundEffects.playSuccess();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-xl shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] transition-all duration-200 active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-slate-900" />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-xl text-slate-300 bg-white/5 border border-white/10"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 p-4 rounded-2xl glass-panel bg-slate-950/95 border border-cyan-500/20 shadow-2xl md:hidden z-50"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    soundEffects.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-cyan-400">→</span>
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between px-2">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
                >
                  <Search className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Search commands</span>
                </button>
                <button
                  onClick={() => {
                    soundEffects.playSuccess();
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Resume</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
