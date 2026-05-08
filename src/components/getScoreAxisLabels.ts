import type { ScoreAxisLabel } from "./scoreAxisTypes"

/** Return the fixed score-axis labels plus the user's score. */
export function getScoreAxisLabels(
  /** The user's score as a whole-number percentage. */
  percentage: number,
): ScoreAxisLabel[] {
  return [
    { id: "your-result", position: percentage, text: "your result" },
    { id: "all-wrong", position: 0, text: "all wrong" },
    { id: "random-chance", position: 50, text: "random chance" },
    { id: "mean-result", position: 62, text: "mean result" },
    { id: "all-correct", position: 100, text: "all correct" },
  ]
}
