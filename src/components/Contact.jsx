import { useState } from 'react'
import { apiPost } from '../lib/api'

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', phone:'', message:''})
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try{
      await apiPost('/api/contact', form)
      setStatus('Thank you! We will get back to you shortly.')
      setForm({name:'', email:'', phone:'', message:''})
    }catch(err){
      setStatus('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-[#F7F7F7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[#2E150D]">Contact Us</h1>
        <p className="mt-2 text-[#2E150D]/80">WhatsApp: +1 (555) 123-4567 · Phone: +1 (555) 987-6543 · Email: hello@florimart.com</p>
        <form onSubmit={submit} className="mt-6 bg-white rounded-xl p-6 shadow ring-1 ring-black/5 grid gap-4">
          <input required placeholder="Name" className="border rounded-lg p-3" value={form.name} onChange={e=> setForm({...form, name:e.target.value})} />
          <input required type="email" placeholder="Email" className="border rounded-lg p-3" value={form.email} onChange={e=> setForm({...form, email:e.target.value})} />
          <input placeholder="Phone" className="border rounded-lg p-3" value={form.phone} onChange={e=> setForm({...form, phone:e.target.value})} />
          <textarea required rows="5" placeholder="Message" className="border rounded-lg p-3" value={form.message} onChange={e=> setForm({...form, message:e.target.value})} />
          <button className="mt-2 px-6 py-3 rounded-xl bg-[#7A3016] text-white hover:brightness-110">Send Message</button>
          {status && <div className="text-sm text-[#2E150D]/70">{status}</div>}
        </form>
        <div className="mt-8 rounded-xl overflow-hidden">
          <iframe title="Map" className="w-full h-64" src="https://www.openstreetmap.org/export/embed.html?bbox=-0.14%2C51.50%2C-0.11%2C51.52&layer=mapnik" />
        </div>
      </div>
    </div>
  )
}
