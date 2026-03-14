import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'How I FIREd Myself - The Anti-Retirement Guide',
  description: "The anti-retirement guide for pre-retirees who aren't ready to stop—they're ready to start something new.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Inter', system-ui, sans-serif; }
          .btn-primary { background: #f59e0b; color: #064e3b; padding: 1rem 2rem; border-radius: 9999px; font-weight: 600; display: inline-block; transition: all 0.2s; }
          .btn-primary:hover { background: #fbbf24; transform: translateY(-2px); }
          .hero { background: linear-gradient(135deg, #065f46 0%, #047857 100%); }
          .section-alt { background: #f9fafb; }
          .card { background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
          h1 { font-size: 3rem; line-height: 1.1; }
          h2 { font-size: 2.25rem; }
          h3 { font-size: 1.5rem; }
        `}</style>
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-emerald-900 text-white">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-2xl">
              How I FIREd Myself
            </Link>
            <div className="flex gap-8 items-center">
              <Link href="/" className="hover:text-emerald-200">Home</Link>
              <Link href="/about" className="hover:text-emerald-200">About</Link>
              <Link href="/blog" className="hover:text-emerald-200">Blog</Link>
              <Link href="/faq" className="hover:text-emerald-200">FAQ</Link>
              <Link href="/jumpstart" className="bg-amber-500 text-emerald-900 px-5 py-2 rounded-full font-semibold hover:bg-amber-400">Free Guide</Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        {children}

        {/* Footer */}
        <footer className="mt-auto py-12 bg-emerald-950 text-emerald-200">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="flex justify-center gap-8 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <Link href="/faq" className="hover:text-white">FAQ</Link>
              <Link href="/jumpstart" className="hover:text-white">Free Guide</Link>
            </div>
            <p className="text-emerald-400">© 2026 How I FIREd Myself. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
