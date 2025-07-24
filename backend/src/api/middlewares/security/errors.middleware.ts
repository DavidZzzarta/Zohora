import {
  AuthenticationError,
  ConnectionError
} from '@src/core/utils/error/app.error.js'
import { Logger } from '@src/api/middlewares/logger/access.logger.js'
import express from 'express'
import { NODE_ENV } from '@src/core/config/app.config.js'

export const Error404 = (_req: express.Request, res: express.Response) => {
  let status = 404
  res.status(status).format({
    html: () => {
      res.render('notFound', { title: '404' })
    },
    json: () => {
      res.json({ error: 'Not found' })
    },
    default: () => {
      res.type('txt').send('Not found')
    }
  })
}

type CustomError = {
  status: number
  code: string
}
export const ErrorMiddleware = async (
  err: CustomError,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let { status } = err
  Logger.error(String(err))

  if (err.code === 'ETIMEDOUT') {
    status = 503
    res.status(status).render('serverError', { title: 'Server Error' })
  }

  if (err instanceof ConnectionError) {
    status = err.status
    res.status(status).render('serverError', { title: 'Server Error' })
  }
  if (err instanceof AuthenticationError) {
    status = err.status
    res.status(status).render('serverError', {
      title: 'Server Error of Authentication, try again or try more later'
    })
  }

  if (NODE_ENV !== 'production') {
    Logger.error(err)
  }

  res.status(status ?? 500).render('serverError', { title: 'Server Error' })
}
