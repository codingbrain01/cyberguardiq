export default function WhatWeSell() {
  return (
    <section className="py-16 md:py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">How This Page Helps You</h2>
        <p className="text-slate-300 text-center max-w-2xl mx-auto mb-10">
          Ideal for B2C offers around antivirus, account recovery help, email protection, identity protection,
          and general personal cybersecurity services.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: 'Email Protection', desc: 'Capture users worried about phishing, suspicious attachments, fake logins, and compromised inboxes.' },
            { title: 'Facebook Account Safety', desc: 'Target people afraid of unknown logins, hacked messages, ad-account misuse, or account takeovers.' },
            { title: 'Antivirus & Device Security', desc: 'Generate leads from users concerned about malware, unsafe downloads, ransomware, and browser threats.' },
          ].map(c => (
            <div key={c.title} className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-3">{c.title}</h3>
              <p className="text-slate-300 text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}