import { AnswerIndicator } from "./AnswerIndicator"
import { cx } from "../lib/cx"
import type { ArtTestItem } from "../art/types"

/** Render one compact results thumbnail. */
export function ThumbnailButton({ isCorrect, isSelected, item, onSelect }: Props) {
  return (
    <button
      aria-label={`${item.id}. ${item.title}`}
      className={cx(
        "group relative block aspect-square focus:ring-2 focus:ring-slate-950 focus:outline-none",
        isSelected && "ring-2 ring-slate-950",
      )}
      onClick={() => onSelect(item)}
      onFocus={() => onSelect(item)}
      type="button"
    >
      <img alt="" className="h-full w-full object-cover" src={item.imagePath} />
      <span className="absolute -top-2 -right-2">
        <AnswerIndicator isCorrect={isCorrect} size="lg" />
      </span>
    </button>
  )
}

type Props = {
  /** Whether the user answered this item correctly. */
  isCorrect: boolean
  /** Whether this item is selected in the detail panel. */
  isSelected: boolean
  /** The artwork item. */
  item: ArtTestItem
  /** Select this item for details. */
  onSelect: (item: ArtTestItem) => void
}
