import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export default function BlogPreview() {
  const allBlogs = getBlogPosts();
  const recentPosts = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .slice(0, 3);

  return (
    <section className="bg-muted dark:bg-muted/30 container mx-auto px-4 py-16 lg:px-16">
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
        {recentPosts.map((post) => (
          <Card
            key={post.slug}
            className="group bg-background dark:bg-card transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                {formatDate(post.metadata.publishedAt)}
                <Clock className="ml-2 h-4 w-4" />5 min read
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {post.metadata.summary}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {post.slug.includes("typescript")
                    ? "TypeScript"
                    : post.slug.includes("vim")
                      ? "Tools"
                      : post.slug.includes("spaces")
                        ? "Best Practices"
                        : "Development"}
                </Badge>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
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
    </section>
  );
}
