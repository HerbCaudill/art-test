/** Get the next item id within the test bounds. */
export function getNextItemId(
  /** The current one-based item id */
  currentItemId: number,
  /** The total number of items */
  totalItems: number,
): number {
  return Math.min(currentItemId + 1, totalItems)
}
