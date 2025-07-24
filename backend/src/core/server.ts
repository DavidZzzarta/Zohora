import app from './app.js'
import { Logger } from '@src/api/middlewares/logger/access.logger.js'
import { PORT, NODE_ENV } from './config/app.config.js'
import { connect } from '@src/core/database/db.js'
import { version } from './version.js'
import * as RedisClient from './config/redis.js'
import { EmailQueue } from './queues/email-queue.js'
import { Server } from 'http'

async function bootServer(port: number): Promise<Server> {
  try {
    await RedisClient.connect()
    if (RedisClient.isConnected()) {
      Logger.log('Connected to redis')
      const connection = RedisClient.getConnection()
      if (connection) {
        EmailQueue.init({ connection })
      }
    }
    await connect()
  } catch (e) {
    Logger.error('Failed to boot server')
    return process.exit(1)
  }

  return app().listen(port, () => {
    Logger.info({ port, env: NODE_ENV, version })
  })
}

void bootServer(PORT || 8080)
