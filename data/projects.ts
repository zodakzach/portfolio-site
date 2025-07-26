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
    technologies: [
      "Next.js",
      "Sanity CMS",
      "Vercel",
      "TailwindCSS",
      "Shadcn",
      "Motion",
    ],
    liveUrl: "https://www.bunkersacc.com",
    // githubUrl omitted - icon won't render
    featured: true,
  },
  {
    id: "2",
    title: "YouTube Comments AI Analyzer",
    description:
      "A FastAPI web app that lets users input a YouTube video URL and receive an AI-generated summary and sentiment analysis of its comments. Uses HTMX for fast, interactive updates and includes a chat interface where users can ask questions, with answers powered by semantic search over relevant comments.",
    image: "/yt-comments-ai-analyzer.png", // Ensure this exists in your public folder
    technologies: ["FastAPI", "HTMX", "OpenAI", "Redis", "Jinja2", "Uvicorn"],
    githubUrl: "https://github.com/zodakzach/yt-comments-ai-analyzer",
    featured: true,
  },
  {
    id: "3",
    title: "YouTube Watch History Metrics",
    description:
      "Full-stack data analysis web app built with Python, FastAPI, htmx, TailwindCSS, and Redis, allowing users to upload and visualize YouTube watch histories.",
    image: "/yt-history.png",
    technologies: ["Python", "FastAPI", "htmx", "TailwindCSS", "Redis"],
    // liveUrl omitted - icon won't render
    githubUrl: "https://github.com/zodakzach/youtube-history-metrics",
    featured: false,
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
