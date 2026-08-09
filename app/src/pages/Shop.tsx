import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { useStore } from '@/hooks/useStore';
import { Heart, ChevronDown, Check } from 'lucide-react';
import gsap from 'gsap';

const sortOptions = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

const filterCategories = ['Outerwear', 'Jackets', 'Hoodies', 'T-Shirts', 'Pants', 'Shirts', 'Accessories'];
const filterColors = ['Black', 'Charcoal', 'Navy', 'Olive', 'White', 'Gold'];
const filterSizes = ['S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', 'One Size'];

const priceRanges = [
  { label: 'Under Rs. 3,000', min: 0, max: 3000 },
  { label: 'Rs. 3,000 to Rs. 5,000', min: 3000, max: 5000 },
  { label: 'Rs. 5,000 to Rs. 10,000', min: 5000, max: 10000 },
  { label: 'Over Rs. 10,000', min: 10000, max: Infinity },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam && categoryParam !== 'All' ? [categoryParam] : []);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  
  const [sortBy, setSortBy] = useState('recommended');
  const [showSort, setShowSort] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const { toggleWishlist, isInWishlist, setIsCartOpen, addToCart, products } = useStore();

  useEffect(() => {
    if (categoryParam && categoryParam !== 'All') setSelectedCategories([categoryParam]);
  }, [categoryParam]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors.some(c => selectedColors.includes(c)));
    }
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }
    if (selectedPriceRanges.length > 0) {
      result = result.filter(p => {
        return selectedPriceRanges.some(rangeLabel => {
          const range = priceRanges.find(r => r.label === rangeLabel);
          return range && p.price >= range.min && p.price <= range.max;
        });
      });
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    // recommended does no sorting

    return result;
  }, [products, selectedCategories, selectedColors, selectedSizes, selectedPriceRanges, sortBy]);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.shop-product-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', overwrite: true }
      );
    }
  }, [filteredProducts.length, sortBy]);

  const toggleFilter = (setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setState(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const handleQuickAdd = (product: any) => {
    if (addToCart(product, product.sizes[0], product.colors[0], 1)) {
      setIsCartOpen(true);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedPriceRanges([]);
  };

  return (
    <div className="bg-black min-h-screen pt-[105px] font-sans">
      <Navigation />

      {/* Breadcrumbs */}
      <div className="px-4 md:px-8 py-4 border-b border-white/5">
        <div className="flex items-center text-xs font-semibold tracking-wider text-white/50 gap-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold transition-colors">Clothing</Link>
          <span>/</span>
          <span className="text-white font-bold">Men's Clothing</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 py-6 flex flex-col md:flex-row items-start gap-8">
        
        {/* Left Sidebar (Filters) */}
        <div className="w-full md:w-[250px] flex-shrink-0 md:sticky md:top-[120px]">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <button 
              className="font-bold text-white tracking-widest uppercase flex items-center gap-2 md:pointer-events-none"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              Filters
              <ChevronDown size={16} className={`md:hidden transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
            </button>
            {(selectedCategories.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0 || selectedPriceRanges.length > 0) && (
              <button onClick={clearAllFilters} className="text-gold text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">
                Clear All
              </button>
            )}
          </div>

          <div className={`${showMobileFilters ? 'block mb-8' : 'hidden'} md:block space-y-8`}>
            {/* Categories */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="font-bold text-white/80 uppercase text-xs tracking-wider mb-4">Categories</h4>
              <div className="space-y-3">
                {filterCategories.map(cat => (
                  <div key={cat} onClick={() => toggleFilter(setSelectedCategories, cat)} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-gold border-gold' : 'border-white/30 group-hover:border-gold'}`}>
                      {selectedCategories.includes(cat) && <Check size={12} className="text-black" strokeWidth={3} />}
                    </div>
                    <span className={`text-sm ${selectedCategories.includes(cat) ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white'} transition-colors`}>{cat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="font-bold text-white/80 uppercase text-xs tracking-wider mb-4">Price</h4>
              <div className="space-y-3">
                {priceRanges.map(range => (
                  <div key={range.label} onClick={() => toggleFilter(setSelectedPriceRanges, range.label)} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedPriceRanges.includes(range.label) ? 'bg-gold border-gold' : 'border-white/30 group-hover:border-gold'}`}>
                      {selectedPriceRanges.includes(range.label) && <Check size={12} className="text-black" strokeWidth={3} />}
                    </div>
                    <span className={`text-sm ${selectedPriceRanges.includes(range.label) ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white'} transition-colors`}>{range.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Colors */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="font-bold text-white/80 uppercase text-xs tracking-wider mb-4">Color</h4>
              <div className="space-y-3">
                {filterColors.map(color => (
                  <div key={color} onClick={() => toggleFilter(setSelectedColors, color)} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedColors.includes(color) ? 'bg-gold border-gold' : 'border-white/30 group-hover:border-gold'}`}>
                      {selectedColors.includes(color) && <Check size={12} className="text-black" strokeWidth={3} />}
                    </div>
                    {/* Color Swatch */}
                    <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: color.toLowerCase() }} />
                    <span className={`text-sm ${selectedColors.includes(color) ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white'} transition-colors`}>{color}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="font-bold text-white/80 uppercase text-xs tracking-wider mb-4">Size</h4>
              <div className="grid grid-cols-3 gap-2">
                {filterSizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => toggleFilter(setSelectedSizes, size)}
                    className={`py-1.5 text-xs font-semibold rounded border transition-colors ${selectedSizes.includes(size) ? 'bg-gold border-gold text-black' : 'border-white/20 text-white/60 hover:border-gold hover:text-gold'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Side - Grid */}
        <div className="flex-1 w-full">
          {/* Header & Sort */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/5 pb-4 gap-4">
            <div>
              <h1 className="font-bold text-lg text-white uppercase tracking-widest flex items-baseline">
                Men's Clothing 
                <span className="text-white/40 font-normal normal-case ml-3 text-sm">- {filteredProducts.length} items</span>
              </h1>
            </div>
            
            <div className="relative z-20">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded text-white/80 font-semibold text-xs tracking-wider uppercase hover:border-gold hover:text-gold transition-all"
              >
                Sort By : <span className="text-white ml-1">{sortOptions.find(o => o.value === sortBy)?.label}</span>
                <ChevronDown size={14} />
              </button>
              {showSort && (
                <div className="absolute right-0 top-full mt-1 bg-[#11131a] border border-white/10 shadow-2xl py-2 min-w-[220px]">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                      className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold transition-colors ${
                        sortBy === opt.value ? 'bg-gold/10 text-gold' : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-white/40 text-lg">No exact matches found for your selected filters.</p>
              <button onClick={clearAllFilters} className="text-gold font-bold uppercase tracking-wider text-sm mt-4 hover:text-white">Clear All Filters</button>
            </div>
          ) : (
            <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 pb-24">
              {filteredProducts.map((product) => (
                <div key={product.id} className="shop-product-card group relative bg-black hover:z-30 transition-all duration-300">
                  <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-[#0f1219] rounded-sm">
                    {/* Image */}
                    <div className="relative aspect-[3/4]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-300" />
                      
                      {/* Wishlist full width button on hover */}
                      <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 flex gap-2">
                         <button
                           onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                           className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors shadow-lg backdrop-blur-md ${
                             isInWishlist(product.id) ? 'bg-gold text-black' : 'bg-white/95 text-black hover:bg-white'
                           }`}
                         >
                           <Heart size={14} className={isInWishlist(product.id) ? "fill-black" : ""} /> 
                           {isInWishlist(product.id) ? 'Wishlisted' : 'Wishlist'}
                         </button>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      {product.isNew && (
                        <span className="bg-white/90 backdrop-blur text-black text-[9px] font-black px-2 py-1 tracking-widest uppercase rounded-sm">New</span>
                      )}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="pt-3 pb-4 relative bg-black z-20 transition-all duration-300">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-black text-white text-sm uppercase tracking-widest mb-1 truncate group-hover:text-gold transition-colors">VARENAYAM</h3>
                      <p className="text-white/60 text-xs truncate mb-2 font-medium">{product.name}</p>
                      
                      <div className="flex items-center gap-2 font-bold">
                        <span className="text-white text-sm">Rs. {product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <>
                            <span className="text-white/40 line-through text-xs font-normal">Rs. {product.originalPrice.toLocaleString()}</span>
                            <span className="text-orange-500 text-xs font-bold">({Math.round((1 - product.price / product.originalPrice) * 100)}% OFF)</span>
                          </>
                        )}
                      </div>
                    </Link>
                    
                    {/* Hover Sizes */}
                    <div className="absolute top-full left-0 right-0 bg-black pt-3 pb-3 px-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-b border-x border-white/10 -mt-1 shadow-2xl z-30 translate-y-2 group-hover:translate-y-0 rounded-b-lg">
                      <p className="text-white/50 text-[11px] uppercase tracking-wider mb-2"><span className="text-white/80 font-bold">Sizes Available</span></p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes.map(size => (
                          <span key={size} className="text-white/80 text-[10px] font-bold px-1.5 py-0.5 border border-white/20 rounded-sm">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
