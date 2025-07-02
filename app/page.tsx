import Hero from "@/components/hero";
import LogoCloud from "@/components/logo-cloud";

export default function Page() {
  return (
    <>
      <Hero
        tagLine="Hello there, I’m"
        title="Zachary Cervenka"
        body={
          <p>
            A software engineer passionate about building modern web
            applications.
          </p>
        }
        image={{
          url: "/hero-image.png",
          alt: "Illustration of people building something",
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
    </>
  );
}
