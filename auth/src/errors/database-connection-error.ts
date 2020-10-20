// this is mostly for demonstration purposes -- defining errorMessage up top and the use of a class

import { CustomError } from "./custom-error"

export class DatabaseConnectionError extends CustomError {
  statusCode = 500
  errorMessage = 'could not connect to db'

  constructor() {
    super()
    
    // only necessary because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return [
      {
        message: this.errorMessage
      }
    ]
  }
}
