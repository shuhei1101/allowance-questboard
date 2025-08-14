import { FamilyName } from '@backend/features/family/entity/value-object/familyName';

/**
 * 家族選択ダイアログモデル
 */
export class SelectFamilyDialog {
  public readonly familyName: FamilyName;

  constructor(params: {familyName: FamilyName}) {
    this.familyName = params.familyName;
  }

  /**
   * 家族が選択されているかを判定
   * @returns 家族名が設定されている場合true
   */
  public hasSelectedFamily(): boolean {
    return this.familyName !== null;
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
