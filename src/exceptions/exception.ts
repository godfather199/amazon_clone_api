export class HttpException extends Error {
    public status: string;
    public validationError?: any[];
  
    constructor(
      public statusCode: number,
      message: string,
      validationError?: any[]
    ) {
      super(message);
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.validationError = validationError;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  