import { IconCheck, IconX } from "@tabler/icons-react"

/** Render the correctness indicator for a results item. */
export function AnswerIndicator({ isCorrect, label = true }: Props) {
  return (
    <span
      aria-label={
        label ?
          isCorrect ?
            "Correct answer"
          : "Incorrect answer"
        : undefined
      }
      className={
        isCorrect ?
          "inline-flex rounded-full bg-emerald-600 p-0.5 text-white"
        : "inline-flex rounded-full bg-red-600 p-0.5 text-white"
      }
    >
      {isCorrect ?
        <IconCheck aria-hidden="true" size={12} />
      : <IconX aria-hidden="true" size={12} />}
    </span>
  )
}

type Props = {
  /** Whether the user answered correctly. */
  isCorrect: boolean
  /** Whether to expose a screen-reader label. */
  label?: boolean
}
