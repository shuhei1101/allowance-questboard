import { renderHook } from '@testing-library/react-native';
import { useLoginFormValidationHandler, ValidationResult } from '../handlers/useLoginFormValidationHandler';
import { LoginForm } from '../models/loginForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';

describe('useLoginFormValidationHandler', () => {
  const mockClearErrors = jest.fn();
  const mockSetEmailError = jest.fn();
  const mockSetPasswordError = jest.fn();
  const currentLanguageType = LanguageTypeValue.create('ja');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('バリデーションが成功すること', () => {
    it('メールアドレスとパスワードが有効な場合、バリデーションが成功すること', () => {
      // 準備
      const loginForm = LoginForm.initialize()
        .updateEmail('test@example.com')
        .updatePassword('validPassword123');

      const { result } = renderHook(() =>
        useLoginFormValidationHandler({
          loginForm,
          currentLanguageType,
          clearErrors: mockClearErrors,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
        })
      );

      // 実行
      const validationResult: ValidationResult = result.current();

      // 検証
      expect(validationResult.isValid).toBe(true);
      expect(mockClearErrors).toHaveBeenCalledTimes(1);
      expect(mockSetEmailError).not.toHaveBeenCalled();
      expect(mockSetPasswordError).not.toHaveBeenCalled();
    });
  });

  describe('バリデーションが失敗すること', () => {
    it('メールアドレスが無効な場合、バリデーションが失敗すること', () => {
      // 準備
      const loginForm = LoginForm.initialize()
        .updateEmail('invalid-email')
        .updatePassword('validPassword123');

      const { result } = renderHook(() =>
        useLoginFormValidationHandler({
          loginForm,
          currentLanguageType,
          clearErrors: mockClearErrors,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
        })
      );

      // 実行
      const validationResult: ValidationResult = result.current();

      // 検証
      expect(validationResult.isValid).toBe(false);
      expect(mockClearErrors).toHaveBeenCalledTimes(1);
      expect(mockSetEmailError).toHaveBeenCalledTimes(1);
      expect(mockSetPasswordError).not.toHaveBeenCalled();
    });

    it('パスワードが無効な場合、バリデーションが失敗すること', () => {
      // 準備
      const loginForm = LoginForm.initialize()
        .updateEmail('test@example.com')
        .updatePassword('');

      const { result } = renderHook(() =>
        useLoginFormValidationHandler({
          loginForm,
          currentLanguageType,
          clearErrors: mockClearErrors,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
        })
      );

      // 実行
      const validationResult: ValidationResult = result.current();

      // 検証
      expect(validationResult.isValid).toBe(false);
      expect(mockClearErrors).toHaveBeenCalledTimes(1);
      expect(mockSetEmailError).not.toHaveBeenCalled();
      expect(mockSetPasswordError).toHaveBeenCalledTimes(1);
    });

    it('メールアドレスとパスワードの両方が無効な場合、バリデーションが失敗すること', () => {
      // 準備
      const loginForm = LoginForm.initialize()
        .updateEmail('invalid-email')
        .updatePassword('');

      const { result } = renderHook(() =>
        useLoginFormValidationHandler({
          loginForm,
          currentLanguageType,
          clearErrors: mockClearErrors,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
        })
      );

      // 実行
      const validationResult: ValidationResult = result.current();

      // 検証
      expect(validationResult.isValid).toBe(false);
      expect(mockClearErrors).toHaveBeenCalledTimes(1);
      expect(mockSetEmailError).toHaveBeenCalledTimes(1);
      expect(mockSetPasswordError).toHaveBeenCalledTimes(1);
    });
  });
});
