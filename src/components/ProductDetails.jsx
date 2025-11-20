import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { apiGet } from '../lib/api'
import Reviews from './Reviews'

export default function ProductDetails(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [size, setSize] = useState('M')
  const navigate = useNavigate()

  useEffect(()=>{
    apiGet(`/api/products/${id}`).then(setProduct)
  },[id])

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    cart.push({ id: product.id, title: product.title, price: product.price, image: product.images?.[0], size, quantity: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    navigate('/cart')
  }

  if(!product) return <div className="p-6">Loading...</div>

  return (
    <div className="bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-8">
        <div className="grid gap-3">
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white ring-1 ring-black/5">
            <img loading="lazy" src={product.images?.[0] || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop'} alt={product.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0,1,2,3].map(i=> (
              <div key={i} className="aspect-square rounded-lg overflow-hidden bg-white ring-1 ring-black/5">
                <img loading="lazy" src={product.images?.[i] || product.images?.[0] || 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop'} alt="thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#2E150D]">{product.title}</h1>
          <div className="mt-2 text-[#2E150D]/70">${product.price?.toFixed(2)}</div>
          <p className="mt-4 text-[#2E150D]/80">{product.description || 'A handcrafted bouquet in warm earthy tones, arranged with care.'}</p>

          <div className="mt-6">
            <div className="text-sm font-medium text-[#2E150D] mb-2">Size</div>
            <div className="flex gap-2">
              {(product.sizes || ['S','M','L']).map(s=> (
                <button key={s} onClick={()=> setSize(s)} className={`px-4 py-2 rounded-lg border ${size===s? 'bg-[#7A3016] text-white border-transparent' : 'bg-white text-[#2E150D]'} `}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={addToCart} className="px-6 py-3 rounded-xl bg-[#7A3016] text-white hover:brightness-110">Add to Cart</button>
            <Link to="/products" className="px-6 py-3 rounded-xl border border-[#2E150D]/20">Back to products</Link>
          </div>

          <Reviews productId={id} />
        </div>
      </div>
    </div>
  )
}
