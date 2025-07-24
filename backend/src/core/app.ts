import express from 'express'

import { MainRoutes } from '@src/api/routes/main.js'
import {
  ErrorMiddleware,
  Error404
} from '@src/api/middlewares/security/errors.middleware.js'
import { initPassport } from '@src/api/middlewares/auth/oauth.middleware.js'
import { sessionSetup } from '@src/api/middlewares/auth/session.middleware.js'
import Paths from './config/paths.config.js'
import { LoggerHttpMiddleware } from '@src/api/middlewares/logger/access.logger.js'
import { NODE_ENV, SESSION_SECRET } from '@src/core/config/app.config.js'
import {
  Limiter,
  rateLimiterMiddleware
} from '@src/api/middlewares/security/limiter.middleware.js'
import { Timeout } from '@src/api/middlewares/security/timeout.middleware.js'
import { HelmetConfig } from '@src/api/middlewares/security/helmet.middleware.js'
import { LimitPayloadSize } from '@src/api/middlewares/security/payload.middleware.js'

import cookieParser from 'cookie-parser'
import connectTimeout from 'connect-timeout'
import compression from 'compression'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

export default function buildApp() {
  const app = express()

  app.set('trust proxy', 1)

  app.set('view engine', 'ejs')
  app.set('views', Paths.views)

  app.use(LoggerHttpMiddleware)
  app.enable('verbose errors')
  if (NODE_ENV === 'production') app.disable('verbose errors')

  app.use(express.json({ limit: '300kb' }))
  app.use(express.urlencoded({ extended: false }))

  app.use(connectTimeout('8s'))
  app.use(Timeout)
  app.use(rateLimiterMiddleware)
  app.use(compression())
  app.use(cookieParser(SESSION_SECRET))
  app.use(helmet(HelmetConfig))
  app.use(LimitPayloadSize)
  app.use(rateLimit(Limiter))

  app.use(sessionSetup())
  initPassport(app)

  app.use('/', MainRoutes)

  app.use(Error404)
  app.use(ErrorMiddleware)

  return app
}
