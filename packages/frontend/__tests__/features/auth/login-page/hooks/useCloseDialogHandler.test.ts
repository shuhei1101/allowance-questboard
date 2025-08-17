import { describe, test, expect, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useCloseDialogHandler } from '@/features/auth/login-page/hooks/useCloseDialogHandler';

describe('useCloseDialogHandler', () => {
  describe('ダイアログクローズハンドラーが正しく動作すること', () => {
    test('hideDialog関数が呼び出されること', () => {
      // 準備
      const mockHideDialog = jest.fn();
      
      // 実行
      const { result } = renderHook(() =>
        useCloseDialogHandler({
          hideDialog: mockHideDialog
        })
      );
      
      result.current();
      
      // 検証
      expect(mockHideDialog).toHaveBeenCalledTimes(1);
    });

    test('複数回呼び出してもhideDialog関数が正しく呼び出されること', () => {
      // 準備
      const mockHideDialog = jest.fn();
      
      // 実行
      const { result } = renderHook(() =>
        useCloseDialogHandler({
          hideDialog: mockHideDialog
        })
      );
      
      result.current();
      result.current();
      result.current();
      
      // 検証
      expect(mockHideDialog).toHaveBeenCalledTimes(3);
    });
  });
});
