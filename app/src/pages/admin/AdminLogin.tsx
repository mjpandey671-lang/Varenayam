import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded credentials for prototype
    if (email === 'admin@varenayam.com' && password === 'admin123') {
      localStorage.setItem('varenayam_admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] p-8 rounded-xl border border-white/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-widest uppercase mb-2">Admin Portal</h1>
          <p className="text-white/50 text-sm">Sign in to manage your store</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/80 uppercase tracking-wider block">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/80 uppercase tracking-wider block">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-gold text-black rounded font-bold uppercase tracking-widest hover:bg-gold-light transition-colors mt-4"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
