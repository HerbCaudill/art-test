import { IconX } from "@tabler/icons-react"
import type { ArtTestItem, UserAnswers } from "../art/types"

/** Render one grouped answer-key thumbnail grid. */
export function ThumbnailGrid({ answers, ariaLabel, items, onSelect, title }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <div
        aria-label={ariaLabel}
        className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
      >
        {items.map(item => {
          const isIncorrect = answers[item.id] !== item.trueLabel

          return (
            <button
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm focus:ring-2 focus:ring-slate-950 focus:outline-none"
              key={item.id}
              onClick={() => onSelect(item)}
              onFocus={() => onSelect(item)}
              onMouseEnter={() => onSelect(item)}
              type="button"
            >
              <img
                alt=""
                className="h-32 w-full object-cover transition group-hover:scale-105"
                src={item.imagePath}
              />
              {isIncorrect ?
                <span
                  aria-label="Incorrect answer"
                  className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white"
                >
                  <IconX aria-hidden="true" size={20} />
                </span>
              : null}
              <span className="block p-3 text-sm font-medium text-slate-950">
                {item.id}. {item.title}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

type Props = {
  /** User answers keyed by item id. */
  answers: UserAnswers
  /** Accessible label for the grid. */
  ariaLabel: string
  /** Items in this answer-key group. */
  items: ArtTestItem[]
  /** Called when an item is previewed or opened. */
  onSelect: (item: ArtTestItem) => void
  /** Visible group heading. */
  title: string
}
