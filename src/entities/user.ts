import { UserData } from './user-data'
import { Either, left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'
import { Email } from './email'
import { Name } from './name'

export class User {
  static create (
    userData: UserData
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    const emailOrError = Email.create(userData.email)

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError())
    }

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}