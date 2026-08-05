import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 162;
const currentFrame = (index: number) => (
  `/frames24/frame_${(index + 1).toString().padStart(5, '0')}.jpg`
);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load images
    const images: HTMLImageElement[] = [];
    const seq = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      if (images[seq.frame] && images[seq.frame].complete) {
        // Clear and draw image with cover aspect ratio
        context.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[seq.frame];
        
        // Calculate object-cover dimensions
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;  

        context.drawImage(img, 0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    };

    // Initial render when first image loads
    images[0].onload = render;

    // Initial Setup: Show 'NEW DROPS' on load, hide everything else
    if (headlineRef.current) {
      gsap.fromTo(headlineRef.current.children[1], 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.set(headlineRef.current.children[0], { opacity: 0, y: 30 });
      gsap.set(headlineRef.current.children[2], { opacity: 0, y: 30 });
    }
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
    }

    // Scroll animation for frames and text
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%", // 300% of viewport height for scrolling
        scrub: 0.5,
        pin: true,
      }
    });

    // Fade out 'NEW DROPS' immediately when scrolling starts
    if (headlineRef.current) {
      tl.to(headlineRef.current.children[1], {
        opacity: 0,
        y: -30,
        duration: 0.1
      }, 0);
    }

    // Animate Frames
    tl.to(seq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render,
      duration: 1
    }, 0);

    // Fade in text animations towards the end of the scroll
    if (headlineRef.current) {
      tl.fromTo(headlineRef.current.children, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: 'power3.out' },
        0.6 // Start fading in text at 60% of the scroll timeline
      );
    }
    
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.2, ease: 'power3.out' }, 
        0.8 // CTA fades in at 80% of the timeline
      );
    }

    // Handle Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Canvas Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <canvas ref={canvasRef} className="w-full h-full" />
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
