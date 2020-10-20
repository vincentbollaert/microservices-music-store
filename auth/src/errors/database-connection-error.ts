// this is mostly for demonstration purposes -- defining errorMessage up top and the use of a class

export class DatabaseConnectionError extends Error {
  statusCode = 500
  errorMessage = 'could not connect to db'

  constructor() {
    super()
    
    // only necessary because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrorr() {
    return [
      {
        message: this.errorMessage
      }
    ]
  }
}
