import { scoreAxisWidth, scoreAxisY } from "./constants"
import { getScoreAxisBubbleLayout } from "./getScoreAxisBubbleLayout"

/** Render the compact 0% to 100% score axis. */
export function ScoreAxis({ percentage }: Props) {
  const labels = getScoreAxisBubbleLayout(percentage)

  return (
    <div className="mx-auto mt-6 max-w-xl px-4 pt-2 pb-6" aria-label="Score axis">
      <svg className="h-auto w-full overflow-visible" viewBox="0 0 576 152" role="img">
        <line
          x1="0"
          x2={scoreAxisWidth}
          y1={scoreAxisY}
          y2={scoreAxisY}
          className="stroke-slate-200"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {labels.map(label => (
          <g key={label.id}>
            <line
              x1={label.leaderStart.x}
              x2={label.leaderEnd.x}
              y1={label.leaderStart.y}
              y2={label.leaderEnd.y}
              className="stroke-slate-400"
              strokeWidth="1.5"
            />
            <circle
              aria-label={`${label.label.replace(/: \d+%$/, "")} score marker`}
              cx={label.axisX}
              cy={label.axisY}
              r={label.dotRadius}
              className={label.id === "your-result" ? "fill-slate-950" : "fill-slate-500"}
            />
            <foreignObject
              height={label.bubbleHeight}
              width={label.bubbleWidth}
              x={label.bubbleLeft - label.bubbleWidth / 2}
              y={label.bubbleTop}
            >
              <div
                className={
                  label.id === "your-result" ?
                    "flex h-full items-center justify-center rounded-full border border-slate-950 bg-white px-3 text-sm font-semibold whitespace-nowrap text-slate-950"
                  : "flex h-full items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-xs whitespace-nowrap text-slate-600"
                }
              >
                {label.label}
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>
    </div>
  )
}

type Props = {
  /** The user's score as a whole-number percentage. */
  percentage: number
}
