// data/projects.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Bunkers Bar & Grill Web App",
    description:
      "Developed a full-stack, responsive website for a local bar & grill using Next.js, with Sanity CMS as a headless backend, hosted on Vercel.",
    image: "/bunkers-logo.jpg",
    technologies: ["Next.js", "Sanity CMS", "Vercel"],
    liveUrl: "https://www.bunkersacc.com",
    // githubUrl omitted - icon won't render
    featured: true,
  },
  {
    id: "2",
    title: "YouTube Watch History Metrics",
    description:
      "Full-stack data analysis web app built with Python, FastAPI, htmx, TailwindCSS, and Redis, allowing users to upload and visualize YouTube watch histories.",
    image: "/yt-history.png",
    technologies: ["Python", "FastAPI", "htmx", "TailwindCSS", "Redis"],
    // liveUrl omitted - icon won't render
    githubUrl: "https://github.com/zodakzach/youtube-history-metrics",
    featured: true,
  },
  // …any more…
];

/** Returns all projects. */
export function getProjects(): Project[] {
  return projects;
}

/** Returns only those marked `featured: true`. */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
