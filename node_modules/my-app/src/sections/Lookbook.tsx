import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const lookbookImages = [
  { src: '/images/lookbook-1.jpg', title: 'Urban Shadows' },
  { src: '/images/lookbook-2.jpg', title: 'Into the Fog' },
  { src: '/images/lookbook-3.jpg', title: 'Golden Chains' },
  { src: '/images/lookbook-4.jpg', title: 'Concrete Dreams' },
  { src: '/images/lookbook-5.jpg', title: 'Collective' },
];

export default function Lookbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollWidth = container.scrollWidth - container.clientWidth;

      gsap.to(container, {
        scrollLeft: scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 20%',
          end: `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate each image
      const images = container.querySelectorAll('.lookbook-item');
      images.forEach((img) => {
        gsap.fromTo(img,
          { opacity: 0.5, scale: 0.95 },
          {
            opacity: 1, scale: 1,
            scrollTrigger: {
              trigger: img,
              start: 'left 80%',
              end: 'left 20%',
              scrub: true,
              horizontal: true,
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-12 md:py-24">
      {/* Section Header */}
      <div className="px-[4vw] mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-gold text-sm tracking-[0.4em] uppercase font-semibold block mb-3">
            Visual Journey
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase">
            The Lookbook
          </h2>
        </div>
        <Link
          to="/lookbook"
          className="inline-flex items-center gap-3 text-white hover:text-gold transition-colors text-sm font-bold tracking-[0.2em] uppercase group"
        >
          Explore Collection <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 md:gap-8 overflow-x-auto px-[4vw] pb-12 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {lookbookImages.map((item, index) => (
          <div
            key={index}
            className="lookbook-item flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] h-[60vh] md:h-[75vh] relative rounded-2xl overflow-hidden group cursor-pointer snap-center shadow-2xl shadow-black/50"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Hover Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
              <span className="text-white font-bold text-2xl md:text-3xl tracking-[0.15em] uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {item.title}
              </span>
              <div className="w-16 h-[2px] bg-gold mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
              <Link
                to="/lookbook"
                className="mt-6 bg-gold text-black font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150 hover:bg-white"
              >
                View Details
              </Link>
            </div>
            
            {/* Title at bottom (visible when not hovered) */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 group-hover:opacity-0 transition-opacity duration-300">
              <span className="text-white font-bold text-xl md:text-2xl tracking-wider uppercase">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
