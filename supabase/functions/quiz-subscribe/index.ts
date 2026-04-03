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

const ARCHETYPE_DATA = {
  identity_hollow: {
    quizLabel: 'Fear Profile',
    resultsLabel: 'Your Fear Profile',
    launchLabel: 'Priority reader list',
    emailSubject: 'Your Fear Profile — The Anti-Retirement Guide',
    name: 'The Identity Hollow',
    quote: '"I\'m afraid I\'ll lose the person I was."',
    chapter: 'Chapter 5: Identity After the Title',
    chapterSummary: 'What belonging, rhythm and purpose look like after the function is gone.',
    recommendedAction: 'Take the Third Tuesday Test (Chapter 4) to separate the financial question from the identity question.',
    // Persona-validated paragraph (score: 0.96) — UK 50+, pre-retirement
    paragraph: `You've started imagining the person you become on day one of retirement — and you can't quite hold his shape. In the office you're the one people come to. Thirty years of being the person who sorts things out. And lately you've been thinking about what happens when no one needs that version of you any more. Not eventually. On the actual first day. What does your wife know you as, without the job title? What do your friends call you? You've started doing this thing lately where you quietly say your own name, your full name, to hear what it sounds like without the Regional Operations Manager in front of it. You don't know what that means yet. That's what frightens you.`,
  },
  spouse_mismatch: {
    quizLabel: 'Fear Profile',
    resultsLabel: 'Your Fear Profile',
    launchLabel: 'Priority reader list',
    emailSubject: 'Your Fear Profile — The Anti-Retirement Guide',
    name: 'The Spouse Mismatch',
    quote: '"We\'re not on the same page."',
    chapter: 'Chapter 3: The Spouse Conversation',
    chapterSummary: 'The framework most couples avoid for years until a date forces it.',
    recommendedAction: "Don't read this chapter alone. Read it together.",
    // Persona-validated paragraph (score: 0.96) — UK 50+, pre-retirement
    paragraph: `You've been married thirty years and retirement has somehow never come up as a proper conversation. You've skirted around it — mentioned what Dave from work is doing, asked whether Margaret seems pleased — but never sat down and worked out if you're even aiming for the same departure date. Partly because you don't want to hear the answer. You've got a feeling she might be thinking very differently to you. Maybe she wants to keep working. Maybe she's been dreading you being home. You don't know and you've decided not to find out. It's easier not to know. People ask if you're looking forward to it and you just say "can't wait" and leave it there.`,
  },
  purpose_void: {
    quizLabel: 'Fear Profile',
    resultsLabel: 'Your Fear Profile',
    launchLabel: 'Priority reader list',
    emailSubject: 'Your Fear Profile — The Anti-Retirement Guide',
    name: 'The Purpose Void',
    quote: '"I\'m afraid there\'s nothing on the other side."',
    chapter: 'Chapter 6: Year One Month by Month',
    chapterSummary: 'Designing the first 12 months before Day One arrives.',
    recommendedAction: 'Design next year before it arrives. The fear subsides when there\'s a plan.',
    // Persona-validated paragraph (score: 0.96) — UK 50+, pre-retirement
    paragraph: `The figures add up. You've made your peace with not being the Regional Operations Manager any more. What you can't sleep for is the nothing. You imagine Tuesday morning at 7:15 with nowhere to be. Fourteen hours in a house that's suddenly enormous. Your neighbour going off to work while you stand in your own kitchen drinking tea that tastes different for some reason. You've started setting your alarm for the weekends, earlier than you need to, just to feel what it would be like to not have to go. You haven't told anyone that. You don't quite know why you haven't told anyone that. Something about it feels like a confession.`,
  },
  financial_doubter: {
    quizLabel: 'Fear Profile',
    resultsLabel: 'Your Fear Profile',
    launchLabel: 'Priority reader list',
    emailSubject: 'Your Fear Profile — The Anti-Retirement Guide',
    name: 'The Financial Doubter',
    quote: '"The numbers probably work — I just don\'t believe them."',
    chapter: 'Chapter 2: The Fear That Doesn\'t Have a Name',
    chapterSummary: 'The fear audit that separates financial readiness from psychological readiness.',
    recommendedAction: 'The fear audit in this chapter will help you separate financial readiness from psychological readiness.',
    // Persona-validated paragraph (score: 0.95) — UK 50+, pre-retirement
    paragraph: `You've been through three independent financial advisers. Three. You've stress-tested the spreadsheet until it's now slightly yellow at the edges. Your wife says she's not worried and you believe her, which somehow makes it worse. In the IFA's office you nod and say yes that looks reasonable and you tell yourself you'll be fine from next April. And then you get in the car and you sit there for a moment and think: but what if you're not? You've stopped mentioning it to anyone. It just sits there in your chest at four in the morning and you can't quite put your finger on what it's actually afraid of.`,
  },
  timeline_gap: {
    quizLabel: 'Spouse Readiness Result',
    resultsLabel: 'Your Spouse Readiness Result',
    launchLabel: 'Reader list',
    emailSubject: 'Your Spouse Readiness Result — The Anti-Retirement Guide',
    name: 'The Timeline Gap',
    quote: '"We are not actually planning for the same date."',
    chapter: 'Chapter 3: The Spouse Conversation',
    chapterSummary: 'How to move from implied assumptions to an actual shared timeline.',
    recommendedAction: 'Start with the retirement date each of you is privately assuming, then compare the meaning behind it.',
    paragraph: `One of you has a date in mind. The other has a haze. That does not sound dramatic, so couples often miss how powerful it is. You can spend months discussing pension timing, market conditions, and whether "next year" feels sensible, all while assuming you are in the same conversation. You are not. One of you is already edging toward the door. The other is still deciding whether the room should be left at all. That gap creates friction long before either of you says the actual number out loud.`,
  },
  space_friction: {
    quizLabel: 'Spouse Readiness Result',
    resultsLabel: 'Your Spouse Readiness Result',
    launchLabel: 'Reader list',
    emailSubject: 'Your Spouse Readiness Result — The Anti-Retirement Guide',
    name: 'The Space Friction',
    quote: '"We have not worked out what togetherness looks like in real life."',
    chapter: 'Chapter 6: Year One Month by Month',
    chapterSummary: 'Designing a rhythm that allows togetherness without accidental suffocation.',
    recommendedAction: 'Talk about the shape of an ordinary weekday, not the dream version of retirement.',
    paragraph: `You love each other. That is not the question. The question is what happens when the architecture of the day changes and both of you are suddenly around more than the marriage has been organised for. Who gets the kitchen table at ten? Who wants quiet? Who assumes errands count as rest? Most couples do not fight about retirement in theory. They fight about it in the texture of ordinary days they never described before they arrived.`,
  },
  identity_rebalance: {
    quizLabel: 'Spouse Readiness Result',
    resultsLabel: 'Your Spouse Readiness Result',
    launchLabel: 'Reader list',
    emailSubject: 'Your Spouse Readiness Result — The Anti-Retirement Guide',
    name: 'The Identity Rebalance',
    quote: '"Retirement changes more than one identity at once."',
    chapter: 'Chapter 5: Identity After the Title',
    chapterSummary: 'What happens when status, usefulness, and household roles all move at once.',
    recommendedAction: 'Name the role shifts you are each half-expecting before resentment has to do it for you.',
    paragraph: `Retirement is not simply one person leaving work. It is a redistribution of identity, usefulness, expectation, and emotional load inside the relationship. One of you may quietly expect more help at home. The other may quietly fear becoming less needed, less impressive, less themselves. This category appears when a couple is not only talking about dates or money. You are negotiating who each of you gets to be when the old role no longer structures the marriage.`,
  },
  shared_future_blur: {
    quizLabel: 'Spouse Readiness Result',
    resultsLabel: 'Your Spouse Readiness Result',
    launchLabel: 'Reader list',
    emailSubject: 'Your Spouse Readiness Result — The Anti-Retirement Guide',
    name: 'The Shared Future Blur',
    quote: '"We have never described the life we are supposedly planning for."',
    chapter: 'Chapter 4: The Third Tuesday Test',
    chapterSummary: 'Turning a blurry future into something detailed enough to evaluate together.',
    recommendedAction: 'Describe one ordinary week after retirement in detail. Vague futures create avoidable conflict.',
    paragraph: `You may be getting along perfectly well. You may even agree that retirement is broadly the direction of travel. But if nobody has described the life on the other side in enough detail to picture it, then you are not planning a future together so much as sharing a fog. This result usually means the issue is not resistance. It is lack of definition. A fuzzy future feels risky because it is.`,
  },
}

