# Roadmap: The Anti-Retirement Guide Website
*Updated: 2026-03-28 — reflects live state*

## Phase 1: Setup ✅
- [x] Create Next.js 15 repo
- [x] Configure Tailwind CSS
- [x] Set up GitHub Pages deployment (auto-deploy via GitHub Actions)
- [x] Configure custom domain (theantiretirementguide.co.uk via IONOS)

## Phase 2: Core Pages ✅
- [x] Homepage (hero, problem/solution, "What's Inside", testimonials, lead form)
- [x] About page
- [x] FAQ page with schema markup for rich snippets

## Phase 3: Blog ✅
- [x] Blog index page
- [x] Blog post template (/blog/[slug])
- [x] 14 SEO blog posts published

## Phase 4: Lead Capture ✅
- [x] Supabase setup (marketing_leads table, upsert on re-subscribe)
- [x] Email capture form (name + email)
- [x] Jumpstart lead magnet page (/jumpstart) — "The First Week Guide"
- [x] Thank you page with download link
- [x] Persona-targeted pages with human-readable aliases (`/spouse-conversation-guide`, `/loneliness-after-work`, `/what-i-actually-want`, `/first-week-guide`) backed by source routing for clusters A-D
- [x] Role/practical lead-magnet pages (/finance-director, /nhs-manager, /teacher, /ni-decision-matrix, /third-tuesday-test)
- [x] Quiz landers and diagnostics (/fear-audit, /fear-quiz, /spouse-readiness-quiz)
- [x] Resend integration (welcome email with correct PDF per source)
- [x] Unsubscribe page + edge function (GDPR-compliant soft-delete)

## Phase 5: SEO & Polish ✅
- [x] Meta tags on all pages
- [x] Open Graph tags
- [x] Sitemap.xml
- [x] robots.txt
- [x] Schema markup: Book, FAQ, Article
- [ ] Mobile testing (to verify)

## Phase 6: Launch (Coming Soon)
- [x] Custom domain live
- [x] Email forms functional end-to-end
- [ ] Amazon purchase links wired to CTAs (Kindle ~£4.99, Paperback ~£19.99)
- [ ] PostHog analytics confirmed active on site
- [ ] Final pre-launch content review (see `the-anti-retirement-guide/REVIEW-PLAN.md`)
