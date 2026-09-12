export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  accentColor: string;
  skills: {
    name: string;
    level: string;
    details: string;
    tag?: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core languages for systems, object-oriented software, scripting, and web interfaces.",
    iconName: "Code2",
    accentColor: "from-cyan-500 to-blue-500",
    skills: [
      { name: "C", level: "Core Systems", details: "Pointers, memory allocation, low-level data structures" },
      { name: "C++", level: "Algorithms & OOP", details: "STL, templates, competitive problem solving, time complexity" },
      { name: "Java", level: "Enterprise & OOP", details: "Classes, inheritance, JDBC, collections framework, exception handling" },
      { name: "Python", level: "Scripting & Data", details: "Automation, data processing, backend scripting, SQLite integrations" },
      { name: "JavaScript", level: "Modern ES6+", details: "Async/await, DOM APIs, event loop, functional programming" },
      { name: "HTML5", level: "Semantic Markup", details: "Accessible structures, canvas, responsive viewport architecture" },
      { name: "CSS3", level: "Responsive Styling", details: "Flexbox, CSS Grid, custom keyframes, modern design systems" }
    ]
  },
  {
    title: "Databases & Storage",
    description: "Relational schema engineering, queries, indexing, and transactional operations.",
    iconName: "Database",
    accentColor: "from-blue-500 to-indigo-500",
    skills: [
      { name: "MySQL", level: "Relational DBMS", details: "Complex JOINs, indexing, normalization (1NF-3NF), ACID transactions, constraints" },
      { name: "SQLite", level: "Embedded Database", details: "Lightweight file-based database for local applications and prototyping" },
      { name: "SQL Queries", level: "Data Manipulation", details: "Aggregations, subqueries, group by, DDL/DML operational scripting" }
    ]
  },
  {
    title: "Core Computer Science Coursework",
    description: "Foundational academic curriculum underpinning robust software engineering.",
    iconName: "Binary",
    accentColor: "from-violet-500 to-purple-500",
    skills: [
      { name: "Data Structures", level: "Curriculum & LeetCode", details: "Arrays, Linked Lists, Stacks, Queues, Trees, Hash Tables, Graphs", tag: "Primary Focus" },
      { name: "Object-Oriented Programming (OOP)", level: "Design Principles", details: "Encapsulation, Inheritance, Polymorphism, Abstraction, Design Patterns" },
      { name: "Database Management Systems (DBMS)", level: "Relational Theory", details: "ER Modeling, Relational Algebra, Query Optimization, Concurrency Control" }
    ]
  },
  {
    title: "Developer Tools & Environments",
    description: "Tools for version control, terminal automation, development, and modeling.",
    iconName: "Wrench",
    accentColor: "from-emerald-500 to-teal-500",
    skills: [
      { name: "Git", level: "Version Control", details: "Branching workflows, commits, pull requests, merge conflict resolution" },
      { name: "Bash / Terminal", level: "Command Line", details: "Shell scripts, file manipulation, pipeline streams, automation" },
      { name: "VS Code", level: "Primary IDE", details: "Debugging configurations, extensions, multi-root workspace management" },
      { name: "AutoCAD", level: "Drafting & Modeling", details: "Geometric precision modeling, coordinate drafting, technical plans" }
    ]
  },
  {
    title: "Professional & Soft Skills",
    description: "Interpersonal communication and execution strengths recognized in leadership and team projects.",
    iconName: "Sparkles",
    accentColor: "from-amber-500 to-orange-500",
    skills: [
      { name: "Problem Solving", level: "Analytical Rigor", details: "Algorithmic thinking, methodical debugging, edge-case analysis" },
      { name: "Team Work", level: "Collaborative Spirit", details: "Cross-functional coordination, event organization at CBIT Tecstasy" },
      { name: "Communication", level: "Articulate & Clear", details: "Technical documentation, participant communication, reporting" },
      { name: "Time Management", level: "Disciplined Delivery", details: "Balancing university coursework, coding projects, and event logistics" }
    ]
  }
];
