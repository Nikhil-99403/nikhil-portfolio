import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState('hero');

  const chapters = [
    { id: 'hero', label: 'Intro' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Timeline' },
    { id: 'achievements', label: 'DSA' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = chapters.map(c => document.getElementById(c.id));
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(chapters[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Thin Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 origin-left z-50 pointer-events-none shadow-[0_0_10px_#00f2fe]"
        style={{ scaleX }}
      />

      {/* Floating Right Chapter Tracker (Desktop Only) */}
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3 pointer-events-auto select-none">
        {chapters.map((ch) => {
          const isActive = activeSection === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => scrollTo(ch.id)}
              className="group flex items-center gap-2.5 py-1 focus:outline-none"
              title={`Jump to ${ch.label}`}
            >
              <span
                className={`text-[10px] font-mono tracking-wider transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                  isActive ? 'opacity-100 text-cyan-400 font-bold' : 'text-slate-400'
                }`}
              >
                {ch.label}
              </span>
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-6 bg-cyan-400 shadow-[0_0_8px_#00f2fe]'
                    : 'w-1.5 bg-slate-600 group-hover:w-3 group-hover:bg-slate-400'
                }`}
              />
            </button>
          );
        })}
      </div>
    </>
  );
};
