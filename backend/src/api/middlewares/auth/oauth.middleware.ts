import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback
} from 'passport-google-oauth20'
import {
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_REDIRECT,
  NODE_ENV
} from '@src/core/config/app.config.js'
import { UserModel } from '@src/core/database/user.model.js'
import { AuthenticationError } from '@src/core/utils/error/app.error.js'
import { Logger } from '@src/api/middlewares/logger/access.logger.js'
import { Application, Request } from 'express'
import passport from 'passport'

export function initPassport(app: Application) {
  passport.serializeUser((req: Request, user: any, done: VerifyCallback) => {
    done(null, user.google_id || null)
  })
  passport.deserializeUser(async (id: string, done: VerifyCallback) => {
    try {
      const findUser = await UserModel.getUserByGoogleId(id)
      if (!findUser) throw new AuthenticationError('Usuario no encontrado', 401)
      done(null, findUser)
    } catch (e) {
      Logger.error(e)
      done(e)
    }
  })

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL:
          NODE_ENV === 'production'
            ? GOOGLE_CLIENT_REDIRECT
            : `/auth/google/redirect`,
        state: true
      },
      async (
        access_token: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) => {
        try {
          const email =
            profile.emails && profile.emails[0] ? profile.emails[0].value : null
          Logger.log(`user email: ${email}`)
          if (!email) {
            done(null, false)
          }

          const userById = await UserModel.getUserByGoogleId(profile.id)
          if (userById) {
            Logger.log('usuario ya existe')
            done(null, userById)
            return
          }

          const userByEmail = await UserModel.getUserByEmail(email)
          if (userByEmail) {
            Logger.log('el correo ya existe')
            if (!userByEmail.google_id) {
              await UserModel.updateGoogleIdByEmail(email, profile.id)
              userByEmail.google_id = profile.id
            }
            done(null, userByEmail)
            return
          }

          const newUser = await UserModel.createGoogleUser({
            username: profile.displayName,
            email,
            google_id: profile.id
          })
          Logger.log(`Usuario creado: ${newUser}`)
          done(null, newUser)
        } catch (e) {
          Logger.error(`Error logging in google: ${e}`)
          done(
            new AuthenticationError('Ocurrio un error leyendo el usuario'),
            false
          )
        }
      }
    )
  )

  app.use(passport.initialize())
  app.use(passport.session())
}
