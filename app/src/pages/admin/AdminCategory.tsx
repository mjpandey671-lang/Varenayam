import { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import { FolderPlus, Trash2, Tag, FileText } from 'lucide-react';

export default function AdminCategory() {
  const { categories, addCategory, deleteCategory } = useStore();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCategory = {
      id: Date.now().toString(),
      name,
      description
    };

    addCategory(newCategory);
    setName('');
    setDescription('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Category Management</h2>
        <p className="text-white/60 text-sm mt-1">Create and manage product categories for your store.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Category Form */}
        <div className="lg:col-span-1">
          <div className="bg-[#0B0F19] rounded-xl border border-white/5 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded bg-[#18153A] flex items-center justify-center border border-[#2D2A54]">
                <FolderPlus size={16} className="text-[#818CF8]" />
              </div>
              <h3 className="font-bold text-lg text-white">New Category</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <Tag size={14} className="text-white/40" />
                  Category Name
                </label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Summer Collection"
                  className="w-full bg-[#070913] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#818CF8] transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <FileText size={14} className="text-white/40" />
                  Description
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this category..."
                  rows={4}
                  className="w-full bg-[#070913] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#818CF8] transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 mt-2 bg-[#818CF8] text-white rounded-lg font-bold hover:bg-[#6366F1] transition-colors flex items-center justify-center gap-2"
              >
                <FolderPlus size={18} />
                Create Category
              </button>
            </form>
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-[#0B0F19] rounded-xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h3 className="font-bold text-lg text-white">Existing Categories</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/40 text-white/60 font-semibold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4">Category Name</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-white/40">
                        No categories found. Create your first one!
                      </td>
                    </tr>
                  ) : (
                    categories.map((category) => (
                      <tr key={category.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                          {category.name}
                        </td>
                        <td className="px-6 py-4 text-white/60 max-w-xs truncate">
                          {category.description || '-'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => deleteCategory(category.id)}
                            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                            title="Delete Category"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
