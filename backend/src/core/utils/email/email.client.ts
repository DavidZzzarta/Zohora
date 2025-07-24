/**
 * the email sender
 * @example
 * sendTestEmail({
 *  to: 'some@example.com' // here the real email
 *  name: 'name here',
 *  code: 'code here also....'
 * })
 */
import { Logger } from '@src/api/middlewares/logger/access.logger.js'
import { htmlTemplate, textTemplate } from './emailTemplate.js'
import { EMAIL_KEY } from '@src/core/config/app.config.js'
import { Resend } from 'resend'

const resend = new Resend(EMAIL_KEY)

export const sendEmail = async ({
  to,
  name,
  code
}: {
  to: string
  name: string
  code: string
}): Promise<{ success: boolean; error?: unknown; data?: any }> => {
  const text = textTemplate(name, code)
  const html = htmlTemplate(name, code)

  let mailOptions = {
    from: 'zohora@davidzarta.online',
    to,
    subject: 'Tu codigo de un solo uso',
    html,
    text
  }

  try {
    let data = await resend.emails.send(mailOptions)
    return { success: true, data }
  } catch (e) {
    Logger.error(`Error sending the email: ${e}`)
    return { success: false, error: e }
  }
}
