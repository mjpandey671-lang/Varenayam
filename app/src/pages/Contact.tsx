import { useState } from 'react';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'support@varenayam.com' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
  { icon: MapPin, label: 'Address', value: '123 Fashion Street, Bandra West, Mumbai - 400050' },
  { icon: Clock, label: 'Hours', value: 'Mon - Sat: 10:00 AM - 7:00 PM IST' },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="bg-black min-h-screen pt-[105px]">
      <Navigation />

      <div className="px-[4vw] py-8 md:py-12">
        <div className="text-center mb-12">
          <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium">Get in Touch</span>
          <h1 className="font-display text-4xl md:text-6xl text-white mt-3 mb-4">Contact Us</h1>
          <p className="text-white/40 max-w-xl mx-auto">Have a question? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="gradient-border">
            <div className="gradient-inner p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-gold" />
                  </div>
                  <h3 className="font-display text-xl text-white mb-2">Message Sent!</h3>
                  <p className="text-white/40 text-sm">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        required
                        className="w-full bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="w-full bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What is this regarding?"
                      required
                      className="w-full bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more..."
                      required
                      rows={5}
                      className="w-full bg-dark-elevated border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none text-sm resize-none"
                    />
                  </div>
                  <button type="submit" className="gold-filled-btn w-full flex items-center justify-center gap-3">
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <info.icon size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-white/60 text-xs uppercase tracking-wider mb-1">{info.label}</h4>
                  <p className="text-white text-sm">{info.value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-white/60 text-xs uppercase tracking-wider mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {['Instagram', 'Twitter', 'YouTube', 'Facebook'].map((social) => (
                  <span
                    key={social}
                    className="px-3 py-1.5 border border-white/10 rounded text-white/40 text-xs tracking-wider hover:border-gold hover:text-gold transition-all cursor-pointer"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
