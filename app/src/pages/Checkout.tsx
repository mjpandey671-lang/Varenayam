import { useState } from 'react';
import { Link } from 'react-router';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { useStore } from '@/hooks/useStore';
import { Check, CreditCard, Truck, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState(1);
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="bg-black min-h-screen pt-[105px]">
        <Navigation />
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <h1 className="font-display text-3xl text-white mb-4">Your Cart is Empty</h1>
            <p className="text-white/40 mb-8">Add some items to proceed to checkout.</p>
            <Link to="/shop" className="gold-filled-btn">Continue Shopping</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    setTimeout(() => {
      setIsPlacing(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="bg-black min-h-screen pt-[105px]">
        <Navigation />
        <div className="flex items-center justify-center py-24 px-[4vw]">
          <div className="text-center max-w-lg">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-gold" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-white mb-4">Order Confirmed!</h1>
            <p className="text-white/50 mb-2">Thank you for your purchase.</p>
            <p className="text-white/30 text-sm mb-8">Order #VY{Date.now().toString().slice(-8)}</p>
            <p className="text-white/40 text-sm mb-8">
              We&apos;ve sent a confirmation email with your order details. Your items will be shipped within 2-3 business days.
            </p>
            <Link to="/shop" className="gold-filled-btn">Continue Shopping</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const shipping = cartTotal >= 4999 ? 0 : 199;
  const total = cartTotal + shipping;

  return (
    <div className="bg-black min-h-screen pt-[105px]">
      <Navigation />

      <div className="px-[4vw] py-8 md:py-12">
        <h1 className="font-display text-3xl md:text-4xl text-white mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-12 max-w-2xl">
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > i + 1 ? 'bg-gold text-black' : step === i + 1 ? 'bg-gold/20 text-gold border border-gold' : 'bg-white/5 text-white/30 border border-white/10'
              }`}>
                {step > i + 1 ? <Check size={16} /> : i + 1}
              </div>
              <span className={`text-sm ${step >= i + 1 ? 'text-white' : 'text-white/30'}`}>{s}</span>
              {i < 2 && <ChevronRight size={16} className="text-white/20" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 md:gap-12">
          {/* Main Form */}
          <div>
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl text-white mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                  <input type="text" placeholder="Last Name" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                  <input type="email" placeholder="Email" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                  <input type="tel" placeholder="Phone Number" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                  <input type="text" placeholder="Address Line 1" className="md:col-span-2 bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                  <input type="text" placeholder="Address Line 2" className="md:col-span-2 bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                  <input type="text" placeholder="City" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                  <input type="text" placeholder="PIN Code" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                  <input type="text" placeholder="State" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                  <input type="text" placeholder="Country" defaultValue="India" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                </div>
                <button onClick={() => setStep(2)} className="gold-filled-btn mt-4">
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl text-white mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {['Credit / Debit Card', 'UPI', 'Cash on Delivery'].map((method) => (
                    <label key={method} className="flex items-center gap-4 p-4 bg-dark-elevated border border-white/10 rounded-lg cursor-pointer hover:border-gold/30 transition-colors">
                      <input type="radio" name="payment" className="accent-gold" defaultChecked={method === 'Credit / Debit Card'} />
                      <CreditCard size={20} className="text-gold" />
                      <span className="text-white text-sm">{method}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-6">
                  <h3 className="text-white/60 text-xs uppercase tracking-wider mb-3">Card Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Card Number" className="md:col-span-2 bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                    <input type="text" placeholder="Cardholder Name" className="md:col-span-2 bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                    <input type="text" placeholder="MM/YY" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                    <input type="text" placeholder="CVV" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setStep(1)} className="gold-border-btn">Back</button>
                  <button onClick={() => setStep(3)} className="gold-filled-btn">Review Order</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl text-white mb-4">Review Your Order</h2>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4 bg-dark-elevated rounded-lg p-4 border border-white/5">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-medium">{item.product.name}</h4>
                        <p className="text-white/40 text-xs mt-1">Size: {item.size} | Color: {item.color}</p>
                        <p className="text-white/40 text-xs">Qty: {item.quantity}</p>
                        <p className="text-gold text-sm font-semibold mt-1">Rs. {(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setStep(2)} className="gold-border-btn">Back</button>
                  <button onClick={handlePlaceOrder} disabled={isPlacing} className="gold-filled-btn flex-1 flex items-center justify-center gap-3 disabled:opacity-50">
                    {isPlacing ? (
                      <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck size={18} />
                        Place Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-dark-elevated rounded-lg p-6 border border-white/5 h-fit">
            <h3 className="font-display text-lg text-white mb-6">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Subtotal</span>
                <span className="text-white">Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Shipping</span>
                <span className={shipping === 0 ? 'text-gold' : 'text-white'}>
                  {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
                </span>
              </div>
              {shipping === 0 && (
                <div className="flex items-center gap-2 text-gold/70 text-xs">
                  <Truck size={14} />
                  Free shipping on orders over Rs. 4,999
                </div>
              )}
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="text-white font-medium">Total</span>
                <span className="text-gold font-display text-xl">Rs. {total.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/30 text-xs">
              <ShieldCheck size={14} />
              Secure SSL Encrypted Transaction
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
