import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Product, CartItem, User, Category, Order, Address } from '@/types';

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  products: Product[];
  categories: Category[];
  users: User[];
  orders: Order[];
  addresses: Address[];
  user: User | null;
  isCartOpen: boolean;
  isSidebarOpen: boolean;
  searchQuery: string;
  isLoginPopupOpen: boolean;
  token: string | null;
}

interface StoreActions {
  addToCart: (product: Product, size: string, color: string, quantity?: number) => boolean;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setIsLoginPopupOpen: (open: boolean) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  addProduct: (product: Product) => Promise<boolean>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  addAddress: (address: Address) => void;
  cartTotal: number;
  cartCount: number;
}

const API_URL = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';

const StoreContext = createContext<(StoreState & StoreActions) | null>(null);

const initialCategories: Category[] = [
  { id: '1', name: 'Hoodies', description: 'Premium heavyweight cotton hoodies.' },
  { id: '2', name: 'Jackets', description: 'Signature outerwear with premium hardware.' },
  { id: '3', name: 'Pants', description: 'Cargo and tailored trousers.' },
  { id: '4', name: 'T-Shirts', description: 'Classic cotton tees with graphic prints.' },
  { id: '5', name: 'Accessories', description: 'Jewelry and small leather goods.' },
  { id: '6', name: 'Outerwear', description: 'Overcoats and heavy winter gear.' },
  { id: '7', name: 'Shirts', description: 'Button-down signature shirts.' },
];

const initialUsers: User[] = [];

const initialAddresses: Address[] = [];

const initialOrders: Order[] = [
  { id: 'ORD-001', date: '2026-07-28', status: 'Delivered', total: 4999, shippingAddress: { id: 'd1', name: 'Home', street: '123 Main St', city: 'Mumbai', state: 'MH', zip: '400001', isDefault: true }, items: [] },
  { id: 'ORD-002', date: '2026-08-01', status: 'Processing', total: 8999, shippingAddress: { id: 'd2', name: 'Work', street: '456 Tech Park', city: 'Pune', state: 'MH', zip: '411001', isDefault: false }, items: [] },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('varenayam_token');
  });

  // Initialize user from localStorage if exists
  useEffect(() => {
    const storedUser = localStorage.getItem('varenayam_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from local storage');
      }
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (e) {
      console.error('Failed to fetch products', e);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/orders`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.error('Failed to fetch orders', e);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (e) {
      console.error('Failed to fetch users', e);
    }
  }, []);

  // Fetch on mount and on window focus (for live updates across tabs)
  useEffect(() => {
    const fetchAll = () => {
      fetchProducts();
      fetchOrders();
      fetchUsers();
    };
    
    fetchAll();

    window.addEventListener('focus', fetchAll);
    return () => window.removeEventListener('focus', fetchAll);
  }, [fetchProducts, fetchOrders, fetchUsers]);

  const addProduct = useCallback(async (product: Product) => {
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (res.ok) {
        const newProduct = await res.json();
        setProducts(prev => [...prev, newProduct]);
        return true;
      }
      
      const errorText = await res.text();
      console.error('Add product failed with status:', res.status, errorText);
      alert('Backend Error Details: ' + errorText);
      return false;
    } catch (e: any) {
      console.error('Add product failed', e);
      alert('Network/Fetch Error: ' + e.message);
      return false;
    }
  }, []);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts(prev => prev.map(p => p.id === id ? updated : p));
        return true;
      }
      return false;
    } catch (e) {
      console.error('Update product failed', e);
      return false;
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        return true;
      }
      return false;
    } catch (e) {
      console.error('Delete product failed', e);
      return false;
    }
  }, []);

  const addOrder = useCallback(async (order: Order) => {
    try {
      const backendOrder = {
        ...order,
        user: order.user,
        items: order.items.map(item => ({
          ...item,
          product: item.product.id
        }))
      };

      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendOrder)
      });
      if (res.ok) {
        // Optimistic update with frontend object
        setOrders(prev => [order, ...prev]);
      }
    } catch (e) {
      console.error('Add order failed', e);
    }
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders(prev => prev.map(o => o.id === id ? updatedOrder : o));
      }
    } catch (e) {
      console.error('Update order status failed', e);
    }
  }, []);

  const deleteOrder = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders(prev => prev.filter(o => o.id !== id));
      }
    } catch (e) {
      console.error('Delete order failed', e);
    }
  }, []);

  const addCategory = useCallback((category: Category) => {
    setCategories(prev => [...prev, category]);
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  const addUser = useCallback(async (user: User) => {
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if (res.ok) {
        const newUser = await res.json();
        setUsers(prev => [...prev, newUser]);
      }
    } catch (e) {
      console.error('Add user failed', e);
    }
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== id));
      }
    } catch (e) {
      console.error('Delete user failed', e);
    }
  }, []);

  const addAddress = useCallback((address: Address) => {
    setAddresses(prev => {
      const newAddress = { ...address, isDefault: prev.length === 0 };
      return [...prev, newAddress];
    });
  }, []);

  const addToCart = useCallback((product: Product, size: string, color: string, quantity = 1): boolean => {
    if (!user) {
      setIsLoginPopupOpen(true);
      return false;
    }
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, size, color }];
    });
    return true;
  }, [user]);

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  }, []);

  const updateCartQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && item.size === size ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((product: Product) => {
    if (!user) {
      setIsLoginPopupOpen(true);
      return;
    }
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      
      setTimeout(() => {
        if (exists) {
          setCart(prevCart => prevCart.filter(item => item.product.id !== product.id));
        } else {
          const size = product.sizes?.[0] || 'M';
          const color = product.colors?.[0] || 'Black';
          setCart(prevCart => {
            const existingCartItem = prevCart.find(item => item.product.id === product.id && item.size === size);
            if (existingCartItem) {
              return prevCart.map(item =>
                item.product.id === product.id && item.size === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            }
            return [...prevCart, { product, quantity: 1, size, color }];
          });
        }
      }, 0);

      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  }, [user]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(p => p.id === productId);
  }, [wishlist]);

  const login = useCallback((userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('varenayam_user', JSON.stringify(userData));
    localStorage.setItem('varenayam_token', userToken);
    if (userData.role === 'Admin') {
      localStorage.setItem('varenayam_admin_auth', 'true');
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('varenayam_user');
    localStorage.removeItem('varenayam_token');
    localStorage.removeItem('varenayam_admin_auth');
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        products,
        categories,
        users,
        orders,
        addresses,
        user,
        isCartOpen,
        isSidebarOpen,
        searchQuery,
        isLoginPopupOpen,
        token,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setIsCartOpen,
        setIsSidebarOpen,
        setSearchQuery,
        setIsLoginPopupOpen,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        fetchProducts,
        fetchOrders,
        fetchUsers,
        addCategory,
        deleteCategory,
        addUser,
        deleteUser,
        addAddress,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}

export { initialCategories, initialUsers };
