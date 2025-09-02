import { BaseModel } from "./baseModel";

export abstract class BaseForm extends BaseModel {
  /** フォームの初期化 */
  public static initialize(): BaseForm {
    throw new Error('Not Implemented');
  }
}
