export interface AchievementItem {
  id: string;
  title: string;
  category: string;
  platform: string;
  description: string;
  keyHighlights: string[];
  metrics: { label: string; value: string };
  badge: string;
}

export const achievements: AchievementItem[] = [
  {
    id: "leetcode-dsa",
    title: "LeetCode Data Structures & Algorithms Milestone",
    category: "Algorithmic Problem Solving",
    platform: "LeetCode",
    description: "Actively solving algorithmic problems and honing mastery across fundamental and advanced data structures on LeetCode.",
    keyHighlights: [
      "Mastery of Arrays, Strings, Two Pointers, Sliding Window, and Hash Maps.",
      "Implementation of Linked Lists, Binary Search Trees, and Graph Traversal algorithms.",
      "Focus on time-efficient and space-optimal computational complexity."
    ],
    metrics: { label: "Focus Area", value: "DSA Problem Solving" },
    badge: "Algorithmic Mastery"
  }
];
