import { getProjects } from "@/data/projects";
import ProjectCard from "@/components/project-card";
import { PageHeader } from "@/components/page-header";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <PageHeader
        title="Project Showcase"
        description="Explore my projects that demonstrate my skills in software development, design, and problem-solving."
      />

      <section className="container mx-auto mb-16 grid grid-cols-1 gap-8 px-4 lg:grid-cols-2 lg:px-16">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </>
  );
}
