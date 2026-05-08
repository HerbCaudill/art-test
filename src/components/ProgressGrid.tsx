import { cx } from "../lib/cx"
import type { UserAnswers } from "../art/types"

/** Render the numbered direct-navigation progress grid. */
export function ProgressGrid({ answers, currentItemId, onNavigate, totalItems }: Props) {
  return (
    <nav aria-label="Artwork progress" className="grid grid-cols-10 gap-2">
      {Array.from({ length: totalItems }, (_, index) => index + 1).map(itemId => (
        <button
          aria-label={`Go to item ${itemId}`}
          className={cx(
            "aspect-square rounded-lg border text-sm font-medium",
            currentItemId === itemId && "border-slate-950 bg-slate-950 text-white",
            currentItemId !== itemId &&
              answers[itemId] &&
              "border-emerald-500 bg-emerald-50 text-emerald-950",
            currentItemId !== itemId &&
              !answers[itemId] &&
              "border-slate-200 bg-white text-slate-700",
          )}
          key={itemId}
          onClick={() => onNavigate(itemId)}
          type="button"
        >
          {itemId}
        </button>
      ))}
    </nav>
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
