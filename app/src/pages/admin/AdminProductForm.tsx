import { useState, useEffect } from 'react';
import { useStore } from '@/hooks/useStore';
import { useNavigate, useParams, Link } from 'react-router';
import type { Product } from '@/types';
import { ArrowLeft } from 'lucide-react';

const CATEGORIES = ['Outerwear', 'Jackets', 'Hoodies', 'T-Shirts', 'Pants', 'Shirts', 'Accessories'];
const SIZES = ['S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', 'One Size'];
const COLORS = ['Black', 'Charcoal', 'Navy', 'Olive', 'White', 'Gold'];

export default function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const { products, addProduct, updateProduct } = useStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: CATEGORIES[0],
    image: '',
    images: [],
    sizes: [],
    colors: [],
    inStock: true,
    isNew: false,
    isBestseller: false,
  });

  useEffect(() => {
    if (isEditing) {
      const product = products.find(p => p.id === id);
      if (product) {
        setFormData(product);
      } else {
        navigate('/admin/products');
      }
    }
  }, [id, isEditing, products, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayToggle = (name: 'sizes' | 'colors', value: string) => {
    setFormData(prev => {
      const array = prev[name] || [];
      if (array.includes(value)) {
        return { ...prev, [name]: array.filter(item => item !== value) };
      } else {
        return { ...prev, [name]: [...array, value] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.image) {
      alert('Please fill all required fields (Name, Price, Image URL)');
      return;
    }

    if (isEditing && id) {
      updateProduct(id, formData);
    } else {
      const newProduct: Product = {
        ...(formData as Required<Product>),
        id: Date.now().toString(), // simple unique id
        images: formData.images?.length ? formData.images : [formData.image!],
      };
      addProduct(newProduct);
    }
    navigate('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/products" className="p-2 bg-white/5 rounded hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-2xl font-black uppercase tracking-widest text-white">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#111] p-6 rounded-xl border border-white/5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Product Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name || ''} 
                onChange={handleChange}
                className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Category *</label>
              <select 
                name="category" 
                value={formData.category || CATEGORIES[0]} 
                onChange={handleChange}
                className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Selling Price (Rs.) *</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price || ''} 
                onChange={handleChange}
                className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Original Price (Rs.)</label>
              <input 
                type="number" 
                name="originalPrice" 
                value={formData.originalPrice || ''} 
                onChange={handleChange}
                className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Description</label>
              <textarea 
                name="description" 
                value={formData.description || ''} 
                onChange={handleChange}
                rows={4}
                className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Main Image URL *</label>
              <input 
                type="text" 
                name="image" 
                value={formData.image || ''} 
                onChange={handleChange}
                placeholder="/images/product.jpg or https://..."
                className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                required
              />
              {formData.image && (
                <div className="mt-4 w-32 h-40 rounded border border-white/10 overflow-hidden">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x500/111/fff?text=Invalid+Image')} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#111] p-6 rounded-xl border border-white/5 space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-semibold text-white/80 uppercase tracking-wider block">Available Sizes</label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(size => (
                <button
                  type="button"
                  key={size}
                  onClick={() => handleArrayToggle('sizes', size)}
                  className={`px-4 py-2 rounded border text-sm font-bold transition-colors ${
                    formData.sizes?.includes(size) ? 'bg-gold border-gold text-black' : 'bg-black border-white/10 text-white hover:border-gold'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-6">
            <label className="text-sm font-semibold text-white/80 uppercase tracking-wider block">Available Colors</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map(color => (
                <button
                  type="button"
                  key={color}
                  onClick={() => handleArrayToggle('colors', color)}
                  className={`px-4 py-2 rounded border text-sm font-bold transition-colors ${
                    formData.colors?.includes(color) ? 'bg-gold border-gold text-black' : 'bg-black border-white/10 text-white hover:border-gold'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-6">
            <label className="text-sm font-semibold text-white/80 uppercase tracking-wider block">Product Status</label>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} className="w-5 h-5 accent-gold" />
                <span className="text-white font-semibold">In Stock</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} className="w-5 h-5 accent-gold" />
                <span className="text-white font-semibold">Mark as New</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isBestseller" checked={formData.isBestseller} onChange={handleChange} className="w-5 h-5 accent-gold" />
                <span className="text-white font-semibold">Mark as Bestseller</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link to="/admin/products" className="px-6 py-3 rounded bg-white/10 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/20 transition-colors">
            Cancel
          </Link>
          <button type="submit" className="px-6 py-3 rounded bg-gold text-black font-bold uppercase tracking-wider text-sm hover:bg-gold-light transition-colors">
            {isEditing ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
