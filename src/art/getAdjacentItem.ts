import type { ArtTestItem } from "./types"

/** Get the adjacent item, wrapping around at the ends. */
export function getAdjacentItem(
  /** All items in navigation order. */
  items: ArtTestItem[],
  /** The current item id. */
  currentItemId: number,
  /** Direction to move through the items. */
  direction: "next" | "previous",
): ArtTestItem {
  const currentIndex = items.findIndex(item => item.id === currentItemId)
  const safeIndex = currentIndex === -1 ? 0 : currentIndex
  const offset = direction === "next" ? 1 : -1
  const nextIndex = (safeIndex + offset + items.length) % items.length

  return items[nextIndex]
}
