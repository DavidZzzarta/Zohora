import { REDIS_URL, NODE_ENV } from '@src/core/config/app.config.js'
import IORedis from 'ioredis'
import { Logger } from '@src/api/middlewares/logger/access.logger.js'

let connection: IORedis
let connected = false

export async function connect(): Promise<void> {
  if (connection && ['connecting', 'connected'].includes(connection.status)) {
    return
  }
  if (!(REDIS_URL ?? '')) {
    if (NODE_ENV === 'development') {
      connection = new IORedis({ maxRetriesPerRequest: null })
      connected = true
      Logger.log('No redis configuration provided. Running without redis.')
      return
    }
    throw new Error('No redis configuration provided')
  }

  try {
    Logger.log('Connecting with redis...')
    connection = new IORedis(REDIS_URL, {
      maxRetriesPerRequest: null
    })
    connected = true
    connection.on('error', (error: Error) => {
      connected = false
      Logger.error(`Error connecting to redis: ${error.message}`)
      process.exit(1)
    })
    Logger.log('Connected with redis succesful')
  } catch (error) {
    Logger.error('Failed to connect to redis. Exiting with exit status code 1.')
    process.exit(1)
  }
}

export function isConnected(): boolean {
  return connected
}

export const getConnection = () => {
  if (connection) {
    return connection
  } else {
    return false
  }
}
