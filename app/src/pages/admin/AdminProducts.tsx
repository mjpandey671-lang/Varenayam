import { useStore } from '@/hooks/useStore';
import { Link } from 'react-router';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminProducts() {
  const { products, deleteProduct } = useStore();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const success = await deleteProduct(id);
      if (!success) {
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black uppercase tracking-widest text-white">All Products</h2>
        <Link 
          to="/admin/products/add" 
          className="flex items-center gap-2 px-4 py-2 bg-gold text-black rounded font-bold uppercase tracking-wider text-sm hover:bg-gold-light transition-colors"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="bg-[#111] rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 border-b border-white/5">
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase">Product</th>
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase">Category</th>
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase">Price</th>
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase">Status</th>
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
                  <td className="p-4 text-sm font-bold text-white">
                    Rs. {product.price.toLocaleString()}
                    {product.originalPrice && (
                      <span className="block text-white/40 line-through text-xs font-normal">Rs. {product.originalPrice.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                      product.inStock ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/admin/products/edit/${product.id}`}
                        className="p-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/40">
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
