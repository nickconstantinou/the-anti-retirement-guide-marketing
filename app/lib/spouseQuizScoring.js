/**
 * Spouse Readiness Quiz scoring engine.
 *
 * 7 YES/NO questions map to 4 retirement-couple archetypes.
 *
 * @param {string[]} answers
 * @returns {{ archetype: string, scores: Record<string, number> }}
 */

const QUESTION_ARCHETYPE_MAP = {
  1: 'timeline_gap',
  2: 'space_friction',
  3: 'identity_rebalance',
  4: 'shared_future_blur',
  5: 'identity_rebalance',
  6: 'timeline_gap',
  7: 'shared_future_blur',
}

const TIE_BREAK_PRIORITY = [
  'space_friction',
  'identity_rebalance',
  'timeline_gap',
  'shared_future_blur',
]

function scoreSpouseQuiz(answers) {
  if (!Array.isArray(answers) || answers.length !== 7) {
    throw new Error('spouseQuizScoring: answers must be an array of exactly 7 YES/NO strings')
  }

  const scores = {
    timeline_gap: 0,
    space_friction: 0,
    identity_rebalance: 0,
    shared_future_blur: 0,
  }

  for (let i = 0; i < 7; i++) {
    const answer = answers[i].toUpperCase()
    if (answer !== 'YES' && answer !== 'NO') {
      throw new Error(`spouseQuizScoring: answer at index ${i} must be YES or NO, got ${answer}`)
    }
    if (answer === 'YES') {
      scores[QUESTION_ARCHETYPE_MAP[i + 1]]++
    }
  }

  const maxScore = Math.max(
    scores.timeline_gap,
    scores.space_friction,
    scores.identity_rebalance,
    scores.shared_future_blur,
  )

  if (maxScore === 0) {
    return { archetype: 'shared_future_blur', scores }
  }

  const tiedArchetypes = TIE_BREAK_PRIORITY.filter((archetype) => scores[archetype] === maxScore)
  return {
    archetype: tiedArchetypes[tiedArchetypes.length - 1],
    scores,
  }
}

module.exports = { scoreSpouseQuiz }
