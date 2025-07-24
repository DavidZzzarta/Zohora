import express from 'express'
import {
  validateUser,
  validatePartialUser
} from '@src/core/utils/validators/validator.utils.js'
import { loginUser, registerUser } from '@src/api/services/auth.service.js'
import { generateToken } from '@src/core/utils/auth/token.handle.js'
import { cookieSessionSettings } from '@src/core/config/app.config.js'
import { OTP } from '@src/core/utils/auth/otp.utils.js'
import { sendOTP } from '@src/api/services/otp.service.js'
import { UserModel } from '@src/core/database/user.model.js'
import { Logger } from '@src/api/middlewares/logger/access.logger.js'
import { User } from '@src/core/types/user.types'

/**
 * ## GET /auth/otp
 * Will render the OTP view.
 */
export const CodeViewController = (
  req: express.Request,
  res: express.Response
) => {
  res.render('otp', { title: 'OTP' })
}

/**
 * ## POST /auth/login
 * Authenticates the user with **email** and **password** credentials.
 *
 * @param {string} req.body.email - User email to verify.
 * @param {string} req.body.password - Password, it will be hashed using `bcrypt` , for the moment, we dont't have regex validation.
 *
 * @returns **200** Will add a **user token** using `jsonwebtoken` like a secure cookie.
 * @throws **400** Throw a `Error` for the moment, very simple.
 */
export const LoginController = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, password } = req.body
  try {
    if (!email && !password) {
      res.status(400).send({ error: 'Email or password missing' })
      return
    }
    validatePartialUser({ email })
    validatePartialUser({ password })
    const user = await loginUser({ email, password })
    if (!user.user_id) {
      res.status(400).send({ error: 'Email or password are wrong' })
      return
    }
    const token = await generateToken({ id: user.user_id })
    res
      .status(200)
      .cookie('access_token', token, cookieSessionSettings)
      .send({ token, message: 'Login succesful' })
  } catch (e: unknown) {
    res.status(400).send({ error: 'Error trying to login, try again.' })
  }
}

/**
 * ## GET /auth/
 * Will send information about the user
 */
export const UserInformationController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!req.user) return
    const user: User = req.user
    const { username, email, sign } = user

    res.status(200).send({ username, email, sign })
  } catch (e) {
    res.status(400).send({
      error: 'Error trying to show the user information.'
    })
  }
}

/**
 * ## POST /auth/
 * Will send a OTP to the email to verify the information and create the user.
 *
 * @param {string} req.body.username - Simple username
 * @param {string} req.body.email - User email to verify.
 * @param {string} req.body.password - Password, it will be hashed using `bcrypt` , for the moment, we dont't have regex validation.
 *
 * @returns **200** Will send a OTP of the user email if all the information is correct.
 * @throws **400** Throw a `Error` if the data is incorrect or the email does not exist .
 */
export const RegistryController = async (
  req: express.Request,
  res: express.Response
) => {
  const { username, email, password } = req.body
  try {
    validateUser({ username, email, password })
    /*const code = await OTP.generatePasscode({
      identifier: email,
      type: 'create',
      data: { username, email, password }
    })
    await sendEmail({ to: email, name: username, code })*/
    await sendOTP({
      email,
      username,
      identifier: email,
      type: 'create',
      data: { username, email, password }
    })

    res.status(200).send({ message: 'OTP sent successfully' })
  } catch (e) {
    res.status(400).send({
      error: 'Error trying to send the OTP to create a new user, try again.'
    })
  }
}

/**
 * ## POST /auth/verification
 * Will verify the OTP, if is the same sent to the email.
 *
 * @param {string} req.body.email - User email, this is the verifier, so this parameter is important.
 * @param {string} req.body.code - OTP to verify if is the same saved on the cache.
 *
 * @returns **200** It will respond with a token using `jsonwebtoken` creating the user on the database.
 * @throws **400** Throw a `Error` if the data is incorrect or the email does not exist or if exists a problem with the database
 */
export const CodeVerificationController = async (
  req: express.Request,
  res: express.Response
) => {
  const { code, email } = req.body

  try {
    const infoUser = await OTP.validate({ identifier: email, ofUser: code })

    let { username, password } = infoUser

    validateUser({ username, email, password })

    const user = await registerUser({ email, password, username })
    const token = await generateToken({ id: user.user_id })
    res
      .status(201)
      .cookie('access_token', token, cookieSessionSettings)
      .send({ token, message: 'User created successfully' })
  } catch (e) {
    Logger.error(String(e))
    res
      .status(400)
      .send({ error: 'Error trying to verify the OTP to create a new user' })
  }
}

