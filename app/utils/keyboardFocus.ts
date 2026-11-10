/**
 * Whether an element is focused the way a keyboard focuses it.
 *
 * `:focus-visible` is the browser's own answer to the question, and it is not
 * the same as being focused: tabbing to a button sets it, clicking the same
 * button does not. Anything that pauses while a control has focus needs this
 * distinction. Pausing on plain focus looks right until a click parks focus on
 * the button it just pressed — nothing takes that focus away, so whatever was
 * paused stays paused until something else on the page is clicked.
 */
export function isKeyboardFocus(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  try {
    return target.matches(':focus-visible')
  }
  catch {
    // A syntax error in browsers that never shipped the selector. Reporting
    // "not a keyboard focus" loses a pause; throwing would abandon the rest of
    // the handler that asked.
    return false
  }
}
