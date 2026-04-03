'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const ARCHETYPES = {
  timeline_gap: {
    name: 'The Timeline Gap',
    quote: '"We are not actually planning for the same date."',
    bullets: [
      'One of you is thinking in concrete dates. The other is thinking in vague futures.',
      'This mismatch often hides behind practical language about timing, pensions, or market conditions.',
      'Until you name the gap, every conversation feels as if it starts halfway through.',
    ],
    chapter: 'Chapter 3: The Spouse Conversation',
    chapterSummary: 'How to move from implied assumptions to an actual shared timeline.',
  },
  space_friction: {
    name: 'The Space Friction',
    quote: '"We have not worked out what togetherness looks like in real life."',
    bullets: [
      'Retirement does not just change income. It changes noise, routine, solitude, and who is in the kitchen at 10am.',
      'A lot of couples love each other and still underestimate the practical shock of more shared time.',
      'This result means the issue is not the date. It is the day-to-day texture of the life after it.',
    ],
    chapter: 'Chapter 6: Year One Month by Month',
    chapterSummary: 'Designing a rhythm that allows togetherness without accidental suffocation.',
  },
  identity_rebalance: {
    name: 'The Identity Rebalance',
    quote: '"Retirement changes more than one identity at once."',
    bullets: [
      'One or both of you are quietly bracing for a role shift that has not been spoken aloud.',
      'This can show up as fear about usefulness, status, domestic expectations, or emotional labour.',
      'If you do not talk about the role change, resentment tends to carry the conversation for you.',
    ],
    chapter: 'Chapter 5: Identity After the Title',
    chapterSummary: 'What happens when status, usefulness, and household roles all move at once.',
  },
  shared_future_blur: {
    name: 'The Shared Future Blur',
    quote: '"We have never described the life we are supposedly planning for."',
    bullets: [
      'You may agree that retirement is coming without agreeing on what it is for.',
      'Most couples do the financial planning and skip the imagination work completely.',
      'This is the most common pattern: not conflict, but a fuzzy future nobody has drawn properly.',
    ],
    chapter: 'Chapter 4: The Third Tuesday Test',
    chapterSummary: 'Turning a blurry future into something detailed enough to evaluate together.',
  },
}

async function fetchResult(id) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const res = await fetch(
      `${supabaseUrl}/rest/v1/quiz_responses?id=eq.${encodeURIComponent(id)}&select=id,archetype,fear_scores,created_at&limit=1`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
        cache: 'no-store',
      },
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return null
    return data[0]
  } catch {
    return null
  }
}

function LoadingFallback() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col justify-center">
      <div className="max-w-xl mx-auto px-4 py-16 space-y-6 animate-pulse">
        <div className="h-8 bg-slate-800 rounded w-2/3" />
        <div className="h-4 bg-slate-800 rounded w-1/3" />
        <div className="space-y-3">
          <div className="h-4 bg-slate-800 rounded" />
          <div className="h-4 bg-slate-800 rounded" />
          <div className="h-4 bg-slate-800 rounded w-5/6" />
        </div>
      </div>
    </main>
  )
}

function SpouseReadinessQuizResultsPage() {
  const searchParams = useSearchParams()
  const responseId = searchParams.get('id')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!responseId) {
      setLoading(false)
      setNotFound(true)
      return
    }

    const delays = [500, 1000, 2000, 3000]
    let cancelled = false

    const attempt = (retryCount) => {
      if (cancelled) return
      fetchResult(responseId).then((data) => {
        if (cancelled) return
        if (data) {
          setResult(data)
          setLoading(false)
        } else if (retryCount < 4) {
          setTimeout(() => attempt(retryCount + 1), delays[retryCount - 1] ?? 2000)
        } else {
          setNotFound(true)
          setLoading(false)
        }
      })
    }

    attempt(1)
    return () => { cancelled = true }
  }, [responseId])

  if (loading) return <LoadingFallback />

  if (!responseId || notFound) {
    return (
      <main className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-white mb-4">No results found</h1>
          <p className="text-slate-400 mb-8">
            We couldn&apos;t find your result. Please complete the spouse readiness quiz first.
          </p>
          <a
            href="/spouse-readiness-quiz"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-6 py-3 rounded-xl transition"
          >
            Take the Quiz
          </a>
        </div>
      </main>
    )
  }

  const archetype = ARCHETYPES[result.archetype] || ARCHETYPES.shared_future_blur

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="w-full border-b border-slate-800 bg-slate-900/95 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-slate-400 text-sm font-medium">Your spouse-readiness result</span>
          <a href="/spouse-readiness-quiz" className="text-sm text-slate-400 hover:text-amber-400 transition">
            Retake quiz
          </a>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto px-4 py-12 w-full">
          <div className="text-center mb-10">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">
              Your dominant couple pattern
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {archetype.name}
            </h1>
            <p className="text-slate-400 italic text-lg">
              {archetype.quote}
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 sm:p-8 mb-8">
            <ul className="space-y-4">
              {archetype.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                  <span className="text-amber-400 flex-shrink-0 mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-6 mb-8">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">
              Start here
            </p>
            <p className="text-white font-semibold text-lg mb-1">
              {archetype.chapter}
            </p>
            <p className="text-slate-400 text-sm">
              {archetype.chapterSummary}
            </p>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 mb-6 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Want a practical next step?</h2>
            <p className="text-slate-300 text-sm sm:text-base mb-4">
              The Spouse Conversation Guide gives you five questions designed to move this conversation without turning it into another negotiation about timing.
            </p>
            <a
              href="/spouse-conversation-guide"
              className="inline-block bg-amber-500 text-slate-900 px-5 py-3 rounded-xl font-semibold hover:bg-amber-400 transition"
            >
              Get the Spouse Conversation Guide →
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function SpouseReadinessQuizResults() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SpouseReadinessQuizResultsPage />
    </Suspense>
  )
}
