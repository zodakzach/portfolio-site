import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ImageData {
  src: string;
  alt?: string;
  lqip?: string;
}

export interface GridPostData {
  title: string;
  slug: { current: string };
  excerpt?: string;
  image?: ImageData;
  categories?: string[];
}

interface GridPostProps {
  post: GridPostData;
}

export default function GridPost({ post }: GridPostProps) {
  const { title, slug, excerpt, image, categories = [] } = post;

  return (
    <Link
      href={`/blog/${slug.current}`}
      className="ring-offset-background focus-visible:ring-ring group flex w-full rounded-3xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
    >
      <div className="group hover:border-primary flex w-full flex-col justify-between overflow-hidden rounded-3xl border p-4 transition ease-in-out">
        <div className="flex flex-col">
          {image?.src && (
            <div className="relative mb-4 h-[15rem] overflow-hidden rounded-2xl sm:h-[20rem] md:h-[25rem] lg:h-[9.5rem] xl:h-[12rem]">
              <Image
                src={image.src ?? "/placeholder.svg"}
                alt={image.alt ?? ""}
                placeholder={image.lqip ? "blur" : undefined}
                blurDataURL={image.lqip}
                fill
                style={{ objectFit: "cover" }}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                quality={100}
              />
            </div>
          )}

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[1.5rem] leading-[1.2] font-bold">{title}</h3>
          </div>

          {categories?.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge key={cat} color="primary">
                  {cat}
                </Badge>
              ))}
            </div>
          )}

          {excerpt && <p>{excerpt}</p>}
        </div>

        <div className="group-hover:border-primary mt-3 flex h-10 w-10 items-center justify-center rounded-full border xl:mt-6">
          <ChevronRight
            className="text-border group-hover:text-primary"
            size={24}
          />
        </div>
      </div>
    </Link>
  );
}
