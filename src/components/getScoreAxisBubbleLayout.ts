import {
  scoreAxisBubbleGap,
  scoreAxisBubbleHeight,
  scoreAxisBubbleWidth,
  scoreAxisLaneGap,
  scoreAxisWidth,
  scoreAxisY,
} from "./constants"
import { clamp } from "./clamp"
import { getScoreAxisLabels } from "./getScoreAxisLabels"
import type { ScoreAxisBubbleLayoutItem } from "./scoreAxisTypes"

/** Lay out score axis bubbles. */
export function getScoreAxisBubbleLayout(
  /** The user's score as a whole-number percentage. */
  percentage: number,
): ScoreAxisBubbleLayoutItem[] {
  const labels = getScoreAxisLabels(percentage)
  const userLabel = labels.find(label => label.id === "your-result")!
  const comparisonLabels = labels.filter(label => label.id !== "your-result")
  const sortedComparisonLabels = [...comparisonLabels].sort(
    (first, second) => first.position - second.position,
  )
  const laneRightEdges: number[] = []
  const userAxisX = (userLabel.position / 100) * scoreAxisWidth
  const userBubbleLeft = clamp(
    userAxisX,
    scoreAxisBubbleWidth / 2,
    scoreAxisWidth - scoreAxisBubbleWidth / 2,
  )
  const userBubbleTop = scoreAxisY - scoreAxisBubbleHeight - scoreAxisBubbleGap
  const positionedItems: ScoreAxisBubbleLayoutItem[] = [
    {
      axisX: userAxisX,
      axisY: scoreAxisY,
      bubbleHeight: scoreAxisBubbleHeight,
      bubbleLeft: userBubbleLeft,
      bubbleTop: userBubbleTop,
      bubbleWidth: scoreAxisBubbleWidth,
      dotRadius: 5,
      id: userLabel.id,
      label: `${userLabel.text}: ${userLabel.position}%`,
      leaderEnd: { x: userAxisX, y: scoreAxisY },
      leaderStart: { x: userBubbleLeft, y: userBubbleTop + scoreAxisBubbleHeight },
    },
    ...sortedComparisonLabels.map(label => {
      const axisX = (label.position / 100) * scoreAxisWidth
      const bubbleLeft = clamp(
        axisX,
        scoreAxisBubbleWidth / 2,
        scoreAxisWidth - scoreAxisBubbleWidth / 2,
      )
      const lane = laneRightEdges.findIndex(
        rightEdge => bubbleLeft - scoreAxisBubbleWidth / 2 >= rightEdge,
      )
      const resolvedLane = lane === -1 ? laneRightEdges.length : lane
      laneRightEdges[resolvedLane] = bubbleLeft + scoreAxisBubbleWidth / 2 + scoreAxisBubbleGap
      const bubbleTop =
        scoreAxisY + scoreAxisBubbleGap + resolvedLane * (scoreAxisBubbleHeight + scoreAxisLaneGap)

      return {
        axisX,
        axisY: scoreAxisY,
        bubbleHeight: scoreAxisBubbleHeight,
        bubbleLeft,
        bubbleTop,
        bubbleWidth: scoreAxisBubbleWidth,
        dotRadius: 5,
        id: label.id,
        label: `${label.text}: ${label.position}%`,
        leaderEnd: { x: axisX, y: scoreAxisY },
        leaderStart: { x: bubbleLeft, y: bubbleTop },
      }
    }),
  ]

  return labels.map(label => positionedItems.find(item => item.id === label.id)!)
}
