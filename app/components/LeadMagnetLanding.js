'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { subscribeLead } from '../../lib/supabase'

export default function LeadMagnetLanding({ page }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const name = formData.get('name')

    const result = await subscribeLead(name, email, page.source)

    setLoading(false)

    if (result.success) {
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.capture('email_signup', { email, source: page.source })
      }
      router.push(`/thank-you?guide=${page.thankYouGuide}`)
      return
    }

    setError(result.error || 'Something went wrong')
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section
        className="relative overflow-hidden border-b border-slate-800"
        style={{
          background:
            'radial-gradient(circle at top, rgba(245, 158, 11, 0.16), transparent 28%), linear-gradient(135deg, #020617 0%, #0f172a 45%, #1e293b 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-amber-300 font-semibold text-sm uppercase tracking-[0.22em] mb-4">
                {page.eyebrow}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                {page.title}
              </h1>
              <p className="text-xl sm:text-2xl text-slate-200 max-w-2xl leading-relaxed mb-5">
                {page.subtitle}
              </p>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-8 mb-6">
                {page.intro}
              </p>
              <div className="bg-white/8 border border-white/10 rounded-2xl px-5 py-4 max-w-2xl backdrop-blur-sm">
                <p className="text-slate-100 leading-7">
                  {page.promise}
                </p>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="bg-white text-slate-900 rounded-[28px] shadow-2xl p-6 sm:p-8 border border-slate-200">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700 mb-2">
                    Free PDF Guide
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-slate-900">
                    Send me the guide
                  </h2>
                  <p className="text-slate-600 leading-7 text-sm sm:text-base">
                    Enter your details and I&apos;ll email it straight over. No spam. No hard sell. Just the guide and occasional updates worth sending.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">First name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      autoComplete="given-name"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-400 text-slate-900 py-4 rounded-xl font-bold text-lg hover:bg-amber-300 transition disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Me the Free Guide'}
                  </button>
                  <p className="text-sm text-slate-500 text-center">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300 mb-4">
              What&apos;s inside
            </p>
            <p className="text-slate-300 leading-8 mb-8 text-base sm:text-lg">
              {page.featureLead}
            </p>
            <ul className="space-y-4">
              {page.bullets.map((item, index) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="bg-amber-400 text-slate-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-slate-200 leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300 mb-3">
                Built for
              </p>
              <p className="text-slate-200 leading-8 text-base sm:text-lg">
                {page.audience}
              </p>
            </div>
            <div className="rounded-[28px] border border-amber-400/20 bg-amber-400/10 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200 mb-3">
                The central idea
              </p>
              <p className="text-xl sm:text-2xl leading-relaxed text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {page.proof}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
