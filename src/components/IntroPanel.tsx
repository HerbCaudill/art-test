/** Render the short introduction and source links. */
export function IntroPanel({ onStart }: Props) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center py-10">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">AI art Turing test</h1>
      <p className="mt-4 text-lg text-slate-700">
        An unofficial recreation of Scott Alexander&apos;s AI Art Turing Test. View one image at a
        time, guess Human or AI, then see your score after the final vote.
      </p>
      <p className="mt-4 text-sm text-slate-600">
        Credits:{" "}
        <a
          className="font-medium text-slate-950 underline"
          href="https://www.astralcodexten.com/p/ai-art-turing-test"
        >
          original test
        </a>{" "}
        and{" "}
        <a
          className="font-medium text-slate-950 underline"
          href="https://www.astralcodexten.com/p/how-did-you-do-on-the-ai-art-turing"
        >
          results post
        </a>
        .
      </p>
      <button
        className="mt-8 w-fit rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
        onClick={onStart}
        type="button"
      >
        Start
      </button>
    </section>
  )
}

type Props = {
  /** Called when the user starts the test. */
  onStart: () => void
}
