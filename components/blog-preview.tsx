import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getBlogPosts, toGridPostData } from "app/blog/utils";
import GridPost from "@/components/post-card";
import type { GridPostData } from "@/types/blog";

export default function BlogPreview() {
  // 1) load + sort + take 3 most recent
  const allBlogs = getBlogPosts();
  const recentPosts = allBlogs
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    )
    .slice(0, 3);

  // 2) map into the shape GridPost expects
  const recentGridPosts: GridPostData[] = recentPosts.map((p) =>
    toGridPostData({ metadata: p.metadata, slug: p.slug }),
  );

  return (
    <section className="bg-muted dark:bg-muted/30">
      <div className="container mx-auto px-4 py-16 lg:px-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Latest from the Blog
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Thoughts on software development, technology trends, and lessons
            learned along the way
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentGridPosts.map((post) => (
            <GridPost key={post.slug.current} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild>
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
