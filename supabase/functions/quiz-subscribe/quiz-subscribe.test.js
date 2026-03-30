// Unit tests for quiz-subscribe Edge Function
// Tests pure logic: validation, HTML builders, archetype coverage.

const { describe, test } = require('node:test')
const assert = require('node:assert')

// ── Constants (mirrored from EF) ───────────────────────────────────────────────

const VALID_ARCHETYPES = [
  'identity_hollow',
  'spouse_mismatch',
  'purpose_void',
  'financial_doubter',
]

const ARCHETYPE_DATA = {
  identity_hollow: {
    name: 'The Identity Hollow',
    chapter: 'Chapter 5: Identity After the Title',
    chapterSummary: 'What belonging, rhythm and purpose look like after the function is gone.',
    recommendedAction: 'Take the Third Tuesday Test (Chapter 4) to separate the financial question from the identity question.',
  },
  spouse_mismatch: {
    name: 'The Spouse Mismatch',
    chapter: 'Chapter 3: The Spouse Conversation',
    chapterSummary: 'The framework most couples avoid for years until a date forces it.',
    recommendedAction: "Don't read this chapter alone. Read it together.",
  },
  purpose_void: {
    name: 'The Purpose Void',
    chapter: 'Chapter 6: Year One Month by Month',
    chapterSummary: 'Designing the first 12 months before Day One arrives.',
    recommendedAction: 'Design next year before it arrives. The fear subsides when there\'s a plan.',
  },
  financial_doubter: {
    name: 'The Financial Doubter',
    chapter: 'Chapter 2: The Fear That Doesn\'t Have a Name',
    chapterSummary: 'The fear audit that separates financial readiness from psychological readiness.',
    recommendedAction: 'The fear audit in this chapter will help you separate financial readiness from psychological readiness.',
  },
}

// ── Validation (mirrored from EF) ─────────────────────────────────────────────

/**
 * @param {{email?: string, name?: string, archetype?: string, fearScores?: unknown, consentGiven?: boolean}} body
 * @returns {{valid: boolean, error?: string}}
 */
function validateBody(body) {
  if (!body.email || !body.email.includes('@')) {
    return { valid: false, error: 'Valid email is required' }
  }
  if (!body.archetype || !VALID_ARCHETYPES.includes(body.archetype)) {
    return { valid: false, error: 'Valid archetype is required' }
  }
  if (!body.fearScores || typeof body.fearScores !== 'object') {
    return { valid: false, error: 'fearScores object is required' }
  }
  if (!body.consentGiven) {
    return { valid: false, error: 'Consent is required' }
  }
  return { valid: true }
}

// ── HTML builders (copied from EF for testing) ───────────────────────────────

function buildConfirmationHtml(name, archetype, responseId, confirmUrl) {
  const a = ARCHETYPE_DATA[archetype]
  return `<!DOCTYPE html>
<html><head><title>Confirm your subscription</title></head>
<body>
  <p>Hi ${name || 'there'},</p>
  <p>Your archetype: <strong>${a?.name || archetype}</strong>.</p>
  <a href="${confirmUrl}">Confirm my subscription</a>
</body></html>`
}

function buildResultsHtml(name, archetype, scores) {
  const a = ARCHETYPE_DATA[archetype]
  if (!a) return '<p>Error loading results.</p>'
  const scoreLines = Object.entries(scores).map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('')
  const quote = a.quote || ''
  const chapter = a.chapter || ''
  return `<!DOCTYPE html>
<html><head><title>Your Fear Profile</title></head>
<body>
  <p>The Anti-Retirement Guide</p>
  <h1>${a.name}</h1>
  <p>${quote}</p>
  <ul>${scoreLines}</ul>
  <h2>Start here</h2>
  <div>
    <p>${chapter}</p>
    <a href="/launch">Reserve my early access</a>
  </div>
</body></html>`
}

// ── Tests ───────────────────────────────────────────────────────────────────────

