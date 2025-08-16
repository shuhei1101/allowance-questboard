import { LocaleString } from "../messages/localeString";
import { RelationValidator } from "../validator/relationValidator";
import { ValueValidateException } from "../validator/validationException";

export abstract class BaseModel {
  protected readonly validator: RelationValidator = new RelationValidator();
  protected _errorMessage: LocaleString | null = null;

  constructor() {
    try {
      this._validate();
      this._errorMessage = null;
    } catch (error) {
      if (error instanceof ValueValidateException) {
        this._errorMessage = error.localeMessage;
      } else {
        // 予期しないエラーの場合は再スロー
        throw error;
      }
    }
  }

  /**
   * モデルの値を検証する（サブクラスで実装必須）
   */
  protected abstract _validate(): void;

  /**
   * 有効な値かどうかを示す
   */
  get isValid(): boolean {
    return this._errorMessage === null;
  }

  /**
   * エラーメッセージを取得
   */
  get errorMessage(): LocaleString | null {
    return this._errorMessage;
  }
}
