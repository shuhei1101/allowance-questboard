import { BaseAppException } from '../errors/baseAppException';
import { LocaleString } from '../messages/localeString';

export class ValueValidateException extends BaseAppException {
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

export class RelationValidateException extends BaseAppException {
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
