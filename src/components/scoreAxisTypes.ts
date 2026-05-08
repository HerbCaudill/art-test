export type ScoreAxisBubbleLayoutItem = {
  /** The marker x-coordinate on the axis. */
  axisX: number
  /** The marker y-coordinate on the axis. */
  axisY: number
  /** The bubble height in pixels. */
  bubbleHeight: number
  /** The bubble center x-coordinate in pixels. */
  bubbleLeft: number
  /** The bubble top y-coordinate in pixels. */
  bubbleTop: number
  /** The bubble width in pixels. */
  bubbleWidth: number
  /** The dot radius in pixels. */
  dotRadius: number
  /** The stable label identifier. */
  id: string
  /** The label text. */
  label: string
  /** The leader line endpoint on the axis dot. */
  leaderEnd: ScoreAxisPoint
  /** The leader line start point at the bubble. */
  leaderStart: ScoreAxisPoint
}

export type ScoreAxisLabel = {
  /** The stable label identifier. */
  id: string
  /** The label position as a percentage along the axis. */
  position: number
  /** The label text without a percentage suffix. */
  text: string
}

export type ScoreAxisPoint = {
  /** The x-coordinate in pixels. */
  x: number
  /** The y-coordinate in pixels. */
  y: number
}
