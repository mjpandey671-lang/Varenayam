import { Link } from 'react-router';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { useStore } from '@/hooks/useStore';
import { User, ShoppingBag, Heart, MapPin, LogOut, Package, ChevronRight } from 'lucide-react';

const menuItems = [
  { icon: Package, label: 'My Orders', desc: 'Track and manage your orders', path: '/orders' },
  { icon: Heart, label: 'Wishlist', desc: 'Your saved items', path: '/wishlist' },
  { icon: MapPin, label: 'Addresses', desc: 'Manage shipping addresses', path: '/addresses' },
  { icon: User, label: 'Profile Settings', desc: 'Edit your account details', path: '/profile' },
];

export default function Account() {
  const { user, logout } = useStore();

  if (!user) {
    return (
      <div className="bg-black min-h-screen pt-[105px]">
        <Navigation />
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <User size={48} className="mx-auto text-white/20 mb-4" />
            <h1 className="font-display text-3xl text-white mb-4">Sign In Required</h1>
            <p className="text-white/40 mb-8">Please sign in to view your account.</p>
            <Link to="/login" className="gold-filled-btn">Sign In</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-[105px]">
      <Navigation />

      <div className="px-[4vw] py-8 md:py-12">
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center">
              <span className="font-display text-3xl text-gold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl text-white">{user.name}</h1>
              <p className="text-white/40 text-sm mt-1">{user.email}</p>
              <p className="text-gold/60 text-xs mt-1">Premium Member</p>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-4 p-5 bg-dark-surface rounded-lg border border-white/5 hover:border-gold/30 transition-all group"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                <item.icon size={20} className="text-gold" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium group-hover:text-gold transition-colors">{item.label}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
              <ChevronRight size={18} className="text-white/20 group-hover:text-gold transition-colors" />
            </Link>
          ))}

          {/* Admin Panel Link */}
          {user.email === 'admin@varenayam.com' && (
            <Link
              to="/admin"
              className="flex items-center gap-4 p-5 bg-gold/10 rounded-lg border border-gold/30 hover:border-gold transition-all group md:col-span-2"
            >
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Package size={20} className="text-gold" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-gold font-bold group-hover:text-gold-light transition-colors">Go to Admin Dashboard</h3>
                <p className="text-gold/60 text-sm">Manage products, orders, and store settings</p>
              </div>
              <ChevronRight size={18} className="text-gold/60 group-hover:text-gold transition-colors" />
            </Link>
          )}

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-4 p-5 bg-dark-surface rounded-lg border border-white/5 hover:border-red-500/30 transition-all group md:col-span-2"
          >
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0">
              <LogOut size={20} className="text-red-400" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-white font-medium group-hover:text-red-400 transition-colors">Sign Out</h3>
              <p className="text-white/40 text-sm">Sign out of your account</p>
            </div>
            <ChevronRight size={18} className="text-white/20 group-hover:text-red-400 transition-colors" />
          </button>
        </div>

        {/* Recent Activity */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="font-display text-xl text-white mb-6">Recent Activity</h2>
          <div className="bg-dark-surface rounded-lg border border-white/5 p-6">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <ShoppingBag size={36} className="mx-auto text-white/20 mb-3" />
                <p className="text-white/40 text-sm">No recent orders</p>
                <Link to="/shop" className="gold-border-btn mt-4 inline-block text-xs">
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
