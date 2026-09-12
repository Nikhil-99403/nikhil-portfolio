import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Copy, 
  Check 
} from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { ProjectItem } from '../data/projects';
import { ProjectVisualCanvas } from '../components/three/ProjectVisualCanvas';
import { copyToClipboard } from '../utils/helpers';
import { soundEffects } from '../utils/sound';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  isDark: boolean;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  isDark
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'code'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const handleCopySnippet = async () => {
    if (project.codeSnippet) {
      await copyToClipboard(project.codeSnippet.code);
      soundEffects.playSuccess();
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] glass-panel bg-slate-950/95 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/80">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {project.badge}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-mono truncate">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
                title="View on GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/5 bg-slate-900/40">
            {(['overview', 'architecture', 'code'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab(tab);
                }}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-cyan-400 text-cyan-300 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 3D Visual & Summary Hero */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 h-48 sm:h-56 glass-panel rounded-xl overflow-hidden border border-cyan-500/20">
                    <ProjectVisualCanvas projectId={project.id} isDark={isDark} />
                  </div>
                  <div className="md:col-span-7 space-y-3">
                    <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      {project.category}
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Problem vs Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-panel p-5 rounded-xl border border-red-500/20 bg-red-950/10">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-red-400 mb-2 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Challenge & Problem
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="glass-panel p-5 rounded-xl border border-emerald-500/20 bg-emerald-950/10">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> Engineered Solution
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Key Features List */}
                <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Key Architectural Features
                  </h4>
                  <ul className="space-y-2.5">
                    {project.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>System Architecture & Technical Design</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.architecture.map((arch, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs font-mono text-cyan-400 block mb-1">0{idx + 1} // Module</span>
                        <p className="text-xs text-slate-300 leading-relaxed">{arch}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results & Verification */}
                <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Verified Engineering Results
                  </h4>
                  <ul className="space-y-2">
                    {project.results.map((res, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="text-emerald-400 font-mono">✓</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'code' && project.codeSnippet && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    {project.codeSnippet.caption}
                  </span>
                  <button
                    onClick={handleCopySnippet}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#080c14] p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  <pre>{project.codeSnippet.code}</pre>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
