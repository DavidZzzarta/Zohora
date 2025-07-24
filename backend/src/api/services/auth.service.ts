/**
 * Authentication Service
 *
 * Provides user authentication and registration functionality.
 *
 * @module AuthService
 */

import { UserModel } from '@src/core/database/user.model.js'
import { DatabaseError } from '@src/core/utils/error/app.error.js'

/**
 * Authenticates a user with email and password
 *
 * @description Validates user credentials against the database and returns user data if successful.
 * The password is compared using bcrypt hashing for security.
 *
 * @param {Object} params - Authentication parameters
 * @param {string} params.email - User's email address
 * @param {string} params.password - User's plain text password (will be hashed for comparison)
 *
 * @returns {Promise<Object>} User object without password hash
 * @throws {DatabaseError} When user doesn't exist or password is incorrect
 *
 * @example
 * ```typescript
 * import { loginUser } from '@src/api/services/auth.js'
 *
 * try {
 *   const user = await loginUser({
 *     email: 'user@example.com',
 *     password: 'mypassword'
 *   })
 *   console.log('Login successful:', user.username)
 * } catch (error) {
 *   console.error('Login failed:', error.message)
 * }
 * ```
 */
export const loginUser = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const userExists = await UserModel.getUserByEmail(email)
  if (!userExists) throw new DatabaseError('User does not exists', 401)
  const user = await UserModel.getUserByPassword({ user: userExists, password })
  return user
}

/**
 * Registers a new user in the system
 *
 * @description Creates a new user account with the provided credentials.
 * The password is automatically hashed using bcrypt before storage.
 *
 * @param {Object} params - Registration parameters
 * @param {string} params.email - User's email address (must be unique)
 * @param {string} params.password - User's plain text password (will be hashed)
 * @param {string} params.username - User's display name
 *
 * @returns {Promise<Object>} Newly created user object
 * @throws {DatabaseError} When user with email already exists
 *
 * @example
 * ```typescript
 * import { registerUser } from '@src/api/services/auth.js'
 *
 * try {
 *   const newUser = await registerUser({
 *     email: 'newuser@example.com',
 *     password: 'securepassword123',
 *     username: 'john_doe'
 *   })
 *   console.log('User registered:', newUser.user_id)
 * } catch (error) {
 *   console.error('Registration failed:', error.message)
 * }
 * ```
 */
export const registerUser = async ({
  email,
  password,
  username
}: {
  email: string
  password: string
  username: string
}) => {
  const userExists = await UserModel.getUserByEmail(email)
  if (userExists) throw new DatabaseError('User alright exists', 401)
  const user = await UserModel.create({
    email,
    password,
    username
  })
  return user
}
