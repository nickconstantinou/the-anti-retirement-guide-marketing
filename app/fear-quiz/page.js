'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import QuizProgress from '../components/QuizProgress'
import QuizQuestion from '../components/QuizQuestion'
import { scoreQuiz } from '../lib/quizScoring'

// ── Quiz data ─────────────────────────────────────────────────────────────────

const QUESTIONS = [
  { number: 1, text: 'I\'ve been waking up at my old alarm time — even on days off.' },
  { number: 2, text: 'If I retired tomorrow, I don\'t think my spouse would notice much difference in my day.' },
  { number: 3, text: 'I\'m not sure I have friends outside of work.' },
  { number: 4, text: 'Part of me thinks I should keep working — just to stay busy.' },
  { number: 5, text: 'The thing I\'d miss most about work is the title.' },
  { number: 6, text: 'I\'ve done the numbers and they probably work — I just don\'t believe them.' },
  { number: 7, text: 'My spouse and I have never actually agreed on a retirement date.' },
  { number: 8, text: 'I\'m worried there\'s nothing meaningful on the other side of work.' },
]

const SESSION_KEY_ANSWERS = 'fearQuizAnswers'
const SESSION_KEY_EMAIL   = 'fearQuizEmail'
const EMPTY_ANSWERS = Array(8).fill(null)

// ── Session storage helpers ───────────────────────────────────────────────────

function loadAnswers() {
  if (typeof window === 'undefined') return [...EMPTY_ANSWERS]
  try {
    const stored = sessionStorage.getItem(SESSION_KEY_ANSWERS)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (
        Array.isArray(parsed) &&
        parsed.length === 8 &&
        parsed.every((answer) => answer === 'YES' || answer === 'NO' || answer === null)
      ) {
        return parsed
      }
    }
  } catch { /* ignore */ }
  return [...EMPTY_ANSWERS]
}

function saveAnswers(answers) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(SESSION_KEY_ANSWERS, JSON.stringify(answers))
  } catch { /* ignore */ }
}

function loadEmailForm() {
  if (typeof window === 'undefined') return null
  try {
    const stored = sessionStorage.getItem(SESSION_KEY_EMAIL)
    if (stored) return JSON.parse(stored)
  } catch { /* ignore */ }
  return null
}

function saveEmailForm(data) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(SESSION_KEY_EMAIL, JSON.stringify(data))
  } catch { /* ignore */ }
}

function clearQuizSession() {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(SESSION_KEY_ANSWERS)
    sessionStorage.removeItem(SESSION_KEY_EMAIL)
  } catch { /* ignore */ }
}

// ── Email form component (thin / controlled) ─────────────────────────────────

function EmailForm({ name, setName, email, setEmail, consent, setConsent, loading, error, onSubmit }) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed mb-2 text-center">
        Your results are ready.
      </p>
      <p className="text-slate-400 text-center mb-8 text-base sm:text-lg">
        Enter your details to get your full Fear Profile — and the chapter most relevant to where you are right now.
      </p>

      <form
        onSubmit={onSubmit}
        className="bg-slate-800 border border-slate-700 rounded-xl p-6 sm:p-8 space-y-5"
        noValidate
      >
        <div>
          <label htmlFor="quiz-name" className="block text-sm font-medium text-slate-300 mb-1">
            First name
          </label>
          <input
            id="quiz-name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="given-name"
            disabled={loading}
            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition disabled:opacity-50"
            placeholder="Your first name"
          />
        </div>

        <div>
          <label htmlFor="quiz-email" className="block text-sm font-medium text-slate-300 mb-1">
            Email address
          </label>
          <input
            id="quiz-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={loading}
            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition disabled:opacity-50"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="quiz-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={loading}
            className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-900 text-amber-400 focus:ring-amber-400 cursor-pointer disabled:opacity-50"
          />
          <label htmlFor="quiz-consent" className="text-sm text-slate-400 leading-snug cursor-pointer">
            I agree to join the launch list and get my Fear Profile results by email. I'll also hear first when the book is available at the launch discount — before it goes public. Unsubscribe anytime.
          </label>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 text-sm p-3 rounded-lg flex items-start gap-2">
            <span className="mt-0.5 flex-shrink-0">⚠</span>
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold py-4 rounded-xl transition text-base sm:text-lg"
        >
          {loading ? 'Sending your results...' : 'Send Me My Fear Profile'}
        </button>

        <p className="text-xs text-slate-500 text-center">
          You'll be added to the book launch list. No spam — one email when it launches. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}

