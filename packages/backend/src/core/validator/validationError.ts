import { AppError } from '../errors/appError';
import { LocaleString } from '../messages/localeString';

export class ValueValidateError extends AppError {
  public readonly valueName: LocaleString;

  /**
   * 値オブジェクトのバリデーションエラーを表すカスタム例外クラス
   */
  constructor(params: {
    valueName: LocaleString;
    errorType: string;
    message: LocaleString;
  }) {
    super({ errorType: params.errorType, message: params.message });
    this.valueName = params.valueName;
  }
}

export class RelationValidateError extends AppError {
  /**
   * 関連バリデーションエラーを表すカスタム例外クラス
   */
  constructor(params: {
    errorType: string;
    message: LocaleString;
  }) {
    super({ errorType: params.errorType, message: params.message });
  }
} 
