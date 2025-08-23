import { renderHook, act } from '@testing-library/react-native';
import { useConfirmHandler } from '../hooks/useConfirmHandler';
import { ParentForm } from '../models/parentForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { Birthday } from '@backend/features/shared/value-object/birthday';

describe('useConfirmHandler', () => {
  const mockSetLoading = jest.fn();
  const mockClearErrors = jest.fn();
  const mockSetNameError = jest.fn();
  const mockSetEmailError = jest.fn();
  const mockSetPasswordError = jest.fn();
  const mockSetBirthdayError = jest.fn();
  const currentLanguageType = LanguageTypeValue.create('ja');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('バリデーションエラーの場合', () => {
    it('バリデーションエラーの場合、処理が中断されること', async () => {
      // 準備
      const parentForm = new ParentForm({
        name: new ParentName(''), // 無効な名前
        email: new Email('test@example.com'),
        password: new Password('validPassword123'),
        icon: null,
        birthday: new Birthday('1990-01-01')
      });

      const { result } = renderHook(() =>
        useConfirmHandler({
          parentForm,
          currentLanguageType,
          setLoading: mockSetLoading,
          clearErrors: mockClearErrors,
          setNameError: mockSetNameError,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setBirthdayError: mockSetBirthdayError,
          shouldUpdate: true,
        })
      );

      // 実行
      await act(async () => {
        await result.current();
      });

      // 検証
      expect(mockSetLoading).not.toHaveBeenCalledWith(true);
      expect(mockSetLoading).not.toHaveBeenCalledWith(false);
    });
  });

  describe('バリデーション成功の場合', () => {
    it('shouldUpdateがfalseの場合、API呼び出しをスキップすること', async () => {
      // 準備
      const parentForm = new ParentForm({
        name: new ParentName('テスト太郎'),
        email: new Email('test@example.com'),
        password: new Password('validPassword123'),
        icon: null,
        birthday: new Birthday('1990-01-01')
      });

      const { result } = renderHook(() =>
        useConfirmHandler({
          parentForm,
          currentLanguageType,
          setLoading: mockSetLoading,
          clearErrors: mockClearErrors,
          setNameError: mockSetNameError,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setBirthdayError: mockSetBirthdayError,
          shouldUpdate: false,
        })
      );

      // 実行
      await act(async () => {
        await result.current();
      });

      // 検証
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });

    it('shouldUpdateがtrueの場合、正常に処理が実行されること', async () => {
      // 準備
      const parentForm = new ParentForm({
        name: new ParentName('テスト太郎'),
        email: new Email('test@example.com'),
        password: new Password('validPassword123'),
        icon: null,
        birthday: new Birthday('1990-01-01')
      });

      const { result } = renderHook(() =>
        useConfirmHandler({
          parentForm,
          currentLanguageType,
          setLoading: mockSetLoading,
          clearErrors: mockClearErrors,
          setNameError: mockSetNameError,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setBirthdayError: mockSetBirthdayError,
          shouldUpdate: true,
        })
      );

      // 実行
      await act(async () => {
        await result.current();
      });

      // 検証
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });

    it('shouldUpdateが未指定の場合、デフォルトでAPI呼び出しが実行されること', async () => {
      // 準備
      const parentForm = new ParentForm({
        name: new ParentName('テスト太郎'),
        email: new Email('test@example.com'),
        password: new Password('validPassword123'),
        icon: null,
        birthday: new Birthday('1990-01-01')
      });

      const { result } = renderHook(() =>
        useConfirmHandler({
          parentForm,
          currentLanguageType,
          setLoading: mockSetLoading,
          clearErrors: mockClearErrors,
          setNameError: mockSetNameError,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setBirthdayError: mockSetBirthdayError,
          // shouldUpdate未指定
        })
      );

      // 実行
      await act(async () => {
        await result.current();
      });

      // 検証
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });
});
