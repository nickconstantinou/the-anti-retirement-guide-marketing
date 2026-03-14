// Homepage - How I FIREd Myself
export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-bold mb-6">Not Retiring — Launching</h1>
          <p className="text-xl mb-8 text-emerald-100">
            The anti-retirement guide for pre-retirees who aren't ready to stop—they're ready to start something new.
          </p>
          <a href="/jumpstart" className="btn-primary">
            Get the Free 30-Day Jumpstart Guide →
          </a>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 section-alt">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold text-center mb-8">Retirement Anxiety Is Real</h2>
          <p className="text-lg mb-6">You're 50-something. You've worked decades. You're "mostly ready" on paper.</p>
          <p className="text-lg mb-4 font-semibold">But:</p>
          <ul className="space-y-3 text-lg">
            <li>✓ You're scared of running out of money</li>
            <li>✓ You're worried about losing your identity</li>
            <li>✓ Your spouse isn't ready to retire</li>
            <li>✓ You don't know who you are without your job title</li>
            <li>✓ Social connections feel intimidating</li>
          </ul>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold text-center mb-8">Design Your Next Chapter</h2>
          <p className="text-lg mb-6">This isn't about the 4% rule or compound interest.</p>
          <p className="text-lg mb-4 font-semibold">This is about:</p>
          <ul className="space-y-3 text-lg">
            <li>✓ Understanding your fear cocktail (and why it's normal)</li>
            <li>✓ Having the conversation with your spouse</li>
            <li>✓ Building your social network BEFORE you leave</li>
            <li>✓ Stress-testing your plan against worst-case scenarios</li>
            <li>✓ Designing Year One with intention</li>
          </ul>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20 section-alt">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold text-center mb-8">What's Inside the Book</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="font-semibold mb-3 text-emerald-700">Part 1: The Decision</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Why "retirement" is the wrong word</li>
                <li>• Understanding your fear cocktail</li>
                <li>• Having the conversation with your spouse</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="font-semibold mb-3 text-emerald-700">Part 2: The Preparation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Who are you without your job title?</li>
                <li>• The psychology of leaving</li>
                <li>• Building social connections</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="font-semibold mb-3 text-emerald-700">Part 3: The Numbers</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• The Reality Check</li>
                <li>• Building your Freedom Budget</li>
                <li>• Stress-testing your plan</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="font-semibold mb-3 text-emerald-700">Part 4: The Transition</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Designing Year One</li>
                <li>• Answering "What do you DO now?"</li>
                <li>• Owning your new story</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA */}
      <section className="hero py-20 text-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-bold mb-4">Get the Free 30-Day Retirement Jumpstart Guide</h2>
          <p className="text-lg mb-8 text-emerald-100">
            Not sure if you're ready? Take this free challenge to get clarity.
          </p>
          <a href="/jumpstart" className="btn-primary">
            Send Me the Free Guide →
          </a>
        </div>
      </section>

      {/* About Author */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-bold mb-6">About the Author</h2>
          <p className="text-lg">
            I'm Nick. I'm 54. I'm not retired yet—I'm planning.
          </p>
          <p className="text-lg mt-4">
            I've spent months researching, interviewing, and writing this book. I've talked to hundreds of pre-retirees. I've faced my own fears about leaving work.
          </p>
          <p className="text-lg mt-4">
            This book is my journey—and your guide.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 section-alt">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold text-center mb-8">What Readers Say</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <blockquote className="card text-lg italic">
              "This book changed how I think about retirement. I'm not scared anymore—I'm excited."
              <cite className="block not-italic mt-4 font-semibold text-emerald-700">— Sarah, 57</cite>
            </blockquote>
            <blockquote className="card text-lg italic">
              "Nick's honesty about his own fears made me feel less alone. This is the retirement book I needed."
              <cite className="block not-italic mt-4 font-semibold text-emerald-700">— David, 61</cite>
            </blockquote>
          </div>
        </div>
      </section>
    </main>
  )
}
