import { Link } from 'react-router-dom'
import { apiGet, apiPost } from '../lib/api'
import { useEffect, useState } from 'react'

const colors = {
  terracotta: '#7A3016',
  deepBrown: '#2E150D',
  forest: '#2C3C26',
  olive: '#29301C',
  mocha: '#654237',
  sage: '#818F7D',
  peach: '#D0A18C',
  beige: '#E0D0BC',
  neutral: '#F7F7F7',
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#E0D0BC]">
      <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[radial-gradient(1200px_600px_at_-10%_-10%,#65423720,transparent_60%),radial-gradient(1000px_600px_at_110%_10%,#7A301620,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#2E150D]">
            Bringing nature’s beauty to your everyday moments.
          </h1>
          <p className="mt-4 text-[#2E150D]/80 max-w-prose">
            Handcrafted, premium floral arrangements with warm, earthy elegance.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/products" className="px-6 py-3 rounded-xl shadow-sm bg-[#7A3016] text-white hover:brightness-110 transition">Order Now</Link>
            <Link to="/about" className="px-6 py-3 rounded-xl shadow-sm border border-[#2E150D]/20 text-[#2E150D] hover:bg-white transition">Our Story</Link>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-[#818F7D]/15 shadow-lg overflow-hidden">
            <img loading="lazy" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop" alt="Bouquet" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white/80 backdrop-blur p-4 rounded-xl shadow ring-1 ring-black/5">
            <div className="text-sm font-medium text-[#2E150D]">Premium quality</div>
            <div className="text-xs text-[#2E150D]/70">Handcrafted arrangements</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Feature({ title, desc }) {
  return (
    <div className="p-6 rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="h-10 w-10 rounded-lg bg-[#818F7D]/20 flex items-center justify-center text-[#2C3C26] font-semibold">★</div>
      <h4 className="mt-4 font-semibold text-[#2E150D]">{title}</h4>
      <p className="text-sm text-[#2E150D]/70">{desc}</p>
    </div>
  )
}

function FeaturedProducts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    apiGet('/api/products?featured=true').then(d => {
      if (isMounted) setItems(d)
    }).finally(()=> setLoading(false))
    return () => { isMounted = false }
  }, [])

  return (
    <section className="py-16 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h3 className="text-2xl font-bold text-[#2E150D]">Featured Collections</h3>
          <Link to="/products" className="text-[#7A3016] hover:underline">View all</Link>
        </div>
        {loading ? (
          <div className="text-sm text-[#2E150D]/60">Loading...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <Link key={item.id} to={`/products/${item.id}`} className="group rounded-xl overflow-hidden bg-white ring-1 ring-black/5 shadow-sm hover:shadow-md transition">
                <div className="aspect-[4/3] overflow-hidden">
                  <img loading="lazy" src={item.images?.[0] || 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop'} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <div className="p-4">
                  <div className="font-semibold text-[#2E150D]">{item.title}</div>
                  <div className="text-sm text-[#2E150D]/70">${item.price.toFixed(2)}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          <Feature title="Premium Quality" desc="Fresh, carefully curated stems" />
          <Feature title="Fast Delivery" desc="Same-day delivery available" />
          <Feature title="Handcrafted" desc="Arranged by expert florists" />
        </div>
      </section>
      <FeaturedProducts />
      <section className="py-20 bg-[#29301C] text-[#E0D0BC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold">Occasion Finder</h3>
          <p className="mt-2 opacity-80">Not sure what to choose? Answer a few quick questions and we’ll suggest bouquets.</p>
          <Link to="/products" className="inline-block mt-6 px-6 py-3 rounded-xl bg-[#7A3016] text-white hover:brightness-110">Find your bouquet</Link>
        </div>
      </section>
    </div>
  )
}
