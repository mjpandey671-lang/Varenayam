import { Link } from 'react-router';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { useStore } from '@/hooks/useStore';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, setIsCartOpen } = useStore();

  const handleMoveToCart = (product: typeof wishlist[0]) => {
    if (addToCart(product, product.sizes[0], product.colors[0], 1)) {
      setIsCartOpen(true);
      toggleWishlist(product);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-[105px]">
      <Navigation />

      <div className="px-[4vw] py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl text-white mb-3">My Wishlist</h1>
          <p className="text-white/40">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={48} className="mx-auto text-white/20 mb-4" />
            <h2 className="font-display text-xl text-white mb-2">Your wishlist is empty</h2>
            <p className="text-white/40 mb-8">Save your favorite items for later.</p>
            <Link to="/shop" className="gold-filled-btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {wishlist.map((product) => (
              <div key={product.id} className="group bg-dark-surface rounded-lg overflow-hidden border border-white/5 hover:border-gold/30 transition-all">
                <Link to={`/product/${product.id}`} className="relative block aspect-[3/4] overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display text-white text-sm group-hover:text-gold transition-colors truncate">{product.name}</h3>
                  </Link>
                  <p className="text-gold font-semibold text-sm mt-1">Rs. {product.price.toLocaleString()}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="flex-1 bg-gold text-black text-xs font-medium py-2 rounded flex items-center justify-center gap-1.5 hover:bg-gold-light transition-colors"
                    >
                      <ShoppingBag size={14} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="w-9 h-9 flex items-center justify-center border border-white/10 rounded text-white/40 hover:text-red-400 hover:border-red-400/30 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
