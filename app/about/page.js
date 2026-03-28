// About Page
const BASE_URL = 'https://theantiretirementguide.co.uk'

export const metadata = {
  title: 'About Nick - The Anti-Retirement Guide',
  description: 'Nick Constantinou is 54 and writing from inside the transition — not from the other side of it. Author of The Anti-Retirement Guide.',
  robots: 'index, follow',
  alternates: {
    canonical: BASE_URL + '/about/',
    languages: {
      'en-GB': BASE_URL + '/about/',
    },
  },
  openGraph: {
    title: 'About Nick - The Anti-Retirement Guide',
    description: 'Nick Constantinou is 54 and writing from inside the transition — not from the other side of it. Author of The Anti-Retirement Guide.',
    type: 'website',
    url: BASE_URL + '/about/',
    locale: 'en_GB',
  },
}

export default function About() {
  return (
    <main className="py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-6 text-slate-900">About Nick</h1>
        <div className="prose-lg text-slate-700 space-y-4">
          <p className="text-lg">Nick Constantinou is 54. He is not retired. He&apos;s writing this from inside the transition — the part where the numbers work and the picture of what comes next doesn&apos;t.</p>
          <p className="text-lg">He&apos;s spent the past two years talking to dozens of people who&apos;ve navigated the same crossing: some who planned it carefully and still found the first six months harder than anything they&apos;d prepared for; some who had no choice in the timing and had to work backwards from where they landed. He&apos;s read the research on identity in later-life transition, on what actually predicts a good outcome versus a difficult one, and applied it — imperfectly — to his own situation.</p>
          <p className="text-lg">He is not a financial adviser. He is not a retirement coach. The financial mechanics are covered in other books, and he points to them. What this book covers is the question underneath the mechanics: what the next twenty years are actually for.</p>
          <p className="text-lg">He wrote the book he couldn&apos;t find when he needed it.</p>
        </div>

        {/* Author Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Nick Constantinou",
              "jobTitle": "Author",
              "description": "Author of The Anti-Retirement Guide — for people who are close to retirement but haven't been able to move.",
              "nationality": {
                "@type": "Country",
                "name": "United Kingdom"
              },
              "url": BASE_URL + "/about/",
              "sameAs": []
            })
          }}
        />

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
                  "name": "About",
                  "item": BASE_URL + "/about/"
                }
              ]
            })
          }}
        />
      </div>
    </main>
  )
}
