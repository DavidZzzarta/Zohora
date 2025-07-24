/**
 * all the user model class, like create an user, update his data or delete it
 *
 * @example
 * // returns { uuid: "1242-12143-2345-123", username: "my_username", password: "111255251", google_id: null }
 *
 * const user = await UserModel.create({
 *   email: 'some@gmail.com',
 *   username: 'my_username',
 *   password: 'password_without_a_hash',
 * })
 */
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from '@src/core/config/app.config.js'
import { UserSchema } from './db.js'

import { DatabaseError } from '@src/core/utils/error/app.error.js'
import { User } from '../types/user.types.js'

export class UserModel {
  static async create({
    password,
    username,
    email
  }: {
    password: string
    username: string
    email: string
    sign?: string
  }) {
    if (!password || !username || !email)
      throw new DatabaseError(
        'Some data is missing, verify the password, email or username',
        401
      )

    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const uuid = crypto.randomUUID()

    const user = {
      user_id: uuid,
      username: username,
      email: email,
      password_hash: hash
    }
    await UserSchema.create(user)

    //await UserSchema.sync({ alter: true })
    return user
  }

  static async createGoogleUser({
    username,
    email,
    google_id
  }: {
    google_id: string
    username: string
    email: string | null
    sign?: string
  }) {
    if (!username || !email || !google_id)
      throw new DatabaseError(
        'Some data is missing, verify the password, email or username',
        401
      )

    const uuid = crypto.randomUUID()

    const user = {
      user_id: uuid,
      google_id: google_id,
      username: username,
      email: email
    }
    await UserSchema.create(user)

    return user
  }

  static async getUserByEmail(email: string | null) {
    if (!email)
      throw new DatabaseError(
        'Some data is missing, verify the email or the password',
        401
      )

    const values = await UserSchema.findAll({
      //findOne
      where: {
        email
      }
    })
    if (!values[0]) return false
    const user = values[0].dataValues
    return user
  }

  static async getUserByPassword({
    user,
    password
  }: {
    user: User
    password: string
  }) {
    if (!user || !password)
      throw new DatabaseError(
        'Some data is missing, verify the email or the password',
        401
      )

    const isValid = await bcrypt.compare(password, user.password_hash ?? '')
    if (!isValid) throw new Error('Invalid password, try with another password')
    const { password_hash, ...publicUserData } = user
    return publicUserData
  }

  static async getUserById(id: string) {
    if (!id) throw new DatabaseError('Some data is missing, verify the id', 401)
    const values = await UserSchema.findAll({
      //findOne
      where: {
        user_id: id
      }
    })
    const user = values[0].dataValues
    if (!user) throw new Error('Does not exist an user with this id')
    return user
  }

  static async getUserByGoogleId(id: string) {
    if (!id) throw new DatabaseError('Some data is missing, verify the id', 401)
    const values = await UserSchema.findAll({
      //findOne
      where: {
        google_id: id
      }
    })
    if (!values[0]) return false
    const user = values[0].dataValues
    return user
  }

  static async updateUserData({
    id,
    register,
    newData
  }: {
    id: string | undefined
    register: string
    newData: string | object
  }) {
    if (!id || !newData || !register)
      throw new DatabaseError('Some data is missing, verify the id', 401)
    if (
      register !== 'username' &&
      register !== 'email' &&
      register !== 'sign' &&
      register !== 'password_hash'
    )
      throw new DatabaseError('register does not exist', 401)
    const values = await UserSchema.findAll({
      attributes: [register],
      where: {
        user_id: id
      }
    })
    const user = values[0].dataValues //findOne
    if (!user)
      throw new DatabaseError('there is no user with that user_id', 401)

    await UserSchema.update(
      {
        username: user.username ? (user.username = newData) : user.username,
        sign: user.sign ? (user.sign = newData) : user.sign,
        email: user.email ? (user.email = newData) : user.email,
        password_hash: user.password_hash
          ? (user.password_hash = await bcrypt.hash(
              String(newData),
              SALT_ROUNDS
            ))
          : user.password_hash
      },
      {
        where: {
          user_id: id
        }
      }
    )

    return { message: 'data updated', id }
  }

  static async updateGoogleIdByEmail(email: string | null, google_id: string) {
    if (!email || !google_id)
      throw new DatabaseError('Faltan datos para actualizar google_id', 401)
    const values = await UserSchema.findAll({
      where: { email }
    })
    if (!values[0])
      throw new DatabaseError('No existe un usuario con ese email', 404)
    await UserSchema.update({ google_id }, { where: { email } })
    return { message: 'google_id actualizado', email }
  }

  static async deleteUserById(id: string) {
    if (!id) throw new DatabaseError('Some data is missing, verify the id', 401)
    await UserSchema.destroy({
      where: {
        user_id: id
      }
    })
    return { message: 'User has been eliminated' }
  }
}
