import Mailgun from 'mailgun-js'

import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(__dirname, '../../.env') })

const mailgunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: process.env.MAILGUN_DOMAIN || ''
})

const sendEmail = (subject: string, html: string) => {
  const emailData: Mailgun.messages.SendData = {
    from:
      'Mailgun Sandbox <postmaster@sandboxc6ca8ab4fc434bb187f4d4d7923c8705.mailgun.org>',
    to: 'tambovcev99@mail.ru',
    subject,
    html
  }
  return mailgunClient.messages().send(emailData)
}

export const sendVerificationEmail = (fullname: string, key: string) => {
  const emailSubject = `Hello ${fullname}, please verify your email`
  const emailBody = `Verify your email by following <a href="${process.env.DOMAIN}/verification/${key}/">this link</a>`
  return sendEmail(emailSubject, emailBody)
}
