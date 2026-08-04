import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    if (bgRef.current) {
      gsap.fromTo(bgRef.current, 
        { scale: 1 }, 
        { scale: 1.08, duration: 25, ease: 'power1.out' }
      );
    }

    if (headlineRef.current) {
      tl.fromTo(headlineRef.current.children, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }
    
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 
        '-=0.4'
      );
    }
    
    return () => { 
      tl.kill(); 
      gsap.killTweensOf(bgRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-black">
        <img 
          ref={bgRef}
          src="/images/hero-bg.jpg" 
          alt="Luxury Streetwear" 
          className="w-full h-full object-cover object-center opacity-80"
        />
        {/* Dark Gradient Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1219]/90 via-transparent to-[#0f1219]/90" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 mt-16 flex flex-col items-center max-w-5xl mx-auto w-full">
        
        <div ref={headlineRef} className="flex flex-col items-center w-full">
          <p className="font-subheading italic text-gold/90 text-lg md:text-2xl mb-4 tracking-wider drop-shadow-lg">
            Premium Clothing for Those Who Define Their Own Path
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-[0.1em] mb-6 drop-shadow-2xl">
            NEW DROPS
          </h1>
          <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light tracking-wide drop-shadow-md">
            Discover the new era of luxury streetwear. Where uncompromising quality meets unapologetic design.
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 px-6 w-full sm:w-auto">
          <Link 
            to="/shop" 
            className="bg-gold text-black font-bold text-sm md:text-base tracking-[0.15em] uppercase px-10 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Shop Collection
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent animate-pulse" />
      </div>
    </section>
  );
}
