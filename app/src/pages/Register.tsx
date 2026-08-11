import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Navigation from '@/sections/Navigation';
import { useStore } from '@/hooks/useStore';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(import.meta.env.DEV ? 'http://localhost:5000/api/auth/register' : 'https://varenayam-bhnb.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobileNumber, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(
          { id: data.id, name: data.name, email: data.email, mobileNumber: data.mobileNumber, role: data.role }, 
          data.token
        );
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-[105px]">
      <Navigation />

      <div className="flex items-center justify-center px-[4vw] py-12 md:py-20">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-10">
            <img src="/images/varenayam-logo.png" alt="VARENAYAM" className="h-16 w-auto object-contain mx-auto mb-6" />
            <h1 className="font-display text-2xl md:text-3xl text-white">Join VARENAYAM</h1>
            <p className="text-white/40 text-sm mt-2">Create your account and start shopping</p>
          </div>

          {/* Form */}
          <div className="gradient-border">
            <div className="gradient-inner p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded text-center">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="w-full bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Mobile Number (Optional)</label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Your mobile number"
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
                      placeholder="Create a password"
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

                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="w-full bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors text-sm"
                  />
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" required className="accent-gold w-4 h-4 mt-0.5" />
                  <span className="text-white/40 text-xs leading-relaxed">
                    I agree to the{' '}
                    <Link to="/terms" className="text-gold hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="gold-filled-btn w-full flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/40 text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-gold hover:text-gold-light transition-colors">
                    Sign In
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
