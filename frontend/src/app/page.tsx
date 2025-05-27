import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col  md:flex-row items-center justify-between px-6 lg:px-24 py-16 md:py-24 gap-8">
        <div className="flex-1 space-y-6">
          <div className="inline-block bg-secondary/20 px-4 py-1 rounded-full mb-4">
            <p className="text-sm font-medium">
              🎉 Never miss an opening again!
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Get alerts for <span className="text-primary">cabin</span> and{" "}
            <span className="text-primary">trail openings</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            SanNotify watches for spaces in South Africa&apos;s parks and trails
            and tells you right away when spots open up.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          {/* <div className="relative w-full max-w-lg h-[400px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/hero-image.jpg"
              alt="Beautiful view of a South African national park"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div> */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <SignUpForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-accent/20 px-6 lg:px-24 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How SanNotify Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We do the checking for you, so you don&apos;t have to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🔍"
            title="Spot Openings"
            description="We keep checking for free spots in all parks."
          />
          <FeatureCard
            icon="🔔"
            title="Quick Alerts"
            description="Get an email right away when a spot you want opens up."
          />
          <FeatureCard
            icon="🏕️"
            title="Book Fast"
            description="Be first to know and grab your spot before others."
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 lg:px-24 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TestimonialCard
            quote="Thanks to SanNotify, I got a last-minute spot at Kruger Park that I would have missed!"
            author="Sarah"
          />
          <TestimonialCard
            quote="I tried for months to book the Otter Trail. SanNotify told me when a spot opened up and I got it right away!"
            author="James"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground px-6 lg:px-24 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Catch Every Chance?
          </h2>
          <p className="text-lg opacity-90">
            Join hundreds of park lovers who use SanNotify to get the spots they
            want.
          </p>
          <div className="flex mx-auto justify-center">
            <SignUpForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 px-6 lg:px-24 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">SanNotify</span>
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}
            </span>
          </div>
          {/* <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact Us
            </Link>
          </div> */}
        </div>
      </footer>
    </div>
  );
}

function SignUpForm() {
  return (
    <form
      action="https://submit-form.com/eZZtDTBY9"
      className="flex flex-col space-y-3 max-w-sm bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/30 shadow-sm"
    >
      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Get Notified
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        We&apos;ll tell you when spots open up. No junk mail.
      </p>
    </form>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background rounded-lg p-6 shadow-sm border border-border/40 hover:border-primary/30 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

// Testimonial Card Component
function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-accent/10 rounded-lg p-6 border border-border/40">
      <p className="text-lg italic mb-4">&ldquo;{quote}&rdquo;</p>
      <p className="font-medium text-right">- {author}</p>
    </div>
  );
}
