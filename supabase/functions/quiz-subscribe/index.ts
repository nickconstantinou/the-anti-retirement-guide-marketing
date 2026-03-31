// Supabase Edge Function — quiz-subscribe
// Handles Fear Quiz completion:
//  1. Validates request
//  2. Upserts lead into marketing_leads (source='quiz')
//  3. Sends full Fear Profile results email immediately
//  4. Returns response ID
//
// Uses: marketing_leads table (same as /jumpstart). No newsletter_subscribers needed.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
}

const BASE_URL = 'https://theantiretirementguide.co.uk'

const VALID_ARCHETYPES = [
  'identity_hollow',
  'spouse_mismatch',
  'purpose_void',
  'financial_doubter',
]

const ARCHETYPE_DATA = {
  identity_hollow: {
    name: 'The Identity Hollow',
    quote: '"I\'m afraid I\'ll lose the person I was."',
    chapter: 'Chapter 5: Identity After the Title',
    chapterSummary: 'What belonging, rhythm and purpose look like after the function is gone.',
    recommendedAction: 'Take the Third Tuesday Test (Chapter 4) to separate the financial question from the identity question.',
    // Persona-validated paragraph (score: 0.97)
    paragraph: 'I cleared my desk three weeks before I left. I told myself I was getting ahead of it. I don\'t think that\'s true. I think I wanted to see what it felt like to sit there with nothing in front of me, the way it would feel eventually anyway, except I\'d still have the title. Now I have neither. I practice saying hello to the woman at the checkout at Kroger. I have to figure out how to stand, where to put my hands. I was the person who stayed late. I was also — I\'m not sure. That\'s the part I keep circling back to. Not whether I lost something, but whether there was anything there to lose. My wife calls me by my name. Sometimes I think she\'s the only one who does, and sometimes I think she\'s just the only one still checking.',
  },
  spouse_mismatch: {
    name: 'The Spouse Mismatch',
    quote: '"We\'re not on the same page."',
    chapter: 'Chapter 3: The Spouse Conversation',
    chapterSummary: 'The framework most couples avoid for years until a date forces it.',
    recommendedAction: "Don't read this chapter alone. Read it together.",
    // Persona-validated paragraph (score: 0.97)
    paragraph: 'I brought it up again last night. I could see him physically leave the conversation — his eyes stayed on the TV but he wasn\'t there anymore. Twenty-three years and I still can\'t get him to sit down and look at a single spreadsheet with me. He thinks I\'m obsessing. Maybe I am. But he doesn\'t know what he doesn\'t know, and that\'s exactly the problem. Last year he casually mentioned "maybe selling the house and moving somewhere warm" like it was a done deal, and I realized he\'d been imagining a future I\'d never been invited into. I don\'t even know what he\'s waiting for. I don\'t know if he does either. We\'re going to wake up at 65 and one of us is going to be the villain for not being ready, and the other one is going to pretend they saw it coming all along.',
  },
  purpose_void: {
    name: 'The Purpose Void',
    quote: '"I\'m afraid there\'s nothing on the other side."',
    chapter: 'Chapter 6: Year One Month by Month',
    chapterSummary: 'Designing the first 12 months before Day One arrives.',
    recommendedAction: 'Design next year before it arrives. The fear subsides when there\'s a plan.',
    // Persona-validated paragraph (score: 0.96)
    paragraph: 'I sit at the kitchen table at 9:47 on a Tuesday morning and the silence is so specific I can hear the refrigerator hum. Forty-one years I showed up. Forty-one years I knew what 7:15 meant — coffee, briefcase, the turn signal click as I backed out of the driveway. Now there\'s just this: fourteen hours of nothing particular stretching out until I go to bed. I told myself I\'d read, I\'d travel, I\'d finally fix the back porch. Six months in and I haven\'t touched the porch. The travel brochures are in a stack I walk past. At 2 AM the refrigerator hums and I\'m awake, listening for the alarm that won\'t ring for another five hours — the one that used to pull me out of sleep like a hook. I pick up a book and put it down and then I\'m standing at the window watching the neighbor leave for work and I think — that\'s it? Turns out the problem was always time, just not the way I thought. And then tomorrow I\'ll think it again. And then I\'ll make coffee.',
  },
  financial_doubter: {
    name: 'The Financial Doubter',
    quote: '"The numbers probably work — I just don\'t believe them."',
    chapter: 'Chapter 2: The Fear That Doesn\'t Have a Name',
    chapterSummary: 'The fear audit that separates financial readiness from psychological readiness.',
    recommendedAction: 'The fear audit in this chapter will help you separate financial readiness from psychological readiness.',
    // Persona-validated paragraph (score: 0.96)
    paragraph: `I have this spreadsheet. Six years old now. Seventeen tabs and I've touched... I don't know, twelve? In the last month alone? Just tweaking things, like, I'll move a number here and suddenly it changes what the whole thing means, and I don't — I mean yeah the spreadsheet but also like — I don't totally trust it. My advisor says I'm fine. My wife says I'm fine. The number on the screen says I'm fine. But the version of me that has to actually live this, that guy? He's not fine. He's waiting.

There's this guy from a barbecue last summer. He had a guy — some financial person — who told him he was all set. Eight months later his wife got diagnosed and now he's back at work. I run the numbers. The numbers always work. But I keep waiting for the thing the numbers didn't see. And I can't shake the feeling that "the numbers" are just a polite way of saying I hope.`,
  },
}

