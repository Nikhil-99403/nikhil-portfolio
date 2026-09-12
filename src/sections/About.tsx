import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Binary, 
  Database, 
  Code2, 
  Sparkles, 
  MapPin, 
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { profile } from '../data/profile';
import { TiltCard } from '../components/TiltCard';
import { soundEffects } from '../utils/sound';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-8 w-full max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>About Me & Academic Journey</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono text-slate-100 uppercase">
          Foundation of <span className="text-gradient-cyan">Precision & Logic</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl font-light">
          Combining analytical discipline, rigorous computer science coursework, and passion for elegant software.
        </p>
      </div>

      {/* Main Grid: Narrative & Interactive Dimension Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Narrative Storytelling (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-mono">
              <span className="text-cyan-400">01 //</span> Engineering The Future
            </h3>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              I am an undergraduate Computer Science and Engineering scholar at{' '}
              <strong className="text-cyan-300 font-medium">Chaitanya Bharathi Institute of Technology (CBIT)</strong>, 
              Hyderabad. My journey in tech began with deep curiosity for how computer systems process logic, manage data, and render interactive visuals.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              I prioritize deep algorithmic comprehension over surface-level shortcuts. Whether it's crafting normalized database architectures in{' '}
              <span className="text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">MySQL</span>, 
              building object-oriented software in{' '}
              <span className="text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">Java</span> and{' '}
              <span className="text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">C++</span>, 
              or solving algorithmic data structure challenges on{' '}
              <span className="text-amber-400 font-mono text-xs px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800">LeetCode</span>, 
              I focus on writing clean, modular, and maintainable code.
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open for Technical Roles & Internships</span>
              </div>
            </div>
          </div>

          {/* Quick Academic Consistency Banner */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-cyan-950/20">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" /> Academic Consistency Track Record
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-lg sm:text-xl font-mono font-bold text-white">8.64</div>
                <div className="text-[10px] text-slate-400">B.E. CSE (CBIT)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-lg sm:text-xl font-mono font-bold text-cyan-400">97.6%</div>
                <div className="text-[10px] text-slate-400">Class 12th (Narayana)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-lg sm:text-xl font-mono font-bold text-purple-400">10.0</div>
                <div className="text-[10px] text-slate-400">Class 10th (TSMS)</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Tilt Pillars (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          {/* Pillar 1: Core Systems & Algorithmic Rigor */}
          <TiltCard
            className="p-5 border border-cyan-500/20 group hover:border-cyan-400/50 transition-all"
            dataCursor="FOCUS"
            onClick={() => soundEffects.playHover()}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                <Binary className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                  Data Structures & Algorithms
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Deep focus on optimal time & space complexity, recursion, pointers, linked structures, and algorithmic paradigms on LeetCode.
                </p>
              </div>
            </div>
          </TiltCard>

          {/* Pillar 2: Database Management & Systems */}
          <TiltCard
            className="p-5 border border-purple-500/20 group hover:border-purple-400/50 transition-all"
            dataCursor="FOCUS"
            onClick={() => soundEffects.playHover()}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-mono group-hover:text-purple-300 transition-colors">
                  Database & System Architecture
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Architecting relational schemas with MySQL & SQLite, mastering transactions (ACID), normalized entities, and Java CRUD persistence layers.
                </p>
              </div>
            </div>
          </TiltCard>

          {/* Pillar 3: Interactive Web Engineering */}
          <TiltCard
            className="p-5 border border-emerald-500/20 group hover:border-emerald-400/50 transition-all"
            dataCursor="FOCUS"
            onClick={() => soundEffects.playHover()}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-mono group-hover:text-emerald-300 transition-colors">
                  Interactive Web Development
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Designing responsive web applications with semantic HTML5, modern CSS layouts, event-driven JavaScript, and clean DOM manipulation.
                </p>
              </div>
            </div>
          </TiltCard>

          {/* Pillar 4: Collaborative Leadership */}
          <TiltCard
            className="p-5 border border-amber-500/20 group hover:border-amber-400/50 transition-all"
            dataCursor="FOCUS"
            onClick={() => soundEffects.playHover()}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-mono group-hover:text-amber-300 transition-colors">
                  Collaboration & Event Leadership
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Active department event volunteer for Tecstasy at CBIT, coordinating technical logistics and participant registrations with clear communication.
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};
