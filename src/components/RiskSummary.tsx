const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

interface Props {
  scores: { total: number; email: number; facebook: number; device: number; password: number }
}

function labelFromValue(v: number) {
  if (v < 35) return 'Good'
  if (v < 60) return 'Moderate Risk'
  if (v < 80) return 'Needs Review'
  return 'High Risk'
}

function colorFromValue(v: number) {
  if (v < 35) return 'text-green-400'
  if (v < 60) return 'text-yellow-400'
  if (v < 80) return 'text-orange-400'
  return 'text-red-400'
}

export default function RiskSummary({ scores }: Props) {
  return (
    <section className="py-16 md:py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Your Risk Summary</h2>
        <p className="text-slate-300 text-center max-w-2xl mx-auto mb-10">
          Based on your answers, here is your personalized security risk report.
        </p>
        <div className="max-w-3xl mx-auto bg-[#0f172a] border border-white/10 rounded-2xl p-8">

          {/* Overall Score */}
          <div className="flex items-center gap-4 mb-6 bg-white/5 rounded-xl p-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'conic-gradient(#22c55e 0deg 210deg, #facc15 210deg 275deg, #ef4444 275deg 360deg)' }}>
              <div className="w-11 h-11 rounded-full bg-[#08111f] flex flex-col items-center justify-center">
                <span className="text-sm font-bold">{scores.total}</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-lg">Overall Risk Score: <span className={colorFromValue(scores.total)}>{scores.total}/95</span></p>
              <p className={`text-sm font-bold ${colorFromValue(scores.total)}`}>{labelFromValue(scores.total)}</p>
            </div>
          </div>

          {/* Category Scores */}
          <div className="space-y-3 mb-6">
            {[
              { label: 'Email Security', value: scores.email },
              { label: 'Facebook Safety', value: scores.facebook },
              { label: 'Device Protection', value: scores.device },
              { label: 'Password Exposure', value: scores.password },
            ].map(m => (
              <div key={m.label} className="bg-white/5 rounded-xl px-4 py-3">
                <div className="flex justify-between text-sm mb-2">
                  <span>{m.label}</span>
                  <span className={colorFromValue(m.value)}>{labelFromValue(m.value)}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${m.value}%`, background: 'linear-gradient(90deg,#22c55e,#facc15,#ef4444)' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Risk Items */}
          <h3 className="text-lg font-bold mb-3">Detected Risk Areas:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              'Phishing attack exposure',
              'Password compromise',
              'Facebook account takeover risk',
              'Malware or unsafe download exposure',
              'Weak recovery settings',
              'Suspicious login behavior',
            ].map(r => (
              <div key={r} className="bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl text-slate-200 text-sm">
                🔴 {r}
              </div>
            ))}
          </div>

          <p className="text-slate-300 text-sm mb-6">
            Recommended next step: request a review and get help securing your email, passwords, device, and social accounts.
          </p>
          <button onClick={() => scrollTo('lead-form')}
            className="bg-green-500 hover:bg-green-600 text-[#07111d] font-bold px-6 py-3 rounded-xl transition cursor-pointer border-none">
            Speak With a Security Specialist
          </button>
        </div>
      </div>
    </section>
  )
}