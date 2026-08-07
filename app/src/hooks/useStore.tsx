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
  login: (user: User) => void;
  logout: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
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
  cartTotal: number;
  cartCount: number;
}

const API_URL = 'http://localhost:5000/api';

const StoreContext = createContext<(StoreState & StoreActions) | null>(null);

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Shadow Hoodie',
    description: 'Premium oversized hoodie in heavyweight cotton fleece. Features gold-tone drawstring tips and embroidered logo detail on the chest.',
    price: 4999,
    originalPrice: 5999,
    image: '/images/custom-hoodie.jpg',
    images: ['/images/custom-hoodie.jpg', '/images/collection-1.jpg'],
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Charcoal'],
    inStock: true,
    isNew: true,
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Gold Line Bomber',
    description: 'Signature bomber jacket with gold zipper accents and quilted lining. Water-resistant outer shell with premium hardware.',
    price: 8999,
    originalPrice: 10999,
    image: '/images/custom-jacket.jpg',
    images: ['/images/custom-jacket.jpg', '/images/collection-2.jpg'],
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy'],
    inStock: true,
    isNew: true,
  },
  {
    id: '3',
    name: 'Tactical Cargo',
    description: 'Multi-pocket cargo pants with adjustable waist and gold-tone hardware. Relaxed fit with tapered ankle.',
    price: 4499,
    image: '/images/product-3.jpg',
    images: ['/images/product-3.jpg', '/images/collection-3.jpg'],
    category: 'Pants',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Black', 'Olive'],
    inStock: true,
    isBestseller: true,
  },
  {
    id: '4',
    name: 'Heritage Tee',
    description: 'Premium cotton t-shirt with metallic gold graphic print. Relaxed fit with reinforced neckline.',
    price: 2499,
    image: '/images/custom-tshirt.jpg',
    images: ['/images/custom-tshirt.jpg', '/images/lookbook-1.jpg'],
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Leather Moto Jacket',
    description: 'Premium black leather jacket with gold hardware. Asymmetric zip closure with quilted shoulder panels.',
    price: 14999,
    image: '/images/collection-1.jpg',
    images: ['/images/collection-1.jpg', '/images/lookbook-2.jpg'],
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    inStock: true,
    isNew: true,
  },
  {
    id: '6',
    name: 'Statement Chain',
    description: 'Bold gold-tone chain necklace with signature pendant. Stainless steel construction with premium gold plating.',
    price: 3499,
    image: '/images/collection-2.jpg',
    images: ['/images/collection-2.jpg', '/images/lookbook-3.jpg'],
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['Gold'],
    inStock: true,
  },
  {
    id: '7',
    name: 'Overcoat Noir',
    description: 'Single-breasted wool overcoat in deep black. Full length with gold button closure and interior pocket system.',
    price: 11999,
    originalPrice: 13999,
    image: '/images/custom-overcoat.jpg',
    images: ['/images/custom-overcoat.jpg', '/images/lookbook-4.jpg'],
    category: 'Outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Charcoal'],
    inStock: true,
    isBestseller: true,
  },
  {
    id: '8',
    name: 'Signature Shirt',
    description: 'Premium button-down shirt with gold contrast stitching. Slim fit with hidden placket and collar stays.',
    price: 3999,
    image: '/images/lookbook-5.jpg',
    images: ['/images/lookbook-5.jpg', '/images/lookbook-1.jpg'],
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
    inStock: true,
  },
];

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

const initialAddresses: Address[] = [
  { id: '1', name: 'Home', street: '123 Main St', city: 'Mumbai', state: 'MH', zip: '400001', isDefault: true },
  { id: '2', name: 'Work', street: '456 Tech Park', city: 'Pune', state: 'MH', zip: '411001', isDefault: false },
];

const initialOrders: Order[] = [
  { id: 'ORD-001', date: '2026-07-28', status: 'Delivered', total: 4999, shippingAddress: initialAddresses[0], items: [] },
  { id: 'ORD-002', date: '2026-08-01', status: 'Processing', total: 8999, shippingAddress: initialAddresses[1], items: [] },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
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

  // Fetch on mount
  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchUsers();
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
      }
    } catch (e) {
      console.error('Add product failed', e);
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
      }
    } catch (e) {
      console.error('Update product failed', e);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (e) {
      console.error('Delete product failed', e);
    }
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [...prev, order]);
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

  const login = useCallback((userData: User) => setUser(userData), []);
  const logout = useCallback(() => setUser(null), []);

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

export { initialProducts, initialCategories, initialUsers };
