import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import WhatWeSell from './components/WhatWeSell'
import Assessment from './components/Assessment'
import RiskSummary from './components/RiskSummary'
import Footer from './components/Footer'

export default function App() {
  const [scores, setScores] = useState({ total: 0, email: 0, facebook: 0, device: 0, password: 0 })
  const [scanned, setScanned] = useState(false)

  return (
    <div className="bg-[#08111f] text-white font-sans">
      <Header />
      <Hero />
      <WhatWeSell />
      <Assessment scores={scores} setScores={setScores} setScanned={setScanned} />
      {scanned && <RiskSummary scores={scores} />}
      <Footer />
    </div>
  )
}