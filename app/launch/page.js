'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LaunchPage() {
  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/subscribe-lead`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY},
          body: JSON.stringify({ name, email, source: 'launch' }),
        },
      )

      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || `Error ${res.status}`)
      }

      router.push('/thank-you?guide=launch')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-xl mx-auto px-4 py-16 w-full">

          {/* Badge */}
          <div className="text-center mb-6">
            <span className="inline-block bg-amber-400/10 text-amber-400 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30">
              Coming soon
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4 leading-tight">
            Hear first when the book is<br className="hidden sm:block" />
            <span className="text-amber-400"> ready.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-slate-400 text-center text-lg mb-8 leading-relaxed">
            Join the reader list and you&apos;ll be among the first to hear when the book is available, along with any launch pricing or early-reader updates.
          </p>

          {/* Value props */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8 space-y-4">
            {[
              ['Reader updates', 'You will hear when the release date is confirmed and when the book is available.'],
              ['First notification', "You&apos;ll hear the moment it opens up, not after."],
              ['No spam', 'Only useful updates. Unsubscribe anytime.'],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-start gap-3">
                <span className="text-amber-400 mt-0.5 flex-shrink-0">✓</span>
                <div>
                  <span className="text-white font-medium">{title}:</span>{' '}
                  <span className="text-slate-400 text-sm">{desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-900/30 border border-red-800 text-red-300 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="launch-name" className="block text-sm font-medium text-slate-300 mb-1">
                First name
              </label>
              <input
                id="launch-name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="given-name"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                placeholder="Your first name"
              />
            </div>

            <div>
              <label htmlFor="launch-email" className="block text-sm font-medium text-slate-300 mb-1">
                Email address
              </label>
              <input
                id="launch-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold py-4 rounded-xl transition text-lg"
            >
              {loading ? 'Joining the list...' : 'Join the reader list'}
            </button>

            <p className="text-xs text-slate-500 text-center leading-snug">
              Reader list — no spam. Just useful updates while the publish date is being finalised.
            </p>
          </form>

        </div>
      </div>
    </main>
  )
}
