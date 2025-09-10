// CustomError.ts
export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);

    // Restore prototype chain (needed for `instanceof` to work in TS/JS)
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name; // e.g. "CustomError"
    this.statusCode = statusCode;

    // Optional: capture stack trace (V8 engines like Node, Chrome)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
