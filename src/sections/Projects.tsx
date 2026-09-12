import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowUpRight, 
  Layers, 
  Database, 
  Gamepad2, 
  CheckSquare,
  Sparkles,
  Terminal
} from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { projects, ProjectItem } from '../data/projects';
import { ProjectVisualCanvas } from '../components/three/ProjectVisualCanvas';
import { ProjectDetailModal } from './ProjectDetailModal';
import { TiltCard } from '../components/TiltCard';
import { soundEffects } from '../utils/sound';

interface ProjectsProps {
  isDark: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ isDark }) => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'library-management-system': return Database;
      case 'rock-paper-scissor': return Gamepad2;
      default: return CheckSquare;
    }
  };

  return (
    <section id="projects" className="relative py-32 px-4 sm:px-8 w-full max-w-6xl mx-auto z-10">
      {/* Background Section Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
          <FolderGit2 className="w-4 h-4 text-cyan-400" />
          <span>Verified Systems & Implementations</span>
        </div>
        <h2 className="text-3xl sm:text-6xl font-black tracking-tight font-mono text-slate-100 uppercase">
          Case Studies & <span className="text-gradient-cyan">Projects</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl font-light">
          Deep architectural case studies spanning enterprise database operations, deterministic state machine logic, and high-performance client storage.
        </p>
      </div>

      {/* Projects Showcase Stack */}
      <div className="flex flex-col gap-16">
        {projects.map((project, index) => {
          const Icon = getProjectIcon(project.id);
          const isReversed = index % 2 !== 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard
                className="p-7 sm:p-10 border border-white/15 hover:border-cyan-400/60 shadow-2xl hover:shadow-[0_0_40px_rgba(0,242,254,0.25)] transition-all duration-300 bg-slate-950/70"
                dataCursor="VIEW"
                onClick={() => {
                  soundEffects.playClick();
                  setActiveProject(project);
                }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* 3D Visualizer Column (5 cols) */}
                  <div className={`lg:col-span-5 h-72 sm:h-80 rounded-2xl overflow-hidden glass-panel border border-cyan-500/30 relative group shadow-inner ${isReversed ? 'lg:order-2' : ''}`}>
                    <ProjectVisualCanvas projectId={project.id} isDark={isDark} />
                    
                    {/* Visual Overlay Tag */}
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>Interactive 3D Simulation</span>
                    </div>

                    <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-400">
                      Hover to Rotate
                    </div>
                  </div>

                  {/* Information & Case Study Column (7 cols) */}
                  <div className={`lg:col-span-7 flex flex-col justify-between space-y-5 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono text-cyan-400 font-medium tracking-wide uppercase">
                          {project.category}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 ml-auto bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          0{index + 1} // 03
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-bold text-white font-mono tracking-tight group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-light">
                        {project.summary}
                      </p>
                    </div>

                    {/* Architectural Highlights */}
                    <div className="space-y-2 pt-1">
                      {project.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5 shadow-[0_0_6px_#00f2fe]" />
                          <span className="leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEffects.playClick();
                          setActiveProject(project);
                        }}
                        className="shimmer-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_20px_rgba(0,242,254,0.35)] transition-all active:scale-95"
                      >
                        <span>Full Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-400/50 transition-colors shadow-sm"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-mono text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-400/50 transition-colors"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3 text-cyan-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      {/* Deep-Dive Case Study Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        isDark={isDark}
      />
    </section>
  );
};
