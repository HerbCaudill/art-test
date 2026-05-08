import { useEffect, useMemo, useState } from "react"
import { artTestItems } from "./art/artTestItems"
import { attemptStorageKey } from "./art/constants"
import { createEmptyAttempt } from "./art/createEmptyAttempt"
import { hasAnsweredAllItems } from "./art/hasAnsweredAllItems"
import { hasAttemptProgress } from "./art/hasAttemptProgress"
import { loadAttempt } from "./art/loadAttempt"
import { resetAttempt } from "./art/resetAttempt"
import { saveAttempt } from "./art/saveAttempt"
import type { AnswerLabel, ArtTestAttempt } from "./art/types"
import { IntroPanel } from "./components/IntroPanel"
import { ResultsView } from "./components/ResultsView"
import { TestView } from "./components/TestView"
import { isTypingTarget } from "./lib/isTypingTarget"

/** Render the AI Art Turing Test app. */
export function App() {
  const storage = window.localStorage
  const [attempt, setAttempt] = useState<ArtTestAttempt>(() =>
    loadAttempt(storage, attemptStorageKey),
  )
  const [hasStarted, setHasStarted] = useState(() => hasAttemptProgress(attempt))
  const currentItem = useMemo(
    () => artTestItems.find(item => item.id === attempt.currentItemId) ?? artTestItems[0],
    [attempt.currentItemId],
  )

  useEffect(() => {
    saveAttempt(storage, attemptStorageKey, attempt)
  }, [attempt, storage])

  /** Save the selected answer and advance the test flow. */
  const handleAnswer = (answer: AnswerLabel) => {
    setAttempt(currentAttempt => {
      if (currentAttempt.submitted) {
        return currentAttempt
      }

      const answers = {
        ...currentAttempt.answers,
        [currentItem.id]: answer,
      }
      const submitted = hasAnsweredAllItems(answers)

      return {
        ...currentAttempt,
        answers,
        currentItemId:
          submitted ? currentItem.id : Math.min(currentItem.id + 1, artTestItems.length),
        submitted,
      }
    })
  }

  useEffect(() => {
    /** Handle start screen, test navigation, and voting keyboard shortcuts. */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (attempt.submitted || isTypingTarget(document.activeElement)) {
        return
      }

      const key = event.key.toLowerCase()

      if (!hasStarted) {
        if (key === "enter") {
          event.preventDefault()
          setHasStarted(true)
        }
        return
      }

      if (key === "p" || key === "arrowleft") {
        event.preventDefault()
        setAttempt(currentAttempt => ({
          ...currentAttempt,
          currentItemId: Math.max(currentAttempt.currentItemId - 1, 1),
        }))
        return
      }

      if (key === "n" || key === "arrowright") {
        event.preventDefault()
        setAttempt(currentAttempt => ({
          ...currentAttempt,
          currentItemId: Math.min(currentAttempt.currentItemId + 1, artTestItems.length),
        }))
        return
      }

      if (key === "h") {
        event.preventDefault()
        handleAnswer("human")
        return
      }

      if (key === "a") {
        event.preventDefault()
        handleAnswer("ai")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [attempt.submitted, handleAnswer, hasStarted])

  /** Navigate to another item by id. */
  const handleNavigate = (itemId: number) => {
    setAttempt({
      ...attempt,
      currentItemId: itemId,
    })
  }

  /** Start the test from the introduction screen. */
  const handleStart = () => {
    setHasStarted(true)
  }

  /** Clear the saved attempt and return to the first item. */
  const handleStartOver = () => {
    resetAttempt(storage, attemptStorageKey)
    setAttempt(createEmptyAttempt())
    setHasStarted(false)
  }

  if (attempt.submitted) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <ResultsView attempt={attempt} items={artTestItems} onStartOver={handleStartOver} />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl space-y-6">
        {hasStarted ?
          <TestView
            attempt={attempt}
            item={currentItem}
            items={artTestItems}
            onAnswer={handleAnswer}
            onNavigate={handleNavigate}
          />
        : <IntroPanel onStart={handleStart} />}
      </div>
    </main>
  )
}
