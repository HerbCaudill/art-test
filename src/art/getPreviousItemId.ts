/** Get the previous item id within the test bounds. */
export function getPreviousItemId(
  /** The current one-based item id */
  currentItemId: number,
): number {
  return Math.max(currentItemId - 1, 1)
}
