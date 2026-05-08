import type { ArtTestAttempt } from "./types"

/** Save a test attempt to storage. */
export function saveAttempt(
  /** The storage implementation */
  storage: Storage,
  /** The storage key */
  storageKey: string,
  /** The attempt to save */
  attempt: ArtTestAttempt,
): void {
  storage.setItem(storageKey, JSON.stringify(attempt))
}
