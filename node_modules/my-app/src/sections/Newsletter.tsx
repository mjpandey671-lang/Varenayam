import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.newsletter-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-dark-surface">
      <div className="newsletter-content max-w-6xl mx-auto px-[4vw]">
        <div className="gradient-border">
          <div className="gradient-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-8 md:p-12">
              {/* Left - Content */}
              <div className="flex flex-col justify-center">
                <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium mb-3">
                  Exclusive Access
                </span>
                <h2 className="font-display text-2xl md:text-4xl text-gold mb-4">
                  Join the Inner Circle
                </h2>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  Be the first to know about new drops, exclusive collections, and members-only events. 
                  Subscribe and receive 10% off your first order.
                </p>
              </div>

              {/* Right - Form */}
              <div className="flex flex-col justify-center">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mb-4">
                      <Check className="text-gold" size={28} />
                    </div>
                    <h3 className="font-display text-xl text-white mb-2">Welcome to the Circle</h3>
                    <p className="text-white/50 text-sm">Check your inbox for your exclusive discount.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full bg-dark-elevated border border-white/10 rounded-lg px-5 py-4 text-white placeholder:text-white/30 focus:border-gold focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="gold-filled-btn w-full flex items-center justify-center gap-3"
                    >
                      Subscribe
                      <Send size={16} />
                    </button>
                    <p className="text-white/30 text-xs text-center">
                      By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
