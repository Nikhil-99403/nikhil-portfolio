# Karrolla Nikhil — Futuristic 3D Developer Portfolio

A developer portfolio website designed with 2026 creative-studio aesthetics, interactive Three.js 3D graphics, smooth Framer Motion interactions, and structured data strictly grounded in Karrolla Nikhil's verified resume.

---

## ⚡ Tech Stack & Architecture

- **Core Framework**: React 18 + TypeScript + Vite
- **3D Graphics & WebGL**: Three.js (Procedural 3D Icosahedron Core, ambient particle networks, interactive project visualizers)
- **Styling**: Tailwind CSS + Custom Void & Lumina Glassmorphism Design System
- **Animation & Physics**: Framer Motion (magnetic physics, scroll animations, layout transitions)
- **Audio Feedback**: Web Audio API Procedural Synthesizer (muted by default with global toggle)
- **Spotlight Search**: Full Command Palette (`⌘K` / `Ctrl+K`)
- **Document Viewer**: In-browser Interactive Resume Modal with 1-click print and PDF generation

---

## 🚀 Quick Start

### 1. Development Server
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### 2. Production Build
```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── three/
│   │   ├── HeroScene.tsx            # 3D Cybernetic icosahedron with mouse-reactive gyro
│   │   ├── BackgroundParticles.tsx  # Ambient cosmic constellation canvas
│   │   └── ProjectVisualCanvas.tsx  # Abstract 3D visualizers for each case study
│   ├── CommandPalette.tsx           # Spotlight search (Cmd+K)
│   ├── CustomCursor.tsx             # Adaptive magnetic cursor with context states
│   ├── Footer.tsx                   # Minimal footer with back-to-top
│   ├── Navbar.tsx                   # Floating glassmorphic navigation bar
│   ├── ResumeModal.tsx              # Complete in-browser resume viewer with print
│   ├── ScrollProgress.tsx           # Scroll percentage bar & chapter tracker
│   ├── SocialIcons.tsx              # Native vector SVG icons
│   └── TiltCard.tsx                 # 3D Gyroscope tilt with dynamic mouse glow
├── data/
│   ├── profile.ts                   # Karrolla Nikhil's bio, education, contact info
│   ├── projects.ts                  # Detailed project case studies
│   ├── skills.ts                    # Technical skills, DBMS, and core coursework
│   ├── timeline.ts                  # Education & Tecstasy CBIT volunteer history
│   └── achievements.ts              # LeetCode DSA milestone
├── sections/
│   ├── Hero.tsx                     # Cinematic 3D intro with metrics
│   ├── About.tsx                    # Engineering foundation & academic track record
│   ├── Skills.tsx                   # Interactive skills matrix with filters
│   ├── Projects.tsx                 # Project showcase with 3D tilt cards
│   ├── ProjectDetailModal.tsx       # Deep-dive architecture & code viewer
│   ├── ExperienceEducation.tsx      # Chronological illuminated timeline
│   ├── Achievements.tsx             # LeetCode DSA achievement & confetti trigger
│   └── Contact.tsx                  # Transmission form, copy email/phone, live IST clock
└── utils/
    ├── helpers.ts                   # Class merging & clipboard utility
    └── sound.ts                     # Web Audio API micro-interaction sound generator
```

---

## 🎯 Verified Resume Source of Truth

- **Name**: Karrolla Nikhil
- **Institution**: Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad
- **Degree**: B.E. Computer Science and Engineering (2024 – 2028), CGPA 8.64
- **Senior Secondary**: Narayana Junior College, 97.6% (2024)
- **Secondary School**: Telangana State Model School, CGPA 10.0 (2022)
- **Projects**:
  - Library Management System (Java, MySQL, SQLite, Python)
  - Rock Paper Scissor Game (HTML5, CSS3, JavaScript)
  - Responsive To-Do List Application (HTML5, CSS3, JavaScript)
- **Core Coursework**: Data Structures, OOP, DBMS
- **Skills**: C, C++, Java, Python, JavaScript, HTML, CSS, MySQL, Git, Bash, VS Code, AutoCAD
- **Volunteer Experience**: Tecstasy – CBIT Department Event Volunteer
