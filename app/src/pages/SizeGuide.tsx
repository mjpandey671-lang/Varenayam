import { useState } from 'react';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { Ruler } from 'lucide-react';

const sizeTabs = ['Tops', 'Bottoms', 'Accessories'];

const topsSizes = [
  { size: 'S', chest: '36-38', shoulder: '16.5', length: '27' },
  { size: 'M', chest: '38-40', shoulder: '17.5', length: '28' },
  { size: 'L', chest: '40-42', shoulder: '18.5', length: '29' },
  { size: 'XL', chest: '42-44', shoulder: '19.5', length: '30' },
  { size: 'XXL', chest: '44-46', shoulder: '20.5', length: '31' },
];

const bottomsSizes = [
  { size: '28', waist: '28', hip: '36', inseam: '30' },
  { size: '30', waist: '30', hip: '38', inseam: '30' },
  { size: '32', waist: '32', hip: '40', inseam: '31' },
  { size: '34', waist: '34', hip: '42', inseam: '31' },
  { size: '36', waist: '36', hip: '44', inseam: '32' },
];

export default function SizeGuide() {
  const [activeTab, setActiveTab] = useState('Tops');

  return (
    <div className="bg-black min-h-screen pt-[105px]">
      <Navigation />

      <div className="px-[4vw] py-8 md:py-12">
        <div className="text-center mb-12">
          <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-medium">Find Your Fit</span>
          <h1 className="font-display text-4xl md:text-6xl text-white mt-3 mb-4">Size Guide</h1>
          <p className="text-white/40 max-w-xl mx-auto">All measurements are in inches. For the best fit, measure yourself and compare with the chart below.</p>
        </div>

        {/* How to Measure */}
        <div className="max-w-4xl mx-auto mb-16 bg-dark-surface rounded-lg p-6 md:p-8 border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <Ruler size={24} className="text-gold" />
            <h2 className="font-display text-xl text-white">How to Measure</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-gold text-sm font-medium mb-2">Chest</h4>
              <p className="text-white/40 text-sm leading-relaxed">Measure around the fullest part of your chest, keeping the tape horizontal.</p>
            </div>
            <div>
              <h4 className="text-gold text-sm font-medium mb-2">Waist</h4>
              <p className="text-white/40 text-sm leading-relaxed">Measure around your natural waistline, at the narrowest part of your torso.</p>
            </div>
            <div>
              <h4 className="text-gold text-sm font-medium mb-2">Hip</h4>
              <p className="text-white/40 text-sm leading-relaxed">Measure around the fullest part of your hips, about 8 inches below your waist.</p>
            </div>
          </div>
        </div>

        {/* Size Chart Tabs */}
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 mb-8">
            {sizeTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-sm tracking-wider uppercase transition-all border ${
                  activeTab === tab
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-white/10 text-white/40 hover:border-white/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tops Table */}
          {activeTab === 'Tops' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/30">
                    <th className="text-left text-gold text-sm uppercase tracking-wider py-4 px-4">Size</th>
                    <th className="text-left text-gold text-sm uppercase tracking-wider py-4 px-4">Chest (in)</th>
                    <th className="text-left text-gold text-sm uppercase tracking-wider py-4 px-4">Shoulder (in)</th>
                    <th className="text-left text-gold text-sm uppercase tracking-wider py-4 px-4">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {topsSizes.map((row) => (
                    <tr key={row.size} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 text-white font-medium">{row.size}</td>
                      <td className="py-4 px-4 text-white/60">{row.chest}</td>
                      <td className="py-4 px-4 text-white/60">{row.shoulder}</td>
                      <td className="py-4 px-4 text-white/60">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Bottoms Table */}
          {activeTab === 'Bottoms' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/30">
                    <th className="text-left text-gold text-sm uppercase tracking-wider py-4 px-4">Size</th>
                    <th className="text-left text-gold text-sm uppercase tracking-wider py-4 px-4">Waist (in)</th>
                    <th className="text-left text-gold text-sm uppercase tracking-wider py-4 px-4">Hip (in)</th>
                    <th className="text-left text-gold text-sm uppercase tracking-wider py-4 px-4">Inseam (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {bottomsSizes.map((row) => (
                    <tr key={row.size} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 text-white font-medium">{row.size}</td>
                      <td className="py-4 px-4 text-white/60">{row.waist}</td>
                      <td className="py-4 px-4 text-white/60">{row.hip}</td>
                      <td className="py-4 px-4 text-white/60">{row.inseam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Accessories */}
          {activeTab === 'Accessories' && (
            <div className="text-center py-12">
              <p className="text-white/40 font-subheading italic text-lg">
                Our accessories are designed as one-size-fits-all with adjustable features for maximum comfort.
              </p>
              <p className="text-white/30 text-sm mt-4">
                For specific sizing questions, please contact our support team.
              </p>
            </div>
          )}
        </div>

        {/* Note */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-white/30 text-sm">
            All garments are pre-washed to minimize shrinkage. For a relaxed fit, consider sizing up.
            If you&apos;re between sizes, we recommend choosing the larger size.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
