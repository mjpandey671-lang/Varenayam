import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useStore } from '@/hooks/useStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Outerwear', 'Jackets', 'Hoodies', 'T-Shirts', 'Pants', 'Shirts', 'Accessories'];

export default function ProductGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const { toggleWishlist, isInWishlist, setIsCartOpen, addToCart, products } = useStore();

  let filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.product-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 75%', toggleActions: 'play none none none' }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [filteredProducts]);

  const handleQuickAdd = (product: any) => {
    addToCart(product, product.sizes[0], product.colors[0], 1);
    setIsCartOpen(true);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-black px-[4vw]">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium">Curated Selection</span>
        <h2 className="font-display text-3xl md:text-5xl text-white mt-3 mb-8">Featured Products</h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 md:px-6 py-2 text-xs md:text-sm tracking-wider uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? 'border-gold bg-gold text-black font-medium'
                  : 'border-white/10 text-white/60 hover:border-gold/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card group">
            <div className="gradient-border">
              <div className="gradient-inner">
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="relative block aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => { e.preventDefault(); handleQuickAdd(product); }}
                      className="w-11 h-11 bg-gold text-black rounded-full flex items-center justify-center hover:bg-gold-light transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                      title="Add to Cart"
                    >
                      <ShoppingBag size={18} />
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="w-11 h-11 bg-white/10 backdrop-blur text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                      title="View Details"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Eye size={18} />
                    </Link>
                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150 ${
                        isInWishlist(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/10 backdrop-blur text-white hover:bg-white/20'
                      }`}
                      title="Add to Wishlist"
                    >
                      <Heart size={18} />
                    </button>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-gold text-black text-[10px] font-bold px-2.5 py-1 tracking-wider uppercase">New</span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-white/10 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 tracking-wider uppercase border border-white/20">Bestseller</span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-red-500/80 text-white text-[10px] font-bold px-2.5 py-1 tracking-wider uppercase">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display text-white text-sm md:text-base group-hover:text-gold transition-colors duration-300 truncate">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-gold font-semibold">Rs. {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-white/30 line-through text-sm">Rs. {product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link to="/shop" className="gold-border-btn">
          View All Products
        </Link>
      </div>
    </section>
  );
}
