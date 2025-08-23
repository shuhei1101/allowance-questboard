import { FamilyName } from '@backend/features/family/value-object/familyName';
import { BaseModel } from '@backend/core/models/baseModel';

/**
 * 家族選択ダイアログモデル
 */
export class SelectFamilyDialog extends BaseModel {
  public readonly familyName: FamilyName;

  constructor(params: {familyName: FamilyName}) {
    super();
    this.familyName = params.familyName;
  }

  /**
   * モデルの値を検証する
   */
  protected validate(): void {}

  /**
   * 家族が選択されているかを判定
   * @returns 家族名が設定されていて有効な場合true
   */
  public hasSelectedFamily(): boolean {
    return this.familyName !== null && this.familyName.value.length > 0;
  }

  /**
   * 家族名の文字列表現を取得
   * @returns 家族名の文字列
   */
  public getFamilyNameString(): string {
    return this.familyName.toString();
  }

  /**
   * 初期状態のダイアログを作成
   * @returns 初期状態のSelectFamilyDialogインスタンス
   */
  public static initialize(): SelectFamilyDialog {
    return new SelectFamilyDialog({
      familyName: new FamilyName(''),
    });
  }
}
