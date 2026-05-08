import type { ArtTestAttempt } from "./types"

/** Create a blank test attempt at the first item. */
export function createEmptyAttempt(): ArtTestAttempt {
  return {
    answers: {},
    currentItemId: 1,
    submitted: false,
  }
}
