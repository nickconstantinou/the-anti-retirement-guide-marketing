// About Page
const BASE_URL = 'https://nickconstantinou.github.io/the-anti-retirement-guide-marketing'

export const metadata = {
  title: 'About Nick - The Anti-Retirement Guide',
  description: 'About Nick Constantinou, author of The Anti-Retirement Guide.',
  robots: 'index, follow',
  alternates: {
    canonical: BASE_URL + '/about/',
    languages: {
      'en-GB': BASE_URL + '/about/',
    },
  },
  openGraph: {
    title: 'About Nick - The Anti-Retirement Guide',
    description: 'About Nick Constantinou, author of The Anti-Retirement Guide.',
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
          <p className="text-lg">Nick Constantinou writes from years of watching people get this transition right and catastrophically wrong — not from a beach, and not from a position of having found the answers.</p>
          <p className="text-lg">He makes no promises about the next chapter. He helps you think clearly about what it could be.</p>
          <p className="text-lg">He is not a financial advisor. He is not a retirement coach. What he offers is clarity — a structured way through the questions that don&apos;t have a spreadsheet answer.</p>
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
