/** Render the short introduction and source links. */
export function IntroPanel() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950">AI art Turing test</h1>
      <p className="mt-3 text-slate-700">
        An unofficial recreation of Scott Alexander&apos;s AI Art Turing Test. View one image at a
        time, guess Human or AI, then score yourself at the end.
      </p>
      <p className="mt-3 text-sm text-slate-600">
        Please follow the original instruction: don&apos;t download, zoom, use reverse image search,
        or use any other tools.
      </p>
      <p className="mt-3 text-sm text-slate-600">
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
    </section>
  )
}
