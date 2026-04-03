const { test, describe } = require('node:test')
const assert = require('node:assert')
const { scoreSpouseQuiz } = require('./spouseQuizScoring')

const y = (...qs) => {
  const answers = Array(7).fill('NO')
  qs.forEach((q) => { answers[q - 1] = 'YES' })
  return answers
}

describe('spouseQuizScoring', () => {
  test('scores each archetype correctly', () => {
    const result = scoreSpouseQuiz(y(1, 2, 3, 4, 5, 6, 7))
    assert.equal(result.scores.timeline_gap, 2)
    assert.equal(result.scores.space_friction, 1)
    assert.equal(result.scores.identity_rebalance, 2)
    assert.equal(result.scores.shared_future_blur, 2)
  })

  test('shared_future_blur wins all-zero tie break', () => {
    const result = scoreSpouseQuiz(y())
    assert.equal(result.archetype, 'shared_future_blur')
  })

  test('timeline_gap wins over identity_rebalance on tie by priority', () => {
    const result = scoreSpouseQuiz(y(1, 3, 5, 6))
    assert.equal(result.scores.timeline_gap, 2)
    assert.equal(result.scores.identity_rebalance, 2)
    assert.equal(result.archetype, 'timeline_gap')
  })

  test('throws on invalid answer length', () => {
    assert.throws(() => scoreSpouseQuiz(['YES']), /exactly 7 YES\/NO strings/)
  })

  test('throws on invalid answer value', () => {
    assert.throws(() => scoreSpouseQuiz(['YES', 'NO', 'MAYBE', 'NO', 'NO', 'NO', 'NO']), /must be YES or NO/)
  })
})
