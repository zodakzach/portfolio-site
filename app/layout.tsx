import "./global.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Zachary Cervenka | Portfolio",
    template: "%s | Portfolio",
  },
  description: "This is my portfolio.",
  openGraph: {
    title: "My Portfolio",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
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
      <body className="bg-background text-foreground mx-4 mt-8 max-w-xl antialiased lg:mx-auto">
        {/* Only this part runs on the client */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
