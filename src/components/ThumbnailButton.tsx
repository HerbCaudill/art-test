import { IconX } from "@tabler/icons-react"
import { cx } from "../lib/cx"
import type { ArtTestItem } from "../art/types"

/** Render one compact results thumbnail. */
export function ThumbnailButton({ isIncorrect, isSelected, item, onSelect }: Props) {
  return (
    <button
      aria-label={`${item.id}. ${item.title}`}
      className={cx(
        "group relative block aspect-square overflow-hidden focus:ring-2 focus:ring-slate-950 focus:outline-none",
        isSelected && "ring-2 ring-slate-950",
      )}
      onClick={() => onSelect(item)}
      onFocus={() => onSelect(item)}
      type="button"
    >
      <img alt="" className="h-full w-full object-cover" src={item.imagePath} />
      {isIncorrect ?
        <span
          aria-label="Incorrect answer"
          className="absolute top-1 right-1 rounded-full bg-red-600 p-0.5 text-white"
        >
          <IconX aria-hidden="true" size={12} />
        </span>
      : null}
    </button>
  )
}

type Props = {
  /** Whether the user answered this item incorrectly. */
  isIncorrect: boolean
  /** Whether this item is selected in the detail panel. */
  isSelected: boolean
  /** The artwork item. */
  item: ArtTestItem
  /** Select this item for details. */
  onSelect: (item: ArtTestItem) => void
}
