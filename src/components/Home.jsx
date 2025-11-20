import { Link } from 'react-router-dom'
import { apiGet, apiPost } from '../lib/api'
import { useEffect, useMemo, useState } from 'react'
import { Cake, Gift, Heart, GraduationCap, Gem, Flower2, Shirt, Sparkles, ThumbsUp } from 'lucide-react'

const theme = {
  mint: '#A8D5BA', // Primary Mint Green
  mintSoft: '#EAF5EF',
  mintDeep: '#6BBF8E',
  brown: '#2E150D',
  beige: '#F6F3EF',
  sage: '#8EA98E',
  offWhite: '#FAFAF9'
}

function Section({ children, className = '', style }) {
  return (
    <section className={`py-16 ${className}`} style={style}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=2000&auto=format&fit=crop"
          alt="Floral hero"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(0deg, ${theme.mint}DD, ${theme.mint}CC)` }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/70 text-[color:var(--brown)] ring-1 ring-black/10" style={{ ['--brown']: theme.brown }}>FLORI MART</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-[color:var(--brown)]" style={{ ['--brown']: theme.brown }}>
            Botanical elegance for every moment
          </h1>
          <p className="mt-4 text-[color:var(--brown)]/80 max-w-prose">
            Handcrafted bouquets and plants in a modern, natural, luxurious style.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/products" className="px-6 py-3 rounded-xl shadow-sm text-white transition" style={{ backgroundColor: theme.mintDeep }}>Shop Now</Link>
            <Link to="/about" className="px-6 py-3 rounded-xl shadow-sm border border-black/10 bg-white/70 text-[color:var(--brown)] hover:bg-white transition" style={{ ['--brown']: theme.brown }}>Our Story</Link>
          </div>
        </div>
        <div className="hidden md:block" />
      </div>
    </section>
  )
}

function FeaturedCategories() {
  const categories = [
    { title: 'Bouquets', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop' },
    { title: 'Houseplants', img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1400&auto=format&fit=crop' },
    { title: 'Dried Florals', img: 'https://images.unsplash.com/photo-1519681397281-5f2315b27c52?q=80&w=1400&auto=format&fit=crop' },
    { title: 'Vases & Gifts', img: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1400&auto=format&fit=crop' },
  ]
  return (
    <Section>
      <div className="flex items-end justify-between mb-8">
        <h3 className="text-2xl font-bold text-[color:var(--brown)]" style={{ ['--brown']: theme.brown }}>Featured Categories</h3>
        <Link to="/products" className="text-[color:var(--mintDeep)] hover:underline" style={{ ['--mintDeep']: theme.mintDeep }}>View all</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((c) => (
          <Link key={c.title} to="/products" className="group rounded-xl overflow-hidden bg-white ring-1 ring-black/5 shadow-sm hover:shadow-md transition">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img loading="lazy" src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-sm font-medium text-[color:var(--brown)] bg-[color:var(--mintSoft)]/90 ring-1 ring-black/10" style={{ ['--mintSoft']: theme.mintSoft, ['--brown']: theme.brown }}>{c.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}

function ProductCard({ item }) {
  return (
    <Link to={`/products/${item.id}`} className="group rounded-xl overflow-hidden bg-white ring-1 ring-black/5 shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] overflow-hidden">
        <img loading="lazy" src={item.images?.[0] || 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop'} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-4">
        <div className="font-semibold text-[color:var(--brown)]" style={{ ['--brown']: theme.brown }}>{item.title}</div>
        <div className="text-sm text-[color:var(--brown)]/70">${(item.price || 0).toFixed(2)}</div>
        <button className="mt-3 inline-flex items-center px-3 py-2 rounded-lg text-white text-sm" style={{ backgroundColor: theme.mintDeep }}>Add to Cart</button>
      </div>
    </Link>
  )
}

function ProductsGrid({ title, subtitle, bg = 'transparent', queryKey }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let active = true
    apiGet('/api/products').then((d) => {
      if (!active) return
      const list = Array.isArray(d) ? d : []
      // Simple heuristic for demo: slice and shuffle-ish
      const sliced = queryKey === 'new' ? list.slice(-6) : list.slice(0, 6)
      setItems(sliced)
    }).finally(() => setLoading(false))
    return () => { active = false }
  }, [queryKey])

  return (
    <Section className={bg !== 'transparent' ? '' : ''} style={{ background: bg }}>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-[color:var(--brown)]" style={{ ['--brown']: theme.brown }}>{title}</h3>
          {subtitle && <p className="text-sm text-[color:var(--brown)]/70 mt-1">{subtitle}</p>}
        </div>
        <Link to="/products" className="text-[color:var(--mintDeep)] hover:underline" style={{ ['--mintDeep']: theme.mintDeep }}>Shop all</Link>
      </div>
      {loading ? (
        <div className="text-sm text-[color:var(--brown)]/60">Loading...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => <ProductCard key={item.id} item={item} />)}
        </div>
      )}
    </Section>
  )
}

function Delights() {
  const cards = [
    { title: 'Morning Calm', img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1400&auto=format&fit=crop' },
    { title: 'Desk Refresh', img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1400&auto=format&fit=crop' },
    { title: 'Evening Glow', img: 'https://images.unsplash.com/photo-1508898578281-774ac4893bd0?q=80&w=1400&auto=format&fit=crop' },
  ]
  return (
    <Section className="bg-[color:var(--beige)]" style={{ ['--beige']: theme.beige }}>
      <h3 className="text-2xl font-bold text-[color:var(--brown)] mb-8" style={{ ['--brown']: theme.brown }}>Delights for Every Moment</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.title} className="group rounded-xl overflow-hidden bg-white ring-1 ring-black/5 shadow-sm hover:shadow-md transition">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
            </div>
            <div className="p-4">
              <div className="font-semibold text-[color:var(--brown)]">{c.title}</div>
              <p className="text-sm text-[color:var(--brown)]/70">Soft, emotional imagery that elevates everyday spaces.</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function GiftsIcons() {
  const items = [
    { Icon: Cake, label: 'Birthday' },
    { Icon: Gem, label: 'Anniversary' },
    { Icon: Gift, label: 'Wedding' },
    { Icon: GraduationCap, label: 'Graduation' },
    { Icon: Heart, label: "Valentine's Day" },
    { Icon: Flower2, label: "Mother's Day" },
    { Icon: Shirt, label: "Father's Day" },
    { Icon: Heart, label: 'Get Well Soon' },
    { Icon: ThumbsUp, label: 'Thank You' },
  ]
  return (
    <Section className="bg-[color:var(--mintSoft)]" style={{ ['--mintSoft']: theme.mintSoft }}>
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-[color:var(--brown)]" style={{ ['--brown']: theme.brown }}>Gifts for Every Moment</h3>
        <p className="text-sm text-[color:var(--brown)]/70 mt-1">Discover the perfect gesture for every occasion.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        {items.map(({ Icon, label }) => (
          <Link key={label} to="/products" className="group rounded-xl bg-white ring-1 ring-black/5 p-6 flex flex-col items-center text-center hover:shadow-md transition">
            <div className="h-12 w-12 rounded-full flex items-center justify-center mb-3 ring-1 ring-black/10" style={{ backgroundColor: theme.mint, color: theme.brown }}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="font-medium text-[color:var(--brown)]">{label}</div>
            <div className="text-xs text-[color:var(--brown)]/60 mt-1 group-hover:underline" style={{ ['--brown']: theme.brown }}>Shop Now</div>
          </Link>
        ))}
      </div>
    </Section>
  )
}

function BotanicalIllustration() {
  return (
    <Section className="bg-[color:var(--mintSoft)]" style={{ ['--mintSoft']: theme.mintSoft }}>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-2xl font-bold text-[color:var(--brown)]" style={{ ['--brown']: theme.brown }}>Botanical Study</h3>
          <p className="mt-3 text-[color:var(--brown)]/70 max-w-prose">Elegant, editorial-style botanical drawings add a refined, natural touch to your space.</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
            <LeafSVG />
          </div>
          <div className="rounded-xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
            <FernSVG />
          </div>
        </div>
      </div>
    </Section>
  )
}

function LeafSVG() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-auto" fill="none" stroke={theme.mintDeep} strokeWidth="2">
      <path d="M20 100 C60 20, 140 20, 180 100" />
      <path d="M100 20 L100 110" />
      <path d="M100 60 C80 50, 60 40, 40 30" />
      <path d="M100 60 C120 50, 140 40, 160 30" />
    </svg>
  )
}

function FernSVG() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-auto" fill="none" stroke={theme.mintDeep} strokeWidth="2">
      <path d="M30 110 C60 90, 80 70, 100 20" />
      <path d="M50 90 C70 80, 80 70, 90 60" />
      <path d="M70 80 C90 70, 100 60, 110 50" />
      <path d="M90 70 C110 60, 120 50, 130 40" />
    </svg>
  )
}

function PromoBanner() {
  return (
    <Section>
      <div className="rounded-2xl ring-1 ring-black/5 bg-white overflow-hidden grid md:grid-cols-3">
        <div className="p-8 md:col-span-2">
          <div className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: theme.mintSoft, color: theme.brown }}>Weekend Offer</div>
          <h4 className="mt-3 text-2xl font-bold text-[color:var(--brown)]" style={{ ['--brown']: theme.brown }}>20% Off This Weekend — Fresh Handcrafted Bouquets</h4>
          <p className="mt-2 text-[color:var(--brown)]/70">Limited time only. Treat your space to something beautiful.</p>
          <Link to="/products" className="mt-6 inline-block px-5 py-3 rounded-xl text-white" style={{ backgroundColor: theme.mintDeep }}>Shop the offer</Link>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] md:aspect-auto h-full w-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1647221598398-934ed5cb0e4f?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQcm9tb3xlbnwwfDB8fHwxNzYzNjU0OTU0fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Promo" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </Section>
  )
}

function Testimonials() {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    let active = true
    apiGet('/api/reviews').then((d) => {
      if (!active) return
      setReviews(Array.isArray(d) ? d.slice(0, 6) : [])
    }).catch(() => setReviews([]))
    return () => { active = false }
  }, [])
  const fallback = [
    { id: '1', name: 'Amelia', comment: 'Stunning bouquet and lovely service.' },
    { id: '2', name: 'Noah', comment: 'Quality is exceptional — highly recommend.' },
    { id: '3', name: 'Liam', comment: 'Warm, natural aesthetic. Perfect for our home.' },
  ]
  const list = reviews.length ? reviews : fallback
  return (
    <Section className="bg-[color:var(--beige)]" style={{ ['--beige']: theme.beige }}>
      <h3 className="text-2xl font-bold text-[color:var(--brown)] mb-8" style={{ ['--brown']: theme.brown }}>Testimonials</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((r, idx) => (
          <div key={r.id || idx} className="rounded-xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
            <div className="text-[color:var(--brown)] font-medium">{r.name || 'Customer'}</div>
            <p className="text-sm text-[color:var(--brown)]/70 mt-2">{r.comment || r.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await apiPost('/api/newsletter', { email })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }
  return (
    <Section>
      <div className="rounded-2xl bg-white ring-1 ring-black/5 p-8 shadow-sm grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h4 className="text-2xl font-bold text-[color:var(--brown)]" style={{ ['--brown']: theme.brown }}>Join our newsletter</h4>
          <p className="text-sm text-[color:var(--brown)]/70 mt-1">Inspiration, new arrivals, and exclusive offers.</p>
        </div>
        <form onSubmit={onSubmit} className="flex gap-3">
          <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your email" className="flex-1 px-4 py-3 rounded-xl ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[color:var(--mintDeep)]" style={{ ['--mintDeep']: theme.mintDeep }} />
          <button className="px-5 py-3 rounded-xl text-white" style={{ backgroundColor: theme.mintDeep }} disabled={status==='loading'}>
            {status==='loading' ? 'Submitting...' : 'Subscribe'}
          </button>
        </form>
        {status==='success' && <div className="md:col-span-2 text-sm text-green-700">Thanks for subscribing!</div>}
        {status==='error' && <div className="md:col-span-2 text-sm text-red-600">Something went wrong. Please try again.</div>}
      </div>
    </Section>
  )
}

function Inspiration() {
  const shots = [
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543339318-b43dc53e19b7?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1400&auto=format&fit=crop',
  ]
  return (
    <Section className="bg-[color:var(--mintSoft)]" style={{ ['--mintSoft']: theme.mintSoft }}>
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-[color:var(--brown)]" style={{ ['--brown']: theme.brown }}>Fresh Inspiration</h3>
        <p className="text-sm text-[color:var(--brown)]/70 mt-1">New Ideas for Your Space</p>
        <p className="text-[color:var(--brown)]/80 max-w-2xl mx-auto mt-3">Discover innovative ways to transform your home with plants. Get inspired by trending plant styling ideas and creative arrangements.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {shots.map((src, i) => (
          <div key={src} className={`rounded-xl overflow-hidden bg-white ring-1 ring-black/5 shadow-sm ${i===1 ? 'md:translate-y-6' : ''}`}>
            <img src={src} alt="Inspiration" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </Section>
  )
}

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <ProductsGrid title="Best Sellers" subtitle="Our most-loved bouquets" queryKey="best" />
      <ProductsGrid title="New Collections" subtitle="Just in — fresh styles and stems" queryKey="new" bg={theme.mintSoft} />
      <Delights />
      <GiftsIcons />
      <BotanicalIllustration />
      <PromoBanner />
      <Testimonials />
      <NewsletterSignup />
      <Inspiration />
    </div>
  )
}
