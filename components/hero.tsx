import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type React from "react";

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
    <section className="dark:bg-background relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-transparent to-purple-100 dark:from-blue-950/20 dark:to-purple-950/20" />
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-border"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl" />
        <div className="absolute top-1/2 -right-4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl [animation-delay:2s]" />
        <div className="absolute -bottom-8 left-1/3 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-green-400/10 to-blue-400/10 blur-3xl [animation-delay:4s]" />
      </div>

      {/* Moving Dots */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gray-400/20 dark:bg-gray-600/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div className="h-full w-full animate-ping rounded-full bg-current" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 lg:px-16 lg:pt-30">
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
                src={image.url || "/placeholder.svg"}
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
      </div>
    </section>
  );
}
