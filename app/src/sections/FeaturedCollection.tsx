import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
          }
        );
      }
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[600px]">
        {/* Left - Editorial Image */}
        <div ref={imageRef} className="relative overflow-hidden">
          <img
            src="/images/collection-1.jpg"
            alt="Featured Collection"
            className="w-full h-full object-cover min-h-[400px] lg:min-h-[600px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 lg:to-black/80" />
        </div>

        {/* Right - Collection Info */}
        <div ref={contentRef} className="relative flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 lg:border-l lg:border-gold/30">
          {/* Gold accent line on mobile */}
          <div className="lg:hidden w-16 h-[2px] bg-gold mb-6" />

          <span className="text-gold/70 text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Autumn / Winter Collection
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
            The Shadow Line
          </h2>
          <p className="text-white/60 font-subheading italic text-lg md:text-xl mb-8 leading-relaxed max-w-md">
            A study in contrasts. Premium fabrics meet precision tailoring in our most daring collection yet.
          </p>

          {/* Product Stack Preview */}
          <div className="flex gap-3 mb-8">
            <div className="w-20 h-24 rounded-lg overflow-hidden border border-white/10 hover:border-gold/50 transition-colors">
              <img src="/images/product-2.jpg" alt="Bomber" className="w-full h-full object-cover" />
            </div>
            <div className="w-20 h-24 rounded-lg overflow-hidden border border-white/10 hover:border-gold/50 transition-colors">
              <img src="/images/collection-2.jpg" alt="Chain" className="w-full h-full object-cover" />
            </div>
            <div className="w-20 h-24 rounded-lg overflow-hidden border border-white/10 hover:border-gold/50 transition-colors">
              <img src="/images/product-3.jpg" alt="Cargo" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/shop"
              className="gold-filled-btn inline-flex items-center gap-3"
            >
              Shop Now
              <ArrowRight size={16} />
            </Link>
            <span className="text-gold font-display text-2xl">From Rs. 2,499</span>
          </div>
        </div>
      </div>
    </section>
  );
}
