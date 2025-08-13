import { describe, test, expect, beforeEach } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import {
  useLoginFormObject,
  useSelectFamilyDialogObject,
  useIsFormValid,
  useIsLoading,
  useIsDialogVisible,
  useLoginFormData,
  useSelectFamilyDialogData,
  useUpdateLoginForm,
  useUpdateSelectFamilyDialog,
  useSetLoading,
  useSetDialogVisible,
  useResetLoginState,
  useLoginFormState
} from '@/features/login/hooks/loginPageHooks';
import { useLoginPageStore } from '@/features/login/store/loginPageStore';
import { LoginFormData } from '@/features/login/structure/loginForm';
import { SelectFamilyDialogData } from '@/features/login/structure/selectFamilyDialog';

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

describe('LoginPageHooks', () => {
  // テスト前にストアをリセット
  beforeEach(() => {
    useLoginPageStore.getState().resetState();
    localStorage.clear();
  });

  describe('useLoginFormObject', () => {
    test('初期状態でLoginFormオブジェクトが取得されること', () => {
      // 実行
      const { result } = renderHook(() => useLoginFormObject());

      // 検証
      expect(result.current).not.toBe(null);
      expect(result.current!.email.value).toBe('');
      expect(result.current!.password.value).toBe('');
      expect(result.current!.isValid()).toBe(false);
    });

    test('有効なフォームデータでLoginFormオブジェクトが更新されること', () => {
      // 準備
      const formData: LoginFormData = {
        email: 'test@example.com',
        password: 'password123'
      };

      // 実行
      const { result: formObjectResult } = renderHook(() => useLoginFormObject());
      const { result: updateFormResult } = renderHook(() => useUpdateLoginForm());

      act(() => {
        updateFormResult.current(formData);
      });

      // 検証
      expect(formObjectResult.current!.email.value).toBe('test@example.com');
      expect(formObjectResult.current!.password.value).toBe('password123');
      expect(formObjectResult.current!.isValid()).toBe(true);
    });
  });

  describe('useSelectFamilyDialogObject', () => {
    test('初期状態でSelectFamilyDialogオブジェクトが取得されること', () => {
      // 実行
      const { result } = renderHook(() => useSelectFamilyDialogObject());

      // 検証
      expect(result.current).not.toBe(null);
      expect(result.current!.familyName).toBe(null);
      expect(result.current!.hasSelectedFamily()).toBe(false);
    });

    test('家族選択データでSelectFamilyDialogオブジェクトが更新されること', () => {
      // 準備
      const dialogData: SelectFamilyDialogData = {
        familyName: '田中家'
      };

      // 実行
      const { result: dialogObjectResult } = renderHook(() => useSelectFamilyDialogObject());
      const { result: updateDialogResult } = renderHook(() => useUpdateSelectFamilyDialog());

      act(() => {
        updateDialogResult.current(dialogData);
      });

      // 検証
      expect(dialogObjectResult.current!.familyName!.value).toBe('田中家');
      expect(dialogObjectResult.current!.hasSelectedFamily()).toBe(true);
    });
  });

  describe('useIsFormValid', () => {
    test('初期状態でfalseが返されること', () => {
      // 実行
      const { result } = renderHook(() => useIsFormValid());

      // 検証
      expect(result.current).toBe(false);
    });

    test('有効なフォームでtrueが返されること', () => {
      // 準備
      const formData: LoginFormData = {
        email: 'test@example.com',
        password: 'password123'
      };

      // 実行
      const { result: isValidResult } = renderHook(() => useIsFormValid());
      const { result: updateFormResult } = renderHook(() => useUpdateLoginForm());

      act(() => {
        updateFormResult.current(formData);
      });

      // 検証
      expect(isValidResult.current).toBe(true);
    });
  });

  describe('useIsLoading', () => {
    test('初期状態でfalseが返されること', () => {
      // 実行
      const { result } = renderHook(() => useIsLoading());

      // 検証
      expect(result.current).toBe(false);
    });

    test('ローディング状態の更新が反映されること', () => {
      // 実行
      const { result: isLoadingResult } = renderHook(() => useIsLoading());
      const { result: setLoadingResult } = renderHook(() => useSetLoading());

      act(() => {
        setLoadingResult.current(true);
      });

      // 検証
      expect(isLoadingResult.current).toBe(true);
    });
  });

  describe('useIsDialogVisible', () => {
    test('初期状態でfalseが返されること', () => {
      // 実行
      const { result } = renderHook(() => useIsDialogVisible());

      // 検証
      expect(result.current).toBe(false);
    });

    test('ダイアログ表示状態の更新が反映されること', () => {
      // 実行
      const { result: isDialogVisibleResult } = renderHook(() => useIsDialogVisible());
      const { result: setDialogVisibleResult } = renderHook(() => useSetDialogVisible());

      act(() => {
        setDialogVisibleResult.current(true);
      });

      // 検証
      expect(isDialogVisibleResult.current).toBe(true);
    });
  });

  describe('useLoginFormData', () => {
    test('初期状態で空のフォームデータが返されること', () => {
      // 実行
      const { result } = renderHook(() => useLoginFormData());

      // 検証
      expect(result.current.email).toBe('');
      expect(result.current.password).toBe('');
    });

    test('フォームデータの更新が反映されること', () => {
      // 準備
      const formData: LoginFormData = {
        email: 'test@example.com',
        password: 'password123'
      };

      // 実行
      const { result: formDataResult } = renderHook(() => useLoginFormData());
      const { result: updateFormResult } = renderHook(() => useUpdateLoginForm());

      act(() => {
        updateFormResult.current(formData);
      });

      // 検証
      expect(formDataResult.current.email).toBe('test@example.com');
      expect(formDataResult.current.password).toBe('password123');
    });
  });

  describe('useSelectFamilyDialogData', () => {
    test('初期状態でnullの家族名データが返されること', () => {
      // 実行
      const { result } = renderHook(() => useSelectFamilyDialogData());

      // 検証
      expect(result.current.familyName).toBe(null);
    });

    test('ダイアログデータの更新が反映されること', () => {
      // 準備
      const dialogData: SelectFamilyDialogData = {
        familyName: '田中家'
      };

      // 実行
      const { result: dialogDataResult } = renderHook(() => useSelectFamilyDialogData());
      const { result: updateDialogResult } = renderHook(() => useUpdateSelectFamilyDialog());

      act(() => {
        updateDialogResult.current(dialogData);
      });

      // 検証
      expect(dialogDataResult.current.familyName).toBe('田中家');
    });
  });

  describe('useResetLoginState', () => {
    test('状態がリセットされること', () => {
      // 準備：いくつかの状態を変更
      const formData: LoginFormData = {
        email: 'test@example.com',
        password: 'password123'
      };

      // 実行
      const { result: formDataResult } = renderHook(() => useLoginFormData());
      const { result: isLoadingResult } = renderHook(() => useIsLoading());
      const { result: updateFormResult } = renderHook(() => useUpdateLoginForm());
      const { result: setLoadingResult } = renderHook(() => useSetLoading());
      const { result: resetStateResult } = renderHook(() => useResetLoginState());

      act(() => {
        updateFormResult.current(formData);
        setLoadingResult.current(true);
      });

      // 状態変更の確認
      expect(formDataResult.current.email).toBe('test@example.com');
      expect(isLoadingResult.current).toBe(true);

      act(() => {
        resetStateResult.current();
      });

      // 検証：リセット後の状態
      expect(formDataResult.current.email).toBe('');
      expect(formDataResult.current.password).toBe('');
      expect(isLoadingResult.current).toBe(false);
    });
  });

  describe('useLoginFormState', () => {
    test('初期状態で総合的なフォーム状態が返されること', () => {
      // 実行
      const { result } = renderHook(() => useLoginFormState());

      // 検証
      expect(result.current.loginForm).not.toBe(null);
      expect(result.current.isValid).toBe(false);
      expect(result.current.canLogin).toBe(false);
    });

    test('有効なフォームで総合的な状態が正しく返されること', () => {
      // 準備
      const formData: LoginFormData = {
        email: 'test@example.com',
        password: 'password123'
      };

      // 実行
      const { result: formStateResult } = renderHook(() => useLoginFormState());
      const { result: updateFormResult } = renderHook(() => useUpdateLoginForm());

      act(() => {
        updateFormResult.current(formData);
      });

      // 検証
      expect(formStateResult.current.loginForm).not.toBe(null);
      expect(formStateResult.current.loginForm!.isValid()).toBe(true);
      expect(formStateResult.current.isValid).toBe(true);
      expect(formStateResult.current.canLogin).toBe(true);
    });

    test('無効なフォームで総合的な状態が正しく返されること', () => {
      // 準備
      const formData: LoginFormData = {
        email: 'invalid-email',
        password: '123'
      };

      // 実行
      const { result: formStateResult } = renderHook(() => useLoginFormState());
      const { result: updateFormResult } = renderHook(() => useUpdateLoginForm());

      act(() => {
        updateFormResult.current(formData);
      });

      // 検証
      expect(formStateResult.current.loginForm).not.toBe(null);
      expect(formStateResult.current.loginForm!.isValid()).toBe(false);
      expect(formStateResult.current.isValid).toBe(false);
      expect(formStateResult.current.canLogin).toBe(false);
    });
  });
});
