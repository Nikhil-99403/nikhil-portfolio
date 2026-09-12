import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Award, 
  Users, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { educationList, experienceList } from '../data/timeline';
import { soundEffects } from '../utils/sound';

export const ExperienceEducation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'experience'>('education');

  return (
    <section id="experience" className="relative py-32 px-4 sm:px-8 w-full max-w-6xl mx-auto z-10">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[500px] bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>Milestones & Leadership</span>
        </div>
        <h2 className="text-3xl sm:text-6xl font-black tracking-tight font-mono text-slate-100 uppercase">
          Academic Journey & <span className="text-gradient-cyan">Experience</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl font-light">
          A chronological progression tracing educational honors from secondary school to university engineering and department event leadership.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-white/10 bg-slate-950/80 shadow-lg">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('education');
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono transition-all duration-300 ${
              activeTab === 'education'
                ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,242,254,0.45)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Academic Milestones ({educationList.length})</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('experience');
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono transition-all duration-300 ${
              activeTab === 'experience'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(16,185,129,0.45)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Volunteer Leadership ({experienceList.length})</span>
          </button>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Animated Central Neon Trace Line */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent opacity-40 pointer-events-none" />

        {activeTab === 'education' ? (
          <div className="space-y-10">
            {educationList.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-8`}
                >
                  {/* Glowing Node Dot in Center */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-7 w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_15px_#00f2fe] z-20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
                  </div>

                  {/* Card Body */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] ml-10 sm:ml-0 ${isEven ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                    <div className="glass-panel p-7 rounded-2xl border border-white/10 hover:border-cyan-400/60 shadow-xl hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] transition-all duration-300 relative group overflow-hidden bg-slate-950/70">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium">
                          {item.badge}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800">
                          <span>{item.scoreType}:</span>
                          <span className="text-white text-sm font-extrabold">{item.score}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                        {item.institution}
                      </h3>

                      <div className="text-xs sm:text-sm font-medium text-slate-200 mt-1">
                        {item.degree}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          {item.duration}
                        </span>
                      </div>

                      <ul className="mt-5 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="text-cyan-400 font-mono mt-0.5 font-bold">›</span>
                            <span className="leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-10">
            {experienceList.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col items-center"
              >
                {/* Node Center Dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-7 w-5 h-5 rounded-full bg-slate-950 border-2 border-emerald-400 shadow-[0_0_15px_#10b981] z-20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                </div>

                <div className="w-full sm:w-4/5 ml-10 sm:ml-0">
                  <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 hover:border-emerald-400/60 shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all group bg-slate-950/70">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                        Department Leadership
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        {exp.location}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white font-mono group-hover:text-emerald-300 transition-colors">
                      {exp.role} — {exp.organization}
                    </h3>

                    <p className="text-xs font-mono text-cyan-400 mt-1">
                      {exp.eventType} • {exp.duration}
                    </p>

                    <div className="mt-5 space-y-2.5">
                      {exp.responsibilities.map((resp, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                      {exp.skillsApplied.map((sk) => (
                        <span
                          key={sk}
                          className="px-3 py-1 rounded-xl bg-emerald-950/50 border border-emerald-800 text-xs font-mono text-emerald-300"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
