import { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import { Package, CheckCircle, Clock, XCircle, Truck, Eye, X } from 'lucide-react';
import type { Order } from '@/types';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing': return <Clock size={16} className="text-yellow-500" />;
      case 'Confirmed': return <CheckCircle size={16} className="text-blue-500" />;
      case 'Shipped': return <Truck size={16} className="text-purple-500" />;
      case 'Delivered': return <CheckCircle size={16} className="text-green-500" />;
      case 'Cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return <Package size={16} className="text-gray-500" />;
    }
  };

  // Stats
  const pendingCount = orders.filter(o => o.status === 'Processing').length;
  const confirmedCount = orders.filter(o => o.status === 'Confirmed').length;
  const cancelledCount = orders.filter(o => o.status === 'Cancelled').length;
  const todayCount = orders.filter(o => new Date(o.date).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]).length;

  // Filtered Orders
  const filteredOrders = orders.filter(order => {
    let match = true;
    if (statusFilter !== 'All' && order.status !== statusFilter) match = false;
    if (dateFilter) {
      const orderDate = new Date(order.date).toISOString().split('T')[0];
      if (orderDate !== dateFilter) match = false;
    }
    return match;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Manage Orders</h2>
        <p className="text-white/60">View and filter customer orders.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-dark-surface border border-white/5 p-4 rounded-lg">
          <div className="text-white/60 text-sm mb-1">Today's Orders</div>
          <div className="text-2xl font-bold text-white">{todayCount}</div>
        </div>
        <div className="bg-dark-surface border border-white/5 p-4 rounded-lg">
          <div className="text-white/60 text-sm mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-500">{pendingCount}</div>
        </div>
        <div className="bg-dark-surface border border-white/5 p-4 rounded-lg">
          <div className="text-white/60 text-sm mb-1">Confirmed</div>
          <div className="text-2xl font-bold text-blue-500">{confirmedCount}</div>
        </div>
        <div className="bg-dark-surface border border-white/5 p-4 rounded-lg">
          <div className="text-white/60 text-sm mb-1">Cancelled</div>
          <div className="text-2xl font-bold text-red-500">{cancelledCount}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-dark-surface border border-white/5 p-4 rounded-lg">
        <div className="flex-1">
          <label className="block text-xs text-white/60 mb-1">Filter by Status</label>
          <select 
            className="w-full bg-black/40 border border-white/10 text-white rounded-none px-3 py-2 text-sm focus:outline-none focus:border-gold"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Processing">Processing (Pending)</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-white/60 mb-1">Filter by Date</label>
          <input 
            type="date"
            className="w-full bg-black/40 border border-white/10 text-white rounded-none px-3 py-2 text-sm focus:outline-none focus:border-gold [color-scheme:dark]"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <button 
            onClick={() => { setStatusFilter('All'); setDateFilter(''); }}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm transition-colors border border-white/10"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="bg-dark-surface border border-white/5 rounded-lg overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-white/40">No orders found for selected filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/40 border-b border-white/10 text-white/60 text-sm">
                <tr>
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Customer Details</th>
                  <th className="p-4 font-medium">Total Amount</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-white font-medium">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="p-4 text-white/60 text-sm">
                      <div className="whitespace-nowrap">{new Date(order.date).toLocaleDateString('en-IN')}</div>
                      <div className="text-xs text-white/40">{new Date(order.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>
                    <td className="p-4 text-sm max-w-[200px] truncate">
                      {order.user && typeof order.user === 'object' ? (
                        <>
                          <span className="text-white block font-medium">{order.user.name || 'Unknown'}</span>
                          {order.user.email && <span className="text-white/40 block text-xs">{order.user.email}</span>}
                          {order.user.mobileNumber && <span className="text-white/40 block text-xs">{order.user.mobileNumber}</span>}
                        </>
                      ) : (
                        <span className="text-white/40">Guest</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-white font-bold">Rs. {order.total.toLocaleString()}</div>
                      <div className="text-white/40 text-xs mt-1 px-2 py-0.5 bg-white/5 inline-block rounded border border-white/10">
                        {order.paymentMethod || 'COD'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className="text-sm text-white/80">{order.status}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <select 
                          value={order.status} 
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className="bg-black border border-white/20 rounded text-sm text-white px-2 py-1 outline-none focus:border-gold"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0B0F19] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl shadow-black">
            <div className="flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-[#0B0F19] z-10">
              <div>
                <h3 className="text-xl font-bold text-white">Order Details</h3>
                <p className="text-sm text-white/40 mt-1">Manage full order information</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-white/60 hover:text-white bg-white/5 p-2 rounded-full hover:bg-white/10 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Order Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
                <div>
                  <p className="text-white/40 mb-1 uppercase tracking-wider text-xs font-semibold">Order ID</p>
                  <p className="text-white font-medium">#{selectedOrder.id.slice(-6).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-white/40 mb-1 uppercase tracking-wider text-xs font-semibold">Date</p>
                  <p className="text-white font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-white/40 mb-1 uppercase tracking-wider text-xs font-semibold">Status</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedOrder.status)}
                    <span className="text-white">{selectedOrder.status}</span>
                  </div>
                </div>
                <div>
                  <p className="text-white/40 mb-1 uppercase tracking-wider text-xs font-semibold">Total Amount</p>
                  <p className="text-gold font-bold">Rs. {selectedOrder.total.toLocaleString()}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Truck size={18} className="text-white/40" />
                  Shipping Address
                </h4>
                <div className="text-sm text-white/80 bg-white/5 p-5 rounded-lg border border-white/5">
                  <p className="font-medium text-white text-base mb-2">{selectedOrder.shippingAddress?.name}</p>
                  <p className="text-white/60">{selectedOrder.shippingAddress?.street}</p>
                  <p className="text-white/60">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zip}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Package size={18} className="text-white/40" />
                  Order Items
                </h4>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-white/5 p-3 rounded-lg border border-white/5">
                      <div className="w-16 h-20 bg-black rounded overflow-hidden flex-shrink-0 border border-white/10">
                        <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.product?.name}</p>
                        <div className="flex gap-3 text-white/60 text-xs mt-1.5">
                          <span>Size: <span className="text-white font-medium">{item.size}</span></span>
                          <span>Color: <span className="text-white font-medium">{item.color}</span></span>
                          <span>Qty: <span className="text-white font-medium">{item.quantity}</span></span>
                        </div>
                      </div>
                      <div className="text-gold font-medium text-right pr-2">
                        Rs. {(item.product?.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="pt-4 border-t border-white/10">
                 <h4 className="text-white font-bold mb-3">Update Order Status</h4>
                 <select 
                    value={selectedOrder.status} 
                    onChange={async (e) => {
                      await handleStatusUpdate(selectedOrder.id, e.target.value);
                      setSelectedOrder({...selectedOrder, status: e.target.value as any});
                    }}
                    className="bg-black border border-white/20 rounded-lg text-sm text-white px-4 py-3 outline-none focus:border-gold w-full transition-colors hover:border-white/40"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
