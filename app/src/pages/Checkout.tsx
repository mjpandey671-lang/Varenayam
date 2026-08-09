import { useState } from 'react';
import { Link } from 'react-router';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { useStore } from '@/hooks/useStore';
import { Check, CreditCard, Truck, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart, addresses, addAddress, addOrder, user } = useStore();
  const [step, setStep] = useState(1);
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(addresses.length === 0);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses.length > 0 ? addresses[0].id : '');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD' | null>(null);

  const shipping = cartTotal >= 4999 ? 0 : 199;
  const total = cartTotal + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddingNew) {
      const formData = new FormData(e.target as HTMLFormElement);
      const newAddress = {
        id: Date.now().toString(),
        name: formData.get('name') as string || 'Address',
        street: formData.get('street') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        zip: formData.get('zip') as string,
        isDefault: addresses.length === 0
      };
      addAddress(newAddress);
      setSelectedAddressId(newAddress.id);
      setIsAddingNew(false);
    }
    setStep(2);
  };

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
      const shippingAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];
      const newOrder = {
        id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        user: user?.id,
        date: new Date().toISOString().split('T')[0],
        status: 'Processing' as const,
        paymentMethod: paymentMethod as 'UPI' | 'COD',
        total,
        items: [...cart],
        shippingAddress
      };
      addOrder(newOrder);
      
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
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <h2 className="font-display text-xl text-white mb-4">Shipping Information</h2>
                
                {addresses.length > 0 && (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white/60 text-sm">Select Address</h3>
                      {!isAddingNew && (
                        <button type="button" onClick={() => setIsAddingNew(true)} className="text-gold text-sm hover:underline">
                          + Add New Address
                        </button>
                      )}
                    </div>
                    
                    {!isAddingNew && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map(addr => (
                          <div 
                            key={addr.id} 
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-gold bg-gold/5' : 'border-white/10 bg-dark-elevated hover:border-white/30'}`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <p className="text-white font-medium">{addr.name}</p>
                              {selectedAddressId === addr.id && <Check size={16} className="text-gold" />}
                            </div>
                            <p className="text-white/60 text-sm">{addr.street}</p>
                            <p className="text-white/60 text-sm">{addr.city}, {addr.state} {addr.zip}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {isAddingNew && (
                  <>
                    {addresses.length > 0 && (
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-medium">Add New Address</h3>
                        <button type="button" onClick={() => setIsAddingNew(false)} className="text-white/40 text-sm hover:text-white">
                          Cancel
                        </button>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" name="name" required placeholder="Save Address As (e.g. Home)" className="md:col-span-2 bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                      <input type="text" name="street" required placeholder="Street Address" className="md:col-span-2 bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                      <input type="text" name="city" required placeholder="City" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                      <input type="text" name="zip" required placeholder="PIN Code" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                      <input type="text" name="state" required placeholder="State" className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm" />
                      <input type="text" placeholder="Country" defaultValue="India" disabled className="bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white/50 bg-white/5 placeholder:text-white/20 focus:outline-none text-sm cursor-not-allowed" />
                    </div>
                  </>
                )}
                
                <button type="submit" className="gold-filled-btn mt-4">
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl text-white mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {['UPI', 'Cash on Delivery'].map((method) => (
                    <label key={method} className={`flex items-center gap-4 p-4 bg-dark-elevated border rounded-lg cursor-pointer transition-colors ${paymentMethod === (method === 'UPI' ? 'UPI' : 'COD') ? 'border-gold bg-white/5' : 'border-white/10 hover:border-gold/30'}`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        className="accent-gold" 
                        checked={paymentMethod === (method === 'UPI' ? 'UPI' : 'COD')} 
                        onChange={() => setPaymentMethod(method === 'UPI' ? 'UPI' : 'COD')} 
                      />
                      <CreditCard size={20} className={paymentMethod === (method === 'UPI' ? 'UPI' : 'COD') ? 'text-gold' : 'text-white/40'} />
                      <span className="text-white text-sm">{method}</span>
                    </label>
                  ))}
                </div>
                
                {paymentMethod === 'UPI' && (
                  <div className="mt-4 p-4 bg-dark-elevated border border-gold/30 rounded-lg">
                    <p className="text-white/80 text-sm mb-2">Scan the QR code or pay using UPI ID</p>
                    <div className="w-40 h-40 bg-white/10 border border-white/20 rounded flex items-center justify-center mb-4">
                      <span className="text-white/40 text-xs text-center px-4">UPI QR Code<br/>(Placeholder)</span>
                    </div>
                    <p className="text-gold text-sm font-medium">varenayam@upi</p>
                  </div>
                )}
                
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setStep(1)} className="gold-border-btn">Back</button>
                  <button 
                    onClick={() => {
                      if (!paymentMethod) {
                        toast.error('Please select a payment method');
                        return;
                      }
                      setStep(3);
                    }} 
                    className="gold-filled-btn"
                  >
                    Review Order
                  </button>
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
