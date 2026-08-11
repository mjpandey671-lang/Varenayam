import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lookbookItems = [
  { src: '/images/lookbook-1.jpg', title: 'Urban Shadows', desc: 'The city becomes your canvas. Our latest collection draws inspiration from the interplay of light and shadow in urban landscapes.' },
  { src: '/images/lookbook-2.jpg', title: 'Into the Fog', desc: 'Mystery meets fashion. Pieces designed for those who move through the world with quiet confidence and unmistakable presence.' },
  { src: '/images/lookbook-3.jpg', title: 'Golden Chains', desc: 'Where luxury meets edge. Bold accessories and statement pieces that command attention in any setting.' },
  { src: '/images/lookbook-4.jpg', title: 'Concrete Dreams', desc: 'Raw, unfiltered, authentic. Fashion for those who find beauty in the unfinished and the unexpected.' },
  { src: '/images/lookbook-5.jpg', title: 'The Collective', desc: 'Strength in unity, power in individuality. Our group editorial celebrating the diverse faces of the VARENAYAM community.' },
  { src: '/images/collection-1.jpg', title: 'Shadow Line', desc: 'The definitive leather collection. Handcrafted jackets that blend timeless style with contemporary edge.' },
  { src: '/images/collection-2.jpg', title: 'Gold Standard', desc: 'Premium accessories collection. Each piece is a statement of intent, a declaration of uncompromising taste.' },
  { src: '/images/collection-3.jpg', title: 'Noir Elegance', desc: 'Sophisticated silhouettes for the modern gentleman. Tailored outerwear that transitions seamlessly from day to night.' },
];

export default function LookbookPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.lookbook-item');
        items.forEach((item) => {
          gsap.fromTo(item,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none none' }
            }
          );
        });
      }
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black min-h-screen pt-[105px]">
      <Navigation />

      {/* Header */}
      <div className="px-[4vw] py-12 md:py-20 text-center">
        <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium">Visual Journey</span>
        <h1 className="font-display text-5xl md:text-7xl text-white mt-3 mb-4">The Lookbook</h1>
        <p className="text-white/40 max-w-2xl mx-auto">
          Explore our visual narrative. Each image tells a story of craftsmanship, attitude, and the relentless pursuit of excellence.
        </p>
      </div>

      {/* Masonry Grid */}
      <div ref={gridRef} className="px-[4vw] pb-20">
        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {lookbookItems.map((item, index) => (
            <div
              key={index}
              className={`lookbook-item relative group break-inside-avoid overflow-hidden rounded-lg border border-white/5 ${
                index % 3 === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <img
                src={item.src}
                alt={item.title}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  index % 2 === 0 ? 'aspect-[16/10]' : 'aspect-[4/5]'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-display text-2xl md:text-3xl text-white mb-2 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  {item.desc}
                </p>
              </div>
              {/* Gold accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
