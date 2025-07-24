import { z } from 'zod'
import { regex } from '../auth/regex.utils.js'

/**
 * Validation Schemas for Zohora API
 *
 * This module provides Zod schemas for validating user input data.
 * All schemas include comprehensive error messages and validation rules.
 *
 * @module Validators
 */

/**
 * User validation schema
 *
 * @description Validates user registration and update data with comprehensive rules:
 * - Username: 4-42 characters, alphanumeric with underscores
 * - Email: Valid email format
 * - Password: 6-42 characters, must match regex pattern
 * - Sign: 0-6 characters (optional currency symbol)
 *
 * @example
 * ```typescript
 * const userData = {
 *   username: "john_doe",
 *   email: "john@example.com",
 *   password: "SecurePass123!",
 *   sign: "USD"
 * }
 * const validated = UserSchema.parse(userData)
 * ```
 */
const UserSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string'
    })
    .min(4, { message: 'Username must have at least 4 characters' })
    .max(42, { message: 'Username must have maximum 42 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores'
    }),
  email: z
    .string({
      required_error: 'Email required',
      invalid_type_error: 'Email must be a string'
    })
    .email({ message: 'Invalid email' }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string'
    })
    .min(6, { message: 'Password must have at least 6 characters' })
    .max(42, { message: 'Password must have maximum 42 characters' })
    .regex(regex(), {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
  sign: z
    .string({
      required_error: 'Sign is required',
      invalid_type_error: 'Sign must be a string'
    })
    .min(1, { message: 'Sign must have at least 1 character' })
    .max(6, { message: 'Sign must have maximum 6 characters' })
    .optional()
})

/**
 * Transaction validation schema
 *
 * @description Validates financial transaction data:
 * - account_id: Valid UUID format
 * - amount: Numeric value (positive or negative)
 * - description: Optional string description
 *
 * @example
 * ```typescript
 * const transaction = {
 *   account_id: "123e4567-e89b-12d3-a456-426614174000",
 *   amount: 150.50,
 *   description: "Grocery shopping"
 * }
 * ```
 */
const TransactionSchema = z.object({
  account_id: z
    .string({
      required_error: 'Account ID is required',
      invalid_type_error: 'Account ID must be a string'
    })
    .uuid({ message: 'Account ID must be a valid UUID' }),
  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number'
    })
    .finite({ message: 'Amount must be a finite number' })
    .refine(val => val !== 0, { message: 'Amount cannot be zero' }),
  description: z
    .string()
    .max(255, { message: 'Description must have maximum 255 characters' })
    .optional()
})

/**
 * Account validation schema
 *
 * @description Validates financial account data:
 * - name: Account name (1-50 characters)
 * - description: Optional account description
 * - current_balance: Numeric balance value
 *
 * @example
 * ```typescript
 * const account = {
 *   name: "Main Checking",
 *   description: "Primary checking account",
 *   current_balance: 2500.00
 * }
 * ```
 */
const AccountSchema = z.object({
  name: z
    .string({
      required_error: 'Account name is required',
      invalid_type_error: 'Account name must be a string'
    })
    .min(1, { message: 'Account name must have at least 1 character' })
    .max(50, { message: 'Account name must have maximum 50 characters' }),
  description: z
    .string()
    .max(255, { message: 'Description must have maximum 255 characters' })
    .optional(),
  current_balance: z
    .number({
      required_error: 'Current balance is required',
      invalid_type_error: 'Current balance must be a number'
    })
    .finite({ message: 'Current balance must be a finite number' })
    .default(0)
})

/**
 * Validates complete user data for registration
 *
 * @description Validates username, email, and password for user registration.
 * The sign field is optional and excluded from validation.
 *
 * @param {Object} userData - User registration data
 * @param {string} userData.username - User's display name (4-42 chars)
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password (6-42 chars, complex)
 *
 * @returns {Object} Validated user data
 * @throws {ZodError} When validation fails
 *
 * @example
 * ```typescript
 * try {
 *   const validated = validateUser({
 *     username: "john_doe",
 *     email: "john@example.com",
 *     password: "SecurePass123!"
 *   })
 *   console.log('Validation successful:', validated)
 * } catch (error) {
 *   console.error('Validation failed:', error.errors)
 * }
 * ```
 */
