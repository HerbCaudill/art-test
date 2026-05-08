import type { ArtTestItem, ArtTestScore, UserAnswers } from "./types"

/** Score user answers against the full answer key. */
export function getScore(
  /** The answer key items */
  items: ArtTestItem[],
  /** The user's answers keyed by item id */
  answers: UserAnswers,
): ArtTestScore {
  return {
    correct: items.filter(item => answers[item.id] === item.trueLabel).length,
    total: items.length,
  }
}
