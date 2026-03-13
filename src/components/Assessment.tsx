import { useState } from 'react'
import LeadForm from './LeadForm'

const questions = [
    { label: '1. Have you received suspicious emails recently?', choices: [{ text: 'Yes', value: 12 }, { text: 'No', value: 0 }, { text: 'Not sure', value: 6 }] },
    { label: '2. Have you noticed unusual Facebook activity?', choices: [{ text: 'Unknown logins', value: 15 }, { text: "Messages I didn't send", value: 15 }, { text: 'Ad account issues', value: 12 }, { text: 'No issues', value: 0 }] },
    { label: '3. Is antivirus currently active on your device?', choices: [{ text: 'Yes', value: 0 }, { text: 'No', value: 10 }, { text: 'Not sure', value: 6 }] },
    { label: '4. Do you reuse the same password across accounts?', choices: [{ text: 'Yes', value: 14 }, { text: 'Sometimes', value: 8 }, { text: 'No', value: 0 }] },
    { label: '5. Have you clicked a suspicious link in the last 30 days?', choices: [{ text: 'Yes', value: 14 }, { text: 'No', value: 0 }, { text: 'Not sure', value: 8 }] },
]

function labelFromValue(v: number) {
    if (v < 35) return 'Good'
    if (v < 60) return 'Moderate Risk'
    if (v < 80) return 'Needs Review'
    return 'High Risk'
}

type Stage = 'quiz' | 'scanning' | 'results'

const scanSteps = [
    'Initializing security scan...',
    'Checking email exposure...',
    'Scanning for malware signatures...',
    'Analyzing Facebook account activity...',
    'Checking password database leaks...',
    'Reviewing device protection status...',
    'Compiling threat report...',
]

interface Scores {
    total: number
    email: number
    facebook: number
    device: number
    password: number
}

interface Props {
    scores: Scores
    setScores: (s: Scores) => void
    setScanned: (v: boolean) => void
}