function buildResultsHtml(name, archetype, scores) {
  const a = ARCHETYPE_DATA[archetype as keyof typeof ARCHETYPE_DATA]
  if (!a) return '<p>Error loading results.</p>'

  const scoreLines = Object.entries(scores)
    .map(([key, val]) => {
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      return `<li style="margin-bottom: 8px;"><strong>${label}:</strong> ${val}</li>`
    })
    .join('')

  // Persona-validated archetype paragraph — the emotional hook
  const archetypeParagraph = a.paragraph
    ? `<blockquote style="border-left: 4px solid #b45309; padding: 16px 20px; margin: 0 0 32px; background: #fffbeb; font-style: italic; font-size: 16px; color: #444; line-height: 1.8;">
    ${a.paragraph.replace(/\n\n/g, '<br><br>')}
   </blockquote>`
    : ''

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Your Fear Profile</title></head>
<body style="font-family: Georgia, serif; max-width: 600px; margin: 40px auto; padding: 0 20px; color: #1a1a2e;">
  <p style="color: #888; font-size: 14px;">The Anti-Retirement Guide</p>
  <p style="font-size: 14px; color: #888;">Your Fear Profile</p>
  <h1 style="font-size: 32px; color: #1a1a2e; margin-bottom: 4px;">${a.name}</h1>
  <p style="font-size: 20px; color: #b45309; font-style: italic; margin-bottom: 24px;">${a.quote}</p>

  ${archetypeParagraph}

  <h2 style="font-size: 18px; color: #1a1a2e; margin-bottom: 12px;">Your scores</h2>
  <ul style="font-size: 15px; color: #444; line-height: 1.8; margin-bottom: 32px;">${scoreLines}</ul>

  <h2 style="font-size: 18px; color: #1a1a2e; margin-bottom: 12px;">Start here</h2>
  <div style="background: #fffbeb; border-left: 4px solid #b45309; padding: 16px 20px; margin-bottom: 32px;">
    <p style="font-size: 15px; color: #92400e; font-weight: bold; margin: 0 0 4px;">${a.chapter}</p>
    <p style="font-size: 14px; color: #a16207; margin: 0 0 12px;">${a.chapterSummary}</p>
    <p style="font-size: 14px; color: #713f12; margin: 0;">${a.recommendedAction}</p>
  </div>

  <div style="text-align: center; margin: 36px 0;">
    <div style="background: #fffbeb; border: 2px solid #b45309; border-radius: 12px; padding: 24px; display: inline-block;">
      <p style="font-size: 18px; color: #1a1a2e; font-weight: bold; margin: 0 0 8px;">
        Early access — launch price
      </p>
      <p style="font-size: 14px; color: #555; margin: 0 0 16px;">
        Join the launch list and get the book at the pre-order price — before it goes live.
      </p>
      <a href="${BASE_URL}/launch" style="display: inline-block; background: #b45309; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: bold;">
        Reserve my early access
      </a>
    </div>
  </div>
  <p style="font-size: 12px; color: #aaa; text-align: center;">
    The Anti-Retirement Guide — Join the launch list at theantiretirementguide.co.uk
  </p>
</body>
</html>`
}

// ── Deno serve ────────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: CORS })
  }

  // Parse body
  let body: {
    email?: string
    name?: string
    archetype?: string
    fearScores?: Record<string, number>
    consentGiven?: boolean
  }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  const { email, name, archetype, fearScores, consentGiven } = body

  // Validate
  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Valid email is required' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
  if (!archetype || !VALID_ARCHETYPES.includes(archetype)) {
    return new Response(JSON.stringify({ error: 'Valid archetype is required' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
  if (!fearScores || typeof fearScores !== 'object') {
    return new Response(JSON.stringify({ error: 'fearScores object is required' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
  if (!consentGiven) {
    return new Response(JSON.stringify({ error: 'Consent is required' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl     = Deno.env.get('SUPABASE_URL')!
  const supabaseKey     = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const resendKey      = Deno.env.get('RESEND_API_KEY')!
  const fromEmail      = Deno.env.get('FROM_EMAIL') || 'The Anti-Retirement Guide <noreply@theantiretirementguide.co.uk>'

  // ── Step 1: Upsert into marketing_leads ─────────────────────────────────────
  // Source = 'quiz'. project_id = 'anti-retirement-guide' (matches existing).
  // Upsert = existing leads re-subscribe (status resets to 'active').
  let responseId: string
  try {
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/marketing_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation,resolution=merge-duplicates',
      },
      body: JSON.stringify({
        email,
        name: name || email.split('@')[0],
        project_id: 'anti-retirement-guide',
        source: 'quiz',
        status: 'active',
        subscribed_at: new Date().toISOString(),
        metadata: { archetype, fear_scores: fearScores },
      }),
    })

    if (!insertRes.ok) {
      const errText = await insertRes.text()
      throw new Error(`marketing_leads insert failed (${insertRes.status}): ${errText}`)
    }

    const insertData = await insertRes.json()
    // merge-duplicates returns the existing row on conflict; upsert returns the row
    if (Array.isArray(insertData) && insertData.length > 0) {
      responseId = insertData[0].id
    } else {
      // Fallback: fetch the ID
      const fetchRes = await fetch(
        `${supabaseUrl}/rest/v1/marketing_leads?email=eq.${encodeURIComponent(email)}&project_id=eq.anti-retirement-guide&select=id&limit=1`,
        { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } },
      )
      const fetchData = await fetchRes.json()
      responseId = Array.isArray(fetchData) && fetchData.length > 0 ? fetchData[0].id : 'unknown'
    }
  } catch (err) {
    console.error('quiz-subscribe: marketing_leads insert error', err)
    return new Response(JSON.stringify({ error: 'Failed to save lead' }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  // ── Step 2: Send Fear Profile results email (fire and forget) ─────────────
  // Non-blocking — failures are logged but don't fail the response.
  const resultsHtml = buildResultsHtml(name || email.split('@')[0], archetype, fearScores)
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject: 'Your Fear Profile — The Anti-Retirement Guide',
      html: resultsHtml,
    }),
  }).catch((err) => console.error('quiz-subscribe: results email failed (non-fatal):', err))

  // ── Step 3: Return response ID to client ────────────────────────────────────
  return new Response(JSON.stringify({ success: true, responseId }), {
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
})