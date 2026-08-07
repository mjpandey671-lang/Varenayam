import { Link, Outlet, useLocation, Navigate, useNavigate } from 'react-router';
import { 
  LayoutDashboard, 
  FolderPlus, 
  PackagePlus, 
  Image as ImageIcon, 
  ImagePlus, 
  Megaphone, 
  Users, 
  ShoppingCart, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  User, 
  LogOut,
  Activity,
} from 'lucide-react';
import Navigation from '@/sections/Navigation';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Basic auth check
  const isAuthenticated = localStorage.getItem('varenayam_admin_auth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('varenayam_admin_auth');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Create Category', path: '/admin/category', icon: FolderPlus },
    { name: 'Create Product', path: '/admin/products', icon: PackagePlus },
    { name: 'Manage Hero', path: '/admin/hero', icon: ImageIcon },
    { name: 'Featured Products', path: '/admin/featured-products', icon: ImagePlus },
    { name: 'Manage Ads', path: '/admin/ads', icon: Megaphone },
    { name: 'Manage Team', path: '/admin/team', icon: Users },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Contact Submissions', path: '/admin/contacts', icon: MessageSquare },
    { name: 'Users', path: '/admin/users', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-white flex flex-col font-sans relative">
      {/* Live Website Navigation */}
      <Navigation />

      <div className="flex-1 flex pt-24">
        {/* Sidebar */}
        <div className="w-64 bg-[#0B0F19] border-r border-white/5 flex flex-col fixed h-[calc(100vh-6rem)] left-0 top-24">
          <div className="p-6">
            <h2 className="font-bold text-2xl tracking-wide text-white mb-2">Admin Panel</h2>
            <p className="text-white/40 text-xs font-semibold tracking-wider uppercase mb-2">Management Dashboard</p>
            <div className="h-px bg-white/10 w-full mb-4"></div>
          </div>
          
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pb-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-[#18153A] text-[#818CF8] border border-[#2D2A54]' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#818CF8]' : 'text-white/60'} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 space-y-2 mt-auto border-t border-white/5 bg-[#0B0F19]">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium text-white/60 hover:bg-red-500/10 hover:text-red-500 transition-all"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-full ml-64">
          {/* Topbar */}
          <header className="h-24 bg-[#0B0F19]/50 backdrop-blur-sm border-b border-white/5 flex items-center justify-between px-8 z-10 sticky top-24">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
              <p className="text-white/60 text-sm">Welcome back, <span className="text-[#818CF8] font-semibold">Admin</span></p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#2D2A54] rounded hover:bg-white/5 transition-colors text-sm font-medium text-white">
                <Activity size={16} className="text-[#818CF8]" />
                Live Analytics
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-8 bg-[#070913] min-h-[calc(100vh-12rem)]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