/**
 * ## PATCH /auth/
 * Update user data, like the username, email, password or sign.
 * It will send a OTP, for the username or sign is not necessary the OTP, the server will change this data automatically.
 *
 * @param {string} req.body.register - Type of data to change, like the username, email, sign or password.
 * @param {string} req.body.newData - The new data to update.
 *
 * @returns **200** Will change the username or the sign automatically, or will send a OTP to the email.
 * @throws **400** Throw a `Error` validating the types or sending the OTP.
 */
export const UpdateUserDataController = async (
  req: express.Request,
  res: express.Response
) => {
  const { type, newData } = req.body
  if (!req.user) return
  const user: User = req.user
  try {
    if (type === 'username') {
      validatePartialUser({ username: newData })
      await UserModel.updateUserData({
        id: user.user_id,
        register: type,
        newData
      })
      res.status(204).send()
      return
    }
    if (type === 'sign') {
      validatePartialUser({ sign: newData })
      await UserModel.updateUserData({
        id: user.user_id,
        register: type,
        newData
      })
      res.status(204).send()
      return
    }

    if (type === 'email') {
      validatePartialUser({ email: newData })
      await sendOTP({
        email: newData,
        username: user.username,
        type,
        identifier: user.user_id,
        data: { email: newData }
      })
      res.status(200).send({ message: 'OTP sent successfully' })
      return
    }
    if (type === 'password') {
      validatePartialUser({ password: newData })
      await sendOTP({
        email: user.email,
        username: user.username,
        type,
        identifier: user.user_id,
        data: { password: newData }
      })
      res.status(200).send({ message: 'OTP sent successfully' })
      return
    }

    res.status(200).send({ message: 'No updated information, try again' })
  } catch (e) {
    res
      .status(400)
      .send({ error: 'Error trying to send the OTP to update the user data' })
  }
}

/**
 * ## PATCH /auth/verification
 * Will finish the updating process checking the OTP.
 *
 * @param {string} req.body.code - OTP to verify, if is correct, will change the data cached.
 *
 * @returns **200** Will change the email or password.
 * @throws **400** Throw a `Error` validating the data or if the OTP is incorrect.
 */
export const VerificationUpdateController = async (
  req: express.Request,
  res: express.Response
) => {
  const { code } = req.body
  if (!req.user) return
  const user: User = req.user

  try {
    const infoUser = await OTP.validate({
      identifier: user.user_id ?? '',
      ofUser: code
    })
    if (infoUser.type === 'email') {
      // FUTURE: verificar que el email no esté en la base de datos
      await UserModel.updateUserData({
        id: user.user_id,
        register: 'email',
        newData: infoUser.email
      })
    }
    if (infoUser.type === 'password') {
      await UserModel.updateUserData({
        id: user.user_id,
        register: 'password_hash',
        newData: infoUser.password
      })
    }

    res.status(200).send({ message: 'info updated' })
  } catch (e) {
    res
      .status(400)
      .send({ error: 'Error trying to verify the OTP to update the user data' })
  }
}

/**
 * ## DELETE /auth/
 * It will send a OTP to the email to delete the user.
 *
 * @returns **200** It will send the OTP if all is correct.
 * @throws **400** Throw a `Error` maybe if exists a error with the database or with the server.
 */
export const DeleteUserController = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.user) return
  const user: User = req.user
  try {
    await sendOTP({
      email: user.email,
      username: user.username,
      identifier: user.user_id,
      type: 'delete'
    })

    res.status(200).send({ message: 'OTP sent successfully' })
  } catch (e) {
    res
      .status(400)
      .send({ error: 'Error trying to send the code to delete the user' })
  }
}

/**
 * ## DELETE /auth/verification
 * It will delete the user.
 *
 * @param {string} req.body.code - OTP to verify, if is correct, will delete the user.
 *
 * @returns **200** It will delete the user.
 * @throws **400** Throw a `Error` maybe if exists a error with the database or with the server.
 */
export const VerificationDeleteController = async (
  req: express.Request,
  res: express.Response
) => {
  const { code } = req.body
  if (!req.user) return
  const user: User = req.user

  try {
    await OTP.validate({ identifier: user.user_id ?? '', ofUser: code })
    await UserModel.deleteUserById(user.user_id ?? '')
    res.status(204).end()
  } catch (e) {
    Logger.error(String(e))
    res
      .status(400)
      .send({ error: 'Error trying to verify the OTP to delete the user' })
  }
}

/**
 * ## POST /auth/logout
 * It will exit of the account.
 *
 * @returns **200** It will respond with a simple message.
 */
export const LogoutController = async (
  req: express.Request,
  res: express.Response
) => {
  res
    .clearCookie('access_token')
    .clearCookie('connect.sid')
    .send({ message: 'Logout successful' })
}
