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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setFormData(prev => ({ ...prev, image: dataUrl }));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.image) {
      setSubmitMessage({ type: 'error', text: 'Please fill all required fields (Name, Price, Image)' });
      return;
    }

    if (!formData.description) {
      setSubmitMessage({ type: 'error', text: 'Please provide a description.' });
      return;
    }

    setIsSubmitting(true);
    let success = false;
    try {
      if (isEditing && id) {
        success = await updateProduct(id, formData);
      } else {
        const newProduct: Product = {
          ...(formData as Required<Product>),
          id: Date.now().toString(), // Will be ignored by MongoDB
          images: formData.images?.length ? formData.images : [formData.image!],
        };
        success = await addProduct(newProduct);
      }

      if (success) {
        setSubmitMessage({ type: 'success', text: 'Product successfully added!' });
        setTimeout(() => {
          navigate('/admin/products');
        }, 1500);
      } else {
        setSubmitMessage({ type: 'error', text: 'Failed to save product. Please check your data or try again.' });
      }
    } catch (err) {
      setSubmitMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
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
              <label className="text-sm font-semibold text-white/80 uppercase tracking-wider">Main Image *</label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                  required={!formData.image}
                />
              </div>
              {formData.image && (
                <div className="mt-4 w-32 h-40 rounded border border-white/10 overflow-hidden relative group">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x500/111/fff?text=Invalid+Image')} />
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-bold"
                  >
                    Remove
                  </button>
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

        <div className="flex flex-col items-end gap-4">
          {submitMessage && (
            <div className={`px-4 py-2 rounded text-sm font-bold ${
              submitMessage.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'
            }`}>
              {submitMessage.text}
            </div>
          )}
          <div className="flex justify-end gap-4">
            <Link to="/admin/products" className="px-6 py-3 rounded bg-white/10 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/20 transition-colors">
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`px-6 py-3 rounded font-bold uppercase tracking-wider text-sm transition-colors ${
                isSubmitting ? 'bg-gold/50 text-black/50 cursor-not-allowed' : 'bg-gold text-black hover:bg-gold-light'
              }`}
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Product')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
