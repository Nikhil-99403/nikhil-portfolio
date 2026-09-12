import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Binary, 
  Wrench, 
  Sparkles, 
  Search,
  CheckCircle2,
  Terminal,
  Cpu
} from 'lucide-react';
import { skillCategories } from '../data/skills';
import { soundEffects } from '../utils/sound';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const categories = ['All', ...skillCategories.map((c) => c.title)];

  const allSkills = skillCategories.flatMap((c) =>
    c.skills.map((s) => ({ ...s, category: c.title, accent: c.accentColor }))
  );

  const filteredSkills = allSkills.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesQuery = !searchQuery || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-8 w-full max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Technical Competencies & Systems</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono text-slate-100 uppercase">
          Skills & <span className="text-gradient-cyan">Domain Matrix</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl font-light">
          An interactive index of programming languages, relational databases, core computer science coursework, and developer tools from my verified curriculum.
        </p>
      </div>

      {/* Control Bar: Categories & Filter Input */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 glass-panel p-3 rounded-2xl border border-white/10">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter skills (e.g. Java, C++, MySQL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
          />
        </div>
      </div>

      {/* Interactive Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence>
          {filteredSkills.map((skill) => {
            const isHovered = activeSkill === skill.name;
            return (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => {
                  soundEffects.playHover();
                  setActiveSkill(skill.name);
                }}
                onMouseLeave={() => setActiveSkill(null)}
                data-cursor="SKILL"
                className={`glass-panel p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isHovered
                    ? 'border-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.2)] bg-slate-900/80 -translate-y-1'
                    : 'border-white/10 hover:border-cyan-500/30 bg-slate-950/40'
                }`}
              >
                {/* Accent Background Glow */}
                <div
                  className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${skill.accent} rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity`}
                />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-white font-mono flex items-center gap-2 group-hover:text-cyan-300 transition-colors">
                        <span>{skill.name}</span>
                        {skill.tag && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-normal">
                            {skill.tag}
                          </span>
                        )}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                        {skill.category}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-cyan-400/90 mb-2 font-medium">
                      {skill.level}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {skill.details}
                    </p>
                  </div>

                  {/* Micro connection indicator */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Terminal className="w-3 h-3 text-cyan-400" />
                      <span>Verified Coursework</span>
                    </span>
                    <span className="text-cyan-400/60 group-hover:text-cyan-400 transition-colors">
                      Active
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Coursework & Systems Highlight Strip */}
      <div className="mt-12 glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/20 via-slate-900/60 to-purple-950/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-sm font-bold font-mono text-white flex items-center justify-center md:justify-start gap-2">
              <Binary className="w-4 h-4 text-cyan-400" />
              <span>Core CSE Focus: Data Structures • OOP • DBMS</span>
            </h4>
            <p className="text-xs text-slate-400 max-w-xl">
              Equipped with deep foundational principles of memory addressing, computational complexity analysis, schema normalization, and object-oriented architecture.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
              CBIT CSE Department
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
