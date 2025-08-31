import { LocaleString } from "../messages/localeString";
import { relationValidator } from "../validator/relationValidator";
import { RelationValidateError } from "../validator/validationError";

export abstract class BaseModel {
  protected readonly validator = relationValidator;
  protected errorMessage?: LocaleString = undefined;

  constructor() {}

  /** validateの実行
   * 
   * コンストラクタでメンバ初期化後に呼び出すこと */
  protected runValidate(): void {
    try {
      this.validate();
    } catch (error) {
      if (error instanceof RelationValidateError) {
        this.errorMessage = error.localeMessage;
      } else {
        // 予期しないエラーの場合は再スロー
        throw error;
      }
    }
  }

  /** モデルの値を検証する（サブクラスで実装必須）
   * 
   * コンストラクタでrunValidateを呼び出すこと */
  protected abstract validate(): void;

  /**
   * 有効な値かどうかを示す
   */
  get isValid(): boolean {
    return this.errorMessage === undefined;
  }
}
