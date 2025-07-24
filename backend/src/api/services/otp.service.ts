/**
 * @example
 * await sendOTP({
 *   email: 'email@exampl.com',
 *   username: 'User name',
 *   type: 'delete'
 * })
 *
 * await sendOTP({
 *   email: 'email@exampl.com',
 *   username: 'User name',
 *   type: 'create',
 *   data: { username, email, password }
 * })
 *
 * await sendOTP({
 *  emailL 'email@examp.com',
 *  type: 'email',
 *  data: { email: 'new@email.com' }
 * })
 */

import { EmailQueue } from '@src/core/queues/email-queue.js'
import { SendOTPParams } from '@src/core/types/otp.types.js'

export const sendOTP = async ({
  email,
  username,
  identifier,
  type,
  data
}: SendOTPParams) => {
  if (!username || !email || !identifier)
    throw new Error('some data is missing')
  await EmailQueue.add({
    email: email as string,
    username: username as string,
    identifier: identifier as string,
    type: type ?? '',
    data: data ?? ''
  })
}
