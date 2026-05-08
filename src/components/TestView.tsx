import { AnswerButton } from "./AnswerButton"
import { ProgressGrid } from "./ProgressGrid"
import { getAnsweredCount } from "../art/getAnsweredCount"
import { isAttemptComplete } from "../art/isAttemptComplete"
import type { AnswerLabel, ArtTestAttempt, ArtTestItem } from "../art/types"

/** Render the active one-image-at-a-time test flow. */
export function TestView({ attempt, item, items, onAnswer, onNavigate, onSubmit }: Props) {
  const answeredCount = getAnsweredCount(items, attempt.answers)
  const isComplete = isAttemptComplete(items, attempt.answers)

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Item {item.id} of {items.length}
        </p>
        <p className="text-sm text-slate-600">
          {answeredCount} of {items.length} answered
        </p>
      </div>
      <div className="mt-5 flex justify-center rounded-2xl bg-slate-100 p-3">
        <img
          alt={`Artwork ${item.id}`}
          className="max-h-[65vh] max-w-full object-contain"
          src={item.imagePath}
        />
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <AnswerButton
          disabled={attempt.submitted}
          label="human"
          onSelect={onAnswer}
          selected={attempt.answers[item.id] === "human"}
        />
        <AnswerButton
          disabled={attempt.submitted}
          label="ai"
          onSelect={onAnswer}
          selected={attempt.answers[item.id] === "ai"}
        />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          className="rounded-xl border border-slate-300 px-4 py-2 font-medium disabled:opacity-50"
          disabled={item.id === 1}
          onClick={() => onNavigate(item.id - 1)}
          type="button"
        >
          Previous
        </button>
        <button
          className="rounded-xl border border-slate-300 px-4 py-2 font-medium disabled:opacity-50"
          disabled={item.id === items.length}
          onClick={() => onNavigate(item.id + 1)}
          type="button"
        >
          Next
        </button>
      </div>
      <div className="mt-5">
        <ProgressGrid
          answers={attempt.answers}
          currentItemId={item.id}
          onNavigate={onNavigate}
          totalItems={items.length}
        />
      </div>
      <button
        className="mt-5 w-full rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={!isComplete}
        onClick={onSubmit}
        type="button"
      >
        See my score
      </button>
    </section>
  )
}

type Props = {
  /** The current saved attempt. */
  attempt: ArtTestAttempt
  /** The current item. */
  item: ArtTestItem
  /** All test items. */
  items: ArtTestItem[]
  /** Called when an answer is selected. */
  onAnswer: (answer: AnswerLabel) => void
  /** Called when navigation changes. */
  onNavigate: (itemId: number) => void
  /** Called when the completed attempt is submitted. */
  onSubmit: () => void
}
