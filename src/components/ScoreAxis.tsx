/** Render the user's final score percentage. */
export function ScoreAxis({ percentage }: Props) {
  return (
    <div className="text-center" aria-label="Score summary">
      <p className="text-sm font-medium text-slate-600">Your score</p>
      <p className="mt-1 text-5xl font-bold text-slate-950">{percentage}%</p>
    </div>
  )
}

type Props = {
  /** The user's score as a whole-number percentage. */
  percentage: number
}
