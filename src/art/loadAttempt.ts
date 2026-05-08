import { createEmptyAttempt } from "./createEmptyAttempt"
import type { AnswerLabel, ArtTestAttempt, UserAnswers } from "./types"

/** Load a saved test attempt from storage, returning an empty attempt for invalid data. */
export function loadAttempt(
  /** The storage implementation */
  storage: Storage,
  /** The storage key */
  storageKey: string,
): ArtTestAttempt {
  const savedValue = storage.getItem(storageKey)

  if (!savedValue) {
    return createEmptyAttempt()
  }

  try {
    const parsedValue: unknown = JSON.parse(savedValue)

    return isArtTestAttempt(parsedValue) ? parsedValue : createEmptyAttempt()
  } catch {
    return createEmptyAttempt()
  }
}

/** Check whether a parsed value is a valid saved attempt. */
function isArtTestAttempt(
  /** The parsed storage value */
  value: unknown,
): value is ArtTestAttempt {
  if (!value || typeof value !== "object") {
    return false
  }

  const attempt = value as Partial<ArtTestAttempt>

  return (
    isUserAnswers(attempt.answers) &&
    typeof attempt.currentItemId === "number" &&
    Number.isInteger(attempt.currentItemId) &&
    attempt.currentItemId >= 1 &&
    typeof attempt.submitted === "boolean"
  )
}

/** Check whether a parsed value is a valid answer map. */
function isUserAnswers(
  /** The parsed answers value */
  value: unknown,
): value is UserAnswers {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false
  }

  return Object.entries(value).every(
    ([itemId, answer]) => Number.isInteger(Number(itemId)) && isAnswerLabel(answer),
  )
}

/** Check whether a parsed value is an answer label. */
function isAnswerLabel(
  /** The parsed answer value */
  value: unknown,
): value is AnswerLabel {
  return value === "human" || value === "ai"
}
