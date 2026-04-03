export const BLOG_INDEX = [
  {
    title: "I Took 6 Weeks Off to Simulate Retirement—Here's What Happened",
    slug: 'simulate-retirement',
    hook: "Six weeks off. No meetings. No deadlines. Just me and the terrifying question: who am I without the job title?",
    metaTitle: 'Simulate Your Retirement Before You Take the Plunge: The 6-Week Test That Changed Everything',
  },
  {
    title: "The 'Twinge of Regret' Every Retiree Feels — Tuesday in November",
    slug: 'twinge-of-regret',
    hook: "It's Tuesday in November. You're not at work. And for the first time in 30 years, you don't know what you're supposed to be doing.",
    metaTitle: "The 3 AM Regret: Why Every Pre-Retiree Questions Their Decision (And Why That's Actually Good)",
  },
  {
    title: "My Spouse Isn't Ready to Retire—How Do We Navigate That?",
    slug: 'spouse-tempo',
    hook: "You've been planning this moment for a decade. Your spouse just looked at you like you'd announced you were moving to Mars.",
    metaTitle: 'Spouse Tempo: The Silent Retirement Killer No One Talks About',
  },
  {
    title: "The Fear Cocktail: Why You're Anxious AND Excited",
    slug: 'fear-cocktail',
    hook: "What nobody tells you about the mix of excitement, terror, and guilt that hits at 3am.",
    metaTitle: 'The Fear Cocktail: Why Pre-Retirees Are More Scared Than Ever',
  },
  {
    title: "What Do You DO All Day? A Retired Person's Answer",
    slug: 'what-do-you-do',
    hook: "The question that wakes you up at 3am. Not about money. About everything else.",
    metaTitle: 'What Do You Do? The Most Terrifying Question in Early Retirement',
  },
  {
    title: "How to Ask for a Severance Package",
    slug: 'severance-package',
    hook: "They expect you to take the first offer. Here's how to negotiate your way to something better.",
    metaTitle: 'The Severance Negotiation Guide: Leaving Money on the Table Is Optional',
  },
  {
    title: "Why I'm Still Working at 65 (And That's Okay)",
    slug: 'working-at-65',
    hook: "Society has a script for retirement. I found a different ending—one that actually fit.",
    metaTitle: "Working at 65: The New Normal That's Changing Everything",
  },
  {
    title: 'The First Year of Retirement: A Real Reckoning',
    slug: 'first-year-reckoning',
    hook: 'Month one felt like freedom. Month four felt like freefall. Month twelve felt like finally coming home.',
    metaTitle: 'First Year Reckoning: The Hidden Challenges No One Tells You About',
  },
  {
    title: 'How Much Do You Actually Need to Retire?',
    slug: 'how-much-to-retire',
    hook: "Everyone has a number. Almost everyone's number is wrong. Here's the honest calculation.",
    metaTitle: "How Much to Retire: The Number That's Actually Right for You",
  },
  {
    title: "The Conversation You're Not Having With Your Spouse",
    slug: 'spouse-conversation',
    hook: "You're both thinking about it. Neither of you is saying it. The silence is louder than any meeting you've ever sat through.",
    metaTitle: "The Spouse Conversation: How to Talk About Retirement Before You're Both Ready",
  },
  {
    title: "The Third Tuesday Test: How to Know If You're Actually Ready to Retire",
    slug: 'third-tuesday-test-article',
    hook: 'The first Monday is theatre. The third Tuesday is the real test of whether your future has any shape.',
    metaTitle: "The Third Tuesday Test: How to Know If You're Actually Ready to Retire",
  },
  {
    title: 'The Fear Audit: What Actually Scares You About Retirement',
    slug: 'fear-audit-article',
    hook: 'If the spreadsheet says yes and you still cannot move, the blocker is probably not the spreadsheet.',
    metaTitle: 'The Fear Audit: What Actually Scares You About Retirement (And What To Do About Each Fear)',
  },
  {
    title: 'Why the Numbers Were Never the Problem',
    slug: 'why-the-numbers-were-never-the-problem',
    hook: 'Sometimes the clean spreadsheet is exactly what lets the real issue stay hidden for another year.',
    metaTitle: 'Why the Numbers Were Never the Problem: The Psychological Barrier to Retirement No One Talks About',
  },
  {
    title: "17 Things to Do Before You Retire (That Aren't About Money)",
    slug: '17-things-to-do-before-you-retire',
    hook: 'A retirement checklist that starts with identity, relationships, routine, and belonging instead of yield assumptions.',
    metaTitle: "17 Things to Do Before You Retire (That Aren't About Money)",
  },
]

export function getBlogMeta(slug) {
  return BLOG_INDEX.find((post) => post.slug === slug)
}
