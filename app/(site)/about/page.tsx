import { Metadata } from 'next'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Us | Off the Trail',
  description: 'The story of Off the Trail. Mountain wisdom. Authentic experiences. Human connection.',
}

interface TeamMember {
  name: string
  role: string
  bio: string
  expertise: string[]
}

const team: TeamMember[] = [
  {
    name: 'Marcus Vega',
    role: 'Founder & Chief Guide',
    bio: 'Marcus spent 25 years climbing mountains across six continents before realizing his true passion: sharing authentic alpine experiences with others. He founded Off the Trail to create spaces where transformation happens naturally.',
    expertise: ['High-altitude mountaineering', 'Expedition leadership', 'Mountain ecology', 'Risk management'],
  },
  {
    name: 'Elena Romero',
    role: 'Head Chef',
    bio: 'Raised in the mountain region, Elena apprenticed with her grandmother and local mountain communities. She views cooking as a language - every meal tells the story of the land.',
    expertise: ['Alpine cuisine', 'Seasonal cooking', 'Local sourcing', 'Nutritional science at altitude'],
  },
  {
    name: 'David Chen',
    role: 'Operations Director',
    bio: 'With two decades in adventure tourism, David ensures that every operation - from logistics to safety - runs seamlessly so guests can focus on their experience.',
    expertise: ['Logistics coordination', 'Safety protocols', 'Environmental stewardship', 'Emergency response'],
  },
  {
    name: 'Sofia Andersen',
    role: 'Guest Experience Lead',
    bio: 'Sofia believes the best experiences happen when guests feel seen and supported. She designs personalized itineraries and ensures every detail serves the guest\'s journey.',
    expertise: ['Experiential design', 'Guest psychology', 'Conflict resolution', 'Cultural sensitivity'],
  },
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-cream-50">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="font-serif text-5xl md:text-6xl text-pine-900 mb-8">
              The Story Behind Off the Trail
            </h1>
            <p className="font-sans text-xl text-stone-600 leading-relaxed">
              Off the Trail wasn't born from a business plan. It grew from the question: "What if we created a place where authentic mountain experience and thoughtful hospitality coexist?" We started with that question and thirty years of mountain knowledge. Everything else followed.
            </p>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-4xl text-pine-900 mb-12">How It Began</h2>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="font-serif text-2xl text-pine-900 mb-6">The Mountain Called</h3>
                <p className="font-sans text-lg text-stone-600 leading-relaxed mb-4">
                  Our founder Marcus grew up in foothills and summits. He spent decades as a professional mountain guide, leading expeditions and learning not just the landscape, but the psychology of altitude and the transformation that happens when people encounter wilderness.
                </p>
                <p className="font-sans text-lg text-stone-600 leading-relaxed">
                  But something was missing. Guide work took him up mountains and down again. It didn't allow for the slower unfurling of connection - between guest and guide, guest and landscape, guest and self.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-pine-900 mb-6">The Vision</h3>
                <p className="font-sans text-lg text-stone-600 leading-relaxed mb-4">
                  What if there was a place where people could stay longer? What if experts from different disciplines - guides, chefs, facilitators - worked together to create an environment where mountain transformation could unfold naturally?
                </p>
                <p className="font-sans text-lg text-stone-600 leading-relaxed">
                  That question became Off the Trail. A basecamp. Not a resort. Not a hostel. A place with intention, expertise, and warmth - but also with respect for the mountain's wildness.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-cream-50 rounded-2xl p-12 border border-stone-200">
              <h3 className="font-serif text-2xl text-pine-900 mb-8">Our Journey</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-24">
                    <p className="font-serif text-2xl text-amber-600">2002</p>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-pine-900 mb-2">First Summit</h4>
                    <p className="font-sans text-stone-600">Marcus leads his first commercial expedition. Discovers his passion for people transforming through mountains.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-24">
                    <p className="font-serif text-2xl text-amber-600">2012</p>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-pine-900 mb-2">The Concept</h4>
                    <p className="font-sans text-stone-600">After 10 years guiding, Marcus articulates the vision for a basecamp that blends adventure with rest, challenge with hospitality.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-24">
                    <p className="font-serif text-2xl text-amber-600">2018</p>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-pine-900 mb-2">Eagle's Rest Opens</h4>
                    <p className="font-sans text-stone-600">First basecamp at 4,200m. Hand-built. Thoughtful. Intentional. The model begins.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-24">
                    <p className="font-serif text-2xl text-amber-600">2021-2025</p>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-pine-900 mb-2">Expansion with Integrity</h4>
                    <p className="font-sans text-stone-600">Summit Lodge and Alpine Haven launch. Each basecamp maintains the core philosophy while adapting to its unique environment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-cream-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-4xl text-pine-900 mb-12">Our Core Values</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <h3 className="font-serif text-2xl text-pine-900 mb-3">Authenticity</h3>
                <p className="font-sans text-stone-600">
                  We don't simulate. We live it. Every experience is genuine, unfiltered, and rooted in real mountain life. Authenticity can't be manufactured - it can only be honored.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <h3 className="font-serif text-2xl text-pine-900 mb-3">Respect</h3>
                <p className="font-sans text-stone-600">
                  For the mountain, for guests, for our team, for the communities whose land we occupy. Respect shapes every decision, from environmental impact to guide compensation.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <h3 className="font-serif text-2xl text-pine-900 mb-3">Excellence</h3>
                <p className="font-sans text-stone-600">
                  In every detail. From the temperature of evening tea to emergency medical protocols. We believe excellence comes from caring about things that matter.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <h3 className="font-serif text-2xl text-pine-900 mb-3">Transformation</h3>
                <p className="font-sans text-stone-600">
                  We create spaces where transformation is possible. Not forced - possible. The mountain does the work. We simply create the conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-4xl text-pine-900 mb-12">Meet Our Team</h2>

            <div className="grid md:grid-cols-2 gap-12">
              {team.map((member, idx) => (
                <div key={idx} className="bg-cream-50 rounded-2xl p-8 border border-stone-200">
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl text-pine-900 mb-2">{member.name}</h3>
                    <p className="font-sans text-sm text-amber-600 font-600 uppercase">{member.role}</p>
                  </div>

                  <p className="font-sans text-stone-600 leading-relaxed mb-6">{member.bio}</p>

                  <div>
                    <p className="font-sans text-xs text-stone-500 uppercase mb-3 font-600">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="inline-block text-xs px-3 py-1 bg-white border border-stone-300 text-stone-600 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-20 bg-cream-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif text-4xl text-pine-900 mb-8">Our Philosophy</h2>
            <div className="bg-white rounded-2xl p-12 border border-stone-200">
              <p className="font-sans text-xl text-stone-700 leading-relaxed">
                The mountain has been teaching humans for millennia. Altitude teaches humility. Distance teaches patience. Beauty teaches presence. Our role isn't to teach - it's to create conditions where the mountain can teach you. We're stewards, not proprietors. Guides, not heroes. And we're deeply grateful for the opportunity to help others discover what the mountain already knows.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif text-4xl text-pine-900 mb-6">Want to Know More?</h2>
            <p className="font-sans text-lg text-stone-600 mb-8">
              We're always happy to talk about what we do and why we do it.
            </p>
            <button className="px-8 py-3 bg-pine-900 text-cream-50 rounded-md font-sans font-600 hover:bg-pine-800 transition-colors duration-300">
              Get in Touch
          </button>
        </div>
      </section>
    </main>
    <Footer />
  </>
)
}
