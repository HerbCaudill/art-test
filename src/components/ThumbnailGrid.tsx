import { useState } from "react"
import { ThumbnailButton } from "./ThumbnailButton"
import type { ArtTestItem, UserAnswers } from "../art/types"

/** Render one grouped answer-key thumbnail grid. */
export function ThumbnailGrid({ answers, ariaLabel, items, title }: Props) {
  const [activeItemId, setActiveItemId] = useState<number | null>(null)

  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <div aria-label={ariaLabel} className="mt-3 grid grid-cols-5 gap-1 sm:grid-cols-8">
        {items.map((item, index) => {
          const isIncorrect = answers[item.id] !== item.trueLabel

          return (
            <ThumbnailButton
              isIncorrect={isIncorrect}
              item={item}
              key={item.id}
              onHide={() => setActiveItemId(null)}
              onShow={() => setActiveItemId(item.id)}
              showDetails={activeItemId === item.id}
              side={index % 8 > 3 ? "left" : "right"}
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
  /** Visible group heading. */
  title: string
}
