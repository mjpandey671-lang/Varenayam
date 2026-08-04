import { useStore } from '@/hooks/useStore';
import { Package, CheckCircle, Clock, XCircle, Truck } from 'lucide-react';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Manage Orders</h2>
        <p className="text-white/60">View and update customer orders.</p>
      </div>

      <div className="bg-dark-surface border border-white/5 rounded-lg overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-white/40">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/40 border-b border-white/10 text-white/60 text-sm">
                <tr>
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Customer Address</th>
                  <th className="p-4 font-medium">Total Amount</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-white font-medium">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="p-4 text-white/60 text-sm">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-white/60 text-sm max-w-[200px] truncate">
                      {order.shippingAddress?.name} - {order.shippingAddress?.city}
                    </td>
                    <td className="p-4 text-white font-bold">Rs. {order.total.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className="text-sm text-white/80">{order.status}</span>
                      </div>
                    </td>
                    <td className="p-4">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
