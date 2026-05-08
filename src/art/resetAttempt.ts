/** Remove the saved test attempt from storage. */
export function resetAttempt(
  /** The storage implementation */
  storage: Storage,
  /** The storage key */
  storageKey: string,
): void {
  storage.removeItem(storageKey)
}
