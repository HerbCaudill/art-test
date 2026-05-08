import { describe, expect, it } from "vitest"
import { getScoreAxisBubbleLayout } from "../getScoreAxisBubbleLayout"

/** Return whether two laid-out bubbles overlap. */
const overlaps = (first: BubbleBounds, second: BubbleBounds) =>
  first.left < second.right &&
  first.right > second.left &&
  first.top < second.bottom &&
  first.bottom > second.top

/** Convert a bubble layout item to pixel bounds. */
const toBounds = (item: ReturnType<typeof getScoreAxisBubbleLayout>[number]): BubbleBounds => ({
  bottom: item.bubbleTop + item.bubbleHeight,
  left: item.bubbleLeft - item.bubbleWidth / 2,
  right: item.bubbleLeft + item.bubbleWidth / 2,
  top: item.bubbleTop,
})

describe("getScoreAxisBubbleLayout", () => {
  it("stacks nearby score labels into non-overlapping bubbles", () => {
    const layout = getScoreAxisBubbleLayout(48)
    const bounds = layout.map(toBounds)

    bounds.forEach((firstBounds, firstIndex) => {
      bounds.slice(firstIndex + 1).forEach(secondBounds => {
        expect(overlaps(firstBounds, secondBounds)).toBe(false)
      })
    })
  })

  it("places only the user result bubble above the axis with breathing room", () => {
    const layout = getScoreAxisBubbleLayout(48)
    const userResult = layout.find(item => item.id === "your-result")!
    const comparisonLabels = layout.filter(item => item.id !== "your-result")

    expect(
      userResult.axisY - (userResult.bubbleTop + userResult.bubbleHeight),
    ).toBeGreaterThanOrEqual(20)
    comparisonLabels.forEach(label => {
      expect(label.bubbleTop - label.axisY).toBeGreaterThanOrEqual(20)
    })
  })

  it("connects every bubble to a dot on the score axis", () => {
    const layout = getScoreAxisBubbleLayout(48)

    layout.forEach(item => {
      expect(item.dotRadius).toBeGreaterThan(0)
      expect(item.leaderStart).not.toEqual(item.leaderEnd)
      expect(item.leaderEnd).toEqual({ x: item.axisX, y: item.axisY })
    })
  })
})

type BubbleBounds = {
  /** The bubble bottom edge in pixels. */
  bottom: number
  /** The bubble left edge in pixels. */
  left: number
  /** The bubble right edge in pixels. */
  right: number
  /** The bubble top edge in pixels. */
  top: number
}
