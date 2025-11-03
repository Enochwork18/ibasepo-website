import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionSection } from "@/components/motion-section"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Privacy Policy | Ìbáṣepọ̀",
  description: "Privacy policy for Ìbáṣepọ̀ coaching services.",
}

export default function Privacy() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection>
            <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: November 2024</p>
          </MotionSection>
        </div>
      </section>

      <MotionSection className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Ìbáṣepọ̀ – Connected Hearts Coaching & Consultancy, we are committed to protecting your privacy and
              ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              We may collect information about you in a variety of ways. The information we may collect on the Site
              includes:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
              <li>Personal Data: name, email address, phone number, date of birth, gender</li>
              <li>Booking Information: service preferences, dates, times, notes</li>
              <li>Newsletter Subscriptions: email address for marketing communications</li>
              <li>Website Usage: device information, IP address, browser type</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Your Information</h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized
              experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
              <li>Process your bookings and provide coaching services</li>
              <li>Send you newsletters and marketing communications</li>
              <li>Improve our website and services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Prevent fraudulent transactions</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Confidentiality</h2>
            <p className="text-muted-foreground leading-relaxed">
              All information shared during coaching sessions remains confidential and will not be disclosed to third
              parties without your explicit consent, except as required by law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">You have the right to:</p>
            <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </div>

          <Card className="p-6 bg-accent mt-8">
            <p className="text-foreground">
              <strong>Contact Us:</strong> If you have any questions about this Privacy Policy, please contact us at
              enquiries@ibasepo.org.uk
            </p>
          </Card>
        </div>
      </MotionSection>

      <Footer />
    </main>
  )
}
