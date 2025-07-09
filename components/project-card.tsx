import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Globe } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
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
            {project.githubUrl && (
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="default">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
