import { cx } from "../lib/cx"

/** Render the compact 0% to 100% score axis. */
export function ScoreAxis({ percentage }: Props) {
  return (
    <div className="mx-auto mt-6 max-w-xl px-4 pt-8 pb-10" aria-label="Score axis">
      <div className="relative h-2 rounded-full bg-slate-200">
        <div
          className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 bg-slate-950"
          style={{ left: `${percentage}%` }}
        />
        <div
          className="absolute bottom-5 -translate-x-1/2 text-sm font-semibold text-slate-950"
          style={{ left: `${percentage}%` }}
        >
          your result: {percentage}%
        </div>
        {scoreAxisLabels.map(label => (
          <div
            className={cx(
              "absolute top-5 -translate-x-1/2 text-xs whitespace-nowrap text-slate-600",
              label.position === 0 && "translate-x-0",
              label.position === 100 && "-translate-x-full",
            )}
            key={label.text}
            style={{ left: `${label.position}%` }}
          >
            {label.text}
          </div>
        ))}
      </div>
    </div>
  )
}

const scoreAxisLabels = [
  { position: 0, text: "all wrong" },
  { position: 50, text: "random chance" },
  { position: 62, text: "mean result" },
  { position: 100, text: "all correct" },
]

type Props = {
  /** The user's score as a whole-number percentage. */
  percentage: number
}
