/**
 * all the jsoswebtoken handler
 * @example
 *
 * const token = await generateToken({ id: "123", name: "my_username" })
 * const verifiedToken = await verifyToken("123")
 */
import { SECRET_JWT_KEY } from '@src/core/config/app.config.js'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import { UserModel } from '@src/core/database/user.model.js'
import { AuthenticationError } from '@src/core/utils/error/app.error.js'

interface JWTPayload {
  user_id: string
  jti: string
  iat?: number
  exp?: number
}

export const generateToken = async ({ id }: { id: string }) => {
  if (!id) throw new AuthenticationError('some data is missing', 401)
  const token = await jwt.sign(
    {
      user_id: id,
      jti: crypto.randomUUID()
    },
    SECRET_JWT_KEY,
    {
      expiresIn: '2h'
    }
  )
  return token
}

export const verifyToken = async (token: string) => {
  if (!token) return false
  try {
    const data = await jwt.verify(token, SECRET_JWT_KEY, { clockTolerance: 30 })
    if (typeof data !== 'object' || data === null) return false
    const { user_id } = data as JWTPayload
    const user = await UserModel.getUserById(user_id)
    return user
  } catch (e) {
    return false
  }
}
