import { ThumbnailButton } from "./ThumbnailButton"
import type { ArtTestItem, UserAnswers } from "../art/types"

/** Render one grouped answer-key thumbnail grid. */
export function ThumbnailGrid({
  answers,
  ariaLabel,
  items,
  onSelect,
  selectedItemId,
  title,
}: Props) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <div aria-label={ariaLabel} className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-6">
        {items.map(item => {
          const isIncorrect = answers[item.id] !== item.trueLabel

          return (
            <ThumbnailButton
              isIncorrect={isIncorrect}
              isSelected={selectedItemId === item.id}
              item={item}
              key={item.id}
              onSelect={onSelect}
            />
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
  /** Select an item for details. */
  onSelect: (item: ArtTestItem) => void
  /** The selected item id. */
  selectedItemId: number
  /** Visible group heading. */
  title: string
}
