import { formatDate, getBlogPosts } from "app/blog/utils";
import GridPost, { GridPostData } from "@/components/post-card";

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
        // 2) build the shape GridPost expects
        const postData: GridPostData = {
          title: metadata.title,
          slug: { current: slug },
          excerpt: metadata.summary,
          image: metadata.image
            ? { src: metadata.image, alt: metadata.title, lqip: undefined }
            : undefined,
          categories: metadata.categories ?? [],
        };

        return (
          <div key={slug} className="flex flex-col space-y-2">
            {/* 3) date above the card */}
            <p className="text-muted-foreground text-sm">
              {formatDate(metadata.publishedAt, false)}
            </p>

            {/* 4) your reusable card */}
            <GridPost post={postData} />
          </div>
        );
      })}
    </div>
  );
}
