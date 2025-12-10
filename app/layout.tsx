import "./global.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { baseUrl } from "./sitemap";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import "react-calendar-heatmap/dist/styles.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Zachary Cervenka | Full-Stack Developer & Software Engineer",
    template: "%s | Zachary Cervenka",
  },
  description:
    "Full-stack developer specializing in React, Next.js, Python, and modern web technologies. View my projects and blog posts about software development.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "React",
    "Next.js",
    "Python",
    "web development",
  ],
  authors: [{ name: "Zachary Cervenka" }],
  creator: "Zachary Cervenka",
  openGraph: {
    title: "Zachary Cervenka | Full-Stack Developer",
    description: "Full-stack developer specializing in modern web technologies",
    url: baseUrl,
    siteName: "Zachary Cervenka Portfolio",
    images: [
      {
        url: "/hero-image.png", // Create a custom OG image
        width: 1200,
        height: 630,
        alt: "Zachary Cervenka - Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zachary Cervenka | Full-Stack Developer",
    description: "Full-stack developer specializing in modern web technologies",
    images: ["/hero-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <link rel="icon" href="/favicon.ico" />
      <body className="bg-background text-foreground mx-auto overscroll-none antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-w-0 flex-auto flex-col">
            <Header />
            {children}
            <Footer />
            <Toaster
              position="top-right"
              richColors
              visibleToasts={3} // max simultaneous toasts
            />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
