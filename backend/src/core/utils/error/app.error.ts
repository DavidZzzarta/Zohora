/**
 * Factory of errors
 * @param {string} nameError - Main name of the error, like ConnectionError or ValidationError
 * @returns {Error constructor} new custom error
 * @example
 * // create a new custom error
 * const CustomError = createErrorFactory('CustomError')
 */
const createErrorFactory = function (nameError: string) {
  return class BusinessError extends Error {
    name: string
    message: string
    status: number
    constructor(
      message: string,
      status?: number,
      name?: string,
      stack?: string
    ) {
      super(message)
      this.name = nameError
      this.message = message ?? 'Internal Server Error'
      this.status = status ?? 500
      this.stack = stack ?? ''
    }
  }
}

/**
 * Errors exported
 * @param {string} message - message to throw with the error, the default is 'Internal Server Error'
 * @param {number} status - status code, the default is 500
 * @example
 * // throws a custom error
 * import { ValidationError } from '@src/core/utils/error/app.error.js'
 * throw new ValidationError('Error validating types', 401)
 */
export const AuthenticationError = createErrorFactory('AuthenticationError')
export const ConnectionError = createErrorFactory('ConnectionError')
export const DatabaseError = createErrorFactory('DatabaseError')
export const CacheError = createErrorFactory('CacheError')
export const ValidationError = createErrorFactory('ValidationError')
