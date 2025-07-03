import { BlogPosts } from "@/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-16 lg:px-16">
      <div className="mx-auto max-w-[48rem] pb-20 text-center">
        <h1 className="animate-fade-up pb-3 text-3xl leading-tight font-bold opacity-0 [animation-delay:200ms] md:text-4xl lg:text-5xl">
          Blog
        </h1>
        <p className="text-muted-foreground animate-fade-up opacity-0 [animation-delay:300ms]">
          Welcome to my blog! Here, I share insights on software development,
          technology trends, and lessons learned along the way.
        </p>
      </div>
      <BlogPosts />
    </section>
  );
}
