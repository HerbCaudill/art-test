import type { ArtTestItem, UserAnswers } from "./types"

/** Check whether every known item has an answer. */
export function isAttemptComplete(
  /** The known test items */
  items: ArtTestItem[],
  /** The user's answers keyed by item id */
  answers: UserAnswers,
): boolean {
  return items.every(item => answers[item.id] === "human" || answers[item.id] === "ai")
}
