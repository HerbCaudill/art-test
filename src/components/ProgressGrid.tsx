import { cx } from "../lib/cx"
import type { UserAnswers } from "../art/types"

/** Render the numbered direct-navigation progress group. */
export function ProgressGrid({ answers, currentItemId, onNavigate, totalItems }: Props) {
  return (
    <div className="w-full py-1">
      <div
        aria-label="Artwork progress"
        className="mx-auto grid w-full max-w-6xl gap-1"
        role="group"
        style={{ gridTemplateColumns: `repeat(${totalItems}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: totalItems }, (_, index) => index + 1).map(itemId => (
          <button
            aria-label={`Go to item ${itemId}`}
            className={cx(
              "group relative aspect-square min-w-0 rounded-full border text-[0.5rem] font-medium transition",
              currentItemId === itemId && "border-slate-950 bg-slate-950 text-white",
              currentItemId !== itemId &&
                answers[itemId] &&
                "border-emerald-500 bg-emerald-500 text-white",
              currentItemId !== itemId &&
                !answers[itemId] &&
                "border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
            )}
            key={itemId}
            onClick={() => onNavigate(itemId)}
            title={`Item ${itemId}`}
            type="button"
          >
            <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-slate-950 px-1.5 py-0.5 text-xs text-white opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100">
              {itemId}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

type Props = {
  /** Answers keyed by item id. */
  answers: UserAnswers
  /** The current item id. */
  currentItemId: number
  /** Called when the user navigates directly. */
  onNavigate: (itemId: number) => void
  /** The total item count. */
  totalItems: number
}
