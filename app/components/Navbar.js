'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
  ]

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl sm:text-2xl tracking-tight text-white">
            How I <span className="gold-text">Escaped</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="nav-link text-slate-300 hover:text-amber-400 transition-colors text-sm lg:text-base"
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/jumpstart" 
              className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-4 lg:px-5 py-2 lg:py-2.5 rounded-full font-semibold hover:from-amber-500 hover:to-amber-400 transition-all text-sm lg:text-base"
            >
              Free Guide
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden p-2 text-white hover:text-amber-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-lg text-slate-300 hover:text-amber-400 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/jumpstart" 
                className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-5 py-3 rounded-full font-semibold hover:from-amber-500 hover:to-amber-400 transition-all text-center mt-2"
                onClick={() => setIsOpen(false)}
              >
                Free Guide
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
