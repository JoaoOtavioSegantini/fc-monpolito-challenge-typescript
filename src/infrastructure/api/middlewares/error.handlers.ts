import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

export const errorLogger = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const time = new Date();
  console.log(`${time} error ${error.message}`);
  console.log(error);

  next(error);
};

export const errorResponder = (
  error: AppError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.header("Content-Type", "application/json");

  const status = error.statusCode || 400;
  const message = {
    errors: { message: error.message },
  };
  response.status(status).send(message);
};
