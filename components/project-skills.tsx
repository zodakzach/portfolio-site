"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Github, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: "1",
    title: "Bunkers Bar & Grill Web App",
    description:
      "Developed a full-stack, responsive website for a local bar & grill using Next.js, with Sanity CMS as a headless backend, hosted on Vercel.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["Next.js", "Sanity CMS", "Vercel"],
    liveUrl: "#",
    githubUrl: "https://github.com/zodakzach/bunkers-bar-grill-web-app",
    featured: true,
  },
  {
    id: "2",
    title: "YouTube Watch History Metrics",
    description:
      "Full-stack data analysis web app built with Python, FastAPI, htmx, TailwindCSS, and Redis, allowing users to upload and visualize YouTube watch histories.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["Python", "FastAPI", "htmx", "TailwindCSS", "Redis"],
    liveUrl: "#",
    githubUrl: "https://github.com/zodakzach/youtube-watch-history-metrics",
    featured: true,
  },
];

const skills = [
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

const skillCategories = ["Frontend", "Backend", "Database", "DevOps", "API"];

export default function ProjectsSkills() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section className="container mx-auto px-4 py-16 lg:px-16">
      {/* Projects Section */}
      <div className="mb-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            A selection of projects that showcase my development skills and
            problem-solving approach
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {project.title}
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/projects">
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Skills Section */}
      <div>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            My technical expertise across different areas of software
            development
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
