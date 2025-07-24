import { User } from '@src/core/types/user.types'
import { verifyToken } from '@src/core/utils/auth/token.handle.js'
import express from 'express'
import { Logger } from '@src/api/middlewares/logger/access.logger.js'
import { NODE_ENV } from '@src/core/config/app.config.js'

// req.user is the user
export const TokenChecking = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userByOauth = req.user
    const userByJwt = await verifyToken(req.cookies.access_token)

    if (userByOauth || userByJwt) {
      let user: User = userByJwt ? userByJwt : userByOauth
      req.user = user
      next()
    } else {
      res
        .clearCookie('access_token')
        .clearCookie('connect.sid')
        .status(401)
        .send({ error: 'Usuario no registrado' })
    }
  } catch (e) {
    if (NODE_ENV !== 'production') {
      Logger.error(e)
    } else {
      res.redirect('/?error=notAuthorized')
    }
  }
}
