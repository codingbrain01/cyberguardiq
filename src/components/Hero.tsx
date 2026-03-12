const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <header className="px-5 py-16 md:py-20"
      style={{ background: 'radial-gradient(circle at top right, rgba(34,197,94,.14), transparent 30%), linear-gradient(180deg, #08111f 0%, #0f1b31 100%)' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* Left */}
        <div>
          <div className="text-green-300 text-xs font-bold uppercase tracking-widest mb-4">
            Free Personal Cyber Risk Assessment
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Check If Your Email, Facebook, and Device Security May Be At Risk
          </h1>
          <p className="text-slate-300 text-base md:text-lg mb-6">
            Discover common warning signs of phishing, malware, password leaks, suspicious Facebook activity,
            and account compromise with a fast assessment.
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <button onClick={() => scrollTo('lead-form')}
              className="bg-green-500 hover:bg-green-600 text-[#07111d] font-bold px-6 py-3 rounded-xl transition cursor-pointer border-none">
              Start Security Check
            </button>
            <button onClick={() => scrollTo('assessment')}
              className="bg-transparent border border-white/20 text-white hover:bg-white/10 font-bold px-6 py-3 rounded-xl transition cursor-pointer">
              See Risk Questions
            </button>
          </div>
        </div>

        {/* Score Panel */}
        <div className="bg-[#0c1423]/95 border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-6 gap-3">
            <div className="text-lg font-bold">Security Score Preview</div>
            <div className="bg-green-500/10 text-green-300 px-3 py-1 rounded-full text-xs font-bold">Assessment Mode</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mb-6">
            {/* Circle */}
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{ background: 'conic-gradient(#22c55e 0deg 210deg, #facc15 210deg 275deg, #ef4444 275deg 360deg)' }}>
                <div className="w-20 h-20 rounded-full bg-[#08111f] flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">58</span>
                  <span className="text-xs text-slate-400">Risk Score</span>
                </div>
              </div>
            </div>

            {/* Bars */}
            <div className="space-y-3">
              {[
                { label: 'Email Security', value: 64, text: 'Moderate Risk' },
                { label: 'Facebook Safety', value: 72, text: 'Needs Review' },
                { label: 'Device Protection', value: 55, text: 'Moderate Risk' },
                { label: 'Password Exposure', value: 70, text: 'Needs Review' },
              ].map(m => (
                <div key={m.label} className="bg-white/5 rounded-xl p-3">
                  <div className="flex justify-between text-xs mb-2">
                    <span>{m.label}</span>
                    <span className="text-slate-400">{m.text}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.value}%`, background: 'linear-gradient(90deg,#22c55e,#facc15,#ef4444)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => scrollTo('lead-form')}
            className="w-full bg-green-500 hover:bg-green-600 text-[#07111d] font-bold py-3 rounded-xl transition cursor-pointer border-none">
            Get My Risk Summary
          </button>
        </div>
      </div>
    </header>
  )
}