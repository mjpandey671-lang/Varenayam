import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function GoldenTypewriter({ text, speed = 80 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    if (currentIndex >= text.length) {
      setIsComplete(true);
      return;
    }
    const timer = setInterval(() => {
      setDisplayedText(prev => prev + text[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, speed);
    return () => clearInterval(timer);
  }, [hasStarted, currentIndex, text, speed]);

  return (
    <div ref={containerRef} className="inline">
      <span className="inline-block font-display text-xl md:text-3xl lg:text-4xl text-white text-center max-w-4xl mx-auto leading-relaxed tracking-wide">
        {displayedText}
      </span>
      {!isComplete && hasStarted && (
        <span className="cursor-gold text-2xl md:text-4xl ml-1">|</span>
      )}
    </div>
  );
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (decorRef.current) {
        gsap.fromTo(decorRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none none' }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const manifestoText = "We are the misfits, the rebels, the ones who see the world differently.";

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 lg:py-56 bg-black overflow-hidden"
    >
      {/* Subtle gold radial gradient at center */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-gold opacity-[0.03] rounded-full" />
      </div>

      <div ref={decorRef} className="relative px-[4vw] max-w-5xl mx-auto text-center">
        {/* Decorative gold line above */}
        <div className="flex justify-center mb-10">
          <div className="w-16 h-[2px] bg-gold" />
        </div>

        {/* Manifesto text with typewriter effect */}
        <div className="mb-10">
          <GoldenTypewriter text={manifestoText} speed={70} />
        </div>

        {/* Brand Name */}
        <p className="font-display text-gold text-sm md:text-base tracking-[0.5em] uppercase mt-12">
          VARENAYAM
        </p>

        {/* Decorative gold line below */}
        <div className="flex justify-center mt-10">
          <div className="w-16 h-[2px] bg-gold" />
        </div>
      </div>
    </section>
  );
}
