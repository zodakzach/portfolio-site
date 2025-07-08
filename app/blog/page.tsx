import { PageHeader } from "@/components/page-header";
import { BlogPosts } from "@/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="Blog"
        description="Welcome to my blog! Here, I share insights on software development, technology trends, and lessons learned along the way."
      />
      <section className="container mx-auto flex flex-col items-center px-4 pb-16 lg:px-16">
        <BlogPosts />
      </section>
    </>
  );
}
