import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import About from './components/About'
import Contact from './components/Contact'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import NewsletterModal from './components/NewsletterModal'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#2E150D]">
      <header className="sticky top-0 z-50 bg-[#E0D0BC]/80 backdrop-blur supports-[backdrop-filter]:bg-[#E0D0BC]/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#7A3016] flex items-center justify-center text-white font-bold">FM</div>
              <span className="font-semibold tracking-wide">Flori Mart</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link className="hover:text-[#7A3016]" to="/products">Products</Link>
              <Link className="hover:text-[#7A3016]" to="/about">About</Link>
              <Link className="hover:text-[#7A3016]" to="/contact">Contact</Link>
              <Link className="hover:text-[#7A3016]" to="/cart">Cart</Link>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-16 bg-[#29301C] text-[#E0D0BC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-semibold mb-2">Flori Mart</div>
            <p className="text-sm opacity-80">Bringing nature’s beauty to your everyday moments.</p>
          </div>
          <div>
            <div className="font-medium mb-2">Contact</div>
            <p className="text-sm opacity-80">Whatsapp: +1 (555) 123-4567</p>
            <p className="text-sm opacity-80">Email: hello@florimart.com</p>
          </div>
          <div>
            <div className="font-medium mb-3">Newsletter</div>
            <NewsletterModal inline/>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs opacity-80">© {new Date().getFullYear()} Flori Mart. All rights reserved.</div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