export default function Assessment({ scores, setScores, setScanned }: Props) {
    const [selected, setSelected] = useState<(number | null)[]>(Array(questions.length).fill(null))
    const [stage, setStage] = useState<Stage>('quiz')
    const [scanStep, setScanStep] = useState(0)
    const [scanProgress, setScanProgress] = useState(0)

    const handleSelect = (qIndex: number, value: number) => {
        const updated = [...selected]
        updated[qIndex] = value
        setSelected(updated)
    }

    const handleCalculate = () => {
        let total = 20, email = 25, facebook = 25, device = 25, password = 25
        selected.forEach((val, index) => {
            const value = val ?? 0
            total += value
            if (index === 0 || index === 4) email += Math.round(value * 1.2)
            if (index === 1) facebook += Math.round(value * 1.8)
            if (index === 2 || index === 4) device += Math.round(value * 1.1)
            if (index === 3) password += Math.round(value * 1.8)
        })

        const newScores = {
            total: Math.min(total, 95),
            email: Math.min(email, 95),
            facebook: Math.min(facebook, 95),
            device: Math.min(device, 95),
            password: Math.min(password, 95),
        }

        setScores(newScores)
        setScanned(true)

        setStage('scanning')
        setScanStep(0)
        setScanProgress(0)

        let step = 0
        const interval = setInterval(() => {
            step++
            setScanStep(step)
            setScanProgress(Math.round((step / scanSteps.length) * 100))
            if (step >= scanSteps.length) {
                clearInterval(interval)
                setTimeout(() => setStage('results'), 600)
            }
        }, 600)
    }

    return (
        <section id="assessment" className="py-16 md:py-20 px-5">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                {/* Left Panel */}
                <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">

                    {/* STAGE: QUIZ */}
                    {stage === 'quiz' && (
                        <>
                            <h3 className="text-2xl font-bold mb-6">Quick Risk Questions</h3>
                            {questions.map((q, qIndex) => (
                                <div key={qIndex} className="mb-6">
                                    <p className="font-bold mb-3 text-sm">{q.label}</p>
                                    <div className="grid gap-2">
                                        {q.choices.map((c, cIndex) => (
                                            <button key={cIndex}
                                                onClick={() => handleSelect(qIndex, c.value)}
                                                className={`text-left px-4 py-3 rounded-xl text-sm border transition cursor-pointer ${selected[qIndex] === c.value
                                                    ? 'border-green-500/80 bg-green-500/10 text-white'
                                                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                                                {c.text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button onClick={handleCalculate}
                                className="bg-green-500 hover:bg-green-600 text-[#07111d] font-bold px-6 py-3 rounded-xl transition cursor-pointer border-none w-full text-base">
                                🔍 Scan My Device
                            </button>
                        </>
                    )}

                    {/* STAGE: SCANNING */}
                    {stage === 'scanning' && (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="w-24 h-24 rounded-full border-4 border-green-500/30 border-t-green-500 animate-spin mb-6" />
                            <h3 className="text-xl font-bold mb-2">Scanning Your Device...</h3>
                            <p className="text-slate-400 text-sm mb-6">Please wait while we analyze your security profile.</p>
                            <div className="w-full bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full transition-all duration-500"
                                    style={{ width: `${scanProgress}%` }} />
                            </div>
                            <p className="text-green-400 text-xs font-mono">{scanProgress}% Complete</p>
                            <div className="mt-6 w-full text-left space-y-2">
                                {scanSteps.map((step, i) => (
                                    <div key={i} className={`flex items-center gap-3 text-xs transition-all duration-300 ${i < scanStep ? 'text-green-400' : 'text-slate-600'}`}>
                                        <span>{i < scanStep ? '✔' : '○'}</span>
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STAGE: RESULTS */}
                    {stage === 'results' && (
                        <div className="py-4">
                            <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-4 mb-6 text-center">
                                <div className="text-3xl mb-2">⚠️</div>
                                <h3 className="text-xl font-extrabold text-red-400 mb-1">High Security Threats Found!</h3>
                                <p className="text-slate-300 text-sm">Our scan detected multiple security risks on your device and accounts.</p>
                            </div>
                            <div className="space-y-3 mb-6">
                                {[
                                    { icon: '🔴', label: 'Malware Detected', detail: '3 suspicious processes found' },
                                    { icon: '🔴', label: 'Email Breach Exposure', detail: 'Your email found in 2 data leaks' },
                                    { icon: '🟠', label: 'Facebook Account Risk', detail: 'Unusual login activity detected' },
                                    { icon: '🔴', label: 'Weak Password Exposure', detail: 'Credentials found in breach database' },
                                    { icon: '🟠', label: 'Unprotected Device', detail: 'No active antivirus protection found' },
                                ].map(t => (
                                    <div key={t.label} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                                        <span className="text-lg">{t.icon}</span>
                                        <div>
                                            <p className="text-sm font-bold">{t.label}</p>
                                            <p className="text-xs text-slate-400">{t.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2 mb-6">
                                {[
                                    { label: 'Email', value: scores.email },
                                    { label: 'Facebook', value: scores.facebook },
                                    { label: 'Device', value: scores.device },
                                    { label: 'Password', value: scores.password },
                                ].map(m => (
                                    <div key={m.label}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>{m.label}</span>
                                            <span className="text-slate-400">{labelFromValue(m.value)}</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                            <div className="h-full rounded-full transition-all duration-500"
                                                style={{ width: `${m.value}%`, background: 'linear-gradient(90deg,#22c55e,#facc15,#ef4444)' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => {
                                    setStage('quiz')
                                    setSelected(Array(questions.length).fill(null))
                                    setScanStep(0)
                                    setScanProgress(0)
                                }}
                                className="w-full mt-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-bold py-3 rounded-xl transition cursor-pointer border border-white/10">
                                Retake Assessment
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Panel — Lead Form */}
                {stage === 'results' ? (
                    <div className="bg-[#0f172a] border border-red-500/30 rounded-2xl p-6">
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-center">
                            <p className="text-red-400 font-extrabold text-lg">🚨 Immediate Action Required</p>
                            <p className="text-slate-300 text-sm mt-1">Fill in your details and a security expert will call you.</p>
                        </div>
                        <LeadForm riskScore={scores.total} />
                    </div>
                ) : (
                    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-64">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold mb-3">Complete the Assessment First</h3>
                        <p className="text-slate-400 text-sm">
                            Answer the risk questions and scan your device to unlock your free security review form.
                        </p>
                        <div className="mt-6 w-full bg-white/5 border border-white/10 rounded-xl p-4 text-left space-y-2">
                            <p className="text-slate-400 text-xs">✅ Answer all 5 questions</p>
                            <p className="text-slate-400 text-xs">✅ Click "Scan My Device"</p>
                            <p className="text-slate-400 text-xs">✅ View your risk results</p>
                            <p className="text-slate-400 text-xs">🔒 Form unlocks after scan</p>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}