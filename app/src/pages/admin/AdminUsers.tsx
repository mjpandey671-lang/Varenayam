import { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import { User as UserIcon, Trash2, Mail, Calendar, Shield, Search, Plus } from 'lucide-react';

export default function AdminUsers() {
  const { users, deleteUser } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Users Management</h2>
          <p className="text-white/60 text-sm mt-1">View and manage customer and admin accounts.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            <input 
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#18153A]/50 border border-[#2D2A54] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#818CF8] transition-colors w-full md:w-64"
            />
          </div>
          <button className="bg-[#818CF8] hover:bg-[#6366F1] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap">
            <Plus size={16} />
            Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0B0F19] rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/40 text-white/60 font-semibold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-white/40">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#18153A] flex items-center justify-center text-[#818CF8] flex-shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-white/40 text-xs flex items-center gap-1 mt-0.5">
                            <Mail size={12} />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.role === 'Admin' 
                          ? 'bg-[#0F293E] text-[#22D3EE] border border-[#164E63]' 
                          : 'bg-[#3A2215] text-[#FBBF24] border border-[#78350F]'
                      }`}>
                        {user.role === 'Admin' ? <Shield size={12} /> : <UserIcon size={12} />}
                        {user.role || 'Customer'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white/60">
                        <Calendar size={14} />
                        {user.joinDate || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                        title="Delete User"
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
  );
}
