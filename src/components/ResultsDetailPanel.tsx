import { AnswerIndicator } from "./AnswerIndicator"
import type { ArtTestItem, UserAnswers } from "../art/types"

/** Render the fixed selected-artwork detail panel on the results page. */
export function ResultsDetailPanel({ answers, item, onNext, onPrevious }: Props) {
  const label = item.trueLabel === "human" ? "🧑‍🎨 Human art" : "🤖 AI art"
  const isCorrect = answers[item.id] === item.trueLabel

  return (
    <aside
      aria-label="Artwork details"
      className="fixed top-0 right-0 z-20 flex h-screen w-96 max-w-[42vw] flex-col border-l border-slate-200 bg-white shadow-xl"
    >
      <img
        alt="Selected artwork"
        className="max-h-[58vh] w-full object-contain"
        src={item.imagePath}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-slate-950">{label}</h2>
          <AnswerIndicator isCorrect={isCorrect} />
        </div>
        <p className="text-sm text-slate-700">{item.attribution}</p>
        <div className="mt-auto flex justify-between gap-3">
          <button
            aria-label="Previous artwork"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium"
            onClick={onPrevious}
            type="button"
          >
            Previous
          </button>
          <button
            aria-label="Next artwork"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium"
            onClick={onNext}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </aside>
  )
}

type Props = {
  /** User answers keyed by item id. */
  answers: UserAnswers
  /** The selected artwork item. */
  item: ArtTestItem
  /** Select the next artwork. */
  onNext: () => void
  /** Select the previous artwork. */
  onPrevious: () => void
}
