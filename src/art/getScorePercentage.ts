import type { ArtTestScore } from "./types"

/** Get a whole-number score percentage. */
export function getScorePercentage(
  /** The raw score. */
  score: ArtTestScore,
): number {
  return Math.round((score.correct / score.total) * 100)
}
