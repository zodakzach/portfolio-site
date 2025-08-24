import { formatDate, getBlogPosts, toGridPostData } from "app/blog/utils";
import GridPost from "@/components/post-card";
import type { GridPostData } from "@/types/blog";

export function BlogPosts() {
  // 1) load and sort all posts by publishedAt desc
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  return (
    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(({ metadata, slug }) => {
        const postData: GridPostData = toGridPostData({ metadata, slug });

        return (
          <div key={slug} className="flex flex-col space-y-2">
            <p className="text-muted-foreground text-sm">
              {formatDate(metadata.publishedAt, false)}
            </p>
            <GridPost post={postData} />
          </div>
        );
      })}
    </div>
  );
}
