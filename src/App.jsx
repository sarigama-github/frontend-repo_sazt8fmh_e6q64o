import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import About from './components/About'
import Contact from './components/Contact'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import NewsletterModal from './components/NewsletterModal'

const theme = {
  mint: '#A8D5BA',
  mintDeep: '#6BBF8E',
  brown: '#2E150D',
  beige: '#F6F3EF',
  sage: '#8EA98E',
  offWhite: '#FAFAF9'
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--offWhite)] text-[var(--brown)]" style={{
      ['--mint']: theme.mint,
      ['--mintDeep']: theme.mintDeep,
      ['--brown']: theme.brown,
      ['--beige']: theme.beige,
      ['--sage']: theme.sage,
      ['--offWhite']: theme.offWhite,
    }}>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--mint)] ring-1 ring-black/10 flex items-center justify-center text-[var(--brown)] font-bold">FM</div>
              <span className="font-semibold tracking-wide text-[var(--brown)]">Flori Mart</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link className="hover:text-[var(--mintDeep)] transition-colors" to="/products">Products</Link>
              <Link className="hover:text-[var(--mintDeep)] transition-colors" to="/about">About</Link>
              <Link className="hover:text-[var(--mintDeep)] transition-colors" to="/contact">Contact</Link>
              <Link className="hover:text-[var(--mintDeep)] transition-colors" to="/cart">Cart</Link>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-16 bg-[var(--beige)] text-[var(--brown)]">
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
        <div className="border-t border-black/10 py-4 text-center text-xs opacity-80">© {new Date().getFullYear()} Flori Mart. All rights reserved.</div>
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
