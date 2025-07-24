// TODO: change the name to app.logger.ts
import chalk from 'chalk'
import yosay from 'yosay'
import { format, transports, createLogger } from 'winston'
import express from 'express'

const errorColor = chalk.red.bold
const simpleBold = chalk.bold

/**
 * Formats like timestamp, server information, http information
 */
const timestampFormat = format.timestamp({
  format: 'YYYY-MM-DD'
})

/**
 * Http format to all the routes
 * @param {object} message - all the information to print
 * @param {timestamp} message.timestamp - only receives a timestampt format
 * @param {level} message.level - only receives the level of the logger, in this case is 'http'
 * @param {number} message.status - receives the status of the http request
 * @param {string} message.url - receives the url of the request
 * @param {string} message.method - receives the method of the request
 */
const httpFormat = format.printf(
  ({ timestamp, level, status, url, method }) => {
    let msg = `[${simpleBold(timestamp)}] [${level}]: method: ${method}    status: ${status}    url:${url}`

    return msg
  }
)

/**
 * Information format to the main app
 * @param {object} message - all the information to print
 * @param {number} message.port - the port of the server
 * @param {string} message.env - the environment of the server
 * @param {string} message.version - the current version of the project
 */
const infoFormat = format.printf(({ port, env, version }) => {
  const msg = `
  Zohora
  --------------

  Port ${port}
  ${env} mode
  Version: ${version}
  `
  return `${yosay(msg)}

${simpleBold('Information')}
${simpleBold('---------------------')}`
})

/**
 * Simple error to print
 * @param {object} message - all the information to print
 * @param {timestamp} message.timestamp - the current timestamp
 * @param {string} message.message - the message to print
 */
const errorFormat = format.printf(log => {
  const { timestamp, message } = log
  return `${errorColor(timestamp)}\t${message}`
})

/**
 * Simple log format to print
 * @param {object} message - all the information to print
 * @param {timestamp} message.timestamp - the current timestamp
 * @param {string} message.message - the message to print
 */
const logFormat = format.printf(log => {
  const { timestamp, message } = log
  return `${simpleBold(timestamp)}\t${message}`
})

// loggers
const loggerInfo = createLogger({
  level: 'info',
  format: format.combine(format.simple(), infoFormat),
  transports: [new transports.Console()]
})

const loggerHttp = createLogger({
  level: 'http',
  format: format.combine(format.colorize(), timestampFormat, httpFormat),
  transports: [new transports.Console()]
})

const loggerError = createLogger({
  level: 'error',
  format: format.combine(timestampFormat, errorFormat),
  transports: [new transports.Console()]
})

const simpleLogger = createLogger({
  level: 'error',
  format: format.combine(timestampFormat, logFormat),
  transports: [new transports.Console()]
})

/**
 * Full logger object
 * @example
 * // returns [2025-12-12] [http]: method: GET status:200 url: /home
 * Logger.http({ method: 'GET', status: 200, url: '/home', timestamp: new Date().toISOString() })
 */
export const Logger = {
  info: (message: object) => loggerInfo.info('', message),
  http: (message: object) => loggerHttp.http('', message),
  error: (message: string | unknown) => loggerError.error(message),
  log: (message: string) => simpleLogger.error(message)
}

export const LoggerHttpMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  Logger.http({
    method: req.method,
    url: req.url,
    status: res.statusCode,
    timestamp: new Date().toISOString()
  })
  next()
}
