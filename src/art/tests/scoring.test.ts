import { describe, expect, it } from "vitest"
import { getAnsweredCount } from "../getAnsweredCount"
import { getScore } from "../getScore"
import { isAttemptComplete } from "../isAttemptComplete"
import type { ArtTestItem, UserAnswers } from "../types"

const items: ArtTestItem[] = [
  {
    id: 1,
    title: "Human image",
    trueLabel: "human",
    imagePath: "/art/0.jpg",
    width: 100,
    height: 100,
    attribution: "Human source",
  },
  {
    id: 2,
    title: "AI image",
    trueLabel: "ai",
    imagePath: "/art/1.png",
    width: 100,
    height: 100,
    attribution: "AI source",
  },
]

describe("getScore", () => {
  it("counts correct answers against the full item count", () => {
    const answers: UserAnswers = { 1: "human", 2: "human" }

    expect(getScore(items, answers)).toEqual({ correct: 1, total: 2 })
  })
})

describe("getAnsweredCount", () => {
  it("counts only answers matching known items", () => {
    const answers: UserAnswers = { 1: "human", 3: "ai" }

    expect(getAnsweredCount(items, answers)).toBe(1)
  })
})

describe("isAttemptComplete", () => {
  it("requires every known item to be answered", () => {
    expect(isAttemptComplete(items, { 1: "human" })).toBe(false)
    expect(isAttemptComplete(items, { 1: "human", 2: "ai" })).toBe(true)
  })
})
