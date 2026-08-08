import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Navigation from '@/sections/Navigation';
import { useStore } from '@/hooks/useStore';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      
      // If admin logs in from the main website, redirect them to the admin panel
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'mjpandey671@gmail.com';
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Pandey@555';
      
      if (email === adminEmail && password === adminPassword) {
        localStorage.setItem('varenayam_admin_auth', 'true');
        login({ id: '0', name: 'Admin', email }); // Set user context too
        navigate('/admin');
        return;
      }

      login({ id: '1', name: 'Viren', email });
      navigate('/');
    }, 1000);
  };

  return (
    <div className="bg-black min-h-screen pt-[105px]">
      <Navigation />

      <div className="flex items-center justify-center px-[4vw] py-12 md:py-20">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-10">
            <img src="/images/varenayam-logo.png" alt="VARENAYAM" className="h-16 w-auto object-contain mx-auto mb-6" />
            <h1 className="font-display text-2xl md:text-3xl text-white">Welcome Back</h1>
            <p className="text-white/40 text-sm mt-2">Sign in to your VARENAYAM account</p>
          </div>

          {/* Form */}
          <div className="gradient-border">
            <div className="gradient-inner p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors text-sm pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-gold w-4 h-4" />
                    <span className="text-white/40 text-xs">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-gold text-xs hover:text-gold-light transition-colors">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="gold-filled-btn w-full flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn size={18} />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/40 text-sm">
                  Don&apos;t have an account?{' '}
                  <Link to="/register" className="text-gold hover:text-gold-light transition-colors">
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
