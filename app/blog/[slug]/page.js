// Blog Post Template
export async function generateStaticParams() {
  const posts = [
    { slug: 'simulate-retirement' },
    { slug: 'twinge-of-regret' },
    { slug: 'spouse-tempo' },
    { slug: 'fear-cocktail' },
    { slug: 'what-do-you-do' },
    { slug: 'severance-package' },
    { slug: 'working-at-65' },
    { slug: 'first-year-reckoning' },
    { slug: 'how-much-to-retire' },
    { slug: 'spouse-conversation' },
  ]
  return posts.map((post) => post)
}

export const metadata = {
  title: 'Blog Post - How I FIREd Myself',
  description: 'Retirement planning insights.',
}

const posts = {
  'simulate-retirement': {
    title: "I Took 6 Weeks Off to Simulate Retirement—Here's What Happened",
    excerpt: 'I took 6 weeks off work to simulate retirement. Here\'s what I learned about myself.',
    content: `
      <p>Six weeks. That's how long I took off to simulate what retirement might feel like. No work emails, no meetings, no deadlines. Just me, my thoughts, and a whole lot of free time.</p>
      
      <h2>The First Week: Pure Bliss</h2>
      <p>The first week was liberating. I slept in, went for long walks, read books I'd been putting off. I felt like I was finally living.</p>
      
      <h2>Week Two: The Niggling Doubt</h2>
      <p>By week two, the novelty wore off. I started wondering: is this it? Is this what retirement looks like?</p>
      
      <h2>Week Three: The Reality Check</h2>
      <p>I realized I needed structure. Retirement without purpose is just... unemployment with better weather.</p>
      
      <h2>What I Learned</h2>
      <p>The biggest lesson: retirement isn't about stopping work. It's about starting something new.</p>
    `
  },
  'twinge-of-regret': {
    title: "The 'Twinge of Regret' Every Retiree Feels",
    excerpt: 'That feeling when you wonder: did I leave too early? Too late?',
    content: `
      <p>It's 3 AM and you're awake. Again. And that thought creeps in: did I make the right choice?</p>
      
      <h2>The Myth of Perfect Timing</h2>
      <p>Here's the truth: there is no perfect time to retire. There's only your time.</p>
    `
  },
  'spouse-tempo': {
    title: "My Spouse Isn't Ready to Retire—How Do We Navigate That?",
    excerpt: 'One wants to stop, one wants to keep going. Here\'s how to handle it.',
    content: `
      <p>You've done the math. You've planned everything. But your spouse? They're not ready.</p>
      
      <h2>The Spouse Tempo</h2>
      <p>Retirement isn't a solo decision when you're married. It's a duet.</p>
    `
  },
  'fear-cocktail': {
    title: "The Fear Cocktail: Why You're Anxious AND Excited",
    excerpt: 'Your emotions aren\'t broken—they\'re normal. Here\'s why.',
    content: `
      <p>Anxiety. Excitement. Guilt. They're all mixed together in a fear cocktail.</p>
      
      <h2>Understanding Your Fear</h2>
      <p>That feeling before retirement? It's not weakness. It's your brain processing one of life's biggest transitions.</p>
    `
  },
  'what-do-you-do': {
    title: "What Do You DO All Day? A Retired Person's Answer",
    excerpt: 'The question everyone asks. Here\'s how to answer.',
    content: `
      <p>It's the question every retiree dreads: "So, what do you DO all day?"</p>
      
      <h2>Reframe the Question</h2>
      <p>Instead of defending your choices, own your new story.</p>
    `
  },
  'severance-package': {
    title: "How to Ask for a Severance Package",
    excerpt: 'Don\'t leave money on the table. Here\'s how to negotiate.',
    content: `
      <p>Companies offer severance. Most people don't ask for it properly.</p>
      
      <h2>The Art of Negotiation</h2>
      <p>It's not about being greedy. It's about recognizing your worth.</p>
    `
  },
  'working-at-65': {
    title: "Why I'm Still Working at 65 (And That's Okay)",
    excerpt: 'Retirement at 65 isn\'t mandatory. Here\'s why some choose differently.',
    content: `
      <p>Society says 65 is the magic number. But what if you\'re not ready?</p>
      
      <h2>Your Timeline, Your Rules</h2>
      <p>There\'s no required retirement age. Only your choice.</p>
    `
  },
  'first-year-reckoning': {
    title: "The First Year of Retirement: A Real Reckoning",
    excerpt: 'The first year is the hardest. Here\'s what to expect.',
    content: `
      <p>Year one. It's when the rubber meets the road.</p>
      
      <h2>The Honeymoon Ends</h2>
      <p>After the initial excitement, reality sets in.</p>
    `
  },
  'how-much-to-retire': {
    title: "How Much Do You Actually Need to Retire?",
    excerpt: 'The million-dollar question. Let\'s find YOUR number.',
    content: `
      <p>Everyone asks: how much do I need? The answer: it depends.</p>
      
      <h2>Your Freedom Number</h2>
      <p>It\'s not about a generic formula. It\'s about YOUR life.</p>
    `
  },
  'spouse-conversation': {
    title: "The Conversation You're Not Having With Your Spouse",
    excerpt: 'The most important talk you\'ll have before retirement.',
    content: `
      <p>You talk about finances. But are you talking about fears?</p>
      
      <h2>Beyond the Spreadsheet</h2>
      <p>The retirement conversation needs to go deeper than money.</p>
    `
  },
}

import Link from 'next/link'

export default function BlogPost({ params }) {
  const post = posts[params.slug] || { title: 'Post Not Found', content: '' }
  
  return (
    <main className="py-16">
      <article className="max-w-3xl mx-auto px-4">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-8 font-medium transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
        <h1 className="text-4xl font-bold mb-4 text-slate-900">{post.title}</h1>
        <p className="text-xl text-slate-600 mb-8">{post.excerpt}</p>
        <div className="prose-lg text-slate-700" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  )
}
