import { artTestItems } from "./artTestItems"
import type { UserAnswers } from "./types"

/** Check whether every test item has been answered. */
export function hasAnsweredAllItems(
  /** Answers keyed by item id. */
  answers: UserAnswers,
): boolean {
  return artTestItems.every(item => answers[item.id] === "human" || answers[item.id] === "ai")
}
