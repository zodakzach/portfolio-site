import ContactForm from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";

export default function ContactPage() {
  return (
    <>
      {/* Use PageHeader component */}
      <PageHeader
        title="Get in Touch"
        description="Have a project in mind? Let's work together."
      />

      {/* Contact Form Section */}
      <section className="flex justify-center px-4 pb-16">
        <div className="w-full max-w-md space-y-6">
          <ContactForm />

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
      </section>
    </>
  );
}
