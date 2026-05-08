import { IconX } from "@tabler/icons-react"
import { cx } from "../lib/cx"
import type { ArtTestItem } from "../art/types"

/** Render one compact results thumbnail with an adjacent detail popover. */
export function ThumbnailButton({ isIncorrect, item, onHide, onShow, showDetails, side }: Props) {
  const annotationPrefix = item.trueLabel === "human" ? "🧑‍🎨" : "🤖"

  return (
    <button
      aria-label={`${item.id}. ${item.title}`}
      className="group relative block aspect-square overflow-visible focus:ring-2 focus:ring-slate-950 focus:outline-none"
      onBlur={onHide}
      onFocus={onShow}
      onMouseEnter={onShow}
      onMouseLeave={onHide}
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
      {showDetails ?
        <span
          aria-label="Artwork details"
          className={cx(
            "absolute top-1/2 z-20 hidden w-80 -translate-y-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white text-left text-sm text-slate-700 shadow-xl sm:block",
            side === "left" ? "right-full mr-3" : "left-full ml-3",
          )}
          role="tooltip"
        >
          <img
            alt="Selected artwork"
            className="max-h-72 w-full object-contain"
            src={item.imagePath}
          />
          <span className="block p-3 text-xs">
            {annotationPrefix} {item.attribution}
          </span>
        </span>
      : null}
    </button>
  )
}

type Props = {
  /** Whether the user answered this item incorrectly. */
  isIncorrect: boolean
  /** The artwork item. */
  item: ArtTestItem
  /** Hide the detail popover. */
  onHide: () => void
  /** Show the detail popover. */
  onShow: () => void
  /** Whether the detail popover is visible. */
  showDetails: boolean
  /** Which side to position the detail popover on. */
  side: "left" | "right"
}
