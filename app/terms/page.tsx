import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionSection } from "@/components/motion-section"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Terms of Service | Ìbáṣepọ̀",
  description: "Terms of service for Ìbáṣepọ̀ coaching and consultancy.",
}

export default function Terms() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection>
            <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: November 2024</p>
          </MotionSection>
        </div>
      </section>

      <MotionSection className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on
              Ìbáṣepọ̀'s website for personal, non-commercial transitory viewing only. This is the grant of a license,
              not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to reverse engineer any software contained on the website</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or 'mirroring' the materials on any other server</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on Ìbáṣepọ̀'s website are provided on an 'as is' basis. Ìbáṣepọ̀ makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Booking & Cancellation</h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">When you book a session:</p>
            <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
              <li>You provide accurate and complete information</li>
              <li>You agree to pay the service fees quoted</li>
              <li>Cancellations must be made 24 hours before the session</li>
              <li>Late cancellations may be subject to full fees</li>
              <li>No-shows will be charged the full session fee</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Limitations of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall Ìbáṣepọ̀ or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on the website, even if we or our authorized representative has been notified orally
              or in writing of the possibility of such damage.
            </p>
          </div>

          <Card className="p-6 bg-accent mt-8">
            <p className="text-foreground">
              <strong>Questions?</strong> Contact us at enquiries@ibasepo.org.uk for any questions regarding these
              terms.
            </p>
          </Card>
        </div>
      </MotionSection>

      <Footer />
    </main>
  )
}
