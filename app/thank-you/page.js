// Thank You Page
import Link from 'next/link'

export const metadata = {
  title: 'Thank You - The Anti-Retirement Guide',
  description: 'Thank you for signing up!',
}

export default function ThankYou() {
  return (
    <main className="py-16 section-alt">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Check your email</h1>
        <p className="text-xl mb-4 text-slate-700">The First Week Guide is on its way.</p>

        <div className="mb-8 mt-8">
          <a
            href="/jumpstart-guide.pdf"
            download
            className="inline-block bg-amber-500 text-slate-900 text-xl px-8 py-4 rounded-xl font-bold hover:bg-amber-400 transition shadow-md"
          >
            Download the Guide (PDF)
          </a>
        </div>

        <p className="text-slate-500 text-sm">If the email doesn't arrive within a few minutes, check your spam folder.</p>
      </div>
    </main>
  )
}
