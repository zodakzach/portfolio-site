import { getProjects } from "@/data/projects";
import ProjectCard from "@/components/project-card";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <div className="mx-auto max-w-[48rem] px-4 py-16 text-center lg:px-16">
        <h1 className="animate-fade-up pb-3 text-3xl leading-tight font-bold opacity-0 [animation-delay:100ms] md:text-4xl lg:text-5xl">
          Project Showcase
        </h1>
        <p className="text-muted-foreground animate-fade-up opacity-0 [animation-delay:200ms]">
          Explore my projects that demonstrate my skills in software
          development, design, and problem-solving.
        </p>
      </div>

      <div className="container mx-auto mb-16 grid grid-cols-1 gap-8 px-4 lg:grid-cols-2 lg:px-16">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
