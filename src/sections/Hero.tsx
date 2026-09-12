import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, FileText, Sparkles, Terminal, Code2, Database, Binary, Cpu } from 'lucide-react';
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
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const floatingTags = [
    { label: "C++ & Java", icon: Code2, pos: "left-[5%] top-[25%]", color: "text-cyan-400 border-cyan-500/30", delay: 0 },
    { label: "MySQL & DBMS", icon: Database, pos: "right-[6%] top-[30%]", color: "text-purple-400 border-purple-500/30", delay: 0.5 },
    { label: "LeetCode DSA", icon: Binary, pos: "left-[8%] bottom-[25%]", color: "text-amber-400 border-amber-500/30", delay: 1 },
    { label: "CBIT CSE '28", icon: Cpu, pos: "right-[8%] bottom-[25%]", color: "text-emerald-400 border-emerald-500/30", delay: 1.5 },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-20 px-4 sm:px-8 overflow-hidden"
    >
      {/* 3D Background Canvas Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-95">
        <HeroScene isDark={isDark} />
      </div>

      {/* Floating Holographic Technology Tags (Desktop Only) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-10 max-w-7xl mx-auto">
        {floatingTags.map((tag, i) => {
          const TagIcon = tag.icon;
          return (
            <motion.div
              key={tag.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.7, 1, 0.7], 
                y: [0, -10, 0],
                scale: 1 
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: tag.delay
              }}
              className={`absolute ${tag.pos} pointer-events-auto cursor-default px-3 py-1.5 rounded-full glass-panel border ${tag.color} bg-slate-950/70 shadow-lg backdrop-blur-md flex items-center gap-2 text-xs font-mono select-none hover:scale-110 hover:border-white transition-all`}
            >
              <TagIcon className="w-3.5 h-3.5" />
              <span>{tag.label}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Foreground Hero Content */}
      <div className="relative z-20 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Status Badge with Glowing Border */}
          <motion.div variants={itemVariants} className="mb-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/40 bg-slate-950/80 shadow-[0_0_20px_rgba(0,242,254,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#00f2fe]"></span>
              </span>
              <span className="text-xs font-mono font-medium text-cyan-300 tracking-wider">
                B.E. Computer Science & Engineering • CBIT '28
              </span>
            </div>
          </motion.div>

          {/* Name Display with Iridescent Shimmer */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight font-mono uppercase mb-3 select-none"
          >
            <span className="text-gradient-cyan drop-shadow-[0_15px_35px_rgba(0,242,254,0.3)]">
              {profile.name}
            </span>
          </motion.h1>

          {/* Title & Subtitle */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-8">
            <h2 className="text-lg sm:text-2xl font-medium text-slate-100 tracking-tight mb-2.5">
              {profile.role}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {profile.tagline}
            </p>
          </motion.div>

          {/* Metric Badges with Dynamic Hover Glow */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-3xl w-full mb-8"
          >
            {profile.stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="glass-panel p-3.5 rounded-2xl text-center border border-white/10 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(0,242,254,0.2)] transition-all bg-slate-950/60"
              >
                <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Action CTAs with Shimmer Beam */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md"
          >
            {/* Primary Explore Projects */}
            <a
              href="#projects"
              onClick={() => soundEffects.playClick()}
              data-cursor="EXPLORE"
              className="shimmer-btn flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_30px_rgba(0,242,254,0.45)] hover:shadow-[0_0_40px_rgba(0,242,254,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
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
              className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-100 hover:text-white glass-panel border border-white/20 hover:border-cyan-400/60 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(0,242,254,0.2)] transition-all duration-300 active:scale-[0.98]"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Full Resume</span>
            </button>

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              onClick={() => soundEffects.playClick()}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <span>Let's talk</span>
              <span className="text-cyan-400">→</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Cinematic Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-14 flex flex-col items-center gap-2.5 text-slate-500 select-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80">
            Scroll to Navigate 3D Experience
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-slate-600/80 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
