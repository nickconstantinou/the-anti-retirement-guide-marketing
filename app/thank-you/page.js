// Thank You Page
import Link from 'next/link'

export const metadata = {
  title: 'Thank You - How I FIREd Myself',
  description: 'Thank you for signing up!',
}

export default function ThankYou() {
  return (
    <main className="py-16 bg-emerald-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900">Thank You!</h1>
        <p className="text-lg sm:text-xl text-slate-700 mb-8">Check your email for the Free 30-Day Retirement Jumpstart Guide.</p>
        <p className="text-lg text-slate-600 mb-8">In the meantime, explore the blog for more retirement insights.</p>
        <Link 
          href="/blog" 
          className="inline-block bg-amber-500 text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-amber-400 transition"
        >
          Browse Blog Posts
        </Link>
      </div>
    </main>
  )
}
