class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    // this.message = message;
    this.isOperational = true;
    console.log("error: ", this.message);
    

    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
