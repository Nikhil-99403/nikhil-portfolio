export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  duration: string;
  score: string;
  scoreType: "CGPA" | "Percentage";
  highlights: string[];
  badge: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  eventType: string;
  location: string;
  duration: string;
  responsibilities: string[];
  skillsApplied: string[];
}

export const educationList: EducationItem[] = [
  {
    id: "cbit-be",
    institution: "Chaitanya Bharathi Institute of Technology (CBIT)",
    degree: "B.E. in Computer Science and Engineering",
    location: "Hyderabad, Telangana",
    duration: "Aug. 2024 – May. 2028",
    score: "8.64",
    scoreType: "CGPA",
    highlights: [
      "Rigorous core curriculum in Data Structures, Object-Oriented Programming, and DBMS.",
      "Active participant in technical club activities and university hackathons.",
      "Maintaining a strong 8.64 CGPA in Computer Science & Engineering."
    ],
    badge: "Current Degree"
  },
  {
    id: "narayana-junior-college",
    institution: "Narayana Junior College",
    degree: "Class 12th (Intermediate / Senior Secondary)",
    location: "Hyderabad, Telangana",
    duration: "Completed March 2024",
    score: "97.6%",
    scoreType: "Percentage",
    highlights: [
      "Exceptional academic performance achieving 97.6% across Mathematics, Physics, and Chemistry.",
      "Strong foundation in quantitative problem solving, calculus, and analytical logic."
    ],
    badge: "Senior Secondary"
  },
  {
    id: "telangana-state-model-school",
    institution: "Telangana State Model School",
    degree: "Class 10th (Secondary School Certificate)",
    location: "Cherial, Telangana",
    duration: "Completed March 2022",
    score: "10.0",
    scoreType: "CGPA",
    highlights: [
      "Secured a flawless 10.0 CGPA across all secondary school subjects.",
      "Recognized for top academic ranking and active leadership in school science exhibitions."
    ],
    badge: "Secondary School"
  }
];

export const experienceList: ExperienceItem[] = [
  {
    id: "tecstasy-volunteer",
    role: "Department Event Volunteer",
    organization: "Tecstasy – CBIT (Department of Computer Science & Engineering)",
    eventType: "Annual Technical Symposium",
    location: "Hyderabad, Telangana",
    duration: "Department Event",
    responsibilities: [
      "Supported event management activities including participant registration and technical logistics coordination.",
      "Communicated with attendees and faculty to ensure smooth on-ground execution of competitive events.",
      "Collaborated with student committees to troubleshoot logistics, manage session timings, and coordinate participant desks."
    ],
    skillsApplied: ["Event Management", "Communication", "Team Coordination", "Logistics Execution", "Problem Solving"]
  }
];
