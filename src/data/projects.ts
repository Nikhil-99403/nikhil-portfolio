export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Systems & Database" | "Web Applications" | "Algorithms & Logic";
  summary: string;
  technologies: string[];
  features: string[];
  problem: string;
  solution: string;
  architecture: string[];
  results: string[];
  codeSnippet?: {
    language: string;
    code: string;
    caption: string;
  };
  metrics: { label: string; value: string }[];
  githubUrl: string;
  demoUrl?: string;
  badge: string;
  themeColor: string;
}

export const projects: ProjectItem[] = [
  {
    id: "library-management-system",
    title: "Library Management System",
    subtitle: "Enterprise book record cataloging, user management, and transactional tracking.",
    category: "Systems & Database",
    summary: "Developed a comprehensive Library Management System to efficiently manage book records, issue/return operations, and user details using Java and MySQL, improving the organization and retrieval of library data.",
    technologies: ["Java", "MySQL", "SQLite", "Python", "JDBC", "SQL"],
    features: [
      "CRUD Operations: Full lifecycle creation, retrieval, updates, and deletion of library book records.",
      "Issue & Return Engine: Automated date logging, borrower association, and status updates.",
      "Fine & Overdue Tracking: Precise calculation of overdue days and automated penalty records.",
      "Optimized SQL Queries: Indexed search by Book ID, Title, Author, Category, and Availability.",
      "Data Integrity: Foreign key constraints and transactional integrity preventing phantom checkouts."
    ],
    problem: "Manual library paper logs and unindexed files lead to lost book records, scheduling conflicts, inaccurate inventory levels, and tedious manual reconciliation.",
    solution: "Architected a relational database schema in MySQL/SQLite paired with modular Java service handlers and prepared SQL queries, providing instant search, atomicity in book issue/return workflows, and error handling.",
    architecture: [
      "Relational Schema: Normalized tables for Books, Members, Transactions, and Fines.",
      "DAO Pattern: Data Access Object layer decoupling SQL persistence from business logic.",
      "Transactional Isolation: ACID-compliant book borrowing sessions to prevent double checkouts.",
      "Extensibility: Adaptable backend drivers supporting both MySQL server and SQLite local storage."
    ],
    results: [
      "Sub-millisecond query execution on indexed book catalog searches.",
      "Zero phantom checkouts via relational foreign-key constraints.",
      "Modular Java architecture enabling clean updates and unit testability."
    ],
    codeSnippet: {
      language: "java",
      caption: "Java JDBC Prepared Transaction for Book Issue",
      code: `// Atomically issue book to student with status verification
public boolean issueBook(int bookId, int studentId) throws SQLException {
    String checkSql = "SELECT status FROM books WHERE id = ? FOR UPDATE";
    String issueSql = "INSERT INTO transactions (book_id, student_id, issue_date, status) VALUES (?, ?, CURRENT_DATE, 'ISSUED')";
    String updateBook = "UPDATE books SET status = 'BORROWED' WHERE id = ?";
    
    connection.setAutoCommit(false);
    try (PreparedStatement checkStmt = connection.prepareStatement(checkSql);
         PreparedStatement issueStmt = connection.prepareStatement(issueSql);
         PreparedStatement updateStmt = connection.prepareStatement(updateBook)) {
        
        checkStmt.setInt(1, bookId);
        ResultSet rs = checkStmt.executeQuery();
        if (rs.next() && "AVAILABLE".equals(rs.getString("status"))) {
            issueStmt.setInt(1, bookId);
            issueStmt.setInt(2, studentId);
            issueStmt.executeUpdate();

            updateStmt.setInt(1, bookId);
            updateStmt.executeUpdate();

            connection.commit();
            return true;
        }
        connection.rollback();
        return false;
    } catch (SQLException ex) {
        connection.rollback();
        throw ex;
    }
}`
    },
    metrics: [
      { label: "Core Stack", value: "Java + MySQL" },
      { label: "Architecture", value: "CRUD / DAO" },
      { label: "Data Integrity", value: "ACID Compliant" }
    ],
    githubUrl: "https://github.com/Nikhil-99403/Library-Management-System",
    badge: "Database System",
    themeColor: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "rock-paper-scissor",
    title: "Rock Paper Scissor Game",
    subtitle: "Interactive state-driven classic game with computer logic and animations.",
    category: "Algorithms & Logic",
    summary: "Developed a classic Rock Paper Scissors game that can be played with computer. Implemented HTML, CSS, and JavaScript to manage game logic effectively, providing responsive visual feedback and score analytics.",
    technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "DOM API"],
    features: [
      "Intelligent Decision Heuristic: Computer opponent logic utilizing randomized seed selection.",
      "Dynamic Game State Machine: Instant round evaluation (Win, Loss, Tie) with visual indicators.",
      "Live Scoreboard & Persistence: Real-time round tallying, high-score tracking, and match reset.",
      "Interactive Visual Feedback: Hand gesture animations, glow highlights, and shake physics on choice reveal.",
      "Full Keyboard & Touch Accessibility: Playable via keyboard shortcuts (R, P, S) or touch."
    ],
    problem: "Simple browser implementations frequently suffer from jarring page reloads, unoptimized DOM mutations, and sluggish UI state feedback.",
    solution: "Engineered an event-driven JavaScript state engine that decouples game logic from DOM rendering, updating round states smoothly with CSS keyframes and zero layout thrashing.",
    architecture: [
      "State Controller: Pure functions calculating outcomes based on cyclical matrix rules (Rock > Scissor > Paper > Rock).",
      "DOM Renderer: RequestAnimationFrame-aligned updates with GPU-accelerated CSS animations.",
      "Audio-Visual Feedback: Synthetic audio effects and particle bursts upon round victory."
    ],
    results: [
      "Smooth 60fps animations on choice reveals and score changes.",
      "Zero dependencies, purely native modern JavaScript and semantic DOM.",
      "Cross-device responsiveness from mobile screens to 4K displays."
    ],
    codeSnippet: {
      language: "javascript",
      caption: "Cyclical Winner Decision Algorithm",
      code: `// Modular outcome matrix for Rock, Paper, Scissors
const CHOICES = ['rock', 'paper', 'scissors'];
const WIN_CONDITIONS = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
};

function playRound(playerChoice) {
  const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
  
  if (playerChoice === computerChoice) {
    return { outcome: 'tie', player: playerChoice, cpu: computerChoice };
  }
  
  const hasPlayerWon = WIN_CONDITIONS[playerChoice] === computerChoice;
  return {
    outcome: hasPlayerWon ? 'win' : 'loss',
    player: playerChoice,
    cpu: computerChoice
  };
}`
    },
    metrics: [
      { label: "Engine", value: "Pure JS ES6+" },
      { label: "Framerate", value: "60 FPS" },
      { label: "Responsiveness", value: "100% Fluid" }
    ],
    githubUrl: "https://github.com/Nikhil-99403/Rock-Paper-Scissor-Game",
    badge: "Interactive Game",
    themeColor: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "todo-list-app",
    title: "Responsive To-Do List Application",
    subtitle: "High-performance task management application with local storage persistence.",
    category: "Web Applications",
    summary: "Developed a responsive To-Do List web application using HTML, CSS, and JavaScript to allow users to add, edit, delete, and manage daily tasks efficiently with zero friction.",
    technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "Web Storage API"],
    features: [
      "Task CRUD Engine: Instant task addition, inline editing, toggle completion, and deletion.",
      "Category & Status Filters: View tasks by All, Active, and Completed with count badges.",
      "Local Storage Synchronization: Automatic serialization ensuring tasks persist across sessions.",
      "Keyboard Ergonomics: Quick-add tasks with Enter key and escape to cancel inline edits.",
      "Fluid Animations: Smooth entry and exit transitions for list items using CSS transitions."
    ],
    problem: "Daily task workflows require immediate input response, persistent state across browser reloads, and intuitive mobile ergonomics.",
    solution: "Built a ultra-lean, client-side web application leveraging browser LocalStorage, optimized event delegation, and accessible keyboard-first navigation.",
    architecture: [
      "Event Delegation: Single listener on container reducing memory overhead.",
      "Persistence Layer: JSON serialization to localStorage with schema validation.",
      "CSS Grid & Flexbox: Mobile-first layout with clean dark/light responsive styling."
    ],
    results: [
      "Instant 0ms latency on all task operations.",
      "Zero bundle bloat with 100% vanilla web standards.",
      "Reliable offline persistence across browser sessions."
    ],
    codeSnippet: {
      language: "javascript",
      caption: "Event Delegation & LocalStorage Task Handler",
      code: `// Lightweight Task Store with localStorage persistence
class TaskStore {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('nikhil_tasks') || '[]');
  }
  
  addTask(title) {
    const newTask = {
      id: Date.now().toString(36),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.tasks.unshift(newTask);
    this.save();
    return newTask;
  }
  
  toggleTask(id) {
    const item = this.tasks.find(t => t.id === id);
    if (item) {
      item.completed = !item.completed;
      this.save();
    }
  }
  
  save() {
    localStorage.setItem('nikhil_tasks', JSON.stringify(this.tasks));
  }
}`
    },
    metrics: [
      { label: "Storage", value: "LocalStorage" },
      { label: "Latency", value: "0ms Local" },
      { label: "UI Design", value: "Adaptive CSS" }
    ],
    githubUrl: "https://github.com/Nikhil-99403/Todo-List",
    badge: "Web Application",
    themeColor: "from-emerald-500/20 to-teal-500/20"
  }
];
