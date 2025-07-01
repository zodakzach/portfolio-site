import Hero from "@/components/hero";

export default function Page() {
  return (
    <>
      <Hero
        tagLine="Hello there, I’m"
        title="Zachary Cervenka"
        body={
          <p>
            I’m a software engineer passionate about building modern web
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
    </>
  );
}
