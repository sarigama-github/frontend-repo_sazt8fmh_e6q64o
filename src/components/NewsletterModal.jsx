import { useEffect, useState } from 'react'
import { apiPost } from '../lib/api'

export default function NewsletterModal({ inline=false }){
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(()=>{
    if(inline) return
    const t = setTimeout(()=> setOpen(true), 2000)
    return ()=> clearTimeout(t)
  },[inline])

  const submit = async (e) => {
    e?.preventDefault?.()
    try{
      await apiPost('/api/newsletter', { email, source: inline? 'footer' : 'popup' })
      setStatus('Subscribed!')
      setEmail('')
    }catch(err){
      setStatus('Could not subscribe, try again.')
    }
  }

  const form = (
    <form onSubmit={submit} className="flex gap-2">
      <input type="email" required placeholder="Your email" value={email} onChange={e=> setEmail(e.target.value)} className="flex-1 rounded-lg px-3 py-2 text-[#2E150D] placeholder:text-[#2E150D]/60" />
      <button className="px-4 py-2 rounded-lg bg-[#7A3016] text-white">Subscribe</button>
    </form>
  )

  if(inline){
    return (
      <div>
        {form}
        {status && <div className="text-xs mt-2 opacity-80">{status}</div>}
      </div>
    )
  }

  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="max-w-md w-full rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-[#E0D0BC] p-6">
          <div className="text-lg font-semibold text-[#2E150D]">Stay in bloom</div>
          <div className="text-sm text-[#2E150D]/80 mb-4">Get seasonal selections and special offers.</div>
          {form}
          {status && <div className="text-xs mt-2 text-[#2E150D]/80">{status}</div>}
          <button onClick={()=> setOpen(false)} className="mt-3 text-xs underline text-[#2E150D]/70">No thanks</button>
        </div>
      </div>
    </div>
  )
}
