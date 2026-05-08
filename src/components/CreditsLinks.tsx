/** Render source credits for the recreated test. */
export function CreditsLinks() {
  return (
    <p className="text-sm text-slate-600">
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
  )
}
