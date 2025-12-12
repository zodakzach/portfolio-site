import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaLinkedin } from "react-icons/fa";

export default function Component() {
  return (
    <section className="relative isolate w-full px-4 py-16 lg:px-16">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div
          className="absolute top-[-10%] left-[-10%] h-64 w-64 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, var(--glow-1), transparent 60%)",
          }}
        />
        <div
          className="absolute right-[5%] bottom-[-10%] h-72 w-72 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, var(--glow-2), transparent 55%)",
          }}
        />
      </div>
      <div className="container mx-auto">
        <div className="border-border/60 bg-card/85 relative overflow-hidden rounded-3xl border px-6 py-12 text-center shadow-xl backdrop-blur-xl md:px-12">
          <div className="mx-auto flex max-w-[640px] flex-col items-center justify-center space-y-6">
            <div className="bg-primary/15 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
              Let's talk
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Let's Connect
            </h2>
            <p className="text-muted-foreground max-w-[600px] md:text-lg">
              Ready to work together? Tell me about your timeline and goals—I’ll
              reply within 24 hours.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="https://www.linkedin.com/in/zachary-cervenka/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link
                  href="https://rxresu.me/zodakzach/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </Link>
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">
              Prefer email?{" "}
              <a
                href="mailto:zachary@zodakzach.com"
                className="underline underline-offset-4"
              >
                zachary@zodakzach.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
