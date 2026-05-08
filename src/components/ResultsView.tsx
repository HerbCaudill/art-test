import { useEffect, useState } from "react"
import { ResultsDetailPanel } from "./ResultsDetailPanel"
import { ThumbnailGrid } from "./ThumbnailGrid"
import { getAdjacentItem } from "../art/getAdjacentItem"
import { getScore } from "../art/getScore"
import { getScorePercentage } from "../art/getScorePercentage"
import type { ArtTestAttempt, ArtTestItem } from "../art/types"
import { isTypingTarget } from "../lib/isTypingTarget"

/** Render the score summary and grouped answer key. */
export function ResultsView({ attempt, items, onStartOver }: Props) {
  const [selectedItem, setSelectedItem] = useState(() => items[0])
  const score = getScore(items, attempt.answers)
  const scorePercentage = getScorePercentage(score)
  const humanItems = items.filter(item => item.trueLabel === "human")
  const aiItems = items.filter(item => item.trueLabel === "ai")

  /** Select the next result item. */
  const handleNext = () => {
    setSelectedItem(currentItem => getAdjacentItem(items, currentItem.id, "next"))
  }

  /** Select the previous result item. */
  const handlePrevious = () => {
    setSelectedItem(currentItem => getAdjacentItem(items, currentItem.id, "previous"))
  }

  useEffect(() => {
    /** Handle result detail panel keyboard navigation. */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(document.activeElement)) {
        return
      }

      const key = event.key.toLowerCase()

      if (key === "p" || key === "arrowleft") {
        event.preventDefault()
        handlePrevious()
        return
      }

      if (key === "n" || key === "arrowright") {
        event.preventDefault()
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <section className="space-y-8 pr-[28rem]">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-slate-950">Your score</h1>
        <p className="mt-3 text-5xl font-semibold text-slate-950">{scorePercentage}% correct</p>
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
          selectedItemId={selectedItem.id}
          title="🧑‍🎨 Human art"
        />
        <ThumbnailGrid
          answers={attempt.answers}
          ariaLabel="AI art answer key"
          items={aiItems}
          onSelect={setSelectedItem}
          selectedItemId={selectedItem.id}
          title="🤖 AI art"
        />
      </div>
      <ResultsDetailPanel item={selectedItem} onNext={handleNext} onPrevious={handlePrevious} />
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
