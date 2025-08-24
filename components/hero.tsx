"use client";

import React, { useId, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

// Deterministic PRNG to avoid SSR hydration mismatch
function hashString(input: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Hero({
  tagLine,
  title,
  body,
  image,
  links,
}: HeroProps) {
  const uid = useId();
  const patternId = `grid-${uid}`;

  // Seeded positions for dots (SSR-safe)
  const dots = useMemo(() => {
    const seedBase = `${title ?? ""}|${tagLine ?? ""}|${image?.url ?? ""}`;
    const rand = mulberry32(hashString(seedBase || "hero"));
    return Array.from({ length: 20 }, () => ({
      left: `${(rand() * 100).toFixed(2)}%`,
      top: `${(rand() * 100).toFixed(2)}%`,
      delay: `${(rand() * 5).toFixed(2)}s`,
    }));
  }, [title, tagLine, image?.url]);

  return (
    <section className="dark:bg-background relative overflow-hidden">
      {/* Background: gradient wash + SVG grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 select-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-transparent to-purple-100 dark:from-blue-950/20 dark:to-purple-950/20" />
        <svg
          className="text-border absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <pattern
              id={patternId}
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>

      {/* Floating gradient blobs (kept light for perf) */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-hidden="true"
      >
        <div className="absolute -top-4 -left-4 h-72 w-72 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-4 h-72 w-72 rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl [animation-delay:2s] animate-pulse" />
        <div className="absolute -bottom-8 left-1/3 h-72 w-72 rounded-full bg-gradient-to-r from-green-400/10 to-blue-400/10 blur-3xl [animation-delay:4s] animate-pulse" />
      </div>

      {/* Moving dots */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-hidden="true"
      >
        {dots.map((d, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gray-400/20 dark:bg-gray-600/20"
            style={{
              left: d.left,
              top: d.top,
              animationDelay: d.delay,
            }}
          >
            <div className="h-full w-full rounded-full bg-current animate-ping" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 lg:px-16 lg:pt-30">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            {tagLine && (
              <p className="animate-fade-up opacity-0 [animation-delay:100ms]">
                <span className="text-base font-semibold">{tagLine}</span>
              </p>
            )}

            {title && (
              <h1 className="animate-fade-up mt-4 text-4xl leading-tight font-bold opacity-0 [animation-delay:200ms] md:text-5xl lg:text-6xl">
                {title}
              </h1>
            )}

            {body && (
              <div className="animate-fade-up mt-6 text-lg opacity-0 [animation-delay:300ms]">
                {body}
              </div>
            )}

            {links && links.length > 0 && (
              <div className="animate-fade-up mt-10 flex flex-wrap gap-4 opacity-0 [animation-delay:400ms]">
                {links.map((link, idx) => (
                  <Button
                    key={`${link.href}-${link.title}-${idx}`}
                    variant={link.buttonVariant}
                    asChild
                  >
                    <Link
                      href={link.href}
                      target={link.target}
                      rel={link.target ? "noopener noreferrer" : undefined}
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
                quality={85}
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
