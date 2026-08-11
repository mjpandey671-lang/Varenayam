import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { useStore } from '@/hooks/useStore';
import { Heart, ShoppingBag, Share2, ChevronRight, Minus, Plus, Check, Star } from 'lucide-react';
import gsap from 'gsap';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen, products } = useStore();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    }
  }, [id]);

  if (!product) {
    return (
      <div className="bg-black min-h-screen pt-[105px] flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <h1 className="font-display text-3xl text-white mb-4">Product Not Found</h1>
          <Link to="/shop" className="gold-border-btn">Back to Shop</Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
    setActiveImage(0);
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    if (addToCart(product, selectedSize, selectedColor, quantity)) {
      setIsCartOpen(true);
    }
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) return;
    if (addToCart(product, selectedSize, selectedColor, quantity)) {
      navigate('/checkout');
    }
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-black min-h-screen pt-[105px]">
      <Navigation />

      {/* Breadcrumb */}
      <div className="px-[4vw] py-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-gold transition-colors">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-white/60">{product.name}</span>
        </div>
      </div>

      <div ref={contentRef} className="px-[4vw] py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-dark-surface border border-white/5">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-gold' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt={`${product.name} - ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.isNew && (
                <span className="bg-gold text-black text-[10px] font-bold px-3 py-1.5 tracking-wider uppercase">New Arrival</span>
              )}
              {product.isBestseller && (
                <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1.5 tracking-wider uppercase border border-white/20">Bestseller</span>
              )}
              <span className="bg-white/5 text-white/60 text-[10px] px-3 py-1.5 tracking-wider uppercase border border-white/10">{product.category}</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <span className="text-white/40 text-xs">(48 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-gold font-display text-3xl">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-white/30 line-through text-lg">Rs. {product.originalPrice.toLocaleString()}</span>
                  <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 tracking-wider">
                    SAVE Rs. {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-white/50 text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="text-white/70 text-xs uppercase tracking-wider mb-3 block">
                Size: <span className="text-white">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-11 px-4 border text-sm font-medium tracking-wider transition-all ${
                      selectedSize === size
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/10 text-white/60 hover:border-white/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="text-white/70 text-xs uppercase tracking-wider mb-3 block">
                Color: <span className="text-white">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 h-11 border text-sm tracking-wider transition-all ${
                      selectedColor === color
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/10 text-white/60 hover:border-white/30'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-white/70 text-xs uppercase tracking-wider mb-3 block">Quantity</label>
              <div className="flex items-center gap-0 border border-white/10 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors border-r border-white/10"
                >
                  <Minus size={16} />
                </button>
                <span className="w-14 h-12 flex items-center justify-center text-white font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors border-l border-white/10"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart / Buy Now */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="gold-filled-btn flex-1 flex items-center justify-center gap-3"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="gold-border-btn flex-1 text-center"
              >
                Buy Now
              </button>
            </div>

            {/* Added Message */}
            {showAddedMessage && (
              <div className="flex items-center gap-2 text-gold text-sm mb-4 animate-in fade-in">
                <Check size={16} />
                Added to cart! <button onClick={() => setIsCartOpen(true)} className="underline">View Cart</button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <button
                onClick={() => toggleWishlist(product)}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isInWishlist(product.id) ? 'text-red-400' : 'text-white/40 hover:text-gold'
                }`}
              >
                <Heart size={18} className={isInWishlist(product.id) ? 'fill-red-400' : ''} />
                {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
              <button className="flex items-center gap-2 text-sm text-white/40 hover:text-gold transition-colors">
                <Share2 size={18} />
                Share
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Check size={16} className="text-gold" />
                </div>
                <span className="text-white/50 text-xs">Premium Quality</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Check size={16} className="text-gold" />
                </div>
                <span className="text-white/50 text-xs">Free Shipping Rs. 4,999+</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Check size={16} className="text-gold" />
                </div>
                <span className="text-white/50 text-xs">7-Day Returns</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Check size={16} className="text-gold" />
                </div>
                <span className="text-white/50 text-xs">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="px-[4vw] py-16 border-t border-white/5">
          <h2 className="font-display text-2xl md:text-3xl text-white mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((rp) => (
              <Link
                key={rp.id}
                to={`/product/${rp.id}`}
                className="group bg-dark-surface rounded-lg overflow-hidden border border-white/5 hover:border-gold/30 transition-all"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={rp.image} alt={rp.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-white text-sm group-hover:text-gold transition-colors truncate">{rp.name}</h3>
                  <p className="text-gold font-semibold text-sm mt-1">Rs. {rp.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
