import { useStore } from '@/hooks/useStore';
import { Package, Users, ShoppingCart, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { Link } from 'react-router';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useMemo } from 'react';

const revenueData = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 25000 },
  { name: 'Mar', value: 18000 },
  { name: 'Apr', value: 38000 },
  { name: 'May', value: 31000 },
  { name: 'Jun', value: 45000 },
];

const COLORS = ['#818CF8', '#22D3EE', '#34D399', '#FBBF24', '#C084FC', '#F472B6', '#F87171'];

export default function AdminDashboard() {
  const { products } = useStore();

  // Calculate live category data
  const categoryData = useMemo(() => {
    const categoryCount = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value
    }));
  }, [products]);

  // For the sake of prototype, we'll use realistic mock data for non-existent historical metrics
  const totalUsers = 124;
  const totalOrders = 86;
  const totalRevenue = '₹1,69,000';

  const stats = [
    { 
      label: 'TOTAL USERS', 
      value: totalUsers.toString(), 
      icon: Users, 
      iconBg: 'bg-[#18153A]', 
      iconColor: 'text-[#818CF8]',
      trend: '12.5% from last month',
      trendUp: true
    },
    { 
      label: 'TOTAL PRODUCTS', 
      value: products.length.toString(), 
      icon: Package, 
      iconBg: 'bg-[#0F293E]', 
      iconColor: 'text-[#22D3EE]',
      trend: '8.2% from last month',
      trendUp: true
    },
    { 
      label: 'TOTAL ORDERS', 
      value: totalOrders.toString(), 
      icon: ShoppingCart, 
      iconBg: 'bg-[#3A2215]', 
      iconColor: 'text-[#FBBF24]',
      trend: '15.3% from last month',
      trendUp: true
    },
    { 
      label: 'TOTAL REVENUE', 
      value: totalRevenue, 
      icon: DollarSign, 
      iconBg: 'bg-[#0F2E22]', 
      iconColor: 'text-[#34D399]',
      trend: '23.1% from last month',
      trendUp: true
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#0B0F19] p-6 rounded-xl border border-white/5 flex flex-col justify-between">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/40 text-xs font-bold tracking-wider uppercase mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg} ${stat.iconColor}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <TrendingUp size={14} className={stat.trendUp ? 'text-[#34D399]' : 'text-red-500'} />
                <span className={stat.trendUp ? 'text-[#34D399]' : 'text-red-500'}>
                  {stat.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <div className="lg:col-span-2 bg-[#0B0F19] p-6 rounded-xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#18153A] flex items-center justify-center border border-[#2D2A54]">
                <Activity size={16} className="text-[#818CF8]" />
              </div>
              <h3 className="font-bold text-lg text-white">Revenue Overview</h3>
            </div>
            <button className="px-3 py-1.5 text-xs font-medium bg-transparent border border-white/10 rounded text-white/60 hover:text-white hover:bg-white/5 transition-colors">
              Last 6 Months
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818CF8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D2A54" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#2D2A54', color: '#fff' }}
                  itemStyle={{ color: '#818CF8' }}
                />
                <Area type="monotone" dataKey="value" stroke="#818CF8" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-[#0B0F19] p-6 rounded-xl border border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded bg-[#0F293E] flex items-center justify-center border border-[#164E63]">
              <Package size={16} className="text-[#22D3EE]" />
            </div>
            <h3 className="font-bold text-lg text-white">Products by Category</h3>
          </div>
          {categoryData.length > 0 ? (
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#2D2A54', color: '#fff', borderRadius: '8px' }}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    iconType="rect"
                    wrapperStyle={{ fontSize: '12px', color: '#9CA3AF' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-white/40">
              No product data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
