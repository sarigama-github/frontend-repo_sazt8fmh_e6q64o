export default function About(){
  return (
    <div className="bg-[#F7F7F7]">
      <section className="bg-[#E0D0BC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-[#2E150D]">Our Story</h1>
          <p className="mt-4 text-[#2E150D]/80 max-w-prose">Flori Mart was born from a love for nature and a desire to bring its calming beauty into everyday life. Our philosophy blends natural elegance with premium craftsmanship, creating arrangements that feel warm, thoughtful, and timeless.</p>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden shadow ring-1 ring-black/5">
            <img loading="lazy" src="https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1600&auto=format&fit=crop" alt="Studio" className="w-full h-full object-cover"/>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-[#2E150D]">Natural elegance, crafted by hand</h3>
            <p className="mt-3 text-[#2E150D]/80">Every bouquet is designed in our studio by a small team of artisans who obsess over texture, tone, and flow. We prioritize seasonal stems and sustainable practices.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
