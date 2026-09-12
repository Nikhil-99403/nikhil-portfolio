import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowUpRight, 
  Layers, 
  Database, 
  Gamepad2, 
  CheckSquare 
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
    <section id="projects" className="relative py-28 px-4 sm:px-8 w-full max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Featured Engineering Works</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono text-slate-100 uppercase">
          Case Studies & <span className="text-gradient-cyan">Projects</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl font-light">
          Concrete implementations across relational database management, algorithmic game logic, and responsive frontend systems.
        </p>
      </div>

      {/* Projects Showcase Stack */}
      <div className="flex flex-col gap-12">
        {projects.map((project, index) => {
          const Icon = getProjectIcon(project.id);
          const isReversed = index % 2 !== 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard
                className="p-6 sm:p-8 border border-white/10 hover:border-cyan-500/40 transition-all duration-300"
                dataCursor="VIEW"
                onClick={() => {
                  soundEffects.playClick();
                  setActiveProject(project);
                }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visual 3D Canvas Column (5 cols) */}
                  <div className={`lg:col-span-5 h-64 sm:h-72 rounded-xl overflow-hidden glass-panel border border-white/10 relative group ${isReversed ? 'lg:order-2' : ''}`}>
                    <ProjectVisualCanvas projectId={project.id} isDark={isDark} />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-400">
                      3D Interactive Visualizer
                    </div>
                  </div>

                  {/* Information & Narrative Column (7 cols) */}
                  <div className={`lg:col-span-7 flex flex-col justify-between space-y-4 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono text-cyan-400 font-medium tracking-wide">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 ml-auto">
                          0{index + 1} / 03
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-light">
                        {project.summary}
                      </p>
                    </div>

                    {/* Features Snippet */}
                    <div className="space-y-1.5 pt-2">
                      {project.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEffects.playClick();
                          setActiveProject(project);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.25)] transition-all active:scale-95"
                      >
                        <span>Read Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                        title="Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                        >
                          <span>Demo</span>
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
