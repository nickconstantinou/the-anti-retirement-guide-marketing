import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero text-white py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-amber-400 mb-6 font-semibold">Available 7 April 2026</p>
          <h1 className="font-bold mb-6 tracking-tight">The Anti-Retirement Guide</h1>
          <p className="text-xl md:text-2xl mb-4 text-slate-300 max-w-2xl mx-auto leading-relaxed" style={{fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic'}}>
            Design Your Next Chapter
          </p>
          <p className="text-lg mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            For people who are close — or financially ready — but haven&apos;t been able to move. Not because the money isn&apos;t there. Because the thing on the other side doesn&apos;t have a shape yet.
          </p>
          <Link href="/jumpstart" className="btn-primary text-lg">
            Get the Free First Week Guide →
          </Link>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 section-alt">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold text-center mb-8">The question keeps circling</h2>
          <p className="text-lg mb-6 text-slate-700">You&apos;ve spent 30 years being genuinely good at something. Not just employed — <em>good</em>. The idea of stopping is not simple.</p>
          <p className="text-lg mb-6 text-slate-700">It is not just a financial question. It is a question about what your days are actually for. About whether the person you&apos;ve been at work is someone you want to keep being.</p>
          <p className="text-lg mb-6 text-slate-700">Most retirement books tell you to play golf, volunteer, and call it a life well spent.</p>
          <p className="text-lg font-semibold text-slate-800">This one doesn&apos;t.</p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-bold text-center mb-4">Who is this book for?</h2>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Some of you are choosing this. Some arrived here after a redundancy, a health scare, or a restructure that didn&apos;t ask for your opinion.
          </p>

          <div className="grid gap-4 md:grid-cols-2 w-full">
            {[
              "You're close to retirement but can't bring yourself to move",
              "The money is mostly there — the question isn't financial",
              "You don't know who you are without the job title",
              "Your spouse isn't on the same timeline",
              "You were pushed out and now face an unexpected crossroads",
              "You're a business owner planning your exit",
              "You want to work in some form — but differently",
              "You're an introvert who dreads 'join a club' as the answer",
              "You're single and thinking carefully about structure and belonging",
              "You want to design Year One before Day One arrives",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg w-full">
                <span className="text-amber-500 text-xl flex-shrink-0">✓</span>
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What The Book Covers */}
      <section className="py-24 section-alt">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-bold text-center mb-4">What the book covers</h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            This is not a financial plan. Your IFA handles that. This book sits next to the spreadsheet — and asks what the numbers are in service of.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-6 w-full">
            <div className="card w-full">
              <h3 className="font-semibold mb-3 text-slate-800">Part One: The Decision</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• The fear that doesn&apos;t have a name</li>
                <li>• Why high achievers handle this kind of ambiguity badly</li>
                <li>• The conversation most couples avoid for years</li>
              </ul>
            </div>

            <div className="card w-full">
              <h3 className="font-semibold mb-3 text-slate-800">Part Two: The Preparation</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• What identity looks like after the function is gone</li>
                <li>• Not just the title — the belonging, the rhythm, the reason to get up at six</li>
                <li>• Building social structure before you leave, not after</li>
              </ul>
            </div>

            <div className="card w-full">
              <h3 className="font-semibold mb-3 text-slate-800">Part Three: The Numbers</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• A freedom budget — what you&apos;ll actually spend when the diary empties</li>
                <li>• Stress-testing against worst-case scenarios</li>
                <li>• Working in retirement: what that looks like in practice</li>
              </ul>
            </div>

            <div className="card w-full">
              <h3 className="font-semibold mb-3 text-slate-800">Part Four: Day One</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Designing Year One month by month</li>
                <li>• Answering &quot;what do you do now?&quot; without hesitating</li>
                <li>• Owning the transition on your own terms</li>
              </ul>
            </div>
          </div>

          <div className="card w-full">
            <h3 className="font-semibold mb-3 text-slate-800">Part Five: For Your Specific Situation</h3>
            <p className="text-slate-600 mb-3">Dedicated guides for situations that don&apos;t fit the standard retirement narrative:</p>
            <div className="grid md:grid-cols-2 gap-2 text-slate-600">
              <div>• The late starter</div>
              <div>• The self-employed exit</div>
              <div>• The introvert in retirement</div>
              <div>• Couples on different timelines</div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Stats */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center justify-items-center">
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">20</div>
                <div className="text-slate-300">chapters</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">5</div>
                <div className="text-slate-300">structured parts</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">1</div>
                <div className="text-slate-300">honest guide to the transition</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 section-alt">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-bold text-center mb-12">What readers say</h2>
          <div className="grid gap-6 md:grid-cols-3 w-full">
            <blockquote className="card w-full">
              <p className="text-slate-700 mb-4 italic">&quot;I was 52 and terrified. This book showed me I still had options — and time. It asked the questions I&apos;d been avoiding for two years.&quot;</p>
              <cite className="block not-italic font-semibold text-amber-600">— Dave, 52</cite>
            </blockquote>
            <blockquote className="card w-full">
              <p className="text-slate-700 mb-4 italic">&quot;Divorce at 58 left me starting over. Every retirement plan assumed a spouse. This book addressed the unique challenges I actually faced.&quot;</p>
              <cite className="block not-italic font-semibold text-amber-600">— Anonymous, 58</cite>
            </blockquote>
            <blockquote className="card w-full">
              <p className="text-slate-700 mb-4 italic">&quot;My knees aren&apos;t what they were at 40. This helped me plan an exit that doesn&apos;t rely on working until 67. I have a date now.&quot;</p>
              <cite className="block not-italic font-semibold text-amber-600">— Mike, 57</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA */}
      <section className="hero py-24 text-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-bold mb-6">Start with the first week</h2>
          <p className="text-lg mb-8 text-slate-200">
            Seven days of exercises to get unstuck. No commitment required.
          </p>
          <Link href="/jumpstart" className="btn-primary text-lg">
            Get the Free First Week Guide →
          </Link>
        </div>
      </section>

      {/* About Author */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-bold mb-6">About the author</h2>
          <p className="text-lg text-slate-700">
            Nick Constantinou writes from years of watching people get this transition right and catastrophically wrong — not from a beach, and not from a position of having found the answers.
          </p>
          <p className="text-lg mt-4 text-slate-700">
            He makes no promises about the next chapter. He helps you think clearly about what it could be.
          </p>
        </div>
      </section>
    </main>
  )
}

// PostHog CTA tracking — runs after hydration
if (typeof window !== 'undefined') {
  window.posthog && document.querySelectorAll('a[href="/jumpstart"]').forEach(function(el) {
    el.addEventListener('click', function() {
      window.posthog.capture('cta_click', {
        cta_text: el.textContent.trim(),
        source: 'homepage'
      })
    })
  })
}
