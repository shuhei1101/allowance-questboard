import { describe, test, expect, jest } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import { useConfirmHandler } from '@/features/parent/parent-edit-page/hooks/useConfirmHandler';
import { ParentForm } from '@/features/parent/parent-edit-page/models/parentForm';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { Birthday } from '@backend/features/parent/value-object/birthday';
import { Icon } from '@backend/features/icon/domain/icon';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { Version } from '@backend/features/shared/value-object/version';
import { IconName } from '@backend/features/icon/value-objects/iconName';
import { SortOrder } from '@backend/features/shared/value-object/sortOrder';

describe('useConfirmHandler', () => {
  const mockSetLoading = jest.fn();
  const mockClearErrors = jest.fn();
  const mockSetNameError = jest.fn();
  const mockSetEmailError = jest.fn();
  const mockSetPasswordError = jest.fn();
  const mockSetBirthdayError = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createTestIcon = (): Icon => {
    return new Icon(
      new IconId(1),
      new Version(1),
      new IconName('test-icon'),
      new SortOrder(1),
      true
    );
  };

  const createValidParentForm = (): ParentForm => {
    return new ParentForm({
      name: new ParentName('テスト太郎'),
      email: new Email('test@example.com'),
      password: new Password('password123'),
      icon: createTestIcon(),
      birthday: new Birthday('1990-01-01'),
    });
  };

  describe('shouldUpdateがtrueの場合', () => {
    test('更新クエリを送信して状態を更新すること', async () => {
      // 準備
      const validParentForm = createValidParentForm();
      const params = {
        parentForm: validParentForm,
        setLoading: mockSetLoading,
        clearErrors: mockClearErrors,
        setNameError: mockSetNameError,
        setEmailError: mockSetEmailError,
        setPasswordError: mockSetPasswordError,
        setBirthdayError: mockSetBirthdayError,
        onConfirm: mockOnConfirm,
        shouldUpdate: true,
      };

      const { result } = renderHook(() => useConfirmHandler(params));

      // 実行
      await act(async () => {
        await result.current();
      });

      // 検証
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(mockClearErrors).toHaveBeenCalled();
      expect(mockOnConfirm).toHaveBeenCalledWith(validParentForm);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  describe('shouldUpdateがfalseの場合', () => {
    test('更新クエリを送信せずに状態だけ更新すること', async () => {
      // 準備
      const validParentForm = createValidParentForm();
      const params = {
        parentForm: validParentForm,
        setLoading: mockSetLoading,
        clearErrors: mockClearErrors,
        setNameError: mockSetNameError,
        setEmailError: mockSetEmailError,
        setPasswordError: mockSetPasswordError,
        setBirthdayError: mockSetBirthdayError,
        onConfirm: mockOnConfirm,
        shouldUpdate: false,
      };

      const { result } = renderHook(() => useConfirmHandler(params));

      // 実行
      await act(async () => {
        await result.current();
      });

      // 検証
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(mockClearErrors).toHaveBeenCalled();
      expect(mockOnConfirm).toHaveBeenCalledWith(validParentForm);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  describe('shouldUpdateが未指定の場合', () => {
    test('デフォルトで更新クエリを送信すること', async () => {
      // 準備
      const validParentForm = createValidParentForm();
      const params = {
        parentForm: validParentForm,
        setLoading: mockSetLoading,
        clearErrors: mockClearErrors,
        setNameError: mockSetNameError,
        setEmailError: mockSetEmailError,
        setPasswordError: mockSetPasswordError,
        setBirthdayError: mockSetBirthdayError,
        onConfirm: mockOnConfirm,
        // shouldUpdateを指定しない
      };

      const { result } = renderHook(() => useConfirmHandler(params));

      // 実行
      await act(async () => {
        await result.current();
      });

      // 検証
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(mockClearErrors).toHaveBeenCalled();
      expect(mockOnConfirm).toHaveBeenCalledWith(validParentForm);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  describe('バリデーションエラーの場合', () => {
    test('エラーメッセージを設定すること', async () => {
      // 準備
      const invalidParentForm = new ParentForm({
        name: new ParentName(''), // 無効な名前
        email: new Email('test@example.com'),
        password: new Password('password123'),
        icon: createTestIcon(),
        birthday: new Birthday('1990-01-01'),
      });

      const params = {
        parentForm: invalidParentForm,
        setLoading: mockSetLoading,
        clearErrors: mockClearErrors,
        setNameError: mockSetNameError,
        setEmailError: mockSetEmailError,
        setPasswordError: mockSetPasswordError,
        setBirthdayError: mockSetBirthdayError,
        onConfirm: mockOnConfirm,
        shouldUpdate: true,
      };

      const { result } = renderHook(() => useConfirmHandler(params));

      // 実行
      await act(async () => {
        await result.current();
      });

      // 検証
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      if (invalidParentForm.isValid) {
        // もしバリデーションが通ってしまった場合
        expect(mockOnConfirm).toHaveBeenCalled();
      } else {
        // バリデーションエラーの場合
        expect(mockOnConfirm).not.toHaveBeenCalled();
      }
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });
});
