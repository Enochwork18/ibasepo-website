import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionSection } from "@/components/motion-section"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export const metadata = {
  title: "About Us | Ìbáṣepọ̀",
  description: "Learn about Elizabeth Omolara Omolara and the Ìbáṣepọ̀ coaching journey.",
}

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionSection>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Ìbáṣepọ̀</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guiding families toward peace, purpose, and legacy
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Founder's Story with Image */}
      <MotionSection className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MUM-Pf8irCLTMvHNZvEKyKlGDEIpnIhgj0.jpg"
                alt="Elizabeth Omolara Omolara - Founder"
                width={400}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">The Founder's Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Elizabeth Omolara Omolara</h3>
                  <p className="text-sm">Founder & Lead Coach | Ìbáṣepọ̀</p>
                </div>
                <p>
                  I know what it means to come from a dysfunctional family and to walk through the pain of broken
                  relationships. For years, I carried wounds from both family and marriage experiences that left me
                  questioning my worth and my ability to love and be loved.
                </p>
                <p>
                  However, through my journey of healing in Christ, I discovered restoration, freedom, and the beauty of
                  authentic connection. This personal transformation became the foundation for Ìbáṣepọ̀.
                </p>
                <p>
                  Ìbáṣepọ̀ – the Yoruba word for "relationship" or "connection" – reflects both my cultural roots and my
                  calling. I created this space to help individuals, couples, and families build healthier, emotionally
                  strong, and spiritually grounded relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Mission & Values */}
      <MotionSection className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-background">
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
              <p className="text-muted-foreground">
                To be a safe space where hearts connect, heal, and grow through faith-inspired coaching that transforms
                families and communities.
              </p>
            </Card>
            <Card className="p-8 bg-background">
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Authenticity and Truth</li>
                <li>• Faith-Centered Approach</li>
                <li>• Cultural Wisdom</li>
                <li>• Continuous Growth</li>
              </ul>
            </Card>
            <Card className="p-8 bg-background">
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Approach</h3>
              <p className="text-muted-foreground">
                We blend faith, cultural wisdom, and practical strategies to create lasting transformation in
                individuals, couples, and families.
              </p>
            </Card>
          </div>
        </div>
      </MotionSection>

      {/* Credentials */}
      <MotionSection className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Credentials & Expertise</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              With years of experience in life coaching and consultancy, I bring a unique blend of professional training
              and personal lived experience to my work.
            </p>
            <p>My approach is grounded in:</p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Faith-based counseling principles</li>
              <li>Evidence-based coaching methodologies</li>
              <li>Cultural competence and wisdom</li>
              <li>Trauma-informed care practices</li>
              <li>Family systems theory</li>
            </ul>
          </div>
        </div>
      </MotionSection>

      <Footer />
    </main>
  )
}
