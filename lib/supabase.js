// Lead capture — saves to Supabase and subscribes to Kit
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Kit public API key — safe for browser use (read-only subscriber creation)
const KIT_API_KEY = process.env.NEXT_PUBLIC_KIT_API_KEY || 'kit_1574987fa68438cab4617263bdd5636e'
const KIT_TAG_ID = 17797479 // "first-week-guide" tag

async function saveToSupabase(name, email) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return
  const response = await fetch(`${SUPABASE_URL}/rest/v1/marketing_leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ name, email, source: 'the-anti-retirement-guide' })
  })
  if (!response.ok) throw new Error('Supabase save failed')
}

async function subscribeToKit(name, email) {
  const response = await fetch('https://api.kit.com/v4/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Kit-Api-Key': KIT_API_KEY
    },
    body: JSON.stringify({
      email_address: email,
      first_name: name.split(' ')[0],
      tag_ids: [KIT_TAG_ID]
    })
  })
  if (!response.ok) throw new Error('Kit subscribe failed')
}

export async function subscribeLead(name, email) {
  try {
    // Run both in parallel — Kit is the primary, Supabase is the backup record
    await Promise.all([
      subscribeToKit(name, email),
      saveToSupabase(name, email).catch(err => console.warn('Supabase backup failed:', err))
    ])
    return { success: true }
  } catch (error) {
    console.error('Subscription error:', error)
    return { success: false, error: error.message }
  }
}
