import React from 'react';
import { motion } from 'framer-motion';
import { Award, Terminal, Code2, Sparkles, CheckCircle2, ArrowUpRight, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { achievements } from '../data/achievements';
import { soundEffects } from '../utils/sound';
import { TiltCard } from '../components/TiltCard';

export const Achievements: React.FC = () => {
  const triggerConfetti = () => {
    soundEffects.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#4facfe', '#7928ca', '#00ff9d']
    });
  };

  return (
    <section id="achievements" className="relative py-28 px-4 sm:px-8 w-full max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Algorithmic Problem Solving</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono text-slate-100 uppercase">
          Achievements & <span className="text-gradient-purple">DSA Mastery</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl font-light">
          Demonstrating persistent commitment to algorithmic optimization, optimal time-space complexities, and data structures.
        </p>
      </div>

      {/* Showcase Grid */}
      <div className="max-w-4xl mx-auto">
        {achievements.map((item) => (
          <TiltCard
            key={item.id}
            className="p-6 sm:p-10 border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300"
            dataCursor="ACHIEVE"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <Flame className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Platform: {item.platform}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Celebrate Button */}
              <button
                onClick={triggerConfetti}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-95 shrink-0"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Celebrate Milestone</span>
              </button>
            </div>

            <div className="pt-6 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {item.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {item.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 leading-relaxed">{hl}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 border-t border-white/5">
                <span className="text-amber-400/90">
                  Focus: Arrays • Strings • Trees • Graphs • DP
                </span>
                <span className="text-slate-500">
                  Continuous Practice & Verification
                </span>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};
