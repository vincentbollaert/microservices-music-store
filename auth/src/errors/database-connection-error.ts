export class DatabaseConnectionError extends Error {
  errorMessage = 'could not connect to db'

  constructor() {
    super()
    
    // only necessary because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }
}
