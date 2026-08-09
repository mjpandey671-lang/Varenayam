import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';

interface PolicyPageProps {
  title: string;
}

export default function PolicyPage({ title }: PolicyPageProps) {
  return (
    <div className="bg-black min-h-screen pt-[105px]">
      <Navigation />

      {/* Hero */}
      <div className="relative py-12 md:py-20 px-[4vw] text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="font-display text-3xl md:text-5xl text-gold mb-6">{title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-[4vw] pb-24">
        <div className="max-w-4xl mx-auto bg-dark-surface border border-white/10 rounded-lg p-8 md:p-12">
          <div className="prose prose-invert prose-gold max-w-none">
            <p className="text-white/60 leading-relaxed mb-6">
              This is a placeholder page for <strong>{title}</strong>. 
              The actual content for this policy will be updated soon. We take our customer's privacy and satisfaction very seriously.
            </p>
            <h3 className="text-white font-display text-xl mt-8 mb-4">1. General Information</h3>
            <p className="text-white/60 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3 className="text-white font-display text-xl mt-8 mb-4">2. Your Rights</h3>
            <p className="text-white/60 leading-relaxed mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-white/40 text-sm mt-12 pt-8 border-t border-white/10">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
