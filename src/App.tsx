import { useEffect, useMemo, useState } from "react"
import { artTestItems } from "./art/artTestItems"
import { attemptStorageKey } from "./art/constants"
import { createEmptyAttempt } from "./art/createEmptyAttempt"
import { loadAttempt } from "./art/loadAttempt"
import { resetAttempt } from "./art/resetAttempt"
import { saveAttempt } from "./art/saveAttempt"
import type { AnswerLabel, ArtTestAttempt } from "./art/types"
import { IntroPanel } from "./components/IntroPanel"
import { ResultsView } from "./components/ResultsView"
import { TestView } from "./components/TestView"

/** Render the AI Art Turing Test app. */
export function App() {
  const storage = window.localStorage
  const [attempt, setAttempt] = useState<ArtTestAttempt>(() =>
    loadAttempt(storage, attemptStorageKey),
  )
  const currentItem = useMemo(
    () => artTestItems.find(item => item.id === attempt.currentItemId) ?? artTestItems[0],
    [attempt.currentItemId],
  )

  useEffect(() => {
    saveAttempt(storage, attemptStorageKey, attempt)
  }, [attempt, storage])

  /** Save the selected answer for the current item. */
  const handleAnswer = (answer: AnswerLabel) => {
    if (attempt.submitted) {
      return
    }

    setAttempt({
      ...attempt,
      answers: {
        ...attempt.answers,
        [currentItem.id]: answer,
      },
    })
  }

  /** Navigate to another item by id. */
  const handleNavigate = (itemId: number) => {
    setAttempt({
      ...attempt,
      currentItemId: itemId,
    })
  }

  /** Mark the attempt submitted so results can be shown. */
  const handleSubmit = () => {
    setAttempt({
      ...attempt,
      submitted: true,
    })
  }

  /** Clear the saved attempt and return to the first item. */
  const handleStartOver = () => {
    resetAttempt(storage, attemptStorageKey)
    setAttempt(createEmptyAttempt())
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl space-y-6">
        {attempt.submitted ?
          <ResultsView attempt={attempt} items={artTestItems} onStartOver={handleStartOver} />
        : <>
            <IntroPanel />
            <TestView
              attempt={attempt}
              item={currentItem}
              items={artTestItems}
              onAnswer={handleAnswer}
              onNavigate={handleNavigate}
              onSubmit={handleSubmit}
            />
          </>
        }
      </div>
    </main>
  )
}
