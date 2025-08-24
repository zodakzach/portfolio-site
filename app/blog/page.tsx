import { PageHeader } from "@/components/page-header";
import { BlogPosts } from "@/components/posts";
import { Button } from "@/components/ui/button";
import { Rss } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my blog.",
  alternates: {
    types: {
      "application/rss+xml": "/rss",
    },
  },
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="Blog"
        description="Welcome to my blog! Here, I share insights on software development, technology trends, and lessons learned along the way."
      />
      <section className="container mx-auto flex flex-col items-center px-4 pb-16 lg:px-16">
        <div className="mb-6 w-full">
          <div className="flex justify-end">
            <Button variant="outline" asChild>
              <a href="/rss" target="_blank" rel="noopener noreferrer">
                <Rss aria-hidden="true" className="h-4 w-4" />
                Subscribe via RSS
              </a>
            </Button>
          </div>
        </div>
        <BlogPosts />
      </section>
    </>
  );
}
