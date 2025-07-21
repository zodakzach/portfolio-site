import BlogPreview from "@/components/blog-preview";
import ContactSection from "@/components/contact-section";
import GitHubActivity from "@/components/github-activity";
import Hero from "@/components/hero";
import LogoCloud from "@/components/logo-cloud";
import ProjectsSkills from "@/components/project-skills";
import { fetchGitHubActivity, fetchMostUsedLanguages } from "@/lib/github";

// Daily revalidation - data refreshes once per day
export const revalidate = 86400; // 24 hours in seconds

export default async function Page() {
  const [github_calendar, mostUsedLanguages] = await Promise.all([
    fetchGitHubActivity(),
    fetchMostUsedLanguages(),
  ]);

  return (
    <>
      <Hero
        tagLine="Hello there, I’m"
        title="Zachary Cervenka"
        body={
          <p>
            A software engineer dedicated to creating modern web experiences and
            transforming data into meaningful insights.
          </p>
        }
        image={{
          url: "/hero-image.png",
          alt: "Illustration of a cartoon character of Zachary Cervenka working on a laptop",
          asset: {
            metadata: {
              dimensions: { width: 800, height: 600 },
              lqip: "data:image/png;base64,iVBORw0KGgoAAAANS…",
            },
          },
        }}
        links={[
          { title: "Get In Touch", href: "/contact", buttonVariant: "default" },
          { title: "Projects", href: "/projects", buttonVariant: "outline" },
        ]}
      />

      <LogoCloud
        title="Using Modern Technologies"
        images={[
          {
            asset: {
              _id: "1",
              url: "/logos/vercel.svg",
              metadata: {
                lqip: "data:image/svg+xml;base64,PHN2ZyB4...etc",
                mimeType: "image/svg+xml",
                dimensions: { width: 120, height: 40 },
              },
            },
            alt: "Vercel Logo",
          },
          {
            asset: {
              _id: "2",
              url: "/logos/next-js.svg",
              metadata: {
                lqip: "data:image/svg+xml;base64,PHN2ZyB4...etc",
                mimeType: "image/svg+xml",
                dimensions: { width: 100, height: 100 },
              },
            },
            alt: "Next.js Logo",
          },
          {
            asset: {
              _id: "3",
              url: "/logos/tailwind-css.svg",
              metadata: {
                lqip: "data:image/svg+xml;base64,PHN2ZyB4...etc",
                mimeType: "image/svg+xml",
                dimensions: { width: 100, height: 100 },
              },
            },
            alt: "TailwindCSS Logo",
          },
          {
            asset: {
              _id: "4",
              url: "/logos/shadcn.svg",
              metadata: {
                lqip: "data:image/svg+xml;base64,PHN2ZyB4...etc",
                mimeType: "image/svg+xml",
                dimensions: { width: 100, height: 100 },
              },
            },
            alt: "Shadcn Logo",
          },
          {
            asset: {
              _id: "5",
              url: "/logos/sanity.svg",
              metadata: {
                lqip: "data:image/svg+xml;base64,PHN2ZyB4...etc",
                mimeType: "image/svg+xml",
                dimensions: { width: 100, height: 100 },
              },
            },
            alt: "Sanity Logo",
          },
          {
            asset: {
              _id: "6",
              url: "/logos/react.svg",
              metadata: {
                lqip: "data:image/svg+xml;base64,PHN2ZyB4...etc",
                mimeType: "image/svg+xml",
                dimensions: { width: 100, height: 100 },
              },
            },
            alt: "React Logo",
          },
        ]}
      />
      <GitHubActivity
        calendar={github_calendar}
        topLanguages={mostUsedLanguages}
      />
      <ProjectsSkills />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
