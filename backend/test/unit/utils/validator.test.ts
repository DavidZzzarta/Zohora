import { describe, it, assert } from 'vitest'
import {
  validateUser,
  validatePartialUser
} from '@src/core/utils/validators/validator.utils.js'

const username = 'usernameoftest'
const email = 'emailtest@gmail.com'
const password = 'SoME_PAszw0r123d'

describe('Checking the validateUser() function', () => {
  it('Validate using validateUser()', async () => {
    assert.ok(validateUser({ username, email, password }))
  })

  it('Validate using the validatePartialUser', async () => {
    assert.ok(validatePartialUser({ email, password }))
  })
  it('Validate wrong data using validateUser()', async () => {
    assert.throws(() => {
      validateUser({
        username: 'xd',
        email: 'this is not an email',
        password: 'my_password'
      })
    }, Error)
  })
})
