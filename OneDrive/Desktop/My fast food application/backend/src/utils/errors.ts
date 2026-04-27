export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const createError = (statusCode: number, message: string): AppError => {
  return new AppError(statusCode, message);
};
