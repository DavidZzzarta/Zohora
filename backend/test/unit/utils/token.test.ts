import { assert, describe, it } from 'vitest'
import { generateToken, verifyToken } from '@src/core/utils/auth/token.handle.js'

describe('Checking the token handler', () => {
  it('Validate one token, it should returns true', async () => {
    const token = await generateToken({ id: '3ee28793-b896-4ab4-a2cd-016c7541f263' })
    const tokenValidated = await verifyToken(token)
    assert.equal(tokenValidated, false)
  })
  it('Checking a invalid token, it throws an error', async () => {
    const tokenValidated = await verifyToken('error_token')
    assert.equal(tokenValidated, false)
  })
})
