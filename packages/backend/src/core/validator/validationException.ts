import { LocaleString } from '../messages/localeString';

export class ValidationException extends Error {
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

export class ValueValidateException extends ValidationException {
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
    this.name = 'ValueValidateException';
  }
}

export class RelationValidateException extends ValidationException {
  /**
   * 関連バリデーションエラーを表すカスタム例外クラス
   */
  constructor(params: {
    errorType: string;
    message: LocaleString;
  }) {
    super({ errorType: params.errorType, message: params.message });
    this.name = 'RelationValidateException';
  }
} 
