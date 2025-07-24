import express from 'express'

export const Timeout = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.timedout) next()
}
