import { cx } from "../lib/cx"

/** Render the compact 0% to 100% score axis. */
export function ScoreAxis({ percentage }: Props) {
  return (
    <div className="mx-auto mt-6 max-w-xl px-4 pt-10 pb-16" aria-label="Score axis">
      <div className="relative h-2 rounded-full bg-slate-200">
        <div
          aria-label="your result score marker"
          className="absolute top-1/2 h-5 w-0.5 -translate-y-1/2 bg-slate-950"
          style={{ left: `${percentage}%` }}
        />
        <div
          className="absolute bottom-7 -translate-x-1/2 text-sm font-semibold whitespace-nowrap text-slate-950"
          style={{ left: `${percentage}%` }}
        >
          your result: {percentage}%
        </div>
        {scoreAxisLabels.map(label => (
          <div
            className="absolute top-1/2 -translate-x-1/2"
            key={label.text}
            style={{ left: `${label.position}%` }}
          >
            <div
              aria-label={`${label.text} score marker`}
              className="mx-auto h-5 w-0.5 -translate-y-1/2 bg-slate-400"
            />
            <div
              className={cx(
                "absolute top-5 text-xs whitespace-nowrap text-slate-600",
                label.className,
              )}
            >
              {label.text}: {label.position}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const scoreAxisLabels = [
  { className: "left-0", position: 0, text: "all wrong" },
  { className: "right-2", position: 50, text: "random chance" },
  { className: "left-2", position: 62, text: "mean result" },
  { className: "right-0", position: 100, text: "all correct" },
]

type Props = {
  /** The user's score as a whole-number percentage. */
  percentage: number
}
