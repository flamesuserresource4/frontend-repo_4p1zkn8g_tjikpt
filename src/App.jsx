import { useEffect, useMemo, useState } from 'react'

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      aria-label={label}
    >
      {children}
      <span className="hidden sm:inline text-sm">{label}</span>
    </a>
  )
}

function App() {
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
  const [gigs, setGigs] = useState([])
  const [loadingGigs, setLoadingGigs] = useState(true)
  const [contact, setContact] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/gigs`)
        if (res.ok) {
          const data = await res.json()
          setGigs(data)
        }
      } catch (e) {
        // ignore
      } finally {
        setLoadingGigs(false)
      }
    }
    load()
  }, [baseUrl])

  const submitContact = async (e) => {
    e.preventDefault()
    setSending(true)
    setSent(null)
    try {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, source: 'website' })
      })
      if (res.ok) {
        setSent({ ok: true, msg: 'Messaggio inviato! Ti risponderemo presto.' })
        setContact({ name: '', email: '', subject: '', message: '' })
      } else {
        const err = await res.json().catch(() => ({}))
        setSent({ ok: false, msg: err.detail || 'Errore durante l\'invio. Riprova.' })
      }
    } catch (e) {
      setSent({ ok: false, msg: 'Connessione non disponibile. Riprova tra poco.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-900 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-black tracking-widest">MAFFA</div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#music" className="hover:text-white">Music</a>
            <a href="#gigs" className="hover:text-white">Gigs</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -inset-[10%] bg-[radial-gradient(circle_at_20%_20%,rgba(147,51,234,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.25),transparent_45%)]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
              Sound of the night.
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-sky-400">MAFFA</span>
            </h1>
            <p className="mt-6 text-white/70 max-w-xl">
              DJ/Producer. Tech House • Melodic • Club Energy. Available for clubs, festivals and exclusive events.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SocialIcon href="#music" label="Ascolta">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Ascolta ora
              </SocialIcon>
              <SocialIcon href="#contact" label="Booking">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>
                Booking
              </SocialIcon>
            </div>
            <div className="mt-6 flex gap-2">
              <SocialIcon href="https://instagram.com" label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m-2.75 3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>
              </SocialIcon>
              <SocialIcon href="https://soundcloud.com" label="SoundCloud">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8a5 5 0 0 0-4.58 2.88A3.5 3.5 0 1 0 9.5 18H17a4 4 0 1 0 0-8z"/></svg>
              </SocialIcon>
              <SocialIcon href="https://open.spotify.com" label="Spotify">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.98A10 10 0 1 0 22 12 10 10 0 0 0 12 2m4.36 14.84a.75.75 0 0 1-1.03.25 8.38 8.38 0 0 0-8.66-.25.75.75 0 0 1-.78-1.28 9.88 9.88 0 0 1 10.21.3.75.75 0 0 1 .26.98m1.37-3.05a.94.94 0 0 1-1.28.31 11.41 11.41 0 0 0-11.8-.34.94.94 0 0 1-.89-1.65 13.09 13.09 0 0 1 13.55.4.94.94 0 0 1 .42 1.28m.13-3.12a1.12 1.12 0 0 1-1.53.36 14.91 14.91 0 0 0-15.43-.41 1.12 1.12 0 0 1-1.05-1.97 17 17 0 0 1 17.63.46 1.12 1.12 0 0 1 .38 1.56z"/></svg>
              </SocialIcon>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square w-full rounded-3xl bg-gradient-to-br from-violet-600/30 to-sky-500/30 border border-white/10 shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl font-black tracking-wider">M</div>
                <div className="text-white/60">DJ / Producer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music */}
      <section id="music" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Latest Releases</h2>
        <p className="text-white/60 mt-2">Stream on your favorite platform.</p>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <iframe title="Spotify Embed" className="w-full h-72 rounded-xl border border-white/10" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          <iframe title="SoundCloud Embed" className="w-full h-72 rounded-xl border border-white/10" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/209262931&color=%23ff5500&auto_play=false&show_user=true"></iframe>
        </div>
      </section>

      {/* Gigs */}
      <section id="gigs" className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Upcoming Gigs</h2>
            <p className="text-white/60 mt-2">See you on the dancefloor.</p>
          </div>
          <a href="#contact" className="hidden md:inline-block px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-white/90">Book MAFFA</a>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {loadingGigs ? (
            <div className="col-span-2 text-white/60">Caricamento date...</div>
          ) : gigs.length === 0 ? (
            <div className="col-span-2 text-white/60">Presto saranno annunciate nuove date.</div>
          ) : (
            gigs.map((gig, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
                <div className="text-sm text-white/60">{new Date(gig.date).toLocaleDateString()}</div>
                <div className="mt-1 text-xl font-bold">{gig.title}</div>
                <div className="text-white/70">{gig.venue} • {gig.city}</div>
                {gig.ticket_url && (
                  <a href={gig.ticket_url} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm text-sky-300 hover:text-sky-200">Tickets →</a>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">About MAFFA</h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Italian DJ and producer blending groove-heavy drums with melodic textures. Performances deliver high energy and immersive soundscapes. Open for bookings worldwide.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-white/80">
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-emerald-400"/>Club & Festival Ready</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-emerald-400"/>Original Productions & Remixes</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-emerald-400"/>Professional Rider</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-emerald-400"/>Available for International Bookings</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/60">Press Kit</div>
            <div className="text-xl font-bold mt-1">Download EPK</div>
            <p className="text-white/60 mt-3">Photos, logo, bio, technical rider.</p>
            <button className="mt-4 w-full px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-white/90">Scarica</button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Booking & Contact</h2>
            <p className="mt-3 text-white/70">Per booking, collaborazioni o press: compila il form.</p>
            <form onSubmit={submitContact} className="mt-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Nome"
                  value={contact.name}
                  onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={contact.email}
                  onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <input
                type="text"
                placeholder="Oggetto (opzionale)"
                value={contact.subject}
                onChange={(e) => setContact((c) => ({ ...c, subject: e.target.value }))}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-400"
              />
              <textarea
                required
                placeholder="Messaggio"
                rows={6}
                value={contact.message}
                onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-400"
              />
              <button
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-sky-500 hover:from-violet-400 hover:to-sky-400 disabled:opacity-60 disabled:cursor-not-allowed font-semibold"
              >
                {sending ? 'Invio...' : 'Invia messaggio'}
              </button>
              {sent && (
                <div className={`${sent.ok ? 'text-emerald-400' : 'text-rose-400'} text-sm`}>
                  {sent.msg}
                </div>
              )}
            </form>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/60">Management</div>
            <div className="mt-2">booking@maffa.dj</div>
            <div className="mt-1">press@maffa.dj</div>
            <div className="mt-6 text-sm text-white/60">Base</div>
            <div className="mt-1">Italy / EU</div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-center">IG</a>
              <a href="https://open.spotify.com" target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-center">SPOTIFY</a>
              <a href="https://soundcloud.com" target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-center">SC</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} MAFFA — All rights reserved.
      </footer>
    </div>
  )
}

export default App
