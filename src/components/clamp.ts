/** Clamp a value inside a minimum and maximum range. */
export function clamp(
  /** The value to clamp. */
  value: number,
  /** The minimum allowed value. */
  minimum: number,
  /** The maximum allowed value. */
  maximum: number,
) {
  return Math.min(Math.max(value, minimum), maximum)
}
