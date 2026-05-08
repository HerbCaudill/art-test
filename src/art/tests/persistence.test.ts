import { describe, expect, it } from "vitest"
import { createEmptyAttempt } from "../createEmptyAttempt"
import { loadAttempt } from "../loadAttempt"
import { saveAttempt } from "../saveAttempt"
import { resetAttempt } from "../resetAttempt"
import type { ArtTestAttempt } from "../types"

const storageKey = "art-test-unit-attempt"

describe("attempt persistence", () => {
  it("round-trips answers, current item, and submitted state", () => {
    const storage = window.localStorage
    const attempt: ArtTestAttempt = {
      answers: { 1: "human", 2: "ai" },
      currentItemId: 2,
      submitted: true,
    }

    saveAttempt(storage, storageKey, attempt)

    expect(loadAttempt(storage, storageKey)).toEqual(attempt)
  })

  it("falls back to an empty attempt when saved data is missing or invalid", () => {
    const storage = window.localStorage

    resetAttempt(storage, storageKey)
    expect(loadAttempt(storage, storageKey)).toEqual(createEmptyAttempt())

    storage.setItem(storageKey, JSON.stringify({ answers: { 1: "maybe" } }))
    expect(loadAttempt(storage, storageKey)).toEqual(createEmptyAttempt())
  })
})
