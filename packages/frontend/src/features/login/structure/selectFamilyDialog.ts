import { FamilyName } from '@shared/features/family/value-object/familyName';

/**
 * 家族選択ダイアログデータ（生の値）
 */
export interface SelectFamilyDialogData {
  familyName: string | null;
}

/**
 * 家族選択ダイアログ構造体クラス
 */
export class SelectFamilyDialog {
  public readonly familyName: FamilyName | null;

  constructor(data: SelectFamilyDialogData) {
    this.familyName = data.familyName ? new FamilyName(data.familyName) : null;
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
   * @returns 家族名の文字列、未選択の場合は空文字
   */
  public getFamilyNameString(): string {
    return this.familyName ? this.familyName.value : '';
  }

  /**
   * 生データから安全にSelectFamilyDialogを作成
   * @param data 生のダイアログデータ
   * @returns 常にSelectFamilyDialogを返す
   */
  public static createSafely(data: SelectFamilyDialogData): SelectFamilyDialog {
    return new SelectFamilyDialog(data);
  }

  /**
   * 初期の空ダイアログデータを作成
   */
  public static createInitialData(): SelectFamilyDialogData {
    return {
      familyName: null
    };
  }

  /**
   * 家族を選択した状態のダイアログデータを作成
   * @param familyName 選択する家族名
   */
  public static createWithFamily(familyName: string): SelectFamilyDialogData {
    return {
      familyName
    };
  }
}
