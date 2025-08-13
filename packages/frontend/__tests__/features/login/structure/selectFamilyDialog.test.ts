import { describe, test, expect } from '@jest/globals';
import { SelectFamilyDialog, SelectFamilyDialogData } from '@/features/login/structure/selectFamilyDialog';

describe('SelectFamilyDialog', () => {
  describe('コンストラクタでインスタンスを作成すること', () => {
    test('有効な家族名でインスタンスが作成されること', () => {
      // 準備
      const data: SelectFamilyDialogData = {
        familyName: '田中家'
      };

      // 実行
      const dialog = new SelectFamilyDialog(data);

      // 検証
      expect(dialog.familyName).not.toBe(null);
      expect(dialog.familyName?.value).toBe('田中家');
      expect(dialog.familyName?.isValid).toBe(true);
    });

    test('家族名がnullでインスタンスが作成されること', () => {
      // 準備
      const data: SelectFamilyDialogData = {
        familyName: null
      };

      // 実行
      const dialog = new SelectFamilyDialog(data);

      // 検証
      expect(dialog.familyName).toBe(null);
    });

    test('無効な家族名（空文字）でインスタンスが作成されること', () => {
      // 準備
      const data: SelectFamilyDialogData = {
        familyName: ''
      };

      // 実行
      const dialog = new SelectFamilyDialog(data);

      // 検証
      expect(dialog.familyName).toBe(null); // 空文字はfalsyなのでnullになる
    });

    test('無効な家族名（長すぎる）でインスタンスが作成されること', () => {
      // 準備
      const longFamilyName = 'あ'.repeat(21); // 21文字（20文字制限を超過）
      const data: SelectFamilyDialogData = {
        familyName: longFamilyName
      };

      // 実行
      const dialog = new SelectFamilyDialog(data);

      // 検証
      expect(dialog.familyName).not.toBe(null);
      expect(dialog.familyName?.value).toBe(longFamilyName);
      expect(dialog.familyName?.isValid).toBe(false);
    });
  });

  describe('hasSelectedFamilyメソッドで家族選択状態を判定すること', () => {
    test('家族名が設定されている場合trueを返すこと', () => {
      // 準備
      const data: SelectFamilyDialogData = {
        familyName: '田中家'
      };
      const dialog = new SelectFamilyDialog(data);

      // 実行
      const result = dialog.hasSelectedFamily();

      // 検証
      expect(result).toBe(true);
    });

    test('家族名がnullの場合falseを返すこと', () => {
      // 準備
      const data: SelectFamilyDialogData = {
        familyName: null
      };
      const dialog = new SelectFamilyDialog(data);

      // 実行
      const result = dialog.hasSelectedFamily();

      // 検証
      expect(result).toBe(false);
    });

    test('家族名が無効でもnullでなければtrueを返すこと', () => {
      // 準備：空文字ではなく有効な家族名を使用
      const data: SelectFamilyDialogData = {
        familyName: 'あ'.repeat(21) // 21文字（無効だが設定されている）
      };
      const dialog = new SelectFamilyDialog(data);

      // 実行
      const result = dialog.hasSelectedFamily();

      // 検証
      expect(result).toBe(true);
    });
  });

  describe('getFamilyNameStringメソッドで家族名文字列を取得すること', () => {
    test('家族名が設定されている場合その値を返すこと', () => {
      // 準備
      const data: SelectFamilyDialogData = {
        familyName: '田中家'
      };
      const dialog = new SelectFamilyDialog(data);

      // 実行
      const result = dialog.getFamilyNameString();

      // 検証
      expect(result).toBe('田中家');
    });

    test('家族名がnullの場合空文字を返すこと', () => {
      // 準備
      const data: SelectFamilyDialogData = {
        familyName: null
      };
      const dialog = new SelectFamilyDialog(data);

      // 実行
      const result = dialog.getFamilyNameString();

      // 検証
      expect(result).toBe('');
    });
  });

  describe('createSafelyメソッドで安全にインスタンスを作成すること', () => {
    test('有効なデータで作成されること', () => {
      // 準備
      const data: SelectFamilyDialogData = {
        familyName: '田中家'
      };

      // 実行
      const dialog = SelectFamilyDialog.createSafely(data);

      // 検証
      expect(dialog).toBeInstanceOf(SelectFamilyDialog);
      expect(dialog.hasSelectedFamily()).toBe(true);
    });

    test('無効なデータでも例外を投げずに作成されること', () => {
      // 準備：空文字ではなく無効な長い家族名を使用
      const data: SelectFamilyDialogData = {
        familyName: 'あ'.repeat(21) // 21文字（無効な家族名）
      };

      // 実行
      const dialog = SelectFamilyDialog.createSafely(data);

      // 検証
      expect(dialog).toBeInstanceOf(SelectFamilyDialog);
      expect(dialog.hasSelectedFamily()).toBe(true);
      expect(dialog.familyName?.isValid).toBe(false);
    });
  });

  describe('createInitialDataメソッドで初期データを作成すること', () => {
    test('初期データが作成されること', () => {
      // 実行
      const initialData = SelectFamilyDialog.createInitialData();

      // 検証
      expect(initialData.familyName).toBe(null);
    });
  });

  describe('createWithFamilyメソッドで家族指定データを作成すること', () => {
    test('指定した家族名のデータが作成されること', () => {
      // 実行
      const data = SelectFamilyDialog.createWithFamily('佐藤家');

      // 検証
      expect(data.familyName).toBe('佐藤家');
    });
  });
});
