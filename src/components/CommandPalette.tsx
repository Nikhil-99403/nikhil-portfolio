import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ArrowRight, 
  FileText, 
  Copy, 
  ExternalLink, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Layers, 
  Code, 
  GraduationCap, 
  Award, 
  Mail, 
  Check, 
  X 
} from 'lucide-react';
import { profile } from '../data/profile';
import { copyToClipboard } from '../utils/helpers';
import { soundEffects } from '../utils/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords: string[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
  onOpenResume
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          soundEffects.playClick();
          // open command palette
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleCopy = async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      soundEffects.playSuccess();
      setCopiedText(label);
      setTimeout(() => {
        setCopiedText(null);
        onClose();
      }, 1000);
    }
  };

  const jumpTo = (id: string) => {
    soundEffects.playClick();
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-about',
      title: 'Navigate to About & Education',
      category: 'Navigation',
      icon: Layers,
      action: () => jumpTo('about'),
      keywords: ['about', 'bio', 'cbit', 'cgpa', 'profile']
    },
    {
      id: 'nav-skills',
      title: 'Navigate to Skills Matrix',
      category: 'Navigation',
      icon: Code,
      action: () => jumpTo('skills'),
      keywords: ['skills', 'languages', 'java', 'c++', 'python', 'mysql', 'dsa']
    },
    {
      id: 'nav-projects',
      title: 'Navigate to Projects Showcase',
      category: 'Navigation',
      icon: Layers,
      action: () => jumpTo('projects'),
      keywords: ['projects', 'library', 'rock paper scissors', 'todo', 'work']
    },
    {
      id: 'nav-timeline',
      title: 'Navigate to Experience & Education Timeline',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => jumpTo('experience'),
      keywords: ['education', 'cbit', 'narayana', 'model school', 'tecstasy', 'volunteer']
    },
    {
      id: 'nav-achievements',
      title: 'Navigate to LeetCode DSA Achievement',
      category: 'Navigation',
      icon: Award,
      action: () => jumpTo('achievements'),
      keywords: ['achievements', 'leetcode', 'dsa', 'algorithms']
    },
    {
      id: 'nav-contact',
      title: 'Navigate to Contact & Get in Touch',
      category: 'Navigation',
      icon: Mail,
      action: () => jumpTo('contact'),
      keywords: ['contact', 'email', 'phone', 'message']
    },
    // Recruiter actions
    {
      id: 'action-resume',
      title: 'View Full Resume & Credentials',
      category: 'Recruiter',
      icon: FileText,
      action: () => {
        soundEffects.playSuccess();
        onClose();
        onOpenResume();
      },
      keywords: ['resume', 'cv', 'pdf', 'download', 'recruiter']
    },
    {
      id: 'copy-email-academic',
      title: `Copy Academic Email (${profile.emails.academic})`,
      category: 'Actions',
      icon: Copy,
      action: () => handleCopy(profile.emails.academic, 'Academic Email'),
      keywords: ['email', 'copy', 'academic', 'cbit']
    },
    {
      id: 'copy-email-personal',
      title: `Copy Personal Email (${profile.emails.personal})`,
      category: 'Actions',
      icon: Copy,
      action: () => handleCopy(profile.emails.personal, 'Personal Email'),
      keywords: ['email', 'copy', 'personal', 'gmail']
    },
    {
      id: 'copy-phone',
      title: `Copy Phone Number (${profile.phone})`,
      category: 'Actions',
      icon: Copy,
      action: () => handleCopy(profile.phone, 'Phone Number'),
      keywords: ['phone', 'mobile', 'call', 'copy']
    },
    // Theme & Audio
    {
      id: 'toggle-theme',
      title: isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      category: 'Preferences',
      icon: isDark ? Sun : Moon,
      action: () => {
        onToggleTheme();
        onClose();
      },
      keywords: ['theme', 'dark', 'light', 'mode']
    }
  ];

  const filteredCommands = commands.filter((cmd) => {
    if (!query) return true;
    const lower = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(lower) ||
      cmd.category.toLowerCase().includes(lower) ||
      cmd.keywords.some((k) => k.includes(lower))
    );
  });

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(filteredCommands.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl glass-panel bg-slate-950/95 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search (e.g. 'projects', 'resume', 'email')..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDownList}
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notification if copied */}
            {copiedText && (
              <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-4 py-2 flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>Copied {copiedText} to clipboard!</span>
              </div>
            )}

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  No matching commands found for "{query}".
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors duration-150 ${
                        isSelected
                          ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium truncate">{cmd.title}</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 shrink-0 ml-2">
                        {cmd.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <div className="flex items-center gap-3">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
                <span>esc to close</span>
              </div>
              <span className="text-cyan-400/80">Nikhil Karrolla Portfolio</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