describe('validateBody', () => {
  const validBody = {
    email: 'user@example.com',
    name: 'Test User',
    archetype: 'purpose_void',
    fearScores: { identity_hollow: 1, spouse_mismatch: 0, purpose_void: 3, financial_doubter: 0 },
    consentGiven: true,
  }

  test('valid body returns valid: true', () => {
    const result = validateBody(validBody)
    assert.strictEqual(result.valid, true)
    assert.strictEqual(result.error, undefined)
  })

  test('missing email returns valid: false with message', () => {
    const result = validateBody({ ...validBody, email: undefined })
    assert.strictEqual(result.valid, false)
    assert.strictEqual(result.error, 'Valid email is required')
  })

  test('email without @ returns valid: false', () => {
    const result = validateBody({ ...validBody, email: 'notanemail' })
    assert.strictEqual(result.valid, false)
    assert.strictEqual(result.error, 'Valid email is required')
  })

  test('missing archetype returns valid: false', () => {
    const result = validateBody({ ...validBody, archetype: undefined })
    assert.strictEqual(result.valid, false)
    assert.strictEqual(result.error, 'Valid archetype is required')
  })

  test('invalid archetype returns valid: false', () => {
    const result = validateBody({ ...validBody, archetype: 'not_a_real_archetype' })
    assert.strictEqual(result.valid, false)
    assert.strictEqual(result.error, 'Valid archetype is required')
  })

  test('all four archetypes are accepted as valid', () => {
    for (const arch of VALID_ARCHETYPES) {
      const result = validateBody({ ...validBody, archetype: arch })
      assert.strictEqual(result.valid, true, `archetype ${arch} should be valid`)
    }
  })

  test('missing fearScores returns valid: false', () => {
    const result = validateBody({ ...validBody, fearScores: undefined })
    assert.strictEqual(result.valid, false)
    assert.strictEqual(result.error, 'fearScores object is required')
  })

  test('non-object fearScores returns valid: false', () => {
    const result = validateBody({ ...validBody, fearScores: 'not an object' })
    assert.strictEqual(result.valid, false)
    assert.strictEqual(result.error, 'fearScores object is required')
  })

  test('consentGiven = false returns valid: false', () => {
    const result = validateBody({ ...validBody, consentGiven: false })
    assert.strictEqual(result.valid, false)
    assert.strictEqual(result.error, 'Consent is required')
  })

  test('consentGiven = null returns valid: false', () => {
    const result = validateBody({ ...validBody, consentGiven: null })
    assert.strictEqual(result.valid, false)
    assert.strictEqual(result.error, 'Consent is required')
  })
})

describe('buildConfirmationHtml', () => {
  test('includes name when provided', () => {
    const html = buildConfirmationHtml('Nick', 'purpose_void', 'uuid123', 'https://test.com/confirm')
    assert.ok(html.includes('Hi Nick'))
  })

  test('includes archetype name', () => {
    const html = buildConfirmationHtml('Nick', 'purpose_void', 'uuid123', 'https://test.com/confirm')
    assert.ok(html.includes('The Purpose Void'))
  })

  test('includes confirm URL', () => {
    const url = 'https://theantiretirementguide.co.uk/confirm?id=abc123'
    const html = buildConfirmationHtml('Nick', 'purpose_void', 'abc123', url)
    assert.ok(html.includes(url))
  })

  test('uses fallback for null name', () => {
    const html = buildConfirmationHtml(null, 'identity_hollow', 'uuid', 'https://test.com/confirm')
    assert.ok(html.includes('Hi there'))
  })

  test('all 4 archetypes render without error', () => {
    for (const arch of VALID_ARCHETYPES) {
      const html = buildConfirmationHtml('Test', arch, 'uuid', 'https://test.com/confirm')
      assert.ok(html.includes('Confirm my subscription'), `archetype ${arch} should render`)
    }
  })
})

describe('buildResultsHtml', () => {
  const scores = { identity_hollow: 1, spouse_mismatch: 0, purpose_void: 3, financial_doubter: 1 }

  test('includes the anti-retirement guide label', () => {
    const html = buildResultsHtml('Nick', 'purpose_void', scores)
    assert.ok(html.includes('The Anti-Retirement Guide'))
  })

  test('includes archetype name', () => {
    const html = buildResultsHtml('Nick', 'purpose_void', scores)
    assert.ok(html.includes('The Purpose Void'))
  })

  test('includes all 4 score lines', () => {
    const html = buildResultsHtml('Nick', 'purpose_void', scores)
    assert.ok(html.includes('identity_hollow'))
    assert.ok(html.includes('spouse_mismatch'))
    assert.ok(html.includes('purpose_void'))
    assert.ok(html.includes('financial_doubter'))
  })

  test('includes purpose_void archetype label', () => {
    const html = buildResultsHtml('Nick', 'purpose_void', scores)
    assert.ok(html.includes('The Purpose Void'))
  })

  test('includes launch CTA with relative URL', () => {
    const html = buildResultsHtml('Nick', 'purpose_void', scores)
    assert.ok(html.includes('/launch'))
    assert.ok(html.includes('Reserve my early access'))
  })

  test('all 4 archetypes render without error', () => {
    for (const arch of VALID_ARCHETYPES) {
      const html = buildResultsHtml('Test', arch, scores)
      assert.ok(html.includes('</h1>'), `archetype ${arch} should render h1`)
    }
  })

  test('invalid archetype returns error message', () => {
    const html = buildResultsHtml('Test', 'not_real', scores)
    assert.ok(html.includes('Error'))
  })
})

describe('VALID_ARCHETYPES', () => {
  test('exactly 4 archetypes defined', () => {
    assert.strictEqual(VALID_ARCHETYPES.length, 4)
  })

  test('all archetypes are snake_case strings', () => {
    for (const arch of VALID_ARCHETYPES) {
      assert.strictEqual(typeof arch, 'string')
      assert.strictEqual(arch, arch.toLowerCase())
      assert.ok(arch.includes('_'), `${arch} should be snake_case`)
    }
  })

  test('matches ARCHETYPE_DATA keys exactly', () => {
    const dataKeys = Object.keys(ARCHETYPE_DATA).sort()
    const validKeys = [...VALID_ARCHETYPES].sort()
    assert.deepStrictEqual(dataKeys, validKeys)
  })
})