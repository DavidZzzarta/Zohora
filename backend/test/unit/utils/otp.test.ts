import { OTP } from '@src/core/utils/auth/otp.utils.js'
import { assert, describe, it } from 'vitest'

let email = 'email@test.com'
let username = 'username_chevere'
let password = 'Aab1@@asdd*(33e'

describe('Checking the OTP cache handler', () => {
  it('Checking the OTP.generatePasscode() and OTP.validate() functions, should returns the same code', async () => {
    const code = await OTP.generatePasscode({ identifier: email, type: 'delete' })
    const code2 = await OTP.validate({ identifier: email, ofUser: code })
    assert.equal(code, code2.passcode)
  })
  it('Checking the OTP.validate(), should returns all the data', async () => {
    const code = await OTP.generatePasscode({ identifier: email, type: 'create', data: { username, email, password } })
    const info = await OTP.validate({ identifier: email, ofUser: code })
    assert.equal(info.password, password)
    assert.equal(info.username, username)
    assert.equal(info.email, email)
  })
})
