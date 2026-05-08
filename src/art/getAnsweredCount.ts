import type { ArtTestItem, UserAnswers } from "./types"

/** Count answers for known test items. */
export function getAnsweredCount(
  /** The known test items */
  items: ArtTestItem[],
  /** The user's answers keyed by item id */
  answers: UserAnswers,
): number {
  const itemIds = new Set(items.map(item => item.id))

  return Object.keys(answers).filter(itemId => itemIds.has(Number(itemId))).length
}
