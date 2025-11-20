import { useMemo, useState } from 'react'
import { apiPost } from '../lib/api'

export default function Checkout(){
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState({full_name:'', phone:'', street:'', city:'', postal_code:'', country:''})
  const items = JSON.parse(localStorage.getItem('cart')||'[]')
  const subtotal = useMemo(()=> items.reduce((s,i)=> s + i.price * i.quantity, 0), [items])
  const delivery = subtotal>100? 0 : 9.99
  const total = subtotal + delivery
  const [status, setStatus] = useState('')

  const pay = async () => {
    setStatus('Processing...')
    try {
      const payload = {
        items: items.map(i=> ({product_id: i.id, title: i.title, price: i.price, quantity: i.quantity, size: i.size, image: i.image})),
        subtotal, delivery_fee: delivery, total, email, shipping_address: address, payment_method: 'cod'
      }
      await apiPost('/api/orders', payload)
      setStatus('Order placed! Thank you.')
      localStorage.removeItem('cart')
    } catch (e) {
      setStatus('Payment failed. Please try again.')
    }
  }

  return (
    <div className="bg-[#F7F7F7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow ring-1 ring-black/5">
          <div className="font-semibold text-[#2E150D] mb-4">Delivery Details</div>
          <input className="mb-3 w-full border rounded-lg p-3" placeholder="Email" type="email" value={email} onChange={e=> setEmail(e.target.value)} />
          {['full_name','phone','street','city','postal_code','country'].map(k=> (
            <input key={k} className="mb-3 w-full border rounded-lg p-3" placeholder={k.replace('_',' ').replace(/^./,c=>c.toUpperCase())} value={address[k]||''} onChange={e=> setAddress({...address, [k]: e.target.value})} />
          ))}
          <button onClick={pay} className="mt-2 px-6 py-3 rounded-xl bg-[#7A3016] text-white">Place Order</button>
          {status && <div className="mt-3 text-sm text-[#2E150D]/80">{status}</div>}
        </div>
        <div className="bg-white rounded-xl p-6 shadow ring-1 ring-black/5 h-fit">
          <div className="font-semibold text-[#2E150D] mb-4">Order Summary</div>
          <div className="space-y-2 text-sm">
            {items.map((i,idx)=> (
              <div key={idx} className="flex items-center gap-3">
                <img src={i.image} alt={i.title} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{i.title}</div>
                  <div className="text-[#2E150D]/70">x{i.quantity} · {i.size}</div>
                </div>
                <div>${(i.price*i.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-[#2E150D]/80">Subtotal: ${subtotal.toFixed(2)}</div>
          <div className="text-sm text-[#2E150D]/80">Delivery: ${delivery.toFixed(2)}</div>
          <div className="mt-1 font-semibold">Total: ${total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}
