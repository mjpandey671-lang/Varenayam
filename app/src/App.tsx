import { Routes, Route } from 'react-router'
import { StoreProvider } from '@/hooks/useStore'
import ScrollToTop from '@/components/ScrollToTop'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import ProductDetail from '@/pages/ProductDetail'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Checkout from '@/pages/Checkout'
import Wishlist from '@/pages/Wishlist'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import SizeGuide from '@/pages/SizeGuide'
import Account from '@/pages/Account'
import AdminLayout from '@/pages/admin/AdminLayout'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminProducts from '@/pages/admin/AdminProducts'
import AdminProductForm from '@/pages/admin/AdminProductForm'
import AdminLogin from '@/pages/admin/AdminLogin'
import PlaceholderPage from '@/pages/admin/PlaceholderPage'
import AdminUsers from '@/pages/admin/AdminUsers'
import AdminCategory from '@/pages/admin/AdminCategory'
import AdminOrders from '@/pages/admin/AdminOrders'

export default function App() {
  return (
    <StoreProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Account />} />
        <Route path="/profile" element={<Account />} />
        <Route path="/addresses" element={<Account />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="category" element={<AdminCategory />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AdminProductForm />} />
          <Route path="products/edit/:id" element={<AdminProductForm />} />
          <Route path="hero" element={<PlaceholderPage title="Manage Hero" />} />
          <Route path="store-hero" element={<PlaceholderPage title="Store Hero" />} />
          <Route path="ads" element={<PlaceholderPage title="Manage Ads" />} />
          <Route path="team" element={<PlaceholderPage title="Manage Team" />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="jobs" element={<PlaceholderPage title="Manage Jobs" />} />
          <Route path="applications" element={<PlaceholderPage title="Job Applications" />} />
          <Route path="contacts" element={<PlaceholderPage title="Contact Submissions" />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
    </StoreProvider>
  )
}
