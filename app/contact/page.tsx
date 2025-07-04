import ContactForm from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="bg-background flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 py-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="animate-fade-up pb-3 text-3xl leading-tight font-bold opacity-0 [animation-delay:100ms] md:text-4xl lg:text-5xl">
            Get in Touch
          </h1>
          <p className="text-muted-foreground animate-fade-up opacity-0 [animation-delay:200ms]">
            Have a project in mind? Let's work together.
          </p>
        </div>

        {/* Contact Form Component */}
        <div className="space-y-6">
          <ContactForm />
        </div>

        {/* Footer */}
        <div className="text-muted-foreground text-center text-sm">
          <p>Or reach out directly at</p>
          <a
            href="mailto:zach@codeezy.dev"
            className="text-foreground font-medium hover:underline"
          >
            zach@codeezy.dev
          </a>
        </div>
      </div>
    </div>
  );
}
