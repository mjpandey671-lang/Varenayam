import { Link } from 'react-router';
import { Instagram, Twitter, Youtube, Facebook } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'All Products', path: '/shop' },
    { label: 'New Arrivals', path: '/shop?filter=new' },
    { label: 'Bestsellers', path: '/shop?filter=bestseller' },
    { label: 'Outerwear', path: '/shop?category=Outerwear' },
    { label: 'Accessories', path: '/shop?category=Accessories' },
  ],
  help: [
    { label: 'FAQs', path: '/faqs' },
    { label: 'Shipping Info', path: '/shipping' },
    { label: 'Returns & Exchanges', path: '/returns' },
    { label: 'Size Guide', path: '/size-guide' },
    { label: 'Track Order', path: '/track-order' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press', path: '/press' },
    { label: 'Sustainability', path: '/sustainability' },
    { label: 'Contact', path: '/contact' },
  ],
  policies: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
    { label: 'Refund Policy', path: '/refund' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/varenayam', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/varenayam', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/varenayam', label: 'YouTube' },
  { icon: Facebook, href: 'https://facebook.com/varenayam', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 md:pt-20 pb-8">
      <div className="px-[4vw]">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/images/varenayam-logo-cropped.png"
                alt="VARENAYAM"
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Premium luxury streetwear for those who are born to stand out. Crafted with precision, worn with pride.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-white text-sm tracking-wider uppercase mb-5">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/40 hover:text-gold transition-colors duration-300 text-sm gold-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-display text-white text-sm tracking-wider uppercase mb-5">Customer Care</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/40 hover:text-gold transition-colors duration-300 text-sm gold-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-white text-sm tracking-wider uppercase mb-5">About Us</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/40 hover:text-gold transition-colors duration-300 text-sm gold-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-display text-white text-sm tracking-wider uppercase mb-5">Policies</h4>
            <ul className="space-y-3">
              {footerLinks.policies.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/40 hover:text-gold transition-colors duration-300 text-sm gold-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="border-t border-white/10 pt-8 pb-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          <div>
            <span className="text-white/30 text-xs uppercase tracking-wider">Email</span>
            <p className="text-white/60 text-sm mt-1">support@varenayam.com</p>
          </div>
          <div>
            <span className="text-white/30 text-xs uppercase tracking-wider">Phone</span>
            <p className="text-white/60 text-sm mt-1">+91 98765 43210</p>
          </div>
          <div>
            <span className="text-white/30 text-xs uppercase tracking-wider">Address</span>
            <p className="text-white/60 text-sm mt-1">makarba Ahemdabad pin -380051</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} VARENAYAM. All rights reserved.
          </p>
          {/* Payment Icons */}
          <div className="flex items-center gap-3">
            <span className="text-white/20 text-[10px] uppercase tracking-wider">We Accept:</span>
            <div className="flex gap-2">
              {['Visa', 'Mastercard', 'UPI', 'COD'].map((method) => (
                <span
                  key={method}
                  className="px-2.5 py-1 border border-white/10 rounded text-white/30 text-[10px] tracking-wider"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
