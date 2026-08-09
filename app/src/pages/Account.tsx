import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { useStore } from '@/hooks/useStore';
import { User, ShoppingBag, Heart, MapPin, LogOut, Package, ChevronRight, ArrowLeft } from 'lucide-react';

const menuItems = [
  { icon: Package, label: 'My Orders', desc: 'Track and manage your orders', path: '/orders' },
  { icon: Heart, label: 'Wishlist', desc: 'Your saved items', path: '/wishlist' },
  { icon: MapPin, label: 'Addresses', desc: 'Manage shipping addresses', path: '/addresses' },
  { icon: User, label: 'Profile Settings', desc: 'Edit your account details', path: '/profile' },
];

function OrdersView() {
  const { orders, user } = useStore();
  const myOrders = orders.filter(order => {
    if (!order.user) return false;
    const orderUserId = typeof order.user === 'string' ? order.user : (order.user.id || order.user._id);
    return String(orderUserId) === String(user?.id);
  });
  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/account" className="flex items-center gap-2 text-gold hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Account
      </Link>
      <h2 className="font-display text-2xl text-white mb-6">My Orders</h2>
      {myOrders.length === 0 ? (
        <div className="bg-dark-surface rounded-lg border border-white/5 p-8 text-center">
          <ShoppingBag size={36} className="mx-auto text-white/20 mb-3" />
          <p className="text-white/40">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myOrders.map(order => (
            <div key={order.id} className="bg-dark-surface p-6 rounded-lg border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-white font-medium">Order #{order.id}</p>
                <p className="text-white/40 text-sm">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className={`text-sm px-3 py-1 rounded-full border ${order.status === 'Delivered' ? 'border-green-500 text-green-500' : 'border-gold text-gold'}`}>
                  {order.status}
                </span>
                <p className="text-white font-bold">Rs. {order.total.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddressesView() {
  const { addresses, addAddress } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newAddress = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip: formData.get('zip') as string,
      isDefault: false
    };
    addAddress(newAddress);
    setIsAdding(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/account" className="flex items-center gap-2 text-gold hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Account
      </Link>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-white">My Addresses</h2>
        {!isAdding && <button onClick={() => setIsAdding(true)} className="gold-border-btn text-xs py-2 px-4">Add New</button>}
      </div>

      {isAdding ? (
        <form onSubmit={handleAdd} className="bg-dark-surface p-6 rounded-lg border border-white/5 space-y-4">
          <h3 className="text-white font-medium mb-2">Add New Address</h3>
          <input required name="name" placeholder="Address Name (e.g. Home, Office)" className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-gold outline-none" />
          <input required name="street" placeholder="Street Address" className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-gold outline-none" />
          <div className="grid grid-cols-2 gap-4">
            <input required name="city" placeholder="City" className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-gold outline-none" />
            <input required name="state" placeholder="State" className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-gold outline-none" />
          </div>
          <input required name="zip" placeholder="PIN Code" className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-gold outline-none" />
          <div className="flex gap-4 mt-4">
            <button type="button" onClick={() => setIsAdding(false)} className="gold-border-btn flex-1">Cancel</button>
            <button type="submit" className="gold-filled-btn flex-1">Save Address</button>
          </div>
        </form>
      ) : addresses.length === 0 ? (
        <div className="bg-dark-surface rounded-lg border border-white/5 p-8 text-center">
          <MapPin size={36} className="mx-auto text-white/20 mb-3" />
          <p className="text-white/40 mb-6">You haven't saved any addresses yet.</p>
          <button onClick={() => setIsAdding(true)} className="gold-filled-btn">Add Your First Address</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map(addr => (
            <div key={addr.id} className="bg-dark-surface p-6 rounded-lg border border-white/5 relative">
              {addr.isDefault && (
                <span className="absolute top-4 right-4 text-[10px] bg-gold text-black font-bold px-2 py-1 rounded">DEFAULT</span>
              )}
              <p className="text-white font-medium mb-1">{addr.name}</p>
              <p className="text-white/60 text-sm">{addr.street}</p>
              <p className="text-white/60 text-sm">{addr.city}, {addr.state} {addr.zip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileView() {
  const { user } = useStore();
  if (!user) return null;
  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/account" className="flex items-center gap-2 text-gold hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Account
      </Link>
      <h2 className="font-display text-2xl text-white mb-6">Profile Settings</h2>
      <div className="bg-dark-surface rounded-lg border border-white/5 p-6 md:p-8 space-y-6">
        <div>
          <label className="block text-sm text-white/60 mb-2">Full Name</label>
          <input type="text" defaultValue={user.name} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-gold outline-none" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-2">Email Address</label>
          <input type="email" defaultValue={user.email} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-gold outline-none" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-2">Password</label>
          <input type="password" placeholder="••••••••" className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-gold outline-none" />
        </div>
        <button className="gold-filled-btn">Save Changes</button>
      </div>
    </div>
  );
}

export default function Account() {
  const { user, logout } = useStore();
  const location = useLocation();
  const isOrders = location.pathname === '/orders';
  const isAddresses = location.pathname === '/addresses';
  const isProfile = location.pathname === '/profile';
  const isDashboard = !isOrders && !isAddresses && !isProfile;

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
        {isOrders && <OrdersView />}
        {isAddresses && <AddressesView />}
        {isProfile && <ProfileView />}

        {isDashboard && (
          <>
            {/* Profile Header */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="font-display text-3xl text-gold">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h1 className="font-display text-2xl md:text-3xl text-white">{user.name}</h1>
                  <p className="text-white/40 text-sm mt-1">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems
                .filter(item => !(user.role === 'Admin' && item.label === 'Addresses'))
                .map((item) => (
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
              {user.role === 'Admin' && (
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
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
