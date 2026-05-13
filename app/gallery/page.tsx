import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Gallery | Off the Trail',
  description: 'Visual stories from Off the Trail. Mountains, moments, and memories.',
}

interface GalleryImage {
  title: string
  description: string
  category: string
  tags: string[]
}

const galleryImages: GalleryImage[] = [
  {
    title: 'Sunrise at Eagle\'s Rest',
    description: 'First light paints the alpine peaks in shades of amber and rose',
    category: 'Basecamps',
    tags: ['sunrise', 'peaks', 'landscape'],
  },
  {
    title: 'Mountain Stream',
    description: 'Pure alpine water flowing from eternal snows',
    category: 'Nature',
    tags: ['water', 'wilderness', 'pristine'],
  },
  {
    title: 'Fireplace Gathering',
    description: 'Evening conversations around stone and flame',
    category: 'Community',
    tags: ['people', 'connection', 'warmth'],
  },
  {
    title: 'Alpine Meadow',
    description: 'Wildflowers in impossible places',
    category: 'Nature',
    tags: ['wildflowers', 'ecology', 'color'],
  },
  {
    title: 'Chef\'s Kitchen',
    description: 'Where mountain ingredients become art',
    category: 'Food',
    tags: ['culinary', 'local', 'craft'],
  },
  {
    title: 'Summit Moment',
    description: 'The reward after the climb',
    category: 'Adventures',
    tags: ['achievement', 'views', 'triumph'],
  },
  {
    title: 'Stone Architecture',
    description: 'Building in harmony with the mountain',
    category: 'Basecamps',
    tags: ['design', 'tradition', 'craft'],
  },
  {
    title: 'Starry Contemplation',
    description: 'Night sky in its full glory',
    category: 'Nature',
    tags: ['astronomy', 'night', 'wonder'],
  },
  {
    title: 'Guide & Climber',
    description: 'Expert knowledge passed mountain-to-mountain',
    category: 'Adventures',
    tags: ['guiding', 'expertise', 'mentorship'],
  },
]

export default function GalleryPage() {
  const categories = ['All', 'Basecamps', 'Adventures', 'Nature', 'Food', 'Community']

  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        {/* Header */}
        <section className="pt-32 pb-12 bg-cream-50">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="font-serif text-5xl md:text-6xl text-pine-900 mb-4">Mountain Stories</h1>
            <p className="font-sans text-xl text-stone-600 max-w-2xl">
              Visual chronicles from Off the Trail. Every image tells a story of adventure, beauty, and connection.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Filter Tabs */}
            <div className="mb-12 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-6 py-2 rounded-full border border-stone-300 text-stone-600 font-sans font-600 text-sm hover:border-amber-500 hover:text-amber-600 transition-colors duration-300"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className="group relative h-64 bg-stone-300 rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-400 transition-all duration-300 cursor-pointer"
                >
                  {/* Image placeholder with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pine-900/30 via-transparent to-amber-500/20 flex items-center justify-center">
                    <span className="text-5xl opacity-30">📷</span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-pine-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6">
                    <div>
                      <p className="font-sans text-xs text-amber-400 uppercase mb-2 font-600">
                        {image.category}
                      </p>
                      <h3 className="font-serif text-2xl text-cream-50 mb-2">{image.title}</h3>
                      <p className="font-sans text-sm text-cream-100">{image.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {image.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block text-xs px-3 py-1 bg-amber-500/20 text-amber-200 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Index indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-sans font-600 text-white text-sm">↗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stories Section */}
        <section className="py-20 bg-cream-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-4xl text-pine-900 mb-12">Featured Stories</h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Story 1 */}
              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <p className="font-sans text-xs text-amber-600 uppercase font-600 mb-3">Guest Story</p>
                <h3 className="font-serif text-2xl text-pine-900 mb-4">
                  When the Mountain Changed Everything
                </h3>
                <p className="font-sans text-stone-600 leading-relaxed mb-6">
                  "I came to escape my ordinary life for a weekend. I found a mirror to my soul and eight people who became family. That view from the summit wasn't just the landscape—it was perspective."
                </p>
                <p className="font-sans text-sm text-stone-500">— Alex Martinez, Software Developer, San Francisco</p>
              </div>

              {/* Story 2 */}
              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <p className="font-sans text-xs text-amber-600 uppercase font-600 mb-3">Team Experience</p>
                <h3 className="font-serif text-2xl text-pine-900 mb-4">
                  Corporate Transformation at Altitude
                </h3>
                <p className="font-sans text-stone-600 leading-relaxed mb-6">
                  "We brought our entire team up for a five-day expedition. By day three, we weren't thinking about spreadsheets. We were thinking about each other, about what's really important, about how to work better together."
                </p>
                <p className="font-sans text-sm text-stone-500">— Jennifer Lee, CEO, Design Studio</p>
              </div>

              {/* Story 3 */}
              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <p className="font-sans text-xs text-amber-600 uppercase font-600 mb-3">Personal Journey</p>
                <h3 className="font-serif text-2xl text-pine-900 mb-4">
                  Rediscovering Strength
                </h3>
                <p className="font-sans text-stone-600 leading-relaxed mb-6">
                  "After my surgery, I wasn't sure I'd ever hike again. The guides made it possible. And when I reached that summit, I wasn't thinking about the past—I was completely present."
                </p>
                <p className="font-sans text-sm text-stone-500">— Margaret Chen, Teacher, Boston</p>
              </div>

              {/* Story 4 */}
              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <p className="font-sans text-xs text-amber-600 uppercase font-600 mb-3">Love Story</p>
                <h3 className="font-serif text-2xl text-pine-900 mb-4">
                  Where They Said Yes
                </h3>
                <p className="font-sans text-stone-600 leading-relaxed mb-6">
                  "We didn't plan it. But as the sun rose over the peaks on our last morning, with no one around but the mountains and each other, I asked. She said yes. The mountain was witness."
                </p>
                <p className="font-sans text-sm text-stone-500">— David & Sarah, Married at Summit</p>
              </div>
            </div>
          </div>
        </section>

        {/* Share Your Story CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif text-4xl text-pine-900 mb-6">Your Story Matters</h2>
            <p className="font-sans text-lg text-stone-600 mb-8">
              Every visitor writes their own chapter on the mountain. We'd love to hear yours.
            </p>
            <button className="px-8 py-3 bg-pine-900 text-cream-50 rounded-md font-sans font-600 hover:bg-pine-800 transition-colors duration-300">
              Share Your Experience
          </button>
        </div>
      </section>
    </main>
    <Footer />
  </>
)
}
