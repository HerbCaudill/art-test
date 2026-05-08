import type { ArtTestAttempt } from "./types"

/** Check whether an attempt should skip the start screen. */
export function hasAttemptProgress(
  /** The current saved attempt. */
  attempt: ArtTestAttempt,
): boolean {
  return attempt.submitted || Object.keys(attempt.answers).length > 0 || attempt.currentItemId !== 1
}
