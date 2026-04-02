'use client'

import { useState } from 'react'
import { subscribeLead } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function ClusterD() {
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

    const result = await subscribeLead(name, email, 'cluster-d')

    setLoading(false)

    if (result.success) {
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.capture('email_signup', { email, source: 'cluster-d' })
      }
      router.push('/thank-you?guide=cluster-d')
    } else {
      setError(result.error || 'Something went wrong')
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Landing Page D
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            What does Tuesday actually look like?
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-6 max-w-xl mx-auto">
            You&apos;ve run the numbers. They work, or close enough that money should not be the thing stopping you.
            But every morning, your alarm still goes off at 6am anyway.
          </p>
          <p className="text-base text-slate-400 mb-8">
            That is not a spreadsheet problem. It is a &quot;what am I actually for?&quot; problem.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-slate-800/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Seven mornings. Seven exercises. No finance.</h2>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 sm:p-8">
            <ul className="space-y-4">
              {[
                ['Day 1', 'The identity inventory: what are you actually for?'],
                ['Day 2', 'The 6am test: what does a typical morning look like when nobody pays you?'],
                ['Day 3', 'The spreadsheet audit: are the numbers the real blocker, or something else?'],
                ['Day 4', 'The spouse conversation framework: how to raise the topic without conflict'],
                ['Day 5', 'The social map: where do your connections actually come from?'],
                ['Day 6', 'The trial week: design one week of your post-work life'],
                ['Day 7', 'The decision: name what is actually stopping you'],
              ].map(([day, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-amber-400 text-slate-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-200">
                    <strong className="text-white">{day}:</strong> {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-center text-slate-400 mt-6 text-sm">
            Not journaling prompts. Not vision boards. Specific questions that expose what you are actually avoiding.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white text-slate-900 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl font-bold mb-2">Start your seven mornings</h3>
            <p className="text-slate-600 mb-6 text-sm">
              Enter your details and I&apos;ll send you the guide. No commitment, no spam.
            </p>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 text-slate-900 py-4 rounded-xl font-bold text-lg hover:bg-amber-300 transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Me the Guide'}
              </button>
              <p className="text-xs text-slate-500 text-center">
                I respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </div>

          <p className="text-center text-slate-500 mt-8 text-sm">
            Written for UK professionals aged 50-65 who are financially close but emotionally stuck.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-slate-400 text-sm mb-2">Already downloaded?</p>
          <p className="text-slate-500 text-sm">
            &quot;Seven men in a WhatsApp group, ex-CFO, ops director, two founders, used this guide.
            Four of them handed in their notice within a month.&quot;
          </p>
        </div>
      </section>

      <section className="py-12 px-4 text-center">
        <p className="text-slate-400 text-sm">
          The 7-Day Jumpstart Guide is the pre-book lead magnet for <span className="text-amber-400">The Anti-Retirement Guide</span>.
        </p>
      </section>
    </main>
  )
}
