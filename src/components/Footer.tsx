import React from 'react';
import { ArrowUp, Heart, Sparkles, Terminal } from 'lucide-react';
import { profile } from '../data/profile';
import { soundEffects } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEffects.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-cyan-400">KN</span>
            <span className="text-sm font-semibold text-white">Karrolla Nikhil</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-light">
            B.E. Computer Science and Engineering • Chaitanya Bharathi Institute of Technology
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href={`mailto:${profile.emails.personal}`}
            className="hover:text-cyan-400 transition-colors"
          >
            Email
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3 py-2 rounded-xl glass-panel border border-white/10 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-white transition-all active:scale-95"
          title="Scroll Back to Top"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500">
        <span>© {new Date().getFullYear()} Karrolla Nikhil. All rights reserved.</span>
        <span className="mt-2 sm:mt-0 flex items-center gap-1">
          Designed with precision & high-performance WebGL
        </span>
      </div>
    </footer>
  );
};
