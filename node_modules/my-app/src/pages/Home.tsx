import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import ProductGrid from '@/sections/ProductGrid';
import Manifesto from '@/sections/Manifesto';
import Newsletter from '@/sections/Newsletter';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <Hero />
      <ProductGrid />
      <Manifesto />
      <Newsletter />
      <Footer />
    </div>
  );
}
