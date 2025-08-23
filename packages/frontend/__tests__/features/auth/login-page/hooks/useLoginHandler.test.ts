import { renderHook, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useLoginHandler } from '../hooks/useLoginHandler';
import { LoginForm } from '../models/loginForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { supabase } from '@/core/supabase/supabase';

// モック
jest.mock('@/core/supabase/supabase');
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

describe('useLoginHandler', () => {
  const mockClearErrors = jest.fn();
  const mockSetEmailError = jest.fn();
  const mockSetPasswordError = jest.fn();
  const mockSetLoading = jest.fn();
  const mockShowDialog = jest.fn();
  const mockLogin = jest.fn();
  const mockSetSelectFamilyDialog = jest.fn();
  const mockLoginRouter = {} as any;
  const currentLanguageType = LanguageTypeValue.create('ja');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('バリデーションエラーの場合', () => {
    it('メールアドレスが無効な場合、ログイン処理を実行しないこと', async () => {
      // 準備
      const loginForm = LoginForm.initialize()
        .updateEmail('invalid-email')
        .updatePassword('validPassword123');

      const { result } = renderHook(() =>
        useLoginHandler({
          loginForm,
          currentLanguageType,
          clearErrors: mockClearErrors,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setLoading: mockSetLoading,
          showDialog: mockShowDialog,
          login: mockLogin,
          setSelectFamilyDialog: mockSetSelectFamilyDialog,
          loginRouter: mockLoginRouter,
        })
      );

      // 実行
      await act(async () => {
        await result.current();
      });

      // 検証
      expect(mockSetLoading).not.toHaveBeenCalled();
      expect(supabase.auth.signInWithPassword).not.toHaveBeenCalled();
      expect(mockLogin).not.toHaveBeenCalled();
      expect(mockShowDialog).not.toHaveBeenCalled();
    });
  });

  describe('ログイン成功の場合', () => {
    it('正常なログイン処理が実行されること', async () => {
      // 準備
      const loginForm = LoginForm.initialize()
        .updateEmail('test@example.com')
        .updatePassword('validPassword123');

      const mockSession = {
        access_token: 'mock-jwt-token',
      };

      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      const { result } = renderHook(() =>
        useLoginHandler({
          loginForm,
          currentLanguageType,
          clearErrors: mockClearErrors,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setLoading: mockSetLoading,
          showDialog: mockShowDialog,
          login: mockLogin,
          setSelectFamilyDialog: mockSetSelectFamilyDialog,
          loginRouter: mockLoginRouter,
        })
      );

      // 実行
      await act(async () => {
        await result.current();
      });

      // 検証
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'validPassword123',
      });
      expect(mockLogin).toHaveBeenCalledWith({
        setSelectFamilyDialog: mockSetSelectFamilyDialog,
        router: mockLoginRouter,
      });
      expect(mockShowDialog).toHaveBeenCalled();
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  describe('ログイン失敗の場合', () => {
    it('Supabaseエラーが発生した場合、エラーアラートが表示されること', async () => {
      // 準備
      const loginForm = LoginForm.initialize()
        .updateEmail('test@example.com')
        .updatePassword('validPassword123');

      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: { session: null },
        error: { message: 'Invalid credentials' },
      });

      const { result } = renderHook(() =>
        useLoginHandler({
          loginForm,
          currentLanguageType,
          clearErrors: mockClearErrors,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setLoading: mockSetLoading,
          showDialog: mockShowDialog,
          login: mockLogin,
          setSelectFamilyDialog: mockSetSelectFamilyDialog,
          loginRouter: mockLoginRouter,
        })
      );

      // 実行
      await act(async () => {
        await result.current();
      });

      // 検証
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(Alert.alert).toHaveBeenCalled();
      expect(mockLogin).not.toHaveBeenCalled();
      expect(mockShowDialog).not.toHaveBeenCalled();
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });
});
