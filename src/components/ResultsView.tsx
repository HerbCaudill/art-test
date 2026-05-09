import { useEffect, useState } from "react"
import { CreditsLinks } from "./CreditsLinks"
import { ResultsDetailPanel } from "./ResultsDetailPanel"
import { ScoreAxis } from "./ScoreAxis"
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
    <section className="grid min-h-screen w-full pb-14 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="min-w-0 px-4 pt-8 pb-2 lg:pb-20">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="text-center">
            <ScoreAxis percentage={scorePercentage} />
          </div>
          <div className="hidden gap-8 lg:grid lg:grid-cols-2">
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
        </div>
      </div>
      <ResultsDetailPanel
        answers={attempt.answers}
        item={selectedItem}
        onNext={handleNext}
        onPrevious={handlePrevious}
        totalItems={items.length}
      />
      <footer className="fixed right-0 bottom-0 left-0 z-10 border-t border-slate-200 bg-slate-50/95 px-4 py-2 text-center backdrop-blur lg:right-96">
        <div className="mx-auto flex w-full max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <CreditsLinks />
          <button
            className="rounded-full border border-slate-300 px-2 py-0.5 text-xs font-medium whitespace-nowrap sm:text-sm"
            onClick={onStartOver}
            type="button"
          >
            Start over
          </button>
        </div>
      </footer>
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
