"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import ProjectCard from "@/components/project-card";
import { getFeaturedProjects } from "@/data/projects";
import { getSkillCategories, getSkillsByCategory } from "@/data/skills";

export default function ProjectsSkills() {
  const featuredProjects = getFeaturedProjects();
  const skillCategories = getSkillCategories();

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
            <ProjectCard key={project.id} project={project} />
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
                {getSkillsByCategory(category).map((skill) => (
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
