import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export interface HeroProps {
  tagLine?: string;
  title?: string;
  body?: React.ReactNode;
  image?: {
    url: string;
    alt?: string;
    asset?: {
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
        lqip?: string;
      };
    };
  };
  links?: Array<{
    title: string;
    href: string;
    target?: "_blank";
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  }>;
}

export default function Hero({
  tagLine,
  title,
  body,
  image,
  links,
}: HeroProps) {
  return (
    <section className="dark:bg-background container mx-auto px-4 py-20 lg:px-8 lg:pt-30">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          {tagLine && (
            <h1 className="animate-fade-up font-sans leading-none opacity-0 [animation-delay:100ms]">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}

          {title && (
            <h2 className="animate-fade-up mt-6 text-4xl leading-tight font-bold opacity-0 [animation-delay:200ms] md:text-5xl lg:text-6xl">
              {title}
            </h2>
          )}

          {body && (
            <div className="animate-fade-up mt-6 text-lg opacity-0 [animation-delay:300ms]">
              {body}
            </div>
          )}

          {links && links.length > 0 && (
            <div className="animate-fade-up mt-10 flex flex-wrap gap-4 opacity-0 [animation-delay:400ms]">
              {links.map((link) => (
                <Button key={link.title} variant={link.buttonVariant} asChild>
                  <Link
                    href={link.href}
                    target={link.target}
                    rel={link.target ? "noopener" : undefined}
                    className="px-6 py-3 text-sm font-medium"
                  >
                    {link.title}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>

        {image && (
          <div className="flex items-center justify-center">
            <Image
              className="animate-fade-up rounded-xl opacity-0 [animation-delay:500ms]"
              src={image.url}
              alt={image.alt || "Hero image"}
              width={image.asset?.metadata?.dimensions?.width ?? 800}
              height={image.asset?.metadata?.dimensions?.height ?? 800}
              placeholder={image.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image.asset?.metadata?.lqip}
              quality={100}
            />
          </div>
        )}
      </div>
    </section>
  );
}
