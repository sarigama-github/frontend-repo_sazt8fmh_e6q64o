import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../lib/api'

const filtersInit = { occasion:'', style:'', color:'', price:'all' }

export default function Products(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState(filtersInit)

  useEffect(()=>{
    let url = '/api/products'
    const params = []
    if(filters.occasion) params.push(`occasion=${encodeURIComponent(filters.occasion)}`)
    if(filters.style) params.push(`style=${encodeURIComponent(filters.style)}`)
    if(filters.color) params.push(`color=${encodeURIComponent(filters.color)}`)
    if(params.length) url += `?${params.join('&')}`
    setLoading(true)
    apiGet(url).then(setProducts).finally(()=> setLoading(false))
  },[filters])

  const displayed = useMemo(()=>{
    if(filters.price==='all') return products
    if(filters.price==='low') return products.filter(p=> p.price < 50)
    if(filters.price==='mid') return products.filter(p=> p.price >= 50 && p.price <= 100)
    if(filters.price==='high') return products.filter(p=> p.price > 100)
    return products
  },[products, filters])

  return (
    <div className="bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-[#2E150D] mb-6">Our Bouquets</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <aside className="md:col-span-1 bg-white rounded-xl p-4 shadow-sm ring-1 ring-black/5 h-fit">
            <div className="font-semibold text-[#2E150D] mb-2">Filter</div>
            <div className="space-y-3 text-sm">
              <select className="w-full border rounded-lg p-2" value={filters.occasion} onChange={e=> setFilters(f=>({...f, occasion:e.target.value}))}>
                <option value="">Occasion</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Get Well</option>
                <option>Thank You</option>
              </select>
              <select className="w-full border rounded-lg p-2" value={filters.style} onChange={e=> setFilters(f=>({...f, style:e.target.value}))}>
                <option value="">Style</option>
                <option>Classic</option>
                <option>Modern</option>
                <option>Rustic</option>
                <option>Minimal</option>
              </select>
              <select className="w-full border rounded-lg p-2" value={filters.color} onChange={e=> setFilters(f=>({...f, color:e.target.value}))}>
                <option value="">Color</option>
                <option>Red</option>
                <option>Pink</option>
                <option>White</option>
                <option>Green</option>
              </select>
              <select className="w-full border rounded-lg p-2" value={filters.price} onChange={e=> setFilters(f=>({...f, price:e.target.value}))}>
                <option value="all">Price</option>
                <option value="low">Under $50</option>
                <option value="mid">$50 - $100</option>
                <option value="high">Over $100</option>
              </select>
              <button onClick={()=> setFilters(filtersInit)} className="w-full mt-2 px-4 py-2 rounded-lg bg-[#818F7D] text-white">Reset</button>
            </div>
          </aside>
          <section className="md:col-span-3">
            {loading? <div className="text-[#2E150D]/60">Loading...</div> : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayed.map(p=> (
                  <Link key={p.id} to={`/products/${p.id}`} className="group bg-white rounded-xl overflow-hidden shadow-sm ring-1 ring-black/5 hover:shadow-md transition">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img loading="lazy" src={p.images?.[0] || 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-[#2E150D]">{p.title}</div>
                      <div className="text-sm text-[#2E150D]/70">${p.price.toFixed(2)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
