// data/skills.ts

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export const skills: Skill[] = [
  { name: "JavaScript/TypeScript", level: 95, category: "Frontend" },
  { name: "React/Next.js", level: 90, category: "Frontend" },
  { name: "Svelte", level: 80, category: "Frontend" },
  { name: "TailwindCSS", level: 85, category: "Frontend" },
  { name: "Python", level: 90, category: "Backend" },
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "Go", level: 75, category: "Backend" },
  { name: "C#", level: 70, category: "Backend" },
  { name: "Java", level: 65, category: "Backend" },
  { name: "C", level: 60, category: "Backend" },
  { name: "PostgreSQL", level: 85, category: "Database" },
  { name: "MongoDB", level: 80, category: "Database" },
  { name: "Neo4j", level: 70, category: "Database" },
  { name: "SQLite", level: 75, category: "Database" },
  { name: "AWS", level: 80, category: "DevOps" },
  { name: "GCP", level: 75, category: "DevOps" },
  { name: "Vercel", level: 85, category: "DevOps" },
  { name: "Git/GitHub/GitLab", level: 80, category: "DevOps" },
  { name: "Django", level: 85, category: "API" },
  { name: "FastAPI", level: 90, category: "API" },
  { name: "Flask", level: 80, category: "API" },
];

export const skillCategories = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "API",
] as const;

export function getSkills(): Skill[] {
  return skills;
}

export function getSkillCategories(): readonly (typeof skillCategories)[number][] {
  return [...skillCategories];
}

export function getSkillsByCategory(category: string): Skill[] {
  return skills.filter((s) => s.category === category);
}
