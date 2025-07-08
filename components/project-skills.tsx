"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ExternalLink } from "lucide-react";
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
      <div className="pb-16">
        <div className="pb-12 text-center">
          <h2 className="pb-4 text-3xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            A selection of projects that showcase my development skills and
            problem-solving approach
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 pb-8 lg:grid-cols-2">
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

      {/* Skills Section - Split Layout */}
      <div className="grid grid-cols-1 gap-12 pt-16 lg:grid-cols-2 lg:gap-20">
        {/* Left Side - Sticky Content */}
        <div className="flex flex-col justify-start lg:py-16">
          <div className="flex flex-col items-start lg:sticky lg:top-56">
            {/* Tag line */}
            <div className="bg-primary/10 text-primary mb-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
              Technical Expertise
            </div>

            <h2 className="my-4 text-3xl leading-[1.2] font-semibold tracking-tight">
              Skills & Technologies
            </h2>

            <p className="text-muted-foreground mb-6 text-lg">
              My technical expertise across different areas of software
              development, from frontend frameworks to backend systems and
              everything in between.
            </p>

            {/* Additional content options */}

            {/* Stats */}
            <div className="mb-6 grid w-full grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">2+</div>
                <div className="text-muted-foreground text-sm">
                  Years Experience
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-muted-foreground text-sm">
                  Technologies
                </div>
              </div>
            </div>

            {/* Key highlights */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary h-2 w-2 rounded-full"></div>
                <span className="text-sm">Full-stack development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary h-2 w-2 rounded-full"></div>
                <span className="text-sm">Modern frameworks & libraries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary h-2 w-2 rounded-full"></div>
                <span className="text-sm">Cloud & deployment</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/contact">
                Let's Work Together
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Side - Skills Cards */}
        <div className="flex flex-col justify-center gap-6">
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
