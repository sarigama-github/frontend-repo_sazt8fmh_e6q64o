import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../lib/api'

export default function Reviews({ productId }){
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  useEffect(()=>{
    apiGet(`/api/reviews/${productId}`).then(setReviews)
  },[productId])

  const submit = async (e)=>{
    e.preventDefault()
    try{
      await apiPost('/api/reviews', { product_id: productId, name, rating, comment })
      setName(''); setRating(5); setComment('')
      const next = await apiGet(`/api/reviews/${productId}`)
      setReviews(next)
    }catch(err){
      // ignore
    }
  }

  return (
    <div className="mt-8">
      <div className="font-semibold text-[#2E150D] mb-2">Customer Reviews</div>
      <div className="space-y-3">
        {reviews.map(r=> (
          <div key={r.id} className="bg-white rounded-lg p-3 shadow ring-1 ring-black/5">
            <div className="text-sm font-medium">{r.name} · {"★".repeat(r.rating)}</div>
            <div className="text-sm text-[#2E150D]/80">{r.comment}</div>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="mt-4 bg-white rounded-lg p-3 shadow ring-1 ring-black/5 grid gap-2">
        <input required placeholder="Your name" value={name} onChange={e=> setName(e.target.value)} className="border rounded p-2" />
        <select value={rating} onChange={e=> setRating(parseInt(e.target.value))} className="border rounded p-2 w-28">
          {[5,4,3,2,1].map(v=> <option key={v} value={v}>{v} stars</option>)}
        </select>
        <textarea placeholder="Share your thoughts" value={comment} onChange={e=> setComment(e.target.value)} className="border rounded p-2" />
        <button className="px-4 py-2 rounded-lg bg-[#7A3016] text-white w-fit">Submit Review</button>
      </form>
    </div>
  )
}
