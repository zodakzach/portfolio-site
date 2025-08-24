"use client";
import Image from "next/image";
import { Fragment } from "react";
import { motion } from "motion/react";

interface LogoImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      mimeType?: string;
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
}

interface LogoCloudProps {
  title?: string;
  images?: LogoImage[];
}

export default function LogoCloud({ title, images = [] }: LogoCloudProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="bg-background container mx-auto overflow-hidden px-4 py-8 lg:px-16 lg:py-12">
      {title && (
        <h2 className="animate-fade-up mb-4 text-center text-lg font-medium tracking-tighter opacity-0 [animation-delay:100ms]">
          {title}
        </h2>
      )}

      <div className="before:from-background after:from-background relative flex overflow-hidden before:absolute before:top-0 before:left-0 before:h-full before:w-10 before:bg-linear-to-r before:to-transparent before:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-10 after:bg-linear-to-l after:to-transparent after:content-['']">
        <motion.div
          className="flex w-max gap-24 pr-24"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {[...Array(2)].map((_, arrayIndex) => (
            <Fragment key={arrayIndex}>
              {images.map((image, index) => {
                const { url, metadata } = image.asset;
                const width = metadata?.dimensions?.width ?? 220;
                const height = metadata?.dimensions?.height ?? 90;
                const isSvg = metadata?.mimeType === "image/svg+xml";
                const lqip = !isSvg ? metadata?.lqip : undefined;
                const placeholder = lqip ? "blur" : "empty";
                return (
                  <div
                    key={`${image.asset._id}-${arrayIndex}-${index}`}
                    className="flex h-20 w-20 shrink-0 items-center justify-center md:h-24 md:w-24"
                  >
                    <Image
                      src={url}
                      alt={image.alt ?? "Technology logo"}
                      width={width}
                      height={height}
                      priority={arrayIndex === 0 && index < 3}
                      placeholder={placeholder}
                      blurDataURL={lqip}
                      className="opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                    />
                  </div>
                );
              })}
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
