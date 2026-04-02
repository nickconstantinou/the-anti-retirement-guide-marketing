// Supabase Edge Function — subscribe-lead
// Called by the browser; sends welcome email via Resend and saves to Supabase.
// Secrets set via: supabase secrets set RESEND_API_KEY=... FROM_EMAIL=...

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
}

const BASE_URL = 'https://theantiretirementguide.co.uk'

const GUIDES: Record<string, { pdf: string; subject: (name: string) => string; title: string; desc: string; cta: string }> = {
  'cluster-a': {
    pdf: `${BASE_URL}/spouse-conversation-guide.pdf`,
    subject: (n) => `Your Spouse Conversation Guide is here, ${n}`,
    title: 'The Spouse Conversation Guide',
    desc: 'Five questions that change the shape of the conversation — away from the spreadsheet and toward what actually needs to be said.',
    cta: 'Download your guide',
  },
  'cluster-b': {
    pdf: `${BASE_URL}/loneliness-after-work.pdf`,
    subject: (n) => `Your guide to the social side of leaving is here, ${n}`,
    title: 'Loneliness After Work',
    desc: 'An honest look at what happens to your social life when work ends — and three things that consistently help.',
    cta: 'Download your guide',
  },
  'cluster-c': {
    pdf: `${BASE_URL}/what-i-actually-want.pdf`,
    subject: (n) => `Your Discovery Deck is here, ${n}`,
    title: 'What I Actually Want',
    desc: 'Twelve questions designed to cut through the noise and get to something real about what you want from your next chapter.',
    cta: 'Download your guide',
  },
  'launch': {
    pdf: '',
    subject: (n) => `You're on the list — The Anti-Retirement Guide launches soon`,
    title: 'The Anti-Retirement Guide',
    desc: "You're on the launch list. We'll email you the moment pre-orders open — at the launch discount, before it goes public.",
    cta: 'View launch page',
  },
  'cluster-d': {
    pdf: `${BASE_URL}/jumpstart-guide.pdf`,
    subject: (n) => `Your 7-Day Jumpstart Guide is here, ${n}`,
    title: 'The 7-Day Jumpstart Guide',
    desc: 'Seven focused mornings to help you name what is actually stopping you and give shape to what comes after work.',
    cta: 'Download your guide',
  },
  default: {
    pdf: `${BASE_URL}/jumpstart-guide.pdf`,
    subject: (n) => `Your First Week Guide is here, ${n}`,
    title: 'The First Week Guide',
    desc: 'A practical framework for structuring your first week out of work so you don\'t just drift — you start building the life you actually want.',
    cta: 'Download your guide',
  },
}

function buildGuideEmailHtml(firstName: string, guide: { pdf: string; title: string; desc: string; cta: string }, email: string) {
  const actionUrl = guide.pdf || `${BASE_URL}/launch`

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${guide.title}</title></head>
<body style="font-family: Georgia, serif; max-width: 600px; margin: 40px auto; padding: 0 20px; color: #1a1a2e;">
  <p style="color: #888; font-size: 14px;">The Anti-Retirement Guide</p>
  <p style="font-size: 14px; color: #888;">Your guide is ready</p>
  <h1 style="font-size: 32px; color: #1a1a2e; margin-bottom: 8px;">${guide.title}</h1>
  <p style="font-size: 18px; color: #b45309; font-style: italic; margin-bottom: 24px;">
    For people who are financially close, emotionally stuck, and trying to name what is really going on.
  </p>

  <div style="background: #fffbeb; border-left: 4px solid #b45309; padding: 16px 20px; margin-bottom: 32px;">
    <p style="font-size: 16px; color: #444; margin: 0 0 12px;">Hi ${firstName},</p>
    <p style="font-size: 15px; color: #444; line-height: 1.8; margin: 0;">
      ${guide.desc}
    </p>
  </div>

  <div style="text-align: center; margin: 36px 0;">
    <a href="${actionUrl}" style="display: inline-block; background: #b45309; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: bold;">
      ${guide.cta}
    </a>
  </div>

  <p style="font-size: 15px; color: #444; line-height: 1.8;">
    Reply to this email any time if you have questions.
  </p>
  <p style="font-size: 15px; color: #444; line-height: 1.8;">Nick</p>
  <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
  <p style="font-size:12px;color:#999">
    You're receiving this because you signed up at theantiretirementguide.co.uk.
    <a href="${BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a>.
  </p>
</body>
</html>`
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: CORS })
  }

  let name: string, email: string, source: string
  try {
    ;({ name, email, source = 'default' } = await req.json())
    if (!name || !email) throw new Error('Missing fields')
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  const guide = GUIDES[source] ?? GUIDES.default

  const resendKey = Deno.env.get('RESEND_API_KEY') ?? ''
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

  // Ensure project row exists (idempotent — safe to call even if it already exists)
  try {
    await fetch(`${supabaseUrl}/rest/v1/marketing_projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        id: 'anti-retirement-guide',
        name: 'The Anti-Retirement Guide',
        url: 'https://theantiretirementguide.co.uk',
      }),
    })
  } catch (err) {
    console.warn('subscribe-lead: project upsert failed (non-fatal):', err)
  }
  const fromEmail = Deno.env.get('FROM_EMAIL') ?? 'hello@theantiretirementguide.co.uk'
  const firstName = name.split(' ')[0]

  let leadId = 'unknown'
  try {
    const dbResponse = await fetch(
      `${supabaseUrl}/rest/v1/marketing_leads?on_conflict=email,project_id`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Prefer': 'return=representation,resolution=merge-duplicates',
        },
        body: JSON.stringify({
          email,
          name,
          project_id: 'anti-retirement-guide',
          source,
          status: 'active',
          subscribed_at: new Date().toISOString(),
          unsubscribed_at: null,
        }),
      },
    )

    if (!dbResponse.ok) {
      throw new Error(await dbResponse.text())
    }

    const dbData = await dbResponse.json()
    if (Array.isArray(dbData) && dbData.length > 0 && dbData[0].id) {
      leadId = dbData[0].id
    } else {
      const fetchRes = await fetch(
        `${supabaseUrl}/rest/v1/marketing_leads?email=eq.${encodeURIComponent(email)}&project_id=eq.anti-retirement-guide&select=id&limit=1`,
        {
          headers: {
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
        },
      )

      if (!fetchRes.ok) {
        throw new Error(await fetchRes.text())
      }

      const fetchData = await fetchRes.json()
      if (!Array.isArray(fetchData) || fetchData.length === 0 || !fetchData[0].id) {
        throw new Error('marketing_leads upsert did not return or persist a row')
      }

      leadId = fetchData[0].id
    }
  } catch (err) {
    console.error('subscribe-lead: marketing_leads upsert failed:', err)
    return new Response(JSON.stringify({ error: 'Failed to save lead' }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: `Nick Constantinou <${fromEmail}>`,
        to: [email],
        subject: guide.subject(firstName),
        html: buildGuideEmailHtml(firstName, guide, email),
      }),
    })

  if (!resendResponse.ok) {
    const msg = await resendResponse.text()
    console.error('Resend email failed:', msg)
    return new Response(JSON.stringify({ error: 'Email delivery failed' }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ success: true, leadId }), {
    status: 200,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
})
