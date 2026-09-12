export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  shortBio: string;
  fullBio: string[];
  location: string;
  college: string;
  degree: string;
  cgpa: string;
  emails: {
    academic: string;
    personal: string;
  };
  phone: string;
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
  };
  stats: {
    label: string;
    value: string;
    sublabel: string;
  }[];
}

export const profile: ProfileData = {
  name: "Karrolla Nikhil",
  role: "Computer Science Engineer & Software Developer",
  tagline: "Engineering efficient algorithms, relational databases, and modern interactive web experiences.",
  shortBio: "B.E. Computer Science & Engineering undergraduate at Chaitanya Bharathi Institute of Technology (CBIT). Strong foundation in Data Structures, OOP, and full-stack software development.",
  fullBio: [
    "I am a Computer Science and Engineering undergraduate at Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad. Driven by curiosity and analytical rigor, I specialize in core computing principles — from algorithms and data structures to relational database design and full-stack development.",
    "My academic journey reflects a sustained commitment to excellence, achieving a 10.0 CGPA in Class 10th, 97.6% in Class 12th, and currently maintaining an 8.64 CGPA in B.E. Computer Science.",
    "Beyond coursework, I actively solve algorithmic challenges on LeetCode, develop full-lifecycle software applications using Java, Python, and JavaScript, and contribute to collaborative technical department events like Tecstasy at CBIT."
  ],
  location: "Hyderabad, Telangana, India",
  college: "Chaitanya Bharathi Institute of Technology (CBIT)",
  degree: "B.E. Computer Science and Engineering",
  cgpa: "8.64",
  emails: {
    academic: "ugs24041_cse.karrolla@cbit.org.in",
    personal: "nikhil99403@gmail.com"
  },
  phone: "+91 9182599403",
  socials: {
    github: "https://github.com/Nikhil-99403",
    linkedin: "https://linkedin.com/in/karrolla-nikhil",
    leetcode: "https://leetcode.com"
  },
  stats: [
    { label: "B.E. CGPA", value: "8.64", sublabel: "CBIT Computer Science" },
    { label: "Class 12th", value: "97.6%", sublabel: "Narayana Junior College" },
    { label: "Class 10th", value: "10.0", sublabel: "TS Model School CGPA" },
    { label: "Problem Solving", value: "DSA", sublabel: "LeetCode Milestone" }
  ]
};
