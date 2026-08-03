import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { useStore } from '@/hooks/useStore';
import { Menu, X, ShoppingBag, User, Search, Minus, Plus, Trash2, Heart } from 'lucide-react';
import gsap from 'gsap';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, cartCount, cartTotal, isCartOpen, isSidebarOpen, setIsCartOpen, setIsSidebarOpen, removeFromCart, updateCartQuantity, user, logout } = useStore();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsCartOpen(false);
    setIsSidebarOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isSidebarOpen && sidebarRef.current) {
      gsap.fromTo(sidebarRef.current, { x: '-100%' }, { x: '0%', duration: 0.4, ease: 'power3.inOut' });
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isCartOpen && cartRef.current) {
      gsap.fromTo(cartRef.current, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.inOut' });
    }
  }, [isCartOpen]);

  const closeSidebar = () => {
    if (sidebarRef.current) {
      gsap.to(sidebarRef.current, { x: '-100%', duration: 0.4, ease: 'power3.inOut', onComplete: () => setIsSidebarOpen(false) });
    } else {
      setIsSidebarOpen(false);
    }
  };

  const closeCart = () => {
    if (cartRef.current) {
      gsap.to(cartRef.current, { x: '100%', duration: 0.4, ease: 'power3.inOut', onComplete: () => setIsCartOpen(false) });
    } else {
      setIsCartOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Lookbook', path: '/lookbook' },
    { label: 'About', path: '/about' },
    { label: 'Size Guide', path: '/size-guide' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gold text-black text-center py-2.5 px-4 text-xs font-medium tracking-[0.2em] uppercase">
        Free Shipping on Pre-Orders Over Rs. 4,999
      </div>

      {/* Navigation */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
        <nav className={`w-full max-w-6xl h-16 lg:h-[72px] rounded-2xl transition-all duration-500 flex items-center justify-between px-6 lg:px-8 border pointer-events-auto shadow-2xl ${
          scrolled ? 'bg-[#0f1219]/95 backdrop-blur-xl border-white/10' : 'bg-[#0f1219]/80 backdrop-blur-md border-white/5'
        }`}>
          {/* Left - Hamburger (Mobile) & Logo (Desktop) */}
          <div className="flex-1 flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-white hover:text-gold transition-colors duration-300 p-2"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
            <Link to="/" className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <img
                src="/images/varenayam-logo-cropped.jpg"
                alt="VARENAYAM"
                className="h-9 w-auto object-contain mix-blend-screen"
              />
              <span className="font-bold text-gold text-lg tracking-wide">VARENAYAM</span>
            </Link>
          </div>

          {/* Center - Desktop Nav Links & Logo (Mobile) */}
          <div className="flex-[2] flex justify-center">
            {/* Mobile Logo */}
            <Link to="/" className="lg:hidden flex-shrink-0 flex items-center gap-2">
              <img
                src="/images/varenayam-logo-cropped.jpg"
                alt="VARENAYAM"
                className="h-8 w-auto object-contain mix-blend-screen"
              />
              <span className="font-bold text-gold text-base tracking-wide">VARENAYAM</span>
            </Link>
            
            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'bg-gold text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)]' 
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right - Icons & Solid Action Button */}
          <div className="flex items-center justify-end gap-3 lg:gap-4 flex-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white/80 hover:text-white transition-colors duration-300 p-2"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-white/80 hover:text-white transition-colors duration-300 p-2 relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop Login Button */}
            <div className="hidden lg:flex items-center gap-4 ml-2">
              <Link
                to={user ? "/account" : "/login"}
                className="text-white/80 hover:text-white font-medium text-sm transition-colors duration-300"
              >
                {user ? "Account" : "Login"}
              </Link>
              {!user && (
                <Link
                  to="/register"
                  className="bg-gold text-black font-semibold text-sm px-5 py-2 rounded-[20px] hover:bg-white transition-colors duration-300"
                >
                  Sign Up
                </Link>
              )}
            </div>

            {/* Mobile User Icon */}
            <Link
              to={user ? "/account" : "/login"}
              className="lg:hidden text-white/80 hover:text-white transition-colors duration-300 p-2"
              aria-label="Account"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>
          </div>
        </nav>

        {/* Search Bar */}
        {searchOpen && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-[#0f1219]/95 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent border-none pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-0 text-sm"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Menu */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50" onClick={closeSidebar} />
          <div
            ref={sidebarRef}
            className="absolute left-0 top-0 bottom-0 w-[400px] max-w-[85vw] bg-black border-l-2 border-gold flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <img src="/images/varenayam-logo-cropped.jpg" alt="VARENAYAM" className="h-10 w-auto object-contain mix-blend-screen" />
              <button onClick={closeSidebar} className="text-white hover:text-gold transition-colors p-2">
                <X size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 py-8 px-6">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeSidebar}
                    className="block py-3 px-4 font-display text-xl text-white hover:text-gold hover:translate-x-2 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Wishlist Link */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  to="/wishlist"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 py-3 px-4 text-white/70 hover:text-gold transition-colors"
                >
                  <Heart size={18} />
                  <span className="text-sm tracking-wider uppercase">Wishlist</span>
                </Link>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-white/10">
              {user ? (
                <div className="space-y-3">
                  <p className="text-white/60 text-sm">Welcome, {user.name}</p>
                  <button
                    onClick={() => { logout(); closeSidebar(); }}
                    className="gold-border-btn w-full text-center"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={closeSidebar} className="gold-filled-btn w-full block text-center">
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50" onClick={closeCart} />
          <div
            ref={cartRef}
            className="absolute right-0 top-0 bottom-0 w-[480px] max-w-[90vw] bg-black border-t-2 border-gold flex flex-col"
          >
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="font-display text-xl text-gold tracking-wider">Shopping Cart ({cartCount})</h3>
              <button onClick={closeCart} className="text-white hover:text-gold transition-colors p-2">
                <X size={22} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 px-6">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag size={48} className="mx-auto text-white/20 mb-4" />
                  <p className="text-white/40 font-subheading italic text-lg">Your cart is empty</p>
                  <button onClick={closeCart} className="gold-border-btn mt-6">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4 bg-dark-surface rounded-lg p-3 border border-white/5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium truncate">{item.product.name}</h4>
                        <p className="text-white/40 text-xs mt-0.5">Size: {item.size}</p>
                        <p className="text-gold font-semibold text-sm mt-1">Rs. {item.product.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="ml-auto text-white/30 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-gold font-display text-xl">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <p className="text-white/40 text-xs">Shipping and taxes calculated at checkout.</p>
                <Link to="/checkout" onClick={closeCart} className="gold-filled-btn w-full block text-center">
                  Checkout
                </Link>
                <button onClick={closeCart} className="gold-border-btn w-full text-center">
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
