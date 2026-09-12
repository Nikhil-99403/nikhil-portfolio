import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, Copy, Check, ExternalLink, Mail, Phone, MapPin, Award } from 'lucide-react';
import { profile } from '../data/profile';
import { educationList, experienceList } from '../data/timeline';
import { projects } from '../data/projects';
import { skillCategories } from '../data/skills';
import { achievements } from '../data/achievements';
import { copyToClipboard } from '../utils/helpers';
import { soundEffects } from '../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundEffects.playClick();
    window.print();
  };

  const handleCopyText = async () => {
    soundEffects.playSuccess();
    const resumeText = `
KARROLLA NIKHIL
Email: ${profile.emails.academic} | ${profile.emails.personal}
Mobile: ${profile.phone}
LinkedIn: ${profile.socials.linkedin}
GitHub: ${profile.socials.github}

EDUCATION
• Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad, Telangana
  B.E. Computer Science and Engineering | CGPA: 8.64 | Aug 2024 – May 2028
• Narayana Junior College, Hyderabad, Telangana
  Class 12th | Percentage: 97.6% | March 2024
• Telangana State Model School, Cherial, Telangana
  Class 10th | CGPA: 10.0 | March 2022

PROJECTS
• Library Management System (Java / Python, MySQL / SQLite)
  - Developed a Library Management System to efficiently manage book records, issue/return operations, and user details using Java and MySQL.
  - Implemented CRUD operations and SQL queries to add, update, search, and delete book records, ensuring accurate tracking of book availability and transactions.
• Rock Paper Scissor Game (HTML, CSS, JavaScript)
  - Developed a classic Rock Paper Scissors game that can be played with computer.
  - Implemented HTML, CSS and JavaScript to manage game logic effectively.
• Todo List (HTML, CSS, JavaScript)
  - Developed a responsive To-Do List web application using HTML, CSS, and JavaScript to allow users to add, edit, delete, and manage daily tasks efficiently.

TECHNICAL SKILLS
• Languages: C, C++, Java, Python, JavaScript, HTML, CSS
• Database: MySQL
• Course Work: Data Structures, Object-Oriented Programming, Database Management Systems
• Developer Tools: Git, Bash, VS Code, AutoCAD

ACHIEVEMENTS
• Achieved a LeetCode on DSA

SOFT SKILLS
Communication, Team Work, Problem Solving, Time Management

VOLUNTEER EXPERIENCE
• Served as a volunteer for Department Event (Tecstasy) – CBIT
  Supported event management activities including participant registration and logistics coordination. Communicated with participants and helped ensure smooth execution of event activities.
`.trim();

    await copyToClipboard(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-semibold text-slate-100 font-mono">
                Resume Document — Karrolla Nikhil
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                title="Copy Resume Content as Plain Text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-slate-900" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 font-sans print:p-0 print:m-0 selection:bg-cyan-100 selection:text-cyan-900">
            {/* Header / Contact */}
            <div className="border-b-2 border-slate-900 pb-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 uppercase font-mono">
                  KARROLLA NIKHIL
                </h1>
                <div className="text-xs text-slate-700 font-mono text-left sm:text-right mt-1 sm:mt-0 space-y-0.5">
                  <p>Email: <a href={`mailto:${profile.emails.academic}`} className="underline text-blue-700">{profile.emails.academic}</a></p>
                  <p><a href={`mailto:${profile.emails.personal}`} className="underline text-blue-700">{profile.emails.personal}</a></p>
                  <p>Mobile: <span className="font-semibold">{profile.phone}</span></p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-slate-700">
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-600 underline">
                  <span>LinkedIn</span> <ExternalLink className="w-3 h-3" />
                </a>
                <a href={profile.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-600 underline">
                  <span>GitHub</span> <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Education */}
            <section className="mb-6">
              <h2 className="text-sm font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-3 font-mono">
                EDUCATION
              </h2>
              <div className="space-y-3 text-xs">
                {educationList.map((edu) => (
                  <div key={edu.id} className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                    <div>
                      <span className="font-bold text-slate-900">• {edu.institution}</span>, <span className="text-slate-700">{edu.location}</span>
                      <div className="text-slate-800 ml-3 italic">
                        {edu.degree}; <span className="font-semibold not-italic">{edu.scoreType}: {edu.score}</span>
                      </div>
                    </div>
                    <span className="font-mono text-slate-600 shrink-0 ml-3">{edu.duration}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="mb-6">
              <h2 className="text-sm font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-3 font-mono">
                PROJECTS
              </h2>
              <div className="space-y-4 text-xs">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">• {proj.title}</span>
                      <span className="font-mono text-slate-600 text-[11px]">({proj.technologies.slice(0, 4).join(', ')})</span>
                    </div>
                    <ul className="list-disc list-inside ml-3 mt-1 space-y-1 text-slate-700 leading-relaxed">
                      <li>{proj.summary}</li>
                      {proj.features.slice(0, 2).map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Skills */}
            <section className="mb-6">
              <h2 className="text-sm font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-3 font-mono">
                TECHNICAL SKILLS
              </h2>
              <div className="space-y-1.5 text-xs text-slate-800">
                <p>
                  <strong className="font-bold text-slate-950">• Languages:</strong> C, C++, Java, Python, JavaScript, HTML, CSS
                </p>
                <p>
                  <strong className="font-bold text-slate-950">• Database:</strong> MySQL
                </p>
                <p>
                  <strong className="font-bold text-slate-950">• Course Work:</strong> Data Structures, Object-Oriented Programming, Database Management Systems
                </p>
                <p>
                  <strong className="font-bold text-slate-950">• Developer Tools:</strong> Git, Bash, VS Code, AutoCAD
                </p>
              </div>
            </section>

            {/* Achievements */}
            <section className="mb-6">
              <h2 className="text-sm font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-3 font-mono">
                ACHIEVEMENTS
              </h2>
              <div className="text-xs text-slate-800 space-y-1">
                <p>• Achieved a LeetCode on DSA (Data Structures & Algorithms problem solving)</p>
              </div>
            </section>

            {/* Soft Skills */}
            <section className="mb-6">
              <h2 className="text-sm font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-3 font-mono">
                SOFT SKILLS
              </h2>
              <p className="text-xs text-slate-800">
                Communication, Team Work, Problem Solving, Time Management
              </p>
            </section>

            {/* Volunteer Experience */}
            <section>
              <h2 className="text-sm font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-3 font-mono">
                VOLUNTEER EXPERIENCE
              </h2>
              <div className="text-xs text-slate-800 space-y-1.5">
                <p className="font-bold text-slate-900">• Served as a volunteer for Department Event (Tecstasy) – CBIT</p>
                <p className="text-slate-700 ml-3">
                  Supported event management activities including participant registration and logistics coordination.
                </p>
                <p className="text-slate-700 ml-3">
                  Communicated with participants and helped ensure smooth execution of event activities.
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
