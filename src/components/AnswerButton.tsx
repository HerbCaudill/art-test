import { cx } from "../lib/cx"
import type { AnswerLabel } from "../art/types"

/** Render one Human or AI answer choice. */
export function AnswerButton({ disabled, label, onSelect, selected }: Props) {
  return (
    <button
      className={cx(
        "rounded-2xl border px-6 py-3 text-base font-semibold transition",
        selected ?
          "border-slate-950 bg-slate-950 text-white"
        : "border-slate-300 bg-white text-slate-950 hover:bg-slate-100",
        disabled && "cursor-not-allowed opacity-60",
      )}
      disabled={disabled}
      onClick={() => onSelect(label)}
      type="button"
    >
      {label === "human" ? "🧑‍🎨 Human" : "🤖 AI"}
      <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
        {label === "human" ? "H" : "A"}
      </span>
    </button>
  )
}

type Props = {
  /** Whether the button is disabled. */
  disabled: boolean
  /** The answer represented by the button. */
  label: AnswerLabel
  /** Called when the user selects the answer. */
  onSelect: (label: AnswerLabel) => void
  /** Whether this answer is selected. */
  selected: boolean
}
