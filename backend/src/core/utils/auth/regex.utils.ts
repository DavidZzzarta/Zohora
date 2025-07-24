/**
 * One uppercase letter, one lowercase letter, one number, maximum of 42 characters and minimum of 6 characters
 *
 * @example
 * const re = regex()
 * re.test('MyPasswordBeautiful)
 */
import safe from 'safe-regex'

export function regex() {
  const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,42}$/)
  if (safe(passwordRegex)) {
    return passwordRegex
  } else {
    throw new Error('Invalid regular expression')
  }
}
