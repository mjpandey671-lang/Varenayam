import { useStore } from '@/hooks/useStore';
import { Link } from 'react-router';
import { Star, StarOff } from 'lucide-react';

export default function AdminFeaturedProducts() {
  const { products, updateProduct, deleteProduct } = useStore();

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    await updateProduct(id, { isFeatured: !currentStatus });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-widest text-white">Featured Products</h2>
          <p className="text-white/40 text-sm mt-1">Select which products appear on the homepage</p>
        </div>
      </div>

      <div className="bg-[#111] rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 border-b border-white/5">
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase">Product</th>
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase">Category</th>
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="font-bold text-white text-sm">{product.name}</p>
                        <p className="text-white/40 text-xs">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-white/80">{product.category}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleToggleFeatured(product.id, !!product.isFeatured)}
                        className={`p-2 rounded transition-colors mr-2 ${
                          product.isFeatured 
                            ? 'bg-gold/10 text-gold hover:bg-gold/20' 
                            : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                        }`}
                        title={product.isFeatured ? 'Remove from Featured' : 'Add to Featured'}
                      >
                        {product.isFeatured ? <Star size={16} className="fill-gold" /> : <StarOff size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {products.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-white/40">
                    No products found. Add a new product to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
