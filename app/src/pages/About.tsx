import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { Link } from 'react-router';
import { Target, Eye, Award, Users } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To redefine luxury streetwear by blending impeccable craftsmanship with bold, contemporary designs that empower individuals to express their unique identity.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To become the global symbol of premium fashion for the modern rebel — those who refuse to conform and choose to stand out in every room they enter.',
  },
  {
    icon: Award,
    title: 'Our Craft',
    description: 'Every piece is meticulously crafted using the finest materials sourced from around the world. From Italian leather to Japanese denim, we spare no expense in quality.',
  },
  {
    icon: Users,
    title: 'Our Community',
    description: 'VARENAYAM is more than clothing — it is a movement. A community of creators, innovators, and dreamers who wear their ambition with pride.',
  },
];

export default function About() {
  return (
    <div className="bg-black min-h-screen pt-[105px]">
      <Navigation />

      {/* Hero */}
      <div className="relative py-20 md:py-32 px-[4vw] text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <img src="/images/varenayam-logo.jpg" alt="VARENAYAM" className="h-20 w-auto object-contain mx-auto mb-8" />
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-gold mb-6">VARENAYAM</h1>
          <p className="font-subheading italic text-xl md:text-2xl text-white/60 leading-relaxed">
            Born to stand out. Crafted for the bold.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="px-[4vw] py-16 md:py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/images/lookbook-5.jpg"
              alt="VARENAYAM Story"
              className="w-full rounded-lg border border-white/10"
            />
          </div>
          <div>
            <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl text-white mt-3 mb-6">Redefining Luxury Streetwear</h2>
            <p className="text-white/50 leading-relaxed mb-4">
              Founded in 2020, VARENAYAM emerged from a simple yet powerful idea: that luxury fashion should not be confined to tradition. 
              We believe in the power of self-expression through meticulously crafted garments that tell a story.
            </p>
            <p className="text-white/50 leading-relaxed mb-4">
              Our journey began in the heart of Mumbai, where a small team of designers and craftsmen came together with a shared vision 
              — to create clothing that bridges the gap between haute couture and street culture.
            </p>
            <p className="text-white/50 leading-relaxed">
              Today, VARENAYAM stands as a testament to the bold, the creative, and the unapologetically unique. 
              Every stitch, every fabric choice, every design decision is made with one goal: to help you stand out.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="px-[4vw] py-16 md:py-24 bg-dark-surface">
        <div className="text-center mb-16">
          <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium">What Drives Us</span>
          <h2 className="font-display text-3xl md:text-4xl text-white mt-3">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {values.map((value) => (
            <div key={value.title} className="gradient-border">
              <div className="gradient-inner p-6 md:p-8 text-center">
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <value.icon size={24} className="text-gold" />
                </div>
                <h3 className="font-display text-lg text-white mb-3">{value.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-[4vw] py-20 md:py-28 text-center">
        <h2 className="font-display text-3xl md:text-5xl text-white mb-4">Join the Movement</h2>
        <p className="text-white/40 max-w-xl mx-auto mb-8">
          Be part of a community that values quality, creativity, and the courage to be different.
        </p>
        <Link to="/shop" className="gold-filled-btn">Explore Collection</Link>
      </div>

      <Footer />
    </div>
  );
}
