/** Check whether keyboard shortcuts should be ignored for an event target. */
export function isTypingTarget(
  /** The focused event target. */
  target: EventTarget | null,
): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  )
}
