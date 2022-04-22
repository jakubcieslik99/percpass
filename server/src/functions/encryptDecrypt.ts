import crypto from 'crypto'
import { config } from '../config/utilities'

const encryptPassword = (password: string) => {
  const iv = Buffer.from(crypto.randomBytes(16))
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(config.CRYPTO_SECRET), iv)

  const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()])

  return { encryptedPassword: encryptedPassword.toString('hex'), iv }
}

const decryptPassword = (encryption: { encryptedPassword: string; iv: string }) => {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(config.CRYPTO_SECRET),
    Buffer.from(encryption.iv, 'hex')
  )

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.encryptedPassword, 'hex')),
    decipher.final(),
  ])

  return decryptedPassword.toString()
}

export { encryptPassword, decryptPassword }
