import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';
import { profile } from '../data/profile';
import { HeroScene } from '../components/three/HeroScene';
import { soundEffects } from '../utils/sound';

interface HeroProps {
  isDark: boolean;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ isDark, onOpenResume }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-4 sm:px-8 overflow-hidden"
    >
      {/* 3D Background Canvas Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-90">
        <HeroScene isDark={isDark} />
      </div>

      {/* Subtle Radial Glow in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Foreground Hero Content */}
      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* System Status / Academic Pill */}
          <motion.div variants={itemVariants} className="mb-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 bg-slate-900/60 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-medium text-cyan-300 tracking-wide">
                B.E. Computer Science & Engineering • CBIT '28
              </span>
            </div>
          </motion.div>

          {/* Name Display */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight font-mono uppercase mb-3 select-none"
          >
            <span className="text-gradient-cyan drop-shadow-[0_10px_30px_rgba(0,242,254,0.2)]">
              {profile.name}
            </span>
          </motion.h1>

          {/* Title & Subtitle */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-6">
            <h2 className="text-lg sm:text-2xl font-medium text-slate-200 tracking-tight mb-2">
              {profile.role}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              {profile.tagline}
            </p>
          </motion.div>

          {/* Metric Badges */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl w-full mb-8"
          >
            {profile.stats.map((stat, i) => (
              <div
                key={i}
                className="glass-panel p-3 rounded-xl text-center border border-white/10 hover:border-cyan-500/40 transition-colors"
              >
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                  {stat.value}
                </div>
                <div className="text-[11px] font-medium text-slate-200 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[9px] font-mono text-slate-400">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3.5 w-full max-w-md"
          >
            {/* Primary Explore Projects */}
            <a
              href="#projects"
              onClick={() => soundEffects.playClick()}
              data-cursor="EXPLORE"
              className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Resume Button */}
            <button
              onClick={() => {
                soundEffects.playSuccess();
                onOpenResume();
              }}
              data-cursor="VIEW"
              className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white glass-panel border border-white/15 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 active:scale-[0.98]"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Full Resume</span>
            </button>

            {/* Get In Touch */}
            <a
              href="#contact"
              onClick={() => soundEffects.playClick()}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <span>Let's talk</span>
              <span>→</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Cinematic Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-14 flex flex-col items-center gap-2 text-slate-500 select-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
            Scroll to Navigate 3D Space
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-slate-600 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-cyan-400"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
