import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Cart(){
  const [items, setItems] = useState([])

  useEffect(()=>{
    setItems(JSON.parse(localStorage.getItem('cart')||'[]'))
  },[])

  const subtotal = useMemo(()=> items.reduce((s,i)=> s + i.price * i.quantity, 0), [items])

  const updateQty = (idx, q) => {
    const next = items.slice()
    next[idx].quantity = q
    setItems(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const removeItem = (idx) => {
    const next = items.filter((_,i)=> i!==idx)
    setItems(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  return (
    <div className="bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-[#2E150D] mb-6">Your Cart</h1>
        {items.length===0 ? (
          <div className="text-[#2E150D]/70">Your cart is empty.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-xl p-4 shadow ring-1 ring-black/5 divide-y">
              {items.map((item, idx)=> (
                <div key={idx} className="py-4 flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md"/>
                  <div className="flex-1">
                    <div className="font-medium text-[#2E150D]">{item.title}</div>
                    <div className="text-sm text-[#2E150D]/70">Size {item.size}</div>
                  </div>
                  <input type="number" min="1" value={item.quantity} onChange={e=> updateQty(idx, parseInt(e.target.value||'1'))} className="w-16 border rounded-lg p-2"/>
                  <div className="w-24 text-right">${(item.price * item.quantity).toFixed(2)}</div>
                  <button onClick={()=> removeItem(idx)} className="text-[#7A3016]">Remove</button>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl p-4 shadow ring-1 ring-black/5 h-fit">
              <div className="font-semibold text-[#2E150D]">Summary</div>
              <div className="mt-2 text-sm text-[#2E150D]/80">Subtotal: ${subtotal.toFixed(2)}</div>
              <Link to="/checkout" className="mt-4 inline-block w-full text-center px-4 py-3 rounded-xl bg-[#7A3016] text-white">Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
