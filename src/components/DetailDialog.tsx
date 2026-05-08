import type { ArtTestItem, UserAnswers } from "../art/types"

/** Render the selected answer-key item detail dialog. */
export function DetailDialog({ answers, item, onClose }: Props) {
  if (!item) {
    return null
  }

  const userAnswer = answers[item.id] === "human" ? "Human" : "AI"
  const correctAnswer = item.trueLabel === "human" ? "Human" : "AI"

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-slate-950/70 p-4"
      onClick={onClose}
    >
      <section
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white p-6 shadow-xl"
        onClick={event => event.stopPropagation()}
        role="dialog"
        aria-label={item.title}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
              Item {item.id}
            </p>
            <h2 className="text-2xl font-semibold text-slate-950">{item.title}</h2>
          </div>
          <button
            className="rounded-xl border border-slate-300 px-3 py-2 font-medium"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
        <img
          alt={item.title}
          className="mt-4 max-h-[55vh] w-full rounded-2xl bg-slate-100 object-contain"
          src={item.imagePath}
        />
        <div className="mt-4 grid gap-2 text-slate-700 sm:grid-cols-2">
          <p>Your answer: {userAnswer}</p>
          <p>Correct answer: {correctAnswer}</p>
        </div>
        <p className="mt-4 text-slate-700">
          {item.attributionUrl ?
            <a className="font-medium underline" href={item.attributionUrl}>
              {item.attribution}
            </a>
          : item.attribution}
        </p>
        {item.commentary ?
          <p className="mt-3 text-slate-700">{item.commentary}</p>
        : null}
      </section>
    </div>
  )
}

type Props = {
  /** User answers keyed by item id. */
  answers: UserAnswers
  /** The selected item, if any. */
  item: ArtTestItem | null
  /** Close the dialog. */
  onClose: () => void
}
