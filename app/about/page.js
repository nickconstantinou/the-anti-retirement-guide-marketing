// About Page
const BASE_URL = 'https://nickconstantinou.github.io/the-anti-retirement-guide-marketing'

export const metadata = {
  title: 'About - The Anti-Retirement Guide',
  description: 'About Nick Constantinou, author of The Anti-Retirement Guide — for people in their 50s and 60s based in the UK who\'ve done the numbers but still feel terrified.',
  robots: 'index, follow',
  alternates: {
    canonical: BASE_URL + '/about/',
    languages: {
      'en-GB': BASE_URL + '/about/',
    },
  },
  openGraph: {
    title: 'About Nick - The Anti-Retirement Guide',
    description: 'About Nick Constantinou, author of The Anti-Retirement Guide — based in the UK.',
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
          <p className="text-lg">I&apos;m 54. I&apos;ve spent my career in operations management. I&apos;ve been married for 25+ years. I have two kids in university. Based in the UK.</p>
          <p className="text-lg">For years, I&apos;ve been thinking about &quot;the next chapter.&quot; My wife isn&apos;t ready to retire. I&apos;m getting closer.</p>
          <p className="text-lg">This book is my attempt to figure it out—and help you do the same.</p>
          <p className="text-lg">I&apos;m not a financial advisor. I&apos;m not a retirement coach. I&apos;m just someone asking the same questions you are.</p>
          <p className="text-lg">Let&apos;s figure this out together.</p>
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
              "description": "Author of The Anti-Retirement Guide — for people in their 50s and 60s who have done the numbers but still feel terrified.",
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
