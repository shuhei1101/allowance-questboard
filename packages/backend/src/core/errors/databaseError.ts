import { LocaleString } from "../messages/localeString";
import { AppError } from "./appError";

export class DatabaseError extends AppError {
  constructor(params: {message: LocaleString}) {
    super({
      errorType: 'DATABASE_ERROR',
      message: params.message
    });
  }
}
