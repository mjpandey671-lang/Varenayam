import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Product, CartItem, User, Category } from '@/types';

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  products: Product[];
  categories: Category[];
  users: User[];
  user: User | null;
  isCartOpen: boolean;
  isSidebarOpen: boolean;
  searchQuery: string;
}

interface StoreActions {
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  login: (user: User) => void;
  logout: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addUser: (user: User) => void;
  deleteUser: (id: string) => void;
  cartTotal: number;
  cartCount: number;
}

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

const initialUsers: User[] = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul.s@example.com', role: 'Customer', joinDate: '2023-10-15' },
  { id: '2', name: 'Priya Patel', email: 'priya.p@example.com', role: 'Customer', joinDate: '2023-11-02' },
  { id: '3', name: 'Amit Kumar', email: 'amit.k@example.com', role: 'Admin', joinDate: '2023-01-10' },
  { id: '4', name: 'Sneha Gupta', email: 'sneha.g@example.com', role: 'Customer', joinDate: '2024-02-28' },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('varenayam_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('varenayam_categories');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialCategories;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('varenayam_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialUsers;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist to localStorage when changed
  useEffect(() => {
    localStorage.setItem('varenayam_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('varenayam_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('varenayam_users', JSON.stringify(users));
  }, [users]);

  const addProduct = useCallback((product: Product) => {
    setProducts(prev => [...prev, product]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const addCategory = useCallback((category: Category) => {
    setCategories(prev => [...prev, category]);
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  const addUser = useCallback((user: User) => {
    setUsers(prev => [...prev, user]);
  }, []);

  const deleteUser = useCallback((id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  const addToCart = useCallback((product: Product, size: string, color: string, quantity = 1) => {
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
  }, []);

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
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  }, []);

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
        user,
        isCartOpen,
        isSidebarOpen,
        searchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setIsCartOpen,
        setIsSidebarOpen,
        setSearchQuery,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
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
