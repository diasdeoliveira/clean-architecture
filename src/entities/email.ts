import { Either, left, right } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'

export class Email {
  private readonly value: string

  constructor (email: string) {
    this.value = email
  }

  static create (email: string): Either<InvalidEmailError, Email> {
    if (Email.validate(email)) {
      return right(new Email(email))
    }

    return left(new InvalidEmailError())
  }

  static validate (email: string): boolean {
    const emailRegez = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-z0-9](-*\.?[a-zA-z0-9])*\.[a-zA-z](-?[a-zA-z0-9])+$/

    if (!email) {
      return false
    }

    if (email.length > 320) {
      return false
    }

    if (!emailRegez.test(email)) {
      return false
    }

    const [local, domain] = email.split('@')

    if (local.length > 64 || local.length === 0) {
      return false
    }
    if (domain.length > 255 || domain.length === 0) {
      return false
    }

    const domainParts = domain.split('.')
    if (domainParts.some(part => part.length > 63)) {
      return false
    }
    return true
  }
}