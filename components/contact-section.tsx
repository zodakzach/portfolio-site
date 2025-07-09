import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaLinkedin } from "react-icons/fa";

export default function Component() {
  return (
    <section className="bg-primary w-full px-4 py-16 lg:px-16">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Let's Connect
          </h2>
          <p className="text-foreground max-w-[600px] md:text-lg">
            Ready to work together? Let's discuss your next project and connect
            professionally.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button variant="ghost" asChild>
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
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
