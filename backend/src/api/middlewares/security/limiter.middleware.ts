import { RateLimiterMemory } from 'rate-limiter-flexible'
import express from 'express'

const rateLimiter = new RateLimiterMemory({
  points: 38,
  duration: 240
})

export const rateLimiterMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  rateLimiter
    .consume(String(req.ip))
    .then(() => next())
    .catch(() => res.status(429).send('Demasiadas solicitudes'))
}

export const Limiter = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message:
    '<h1>¡Ups! Demasiadas solicitudes</h1><p>Por favor, espera un momento antes de continuar.</p>'
}
