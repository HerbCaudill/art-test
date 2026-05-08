/** A Human or AI answer choice. */
export type AnswerLabel = "human" | "ai"

/** One artwork from the AI Art Turing Test. */
export type ArtTestItem = {
  /** The original one-based item number. */
  id: number
  /** The title shown after scoring. */
  title: string
  /** The correct Human or AI label. */
  trueLabel: AnswerLabel
  /** The local image path under public assets. */
  imagePath: string
  /** The displayed image width in pixels. */
  width: number
  /** The displayed image height in pixels. */
  height: number
  /** The attribution text from Scott's results post. */
  attribution: string
  /** The optional attribution link. */
  attributionUrl?: string
  /** Scott's optional item commentary from the results post. */
  commentary?: string
  /** The source image URL used to verify the local asset. */
  originalUrl?: string
}

/** User answers keyed by original item number. */
export type UserAnswers = Record<number, AnswerLabel>

/** A saved test attempt. */
export type ArtTestAttempt = {
  /** Answers keyed by original item number. */
  answers: UserAnswers
  /** The current original item number. */
  currentItemId: number
  /** Whether the user has submitted the attempt for scoring. */
  submitted: boolean
}

/** A score for a completed or in-progress attempt. */
export type ArtTestScore = {
  /** Number of answers matching the key. */
  correct: number
  /** Number of test items. */
  total: number
}
