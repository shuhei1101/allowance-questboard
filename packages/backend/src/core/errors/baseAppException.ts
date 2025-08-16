import { LocaleString } from '../messages/localeString';

/**
 * アプリケーション共通の基底例外クラス
 */
export class BaseAppException extends Error {
  public readonly errorType: string;
  public readonly localeMessage: LocaleString;

  constructor(params: {
    errorType: string;
    message: LocaleString;
  }) {
    super(params.message.en);
    this.errorType = params.errorType;
    this.localeMessage = params.message;
    this.name = 'ValidationException';
  }
}
