const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  return (
    <header className="bg-[#08111f] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
        <div className="text-lg md:text-xl font-extrabold text-green-400">
          🛡️ CyberGuard
        </div>
        <nav className="hidden md:flex gap-6">
          {[
            ['assessment', 'Risk Questions'],
            ['lead-form', 'Free Review'],
          ].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="text-slate-300 hover:text-green-400 font-semibold text-sm transition cursor-pointer bg-transparent border-none">
              {label}
            </button>
          ))}
          <button onClick={() => scrollTo('lead-form')}
            className="bg-green-500 hover:bg-green-600 text-[#07111d] font-bold px-4 py-2 rounded-xl text-sm transition cursor-pointer border-none">
            Start Free Check
          </button>
        </nav>
      </div>
    </header>
  )
}