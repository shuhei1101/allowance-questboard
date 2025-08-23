import { renderHook } from '@testing-library/react-native';
import { useParentFormValidationHandler, ValidationResult } from '../handlers/useParentFormValidationHandler';
import { ParentForm } from '../models/parentForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { Birthday } from '@backend/features/shared/value-object/birthday';

describe('useParentFormValidationHandler', () => {
  const mockClearErrors = jest.fn();
  const mockSetNameError = jest.fn();
  const mockSetEmailError = jest.fn();
  const mockSetPasswordError = jest.fn();
  const mockSetBirthdayError = jest.fn();
  const currentLanguageType = LanguageTypeValue.create('ja');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('バリデーションが成功すること', () => {
    it('全ての項目が有効な場合、バリデーションが成功すること', () => {
      // 準備
      const parentForm = new ParentForm({
        name: new ParentName('テスト太郎'),
        email: new Email('test@example.com'),
        password: new Password('validPassword123'),
        icon: null,
        birthday: new Birthday('1990-01-01')
      });

      const { result } = renderHook(() =>
        useParentFormValidationHandler({
          parentForm,
          currentLanguageType,
          clearErrors: mockClearErrors,
          setNameError: mockSetNameError,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setBirthdayError: mockSetBirthdayError,
        })
      );

      // 実行
      const validationResult: ValidationResult = result.current();

      // 検証
      expect(validationResult.isValid).toBe(true);
      expect(mockClearErrors).toHaveBeenCalledTimes(1);
      expect(mockSetNameError).not.toHaveBeenCalled();
      expect(mockSetEmailError).not.toHaveBeenCalled();
      expect(mockSetPasswordError).not.toHaveBeenCalled();
      expect(mockSetBirthdayError).not.toHaveBeenCalled();
    });
  });

  describe('バリデーションが失敗すること', () => {
    it('名前が無効な場合、バリデーションが失敗すること', () => {
      // 準備
      const parentForm = new ParentForm({
        name: new ParentName(''), // 空文字で無効
        email: new Email('test@example.com'),
        password: new Password('validPassword123'),
        icon: null,
        birthday: new Birthday('1990-01-01')
      });

      const { result } = renderHook(() =>
        useParentFormValidationHandler({
          parentForm,
          currentLanguageType,
          clearErrors: mockClearErrors,
          setNameError: mockSetNameError,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setBirthdayError: mockSetBirthdayError,
        })
      );

      // 実行
      const validationResult: ValidationResult = result.current();

      // 検証
      expect(validationResult.isValid).toBe(false);
      expect(mockClearErrors).toHaveBeenCalledTimes(1);
      expect(mockSetNameError).toHaveBeenCalledTimes(1);
      expect(mockSetEmailError).not.toHaveBeenCalled();
      expect(mockSetPasswordError).not.toHaveBeenCalled();
      expect(mockSetBirthdayError).not.toHaveBeenCalled();
    });

    it('メールアドレスが無効な場合、バリデーションが失敗すること', () => {
      // 準備
      const parentForm = new ParentForm({
        name: new ParentName('テスト太郎'),
        email: new Email('invalid-email'), // 無効なメールアドレス
        password: new Password('validPassword123'),
        icon: null,
        birthday: new Birthday('1990-01-01')
      });

      const { result } = renderHook(() =>
        useParentFormValidationHandler({
          parentForm,
          currentLanguageType,
          clearErrors: mockClearErrors,
          setNameError: mockSetNameError,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setBirthdayError: mockSetBirthdayError,
        })
      );

      // 実行
      const validationResult: ValidationResult = result.current();

      // 検証
      expect(validationResult.isValid).toBe(false);
      expect(mockClearErrors).toHaveBeenCalledTimes(1);
      expect(mockSetNameError).not.toHaveBeenCalled();
      expect(mockSetEmailError).toHaveBeenCalledTimes(1);
      expect(mockSetPasswordError).not.toHaveBeenCalled();
      expect(mockSetBirthdayError).not.toHaveBeenCalled();
    });

    it('複数項目が無効な場合、全てのエラーが設定されること', () => {
      // 準備
      const parentForm = new ParentForm({
        name: new ParentName(''), // 無効
        email: new Email('invalid-email'), // 無効
        password: new Password(''), // 無効
        icon: null,
        birthday: new Birthday('invalid-date') // 無効
      });

      const { result } = renderHook(() =>
        useParentFormValidationHandler({
          parentForm,
          currentLanguageType,
          clearErrors: mockClearErrors,
          setNameError: mockSetNameError,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setBirthdayError: mockSetBirthdayError,
        })
      );

      // 実行
      const validationResult: ValidationResult = result.current();

      // 検証
      expect(validationResult.isValid).toBe(false);
      expect(mockClearErrors).toHaveBeenCalledTimes(1);
      expect(mockSetNameError).toHaveBeenCalledTimes(1);
      expect(mockSetEmailError).toHaveBeenCalledTimes(1);
      expect(mockSetPasswordError).toHaveBeenCalledTimes(1);
      expect(mockSetBirthdayError).toHaveBeenCalledTimes(1);
    });
  });
});
