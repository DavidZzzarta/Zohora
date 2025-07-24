/**
 * OTP generator and validator using node-cache
 * and promisifing the functions because we use
 * an asyncrrounus email sender.
 *
 * @examples
 * import { OTP } from '@src/core/utils/auth/otp.utils.js'
 *
 * await OTP.generatePasscode({
 *  identifier: 'user_id',
 *  type: 'create',
 *  data: {
 *    username: 'david',
 *    email: 'david@gmail.com',
 *    password: 'HashEdPassw0rd!!'
 *  }
 * })
 *
 * await OTP.generatePasscode({ key: 'user_id', type: 'email', data: 'new_email'})
 * await OTP.generatePasscode({ key: 'user_id', type: 'password', data: 'new_password'})
 * await OTP.generatePasscode({ key: 'user_id', type: 'delete' })
 *
 * const user = await OTP.validate({ identifier: '124-234-5321', ofUser: '1234' })
 * user.username
 * user.type
 * user.email
 * user.password
 */
import NodeCache from 'node-cache'
import { CacheError } from '@src/core/utils/error/app.error.js'
// import bcrypt from 'bcrypt'
// implements bcrypt in the future

const otpCache = new NodeCache()

const generateCode = (): string => {
  // a random code like this: 9812
  return String(Math.floor(1000 + Math.random() * 9000))
}

interface MyOtpInterface {
  passcode: string
  type: string
  counter: number
  password: string
  username: string
  email: string
  data?: object
}

export class OTP {
  private static currentCounter = 0
  static async generatePasscode({
    identifier,
    type,
    data = ''
  }: {
    identifier: string
    type: string | undefined
    data?: string | Partial<MyOtpInterface>
  }): Promise<string> {
    if (!identifier || !type) throw new CacheError('Some data is missing')

    return new Promise((resolve, reject) => {
      const passcode = generateCode()
      let otp = otpCache.mset([
        {
          key: identifier,
          val: {
            type,
            data,
            passcode
          },
          ttl: 300000
        }
      ])
      if (otp) resolve(passcode)
      else reject(new CacheError('Failed to save OTP'))
    })
  }

  private static async get(identifier: string): Promise<MyOtpInterface> {
    if (!identifier) throw new CacheError('Some data is missing')

    return new Promise(resolve => {
      let data: Partial<MyOtpInterface> | undefined = otpCache.get(identifier)
      if (!data)
        throw new CacheError('Actually, there is no info with that identifier')

      let infoUser: Partial<MyOtpInterface> | undefined = data?.data
      //if (!infoUser) throw new CacheError('There is no data')
      resolve({
        passcode: data.passcode ?? '',
        type: data.type ?? '',
        username: infoUser?.username ?? '',
        email: infoUser?.email ?? '',
        password: infoUser?.password ?? '',
        counter: this.currentCounter
      })
    })
  }

  static async validate({
    identifier,
    ofUser
  }: {
    identifier: string
    ofUser: string
  }): Promise<MyOtpInterface> {
    if (!identifier || !ofUser) throw new CacheError('Some data is missing')

    const or = await OTP.get(identifier)

    return new Promise(resolve => {
      this.currentCounter += 1

      if (or.counter && or?.counter >= 5)
        throw new CacheError('You have tried too many times')

      if (or.passcode !== ofUser) throw new CacheError('Code is distinct')
      otpCache.del(identifier)
      resolve(or)
    })
  }
}