const VALID_ARCHETYPES = Object.keys(ARCHETYPE_DATA)

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
<head><meta charset="utf-8"><title>${a.resultsLabel}</title></head>
<body style="font-family: Georgia, serif; max-width: 600px; margin: 40px auto; padding: 0 20px; color: #1a1a2e;">
  <p style="color: #888; font-size: 14px;">The Anti-Retirement Guide</p>
  <p style="font-size: 14px; color: #888;">${a.resultsLabel}</p>
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
        ${a.launchLabel}
      </p>
      <p style="font-size: 14px; color: #555; margin: 0 0 16px;">
        You are on the list for useful updates and early news when the book becomes available.
      </p>
      <a href="${BASE_URL}/launch" style="display: inline-block; background: #b45309; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: bold;">
        Join the reader list
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
  try {
    await fetch(`${supabaseUrl}/rest/v1/marketing_projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        id: 'anti-retirement-guide',
        name: 'The Anti-Retirement Guide',
        url: 'https://theantiretirementguide.co.uk',
      }),
    })
  } catch (err) {
    console.warn('quiz-subscribe: project upsert failed (non-fatal):', err)
  }
  const resendKey      = Deno.env.get('RESEND_API_KEY')!
  const fromEmail      = Deno.env.get('FROM_EMAIL') || 'The Anti-Retirement Guide <noreply@theantiretirementguide.co.uk>'

  // ── Step 1: Upsert into marketing_leads ─────────────────────────────────────
  // Source = 'quiz'. project_id = 'anti-retirement-guide' (matches existing).
  // Upsert = existing leads re-subscribe (status resets to 'active').
  let responseId: string
  try {
    const insertRes = await fetch(
      `${supabaseUrl}/rest/v1/marketing_leads?on_conflict=email,project_id`,
      {
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
          unsubscribed_at: null,
          metadata: { archetype, quiz_scores: fearScores },
        }),
      },
    )

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
      if (!Array.isArray(fetchData) || fetchData.length === 0 || !fetchData[0].id) {
        throw new Error('marketing_leads upsert did not return or persist a row')
      }
      responseId = fetchData[0].id
    }
  } catch (err) {
    console.error('quiz-subscribe: marketing_leads insert error', err)
    return new Response(JSON.stringify({ error: 'Failed to save lead' }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }


  // ── Step 2: Insert into quiz_responses ─────────────────────────────────────
  // This is the table the results page reads from (separate from marketing_leads).
  // id is auto-generated by trigger — retrieve it with SELECT after INSERT.
  try {
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/quiz_responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        email,
        archetype,
        fear_scores: fearScores,
        consent_given: consentGiven,
      }),
    })

    if (!insertRes.ok) {
      const errText = await insertRes.text()
      throw new Error(`quiz_responses insert failed (${insertRes.status}): ${errText}`)
    }

    // Retrieve the auto-generated UUID
    const fetchRes = await fetch(
      `${supabaseUrl}/rest/v1/quiz_responses?email=eq.${encodeURIComponent(email)}&select=id&order=created_at.desc&limit=1`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      },
    )

    if (!fetchRes.ok) {
      throw new Error(`Failed to retrieve quiz response id (${fetchRes.status})`)
    }

    const fetchData = await fetchRes.json()
    if (!Array.isArray(fetchData) || fetchData.length === 0 || !fetchData[0].id) {
      throw new Error(`Could not retrieve inserted quiz response id`)
    }

    responseId = fetchData[0].id
  } catch (err) {
    console.error('quiz-subscribe: quiz_responses error', err)
    return new Response(JSON.stringify({ error: 'Failed to save quiz result' }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  // ── Step 3: Send Fear Profile results email (fire and forget) ─────────────
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
      subject: ARCHETYPE_DATA[archetype as keyof typeof ARCHETYPE_DATA]?.emailSubject || 'Your Quiz Result — The Anti-Retirement Guide',
      html: resultsHtml,
    }),
  }).catch((err) => console.error('quiz-subscribe: results email failed (non-fatal):', err))

  // ── Step 4: Return response ID to client ────────────────────────────────────
  return new Response(JSON.stringify({ success: true, responseId }), {
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
})
