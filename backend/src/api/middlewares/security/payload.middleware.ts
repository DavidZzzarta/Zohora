import express from 'express'
import { ConnectionError } from '@src/core/utils/error/app.error.js'

export const LimitPayloadSize = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const MAX_PAYLOAD_SIZE = 1024 * 1024
  if (
    req.headers['content-length'] &&
    parseInt(req.headers['content-length']) > MAX_PAYLOAD_SIZE
  ) {
    throw new ConnectionError('Payload size exceeds the limit', 413)
  }

  next()
}
