import { useCallback, useState, useRef, useEffect } from 'react';
import { familyRegisterForm } from '../models/familyRegisterForm';
import { CheckFamilyIdDuplicate } from '../../services/checkFamilyIdDuplicate';
import { FamilyDisplayId } from '@backend/features/family/value-object/familyDisplayId';
import { LocaleString } from '../../../../../../backend/src/core/messages/localeString';
import { LanguageTypeValue } from '../../../../../../backend/src/features/language/value-object/languageTypeValue';

export type HandleFamilyIdChange = (text: string) => void;

export interface UseFamilyIdInputHandlerResult {
  /** 家族ID入力変更ハンドラー */
  handleFamilyIdChange: HandleFamilyIdChange;
  /** 重複チェック中フラグ */
  isCheckingDuplicate: boolean;
  /** 重複エラーメッセージ */
  duplicateError?: string;
}

/** 家族ID入力ハンドラー
 * 
 * 家族ID入力時のフォーム更新と重複チェックを行う */
export const useFamilyIdInputHandler = (params: {
  /** 現在のフォーム */
  currentForm: familyRegisterForm;
  /** フォーム更新関数 */
  setForm: (form: familyRegisterForm) => void;
  /** 現在の言語タイプ */
  currentLanguageType: LanguageTypeValue;
  /** 家族ID重複チェックサービス関数 */
  checkFamilyIdDuplicate: CheckFamilyIdDuplicate;
}): UseFamilyIdInputHandlerResult => {
  // 重複チェック中状態
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);
  // 重複エラーメッセージ
  const [duplicateError, setDuplicateError] = useState<string | undefined>();
  // デバウンス処理用のタイマー（useRefで管理）
  const debounceTimerRef = useRef<number | undefined>(undefined);

  // コンポーネントアンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleFamilyIdChange = useCallback((text: string) => {
    // フォームを即座に更新
    const newDisplayId = new FamilyDisplayId(text);
    const updatedForm = params.currentForm.updateFamily({ displayId: newDisplayId });
    params.setForm(updatedForm);

    // エラー状態をリセット
    setDuplicateError(undefined);

    // 空文字の場合は重複チェックしない
    if (!text.trim()) {
      return;
    }

    // 既存のタイマーをクリア
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // デバウンス処理（500ms後に重複チェック実行）
    const timer = setTimeout(async () => {
      try {
        setIsCheckingDuplicate(true);

        const isDuplicate = await params.checkFamilyIdDuplicate({
          familyDisplayId: text.trim()
        });
        
        if (isDuplicate) {
          setDuplicateError(new LocaleString({
            ja: 'この家族IDは既に使用されています',
            en: 'This family ID is already in use',}).getMessage(params.currentLanguageType));
        }
      } catch (error) {
        console.error('重複チェックエラー:', error);
        setDuplicateError(new LocaleString({
            ja: '重複チェック中にエラーが発生しました',
            en: 'An error occurred during the duplicate check',}).getMessage(params.currentLanguageType)
        );
      } finally {
        setIsCheckingDuplicate(false);
      }
    }, 500);

    debounceTimerRef.current = timer;
  }, [params.currentForm, params.setForm, params.checkFamilyIdDuplicate, params.currentLanguageType]);

  return {
    handleFamilyIdChange,
    isCheckingDuplicate,
    duplicateError,
  };
};
