import React from 'react';
import { motion } from 'framer-motion';
import { Award, Terminal, Code2, Sparkles, CheckCircle2, ArrowUpRight, Flame, Zap, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { achievements } from '../data/achievements';
import { soundEffects } from '../utils/sound';
import { TiltCard } from '../components/TiltCard';

export const Achievements: React.FC = () => {
  const triggerConfetti = () => {
    soundEffects.playSuccess();
    // Multi-stage confetti celebration
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#4facfe', '#7928ca', '#00ff9d', '#f59e0b']
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#00f2fe', '#ffd700', '#ff007f']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#7928ca', '#00ff9d', '#00f2fe']
      });
    }, 250);
  };

  return (
    <section id="achievements" className="relative py-32 px-4 sm:px-8 w-full max-w-6xl mx-auto z-10">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-transparent blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/30 text-amber-300 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Algorithmic Milestones</span>
        </div>
        <h2 className="text-3xl sm:text-6xl font-black tracking-tight font-mono text-slate-100 uppercase">
          Achievements & <span className="text-gradient-purple">DSA Mastery</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl font-light">
          Demonstrating persistent commitment to algorithmic optimization, optimal time-space complexities, and core data structures.
        </p>
      </div>

      {/* Showcase Card */}
      <div className="max-w-4xl mx-auto">
        {achievements.map((item) => (
          <TiltCard
            key={item.id}
            className="p-8 sm:p-12 border border-amber-500/40 hover:border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.15)] transition-all duration-300 bg-slate-950/80"
            dataCursor="ACHIEVE"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                  <Flame className="w-9 h-9" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold tracking-wider">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Platform: {item.platform}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Celebrate Interactive Button */}
              <button
                onClick={triggerConfetti}
                className="shimmer-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all active:scale-95 shrink-0"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Celebrate Milestone</span>
              </button>
            </div>

            <div className="pt-8 space-y-6">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                {item.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {item.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3 shadow-sm hover:border-amber-500/30 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 leading-relaxed">{hl}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 border-t border-white/5">
                <span className="text-amber-300 font-medium">
                  Focus: Arrays • Strings • Linked Lists • Trees • Graphs • DP
                </span>
                <span className="text-slate-500">
                  Continuous Algorithmic Optimization
                </span>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};
