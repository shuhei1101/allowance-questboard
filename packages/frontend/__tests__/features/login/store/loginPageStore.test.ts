import { describe, test, expect, beforeEach } from '@jest/globals';
import { useLoginPageStore } from '@frontend/features/login/store/loginPageStore';
import { LoginFormData } from '@frontend/features/login/structure/loginForm';
import { SelectFamilyDialogData } from '@frontend/features/login/structure/selectFamilyDialog';

// localStorageのモック
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => {
      return store[key] || null;
    },
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// globalオブジェクトにlocalStorageを設定
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

describe('useLoginPageStore', () => {
  // テスト前にストアをリセット
  beforeEach(() => {
    useLoginPageStore.getState().resetState();
    localStorage.clear();
  });

  describe('初期状態', () => {
    test('初期状態が正しく設定されること', () => {
      const state = useLoginPageStore.getState();
      
      // 検証
      expect(state.isLoading).toBe(false);
      expect(state.isDialogVisible).toBe(false);
      expect(state.isValid).toBe(false);
      expect(state.loginForm.email).toBe('');
      expect(state.loginForm.password).toBe('');
      expect(state.selectFamilyDialog.familyName).toBe(null);
    });
  });

  describe('updateLoginFormアクションでフォームデータを更新すること', () => {
    test('有効なフォームデータで更新されること', () => {
      // 準備
      const formData: LoginFormData = {
        email: 'test@example.com',
        password: 'password123'
      };

      // 実行
      useLoginPageStore.getState().updateLoginForm(formData);

      // 検証
      const state = useLoginPageStore.getState();
      expect(state.loginForm.email).toBe('test@example.com');
      expect(state.loginForm.password).toBe('password123');
      expect(state.isValid).toBe(true);
    });

    test('無効なフォームデータで更新されること', () => {
      // 準備
      const formData: LoginFormData = {
        email: 'invalid-email',
        password: '123'
      };

      // 実行
      useLoginPageStore.getState().updateLoginForm(formData);

      // 検証
      const state = useLoginPageStore.getState();
      expect(state.loginForm.email).toBe('invalid-email');
      expect(state.loginForm.password).toBe('123');
      expect(state.isValid).toBe(false);
    });

    test('メールアドレスのみ有効な場合isValidがfalseであること', () => {
      // 準備
      const formData: LoginFormData = {
        email: 'test@example.com',
        password: '123'
      };

      // 実行
      useLoginPageStore.getState().updateLoginForm(formData);

      // 検証
      const state = useLoginPageStore.getState();
      expect(state.isValid).toBe(false);
    });

    test('パスワードのみ有効な場合isValidがfalseであること', () => {
      // 準備
      const formData: LoginFormData = {
        email: 'invalid-email',
        password: 'password123'
      };

      // 実行
      useLoginPageStore.getState().updateLoginForm(formData);

      // 検証
      const state = useLoginPageStore.getState();
      expect(state.isValid).toBe(false);
    });
  });

  describe('updateSelectFamilyDialogアクションでダイアログデータを更新すること', () => {
    test('家族選択データで更新されること', () => {
      // 準備
      const dialogData: SelectFamilyDialogData = {
        familyName: '田中家'
      };

      // 実行
      useLoginPageStore.getState().updateSelectFamilyDialog(dialogData);

      // 検証
      const state = useLoginPageStore.getState();
      expect(state.selectFamilyDialog.familyName).toBe('田中家');
    });

    test('nullデータで更新されること', () => {
      // 準備
      const dialogData: SelectFamilyDialogData = {
        familyName: null
      };

      // 実行
      useLoginPageStore.getState().updateSelectFamilyDialog(dialogData);

      // 検証
      const state = useLoginPageStore.getState();
      expect(state.selectFamilyDialog.familyName).toBe(null);
    });
  });

  describe('setLoadingアクションでローディング状態を更新すること', () => {
    test('ローディング状態をtrueに更新されること', () => {
      // 実行
      useLoginPageStore.getState().setLoading(true);

      // 検証
      const state = useLoginPageStore.getState();
      expect(state.isLoading).toBe(true);
    });

    test('ローディング状態をfalseに更新されること', () => {
      // 準備
      useLoginPageStore.getState().setLoading(true);

      // 実行
      useLoginPageStore.getState().setLoading(false);

      // 検証
      const state = useLoginPageStore.getState();
      expect(state.isLoading).toBe(false);
    });
  });

  describe('setDialogVisibleアクションでダイアログ表示状態を更新すること', () => {
    test('ダイアログ表示状態をtrueに更新されること', () => {
      // 実行
      useLoginPageStore.getState().setDialogVisible(true);

      // 検証
      const state = useLoginPageStore.getState();
      expect(state.isDialogVisible).toBe(true);
    });

    test('ダイアログ表示状態をfalseに更新されること', () => {
      // 準備
      useLoginPageStore.getState().setDialogVisible(true);

      // 実行
      useLoginPageStore.getState().setDialogVisible(false);

      // 検証
      const state = useLoginPageStore.getState();
      expect(state.isDialogVisible).toBe(false);
    });
  });

  describe('resetStateアクションで状態をリセットすること', () => {
    test('すべての状態が初期値に戻ること', () => {
      // 準備：いくつかの状態を変更
      useLoginPageStore.getState().updateLoginForm({
        email: 'test@example.com',
        password: 'password123'
      });
      useLoginPageStore.getState().setLoading(true);
      useLoginPageStore.getState().setDialogVisible(true);

      // 実行
      useLoginPageStore.getState().resetState();

      // 検証
      const state = useLoginPageStore.getState();
      expect(state.isLoading).toBe(false);
      expect(state.isDialogVisible).toBe(false);
      expect(state.isValid).toBe(false);
      expect(state.loginForm.email).toBe('');
      expect(state.loginForm.password).toBe('');
      expect(state.selectFamilyDialog.familyName).toBe(null);
    });
  });

  describe('getLoginFormObjectメソッドでLoginFormオブジェクトを取得すること', () => {
    test('LoginFormオブジェクトが取得されること', () => {
      // 準備
      const formData: LoginFormData = {
        email: 'test@example.com',
        password: 'password123'
      };
      useLoginPageStore.getState().updateLoginForm(formData);

      // 実行
      const loginFormObject = useLoginPageStore.getState().getLoginFormObject();

      // 検証
      expect(loginFormObject).not.toBe(null);
      expect(loginFormObject!.email.value).toBe('test@example.com');
      expect(loginFormObject!.password.value).toBe('password123');
      expect(loginFormObject!.isValid()).toBe(true);
    });
  });

  describe('getSelectFamilyDialogObjectメソッドでSelectFamilyDialogオブジェクトを取得すること', () => {
    test('SelectFamilyDialogオブジェクトが取得されること', () => {
      // 準備
      const dialogData: SelectFamilyDialogData = {
        familyName: '田中家'
      };
      useLoginPageStore.getState().updateSelectFamilyDialog(dialogData);

      // 実行
      const dialogObject = useLoginPageStore.getState().getSelectFamilyDialogObject();

      // 検証
      expect(dialogObject).not.toBe(null);
      expect(dialogObject!.familyName!.value).toBe('田中家');
      expect(dialogObject!.hasSelectedFamily()).toBe(true);
    });

    test('nullの場合のSelectFamilyDialogオブジェクトが取得されること', () => {
      // 準備
      const dialogData: SelectFamilyDialogData = {
        familyName: null
      };
      useLoginPageStore.getState().updateSelectFamilyDialog(dialogData);

      // 実行
      const dialogObject = useLoginPageStore.getState().getSelectFamilyDialogObject();

      // 検証
      expect(dialogObject).not.toBe(null);
      expect(dialogObject!.familyName).toBe(null);
      expect(dialogObject!.hasSelectedFamily()).toBe(false);
    });
  });
});
