import { ButtonGroup } from "./ui/button-group"
import { cx } from "../lib/cx"
import type { UserAnswers } from "../art/types"

/** Render the numbered direct-navigation progress group. */
export function ProgressGrid({ answers, currentItemId, onNavigate, totalItems }: Props) {
  return (
    <div className="overflow-x-auto py-1">
      <ButtonGroup aria-label="Artwork progress" className="mx-auto min-w-max">
        {Array.from({ length: totalItems }, (_, index) => index + 1).map(itemId => (
          <button
            aria-label={`Go to item ${itemId}`}
            className={cx(
              "group relative flex h-4 w-4 items-center justify-center rounded-full border text-[0.6rem] font-medium transition",
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
            <span className="pointer-events-none absolute -top-7 rounded bg-slate-950 px-1.5 py-0.5 text-xs text-white opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100">
              {itemId}
            </span>
          </button>
        ))}
      </ButtonGroup>
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
