import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Send, 
  Check, 
  Copy, 
  ExternalLink, 
  Clock, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { profile } from '../data/profile';
import { copyToClipboard } from '../utils/helpers';
import { soundEffects } from '../utils/sound';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setCurrentTime(timeStr);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      soundEffects.playSuccess();
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    soundEffects.playClick();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      soundEffects.playSuccess();
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-8 w-full max-w-6xl mx-auto z-10">
      {/* Background Radial Ambient Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-t from-cyan-500/10 via-purple-500/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Initiate Communication</span>
        </div>
        <h2 className="text-3xl sm:text-6xl font-black tracking-tight font-mono text-slate-100 uppercase">
          Let's Build Something <span className="text-gradient-cyan">Extraordinary</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl font-light">
          Whether discussing software engineering roles, technical projects, or algorithmic problems, my inbox is always open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact & Info (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Status & Location Pill */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 font-medium">
                  Available for Opportunities
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>{currentTime} IST</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Chaitanya Bharathi Institute of Technology (CBIT)</span>
              </div>
            </div>
          </div>

          {/* Quick Copy Contact Cards */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Direct Contact
            </div>

            {/* Academic Email */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-slate-400">Academic (CBIT)</div>
                  <div className="text-xs text-slate-200 font-mono truncate">{profile.emails.academic}</div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(profile.emails.academic, 'Academic Email')}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Copy Academic Email"
              >
                {copiedItem === 'Academic Email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Personal Email */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-slate-400">Personal Email</div>
                  <div className="text-xs text-slate-200 font-mono truncate">{profile.emails.personal}</div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(profile.emails.personal, 'Personal Email')}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Copy Personal Email"
              >
                {copiedItem === 'Personal Email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-slate-400">Mobile Phone</div>
                  <div className="text-xs text-slate-200 font-mono">{profile.phone}</div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(profile.phone, 'Phone')}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Copy Phone Number"
              >
                {copiedItem === 'Phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass-panel border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass-panel border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Transmission Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
            <h3 className="text-lg sm:text-xl font-bold text-white font-mono mb-2 flex items-center gap-2">
              <Send className="w-4 h-4 text-cyan-400" />
              <span>Send Message</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-light">
              Send a note directly. I typically respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Discuss an internship opportunity, project collaboration, or interview..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all duration-300 disabled:opacity-50 active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <span>Transmitting...</span>
                ) : isSent ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>Message Transmitted Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Direct Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
