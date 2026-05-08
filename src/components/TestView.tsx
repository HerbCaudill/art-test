import { AnswerButton } from "./AnswerButton"
import { ProgressGrid } from "./ProgressGrid"
import { ButtonGroup } from "./ui/button-group"
import type { AnswerLabel, ArtTestAttempt, ArtTestItem } from "../art/types"

/** Render the active one-image-at-a-time test flow. */
export function TestView({ attempt, item, items, onAnswer, onNavigate }: Props) {
  return (
    <section className="pb-24">
      <header className="sticky top-0 z-10 flex justify-center bg-slate-50/90 py-3 backdrop-blur">
        <ButtonGroup aria-label="Vote">
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
        </ButtonGroup>
      </header>
      <div className="flex justify-center">
        <img
          alt={`Artwork ${item.id}`}
          className="max-h-[72vh] max-w-full object-contain"
          src={item.imagePath}
        />
      </div>
      <footer className="fixed inset-x-0 bottom-0 z-10 bg-slate-50/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2">
          <div className="flex w-full items-center justify-between gap-3">
            <button
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
              disabled={item.id === 1}
              onClick={() => onNavigate(item.id - 1)}
              type="button"
            >
              Previous
              <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
                P / ←
              </span>
            </button>
            <button
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
              disabled={item.id === items.length}
              onClick={() => onNavigate(item.id + 1)}
              type="button"
            >
              Next
              <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
                N / →
              </span>
            </button>
          </div>
          <ProgressGrid
            answers={attempt.answers}
            currentItemId={item.id}
            onNavigate={onNavigate}
            totalItems={items.length}
          />
        </div>
      </footer>
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
}