export const validateUser = ({
  username,
  email,
  password
}: {
  username: string
  email: string
  password: string
}) => {
  return UserSchema.partial({ sign: true }).parse({
    username,
    email,
    password
  })
}

/**
 * Validates partial user data for updates
 *
 * @description Validates any subset of user fields for profile updates.
 * All fields are optional, but if provided, they must meet validation rules.
 *
 * @param {Object} input - Partial user data to validate
 * @param {string} [input.username] - User's display name (4-42 chars)
 * @param {string} [input.email] - User's email address
 * @param {string} [input.password] - User's password (6-42 chars, complex)
 * @param {string} [input.sign] - Currency symbol (1-6 chars)
 *
 * @returns {Object} Validated partial user data
 * @throws {ZodError} When validation fails
 *
 * @example
 * ```typescript
 * try {
 *   const validated = validatePartialUser({
 *     username: "new_username",
 *     email: "newemail@example.com"
 *   })
 *   console.log('Update validation successful:', validated)
 * } catch (error) {
 *   console.error('Update validation failed:', error.errors)
 * }
 * ```
 */
export const validatePartialUser = (input: object) => {
  return UserSchema.partial().parse(input)
}

/**
 * Validates account creation data
 *
 * @description Validates financial account data with comprehensive rules:
 * - name: Required, 1-50 characters, trimmed
 * - description: Optional, max 255 characters
 * - current_balance: Required number, defaults to 0
 *
 * @param {Object} input - Account data to validate
 * @param {string} input.name - Account name (1-50 chars)
 * @param {string} [input.description] - Account description (max 255 chars)
 * @param {number} [input.current_balance] - Initial balance (defaults to 0)
 *
 * @returns {Object} Validated account data
 * @throws {ZodError} When validation fails
 *
 * @example
 * ```typescript
 * try {
 *   const validated = validateAccount({
 *     name: "Main Checking",
 *     description: "Primary checking account",
 *     current_balance: 1000.00
 *   })
 *   console.log('Account validation successful:', validated)
 * } catch (error) {
 *   console.error('Account validation failed:', error.errors)
 * }
 * ```
 */
export const validateAccount = (input: object) => {
  return AccountSchema.parse(input)
}

/**
 * Validates transaction data
 *
 * @description Validates financial transaction data with comprehensive rules:
 * - account_id: Required valid UUID
 * - amount: Required finite number, cannot be zero
 * - description: Optional, max 255 characters
 *
 * @param {Object} input - Transaction data to validate
 * @param {string} input.account_id - Valid UUID of the account
 * @param {number} input.amount - Transaction amount (non-zero)
 * @param {string} [input.description] - Transaction description (max 255 chars)
 *
 * @returns {Object} Validated transaction data
 * @throws {ZodError} When validation fails
 *
 * @example
 * ```typescript
 * try {
 *   const validated = validateTransaction({
 *     account_id: "123e4567-e89b-12d3-a456-426614174000",
 *     amount: 150.50,
 *     description: "Grocery shopping"
 *   })
 *   console.log('Transaction validation successful:', validated)
 * } catch (error) {
 *   console.error('Transaction validation failed:', error.errors)
 * }
 * ```
 */
export const validateTransaction = (input: object) => {
  return TransactionSchema.parse(input)
}

/**
 * Validates email format
 *
 * @description Quick email validation utility
 *
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 *
 * @example
 * ```typescript
 * const isValid = validateEmail("user@example.com") // true
 * const isInvalid = validateEmail("invalid-email") // false
 * ```
 */
export const validateEmail = (email: string): boolean => {
  try {
    UserSchema.pick({ email: true }).parse({ email })
    return true
  } catch {
    return false
  }
}

/**
 * Validates password strength
 *
 * @description Quick password validation utility
 *
 * @param {string} password - Password to validate
 * @returns {boolean} True if password meets requirements
 *
 * @example
 * ```typescript
 * const isStrong = validatePassword("SecurePass123!") // true
 * const isWeak = validatePassword("123") // false
 * ```
 */
export const validatePassword = (password: string): boolean => {
  try {
    UserSchema.pick({ password: true }).parse({ password })
    return true
  } catch {
    return false
  }
}
