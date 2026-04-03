'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import QuizProgress from '../components/QuizProgress'
import QuizQuestion from '../components/QuizQuestion'
import { scoreSpouseQuiz } from '../lib/spouseQuizScoring'

const QUESTIONS = [
  { number: 1, text: 'I have a retirement date in mind that my spouse and I have never explicitly agreed together.' },
  { number: 2, text: 'When I imagine us both being at home more, I worry about the practical reality of sharing the same space all day.' },
  { number: 3, text: 'Part of me assumes retirement will quietly change who carries the emotional or domestic load in the relationship.' },
  { number: 4, text: 'We have discussed money more than we have discussed what we each want our days to feel like.' },
  { number: 5, text: 'I suspect one of us sees retirement as freedom and the other sees it as loss.' },
  { number: 6, text: 'If one of us retired first, I think resentment or guilt would creep in faster than either of us admits.' },
  { number: 7, text: 'We have not described, in any detail, what a good retirement week would look like for us as a couple.' },
]

const SESSION_KEY_ANSWERS = 'spouseQuizAnswers'
const SESSION_KEY_EMAIL = 'spouseQuizEmail'
const EMPTY_ANSWERS = Array(7).fill(null)

function loadAnswers() {
  if (typeof window === 'undefined') return [...EMPTY_ANSWERS]
  try {
    const stored = sessionStorage.getItem(SESSION_KEY_ANSWERS)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (
        Array.isArray(parsed) &&
        parsed.length === 7 &&
        parsed.every((answer) => answer === 'YES' || answer === 'NO' || answer === null)
      ) {
        return parsed
      }
    }
  } catch {}
  return [...EMPTY_ANSWERS]
}

function saveAnswers(answers) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(SESSION_KEY_ANSWERS, JSON.stringify(answers))
  } catch {}
}

function loadEmailForm() {
  if (typeof window === 'undefined') return null
  try {
    const stored = sessionStorage.getItem(SESSION_KEY_EMAIL)
    if (stored) return JSON.parse(stored)
  } catch {}
  return null
}

function saveEmailForm(data) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(SESSION_KEY_EMAIL, JSON.stringify(data))
  } catch {}
}

function clearQuizSession() {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(SESSION_KEY_ANSWERS)
    sessionStorage.removeItem(SESSION_KEY_EMAIL)
  } catch {}
}

function EmailForm({ name, setName, email, setEmail, consent, setConsent, loading, error, onSubmit }) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed mb-2 text-center">
        Your couple-readiness result is ready.
      </p>
      <p className="text-slate-400 text-center mb-8 text-base sm:text-lg">
        Enter your details to get your result by email and see which conversation your retirement planning needs next.
      </p>

      <form
        onSubmit={onSubmit}
        className="bg-slate-800 border border-slate-700 rounded-xl p-6 sm:p-8 space-y-5"
        noValidate
      >
        <div>
          <label htmlFor="spouse-quiz-name" className="block text-sm font-medium text-slate-300 mb-1">
            First name
          </label>
          <input
            id="spouse-quiz-name"
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
          <label htmlFor="spouse-quiz-email" className="block text-sm font-medium text-slate-300 mb-1">
            Email address
          </label>
          <input
            id="spouse-quiz-email"
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
            id="spouse-quiz-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={loading}
            className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-900 text-amber-400 focus:ring-amber-400 cursor-pointer disabled:opacity-50"
          />
          <label htmlFor="spouse-quiz-consent" className="text-sm text-slate-400 leading-snug cursor-pointer">
            I agree to get my spouse-readiness result by email and receive occasional updates about the book and related tools. Unsubscribe anytime.
          </label>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold py-4 rounded-xl transition text-base sm:text-lg"
        >
          {loading ? 'Sending your result...' : 'Send Me My Spouse Readiness Result'}
        </button>

        <p className="text-xs text-slate-500 text-center">
          You&apos;ll be added to the list for relevant updates. No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}

export default function SpouseReadinessQuizPage() {
  const [answers, setAnswers] = useState([...EMPTY_ANSWERS])
  const [currentQ, setCurrentQ] = useState(1)
  const [phase, setPhase] = useState('quiz')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const router = useRouter()
  const submitInFlight = useRef(false)

  useEffect(() => {
    const saved = loadAnswers()
    setAnswers(saved)
    const lastAnswered = saved.findLastIndex((answer) => answer !== null)
    const nextQuestion = lastAnswered === -1 ? 1 : Math.min(lastAnswered + 2, 7)
    setCurrentQ(nextQuestion)

    const savedForm = loadEmailForm()
    if (savedForm) {
      setName(savedForm.name || '')
      setEmail(savedForm.email || '')
    }
  }, [])

  const handleAnswer = useCallback((answer) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentQ - 1] = answer
      saveAnswers(next)
      return next
    })
    if (currentQ < 7) {
      setCurrentQ((question) => question + 1)
    } else {
      setPhase('submitting')
    }
  }, [currentQ])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
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
      setSubmitError('Please answer all seven questions before continuing.')
      setSubmitting(false)
      submitInFlight.current = false
      return
    }

    const result = scoreSpouseQuiz(answers)
    const payload = {
      name,
      email,
      archetype: result.archetype,
      fearScores: result.scores,
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
        try {
          const data = await res.json()
          if (data.error) msg = data.error
        } catch {}
        throw new Error(msg)
      }

      const data = await res.json()
      clearQuizSession()
      submitInFlight.current = false
      if (data.responseId) {
        router.push(`/spouse-readiness-quiz/results?id=${encodeURIComponent(data.responseId)}`)
      } else {
        router.push('/spouse-readiness-quiz/results')
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
      <div className="w-full border-b border-slate-800 bg-slate-900/95 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <QuizProgress current={currentQ} total={7} />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto px-4 py-12 w-full">
          {phase === 'quiz' && (
            <div className="w-full">
              <div className="mb-8">
                <p className="text-amber-400 text-sm uppercase tracking-[0.22em] font-semibold mb-3">
                  Spouse Readiness Quiz
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                  How ready is your relationship for retirement?
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed">
                  This is not a compatibility test. It is a quick way of spotting which conversation the two of you have not properly had yet.
                </p>
              </div>

              {currentQ > 1 && (
                <button
                  onClick={() => setCurrentQ((value) => value - 1)}
                  className="mb-6 text-slate-500 hover:text-slate-300 text-sm flex items-center gap-1 transition"
                >
                  ← Previous
                </button>
              )}

              <QuizQuestion
                key={`spouse-q-${currentQ}`}
                question={question.text}
                number={question.number}
                selected={answers[currentQ - 1]}
                onAnswer={handleAnswer}
              />

              <div className="flex justify-center gap-2 mt-10">
                {QUESTIONS.map((item) => (
                  <span
                    key={item.number}
                    className={`
                      inline-block w-2 h-2 rounded-full transition-colors duration-200
                      ${answers[item.number - 1] !== null ? 'bg-amber-400' : 'bg-slate-700'}
                      ${item.number === currentQ ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900' : ''}
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
