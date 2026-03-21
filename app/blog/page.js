// Blog Page
import Link from 'next/link'

const BASE_URL = 'https://nickconstantinou.github.io/the-anti-retirement-guide-marketing'

export const metadata = {
  title: 'Blog — The Anti-Retirement Guide',
  description: 'Reflections on retirement, identity, and designing your next chapter. For people in their 50s and 60s based in the UK.',
  robots: 'index, follow',
  alternates: {
    canonical: BASE_URL + '/blog/',
    languages: {
      'en-GB': BASE_URL + '/blog/',
    },
  },
  openGraph: {
    title: 'Blog — The Anti-Retirement Guide',
    description: 'Reflections on retirement, identity, and designing your next chapter.',
    type: 'website',
    url: BASE_URL + '/blog/',
    locale: 'en_GB',
  },
}

const posts = [
  { 
    title: "I Took 6 Weeks Off to Simulate Retirement—Here's What Happened", 
    slug: 'simulate-retirement',
    hook: "Six weeks off. No meetings. No deadlines. Just me and the terrifying question: who am I without the job title?",
  },
  { 
    title: "The 'Twinge of Regret' Every Retiree Feels — Tuesday in November", 
    slug: 'twinge-of-regret',
    hook: "It's Tuesday in November. You're not at work. And for the first time in 30 years, you don't know what you're supposed to be doing.",
  },
  { 
    title: "My Spouse Isn't Ready to Retire—How Do We Navigate That?", 
    slug: 'spouse-tempo',
    hook: "You've been planning this moment for a decade. Your spouse just looked at you like you'd announced you were moving to Mars.",
  },
  { 
    title: "The Fear Cocktail: Why You're Anxious AND Excited", 
    slug: 'fear-cocktail',
    hook: "What nobody tells you about the mix of excitement, terror, and guilt that hits at 3am.",
  },
  { 
    title: "What Do You DO All Day? A Retired Person's Answer", 
    slug: 'what-do-you-do',
    hook: "The question that wakes you up at 3am. Not about money. About everything else.",
  },
  { 
    title: "How to Ask for a Severance Package", 
    slug: 'severance-package',
    hook: "They expect you to take the first offer. Here's how to negotiate your way to something better.",
  },
  { 
    title: "Why I'm Still Working at 65 (And That's Okay)", 
    slug: 'working-at-65',
    hook: "Society has a script for retirement. I found a different ending—one that actually fit.",
  },
  { 
    title: "The First Year of Retirement: A Real Reckoning", 
    slug: 'first-year-reckoning',
    hook: "Month one felt like freedom. Month four felt like freefall. Month twelve felt like finally coming home.",
  },
  { 
    title: "How Much Do You Actually Need to Retire?", 
    slug: 'how-much-to-retire',
    hook: "Everyone has a number. Almost everyone's number is wrong. Here's the honest calculation.",
  },
  { 
    title: "The Conversation You're Not Having With Your Spouse", 
    slug: 'spouse-conversation',
    hook: "You're both thinking about it. Neither of you is saying it. The silence is louder than any meeting you've ever sat through.",
  },
]

export default function Blog() {
  return (
    <main className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Blog</h1>
        
        {/* Author pull-quote from the book intro */}
        <blockquote className="border-l-4 border-amber-500 pl-6 py-4 mb-12 bg-amber-50 rounded-r-lg">
          <p className="text-xl text-slate-700 italic leading-relaxed">
            &quot;I was sitting in my car in the office car park. Engine running. Air conditioning on. Not going in.&quot;
          </p>
          <footer className="mt-2 text-sm text-slate-500">
            — Nick Constantinou, <em>The Anti-Retirement Guide</em>
          </footer>
        </blockquote>
        
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="block p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-amber-400 hover:shadow-amber-100/50 transition-all duration-300 group"
            >
              <h2 className="text-xl font-semibold mb-2 text-slate-800 group-hover:text-amber-700 transition-colors">{post.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-3 group-hover:text-slate-600 transition-colors">{post.hook}</p>
              <p className="text-amber-600 font-medium group-hover:text-amber-700 transition-colors">Read more →</p>
            </Link>
          ))}
        </div>
      </div>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": BASE_URL + "/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": BASE_URL + "/blog/"
              }
            ]
          })
        }}
      />
    </main>
  )
}