// ── Main quiz page ────────────────────────────────────────────────────────────

export default function FearQuizPage() {
  const [answers, setAnswers]     = useState(/** @type {(string|null)[]} */ ([...EMPTY_ANSWERS]))
  const [currentQ, setCurrentQ]   = useState(1)
  const [phase, setPhase]         = useState(/** @type {'quiz'|'submitting'|'error'} */ ('quiz'))
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting]  = useState(false)
  // Email form controlled state (lifted here so handleSubmit has direct access)
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [consent, setConsent]     = useState(false)
  const router = useRouter()
  // Prevent double-submit
  const submitInFlight = useRef(false)

  // Restore session on mount
  useEffect(() => {
    const saved = loadAnswers()
    setAnswers(saved)
    const lastAnswered = saved.findLastIndex((a) => a !== null)
    const nextQuestion = lastAnswered === -1 ? 1 : Math.min(lastAnswered + 2, 8)
    setCurrentQ(nextQuestion)

    const savedForm = loadEmailForm()
    if (savedForm) {
      setName(savedForm.name || '')
      setEmail(savedForm.email || '')
    }
  }, [])

  const handleAnswer = useCallback((/** @type {'YES'|'NO'} */ answer) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentQ - 1] = answer
      saveAnswers(next)
      return next
    })
    if (currentQ < 8) {
      setCurrentQ((q) => q + 1)
    } else {
      setPhase('submitting')
    }
  }, [currentQ])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    // Guard against double-submit
    if (submitInFlight.current) return
    submitInFlight.current = true

    if (!consent) {
      setSubmitError('Please tick the consent box to continue.')
      submitInFlight.current = false
      return
    }

    setSubmitting(true)
    setSubmitError('')
    saveEmailForm({ name, email, consent })

    if (answers.some((answer) => answer === null)) {
      setSubmitError('Please answer all eight questions before continuing.')
      setSubmitting(false)
      submitInFlight.current = false
      return
    }

    const result = scoreQuiz(/** @type {string[]} */ (answers))
    const fearScores = {
      identity_hollow:   result.scores.identity_hollow,
      spouse_mismatch:   result.scores.spouse_mismatch,
      purpose_void:      result.scores.purpose_void,
      financial_doubter: result.scores.financial_doubter,
    }
    const payload = {
      name,
      email,
      archetype: result.archetype,
      fearScores,
      consentGiven: !!consent,
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/quiz-subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify(payload),
        },
      )

      if (!res.ok) {
        let msg = `Submission failed (${res.status})`
        try { const j = await res.json(); if (j.error) msg = j.error } catch { /* ignore */ }
        throw new Error(msg)
      }

      const data = await res.json()
      clearQuizSession()
      submitInFlight.current = false
      if (data.responseId) {
        router.push(`/fear-quiz/results?id=${encodeURIComponent(data.responseId)}`)
      } else {
        router.push('/fear-quiz/results')
      }
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
      setSubmitting(false)
      submitInFlight.current = false
    }
  }, [answers, name, email, consent, router])

  const question = QUESTIONS[currentQ - 1]

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Top bar */}
      <div className="w-full border-b border-slate-800 bg-slate-900/95 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <QuizProgress current={currentQ} total={8} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto px-4 py-12 w-full">

          {phase === 'quiz' && (
            <div className="w-full">
              {currentQ > 1 && (
                <button
                  onClick={() => setCurrentQ((q) => q - 1)}
                  className="mb-6 text-slate-500 hover:text-slate-300 text-sm flex items-center gap-1 transition"
                >
                  ← Previous
                </button>
              )}

              <QuizQuestion
                key={`q-${currentQ}`}
                question={question.text}
                number={question.number}
                selected={answers[currentQ - 1]}
                onAnswer={handleAnswer}
              />

              {/* Q indicator dots */}
              <div className="flex justify-center gap-2 mt-10">
                {QUESTIONS.map((q) => (
                  <span
                    key={q.number}
                    className={`
                      inline-block w-2 h-2 rounded-full transition-colors duration-200
                      ${answers[q.number - 1] !== null ? 'bg-amber-400' : 'bg-slate-700'}
                      ${q.number === currentQ ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900' : ''}
                    `}
                  />
                ))}
              </div>
            </div>
          )}

          {phase === 'submitting' && (
            <EmailForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              consent={consent}
              setConsent={setConsent}
              loading={submitting}
              error={submitError}
              onSubmit={handleSubmit}
            />
          )}

        </div>
      </div>
    </main>
  )
}
