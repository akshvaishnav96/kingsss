import nodemailer from 'nodemailer'
import { env } from '../config/env.js'

const { host, port, secure, user, pass, from } = env.mail

export const mailEnabled = Boolean(host && user && pass)

const transporter = mailEnabled ? nodemailer.createTransport({ host, port, secure, auth: { user, pass } }) : null

export async function sendMail(message) {
  if (!transporter) return null
  return transporter.sendMail({ from, ...message })
}

// Checks the SMTP login once at startup so a wrong password shows up in the logs immediately.
export async function verifyMailer() {
  if (!transporter) return console.log('Email: disabled (set SMTP_HOST, SMTP_USER, SMTP_PASS to enable)')
  try {
    await transporter.verify()
    console.log(`Email: ready via ${host}:${port} as ${user}`)
  } catch (err) {
    console.error(`Email: SMTP login failed for ${user}@${host}:${port} — ${err.message}`)
  }
}
