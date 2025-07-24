import express from 'express'

export const jsonGuard = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.is('application/json')) {
    res.status(415).json({
      error: 'Only JSON body',
      details: "Header «Content-Type» must be 'application/json'"
    })
    return
  }
  next()
}
