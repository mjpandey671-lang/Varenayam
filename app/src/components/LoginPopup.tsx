import { useStore } from '@/hooks/useStore';
import { Link } from 'react-router';
import { X, LogIn, UserPlus } from 'lucide-react';

export default function LoginPopup() {
  const { isLoginPopupOpen, setIsLoginPopupOpen } = useStore();

  if (!isLoginPopupOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0B0F19] border border-white/10 rounded-xl w-full max-w-md shadow-2xl shadow-black relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsLoginPopupOpen(false)}
          className="absolute top-4 right-4 text-white/40 hover:text-white bg-white/5 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn size={32} className="text-gold" />
          </div>
          
          <h3 className="font-display text-2xl font-bold text-white mb-2">Login Required</h3>
          <p className="text-white/60 text-sm mb-8">
            Please log in or create an account to add products to your cart or wishlist.
          </p>

          <div className="flex flex-col gap-4">
            <Link 
              to="/login"
              onClick={() => setIsLoginPopupOpen(false)}
              className="gold-filled-btn w-full flex items-center justify-center gap-2 py-3"
            >
              <LogIn size={18} />
              Login to your account
            </Link>
            
            <Link 
              to="/register"
              onClick={() => setIsLoginPopupOpen(false)}
              className="gold-border-btn w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border-white/10"
            >
              <UserPlus size={18} />
              Create new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
