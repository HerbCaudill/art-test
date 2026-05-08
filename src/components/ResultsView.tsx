import { useState } from "react"
import { DetailDialog } from "./DetailDialog"
import { ThumbnailGrid } from "./ThumbnailGrid"
import { getScore } from "../art/getScore"
import type { ArtTestAttempt, ArtTestItem } from "../art/types"

/** Render the score summary and grouped answer key. */
export function ResultsView({ attempt, items, onStartOver }: Props) {
  const [selectedItem, setSelectedItem] = useState<ArtTestItem | null>(null)
  const score = getScore(items, attempt.answers)
  const humanItems = items.filter(item => item.trueLabel === "human")
  const aiItems = items.filter(item => item.trueLabel === "ai")

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">Your score</h1>
        <p className="mt-3 text-5xl font-semibold text-slate-950">
          {score.correct} / {score.total}
        </p>
        <p className="mt-3 text-slate-600">Answers are locked. Start over to try again.</p>
        <button
          className="mt-5 rounded-2xl border border-slate-300 px-5 py-3 font-semibold"
          onClick={onStartOver}
          type="button"
        >
          Start over
        </button>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <ThumbnailGrid
          answers={attempt.answers}
          ariaLabel="Human art answer key"
          items={humanItems}
          onSelect={setSelectedItem}
          title="Human art"
        />
        <ThumbnailGrid
          answers={attempt.answers}
          ariaLabel="AI art answer key"
          items={aiItems}
          onSelect={setSelectedItem}
          title="AI art"
        />
      </div>
      <DetailDialog
        answers={attempt.answers}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  )
}

type Props = {
  /** The submitted attempt. */
  attempt: ArtTestAttempt
  /** All test items. */
  items: ArtTestItem[]
  /** Reset and begin again. */
  onStartOver: () => void
}
