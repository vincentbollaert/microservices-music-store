import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

// scrypt uses cbs and promisify turns it into promises required for async/await
const sCryptAsync = promisify(scrypt)

// static allows you to access methods without creating new instance of class
export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex')
    const buffer = (await sCryptAsync(password, salt, 64)) as Buffer

    return `${buffer.toString('hex')}.${salt}`
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.')
    const buffer = (await sCryptAsync(suppliedPassword, salt, 64)) as Buffer

    return buffer.toString('hex') === hashedPassword
  }
}
