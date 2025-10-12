import { useCallback } from 'react';
import { Alert } from 'react-native';
import { FamilyRegisterForm } from '../../models/familyRegisterForm';
import { RegisterFamily } from '../../services/registerFamily';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { FamilyId } from '../../../../../../../backend/src/features/family/value-object/familyId';

export type HandleFamilyRegisterSubmit = () => Promise<void>;

export interface UseFamilyRegisterSubmitHandlerResult {
  /** 確定ボタン押下ハンドラー */
  handleSubmit: HandleFamilyRegisterSubmit;
}

/** 家族登録確定ボタンハンドラー
 * 
 * 確定ボタン押下時の登録処理と結果ハンドリングを行う */
export const useFamilyRegisterSubmitHandler = (params: {
  /** 現在のフォーム */
  currentForm: FamilyRegisterForm;
  /** 家族登録サービス */
  registerFamily: RegisterFamily;
  /** 確定ボタンハンドル */
  onSubmitComplete?: (params: {familyId: FamilyId, parentId: ParentId}) => void;
  /** ローディング状態更新 */
  setLoading: (loading: boolean) => void;
}): UseFamilyRegisterSubmitHandlerResult => {
  const { currentForm, registerFamily, onSubmitComplete, setLoading } = params;

  const handleSubmit = useCallback(async () => {
    // バリデーションチェック
    if (!currentForm.isValid) {
      Alert.alert('入力エラー', '入力内容に不備があります。確認してください。');
      return;
    }

    try {
      // ローディング開始
      setLoading(true);

      // 家族と親の登録処理
      const result = await registerFamily({
        form: currentForm,
      });

      // 成功時の処理
      if (onSubmitComplete) {
        const parentId = new ParentId(result.parentId);
        const familyId = new FamilyId(result.familyId);
        onSubmitComplete({ familyId, parentId });
      }

    } catch (error) {
      // エラーハンドリング
      console.error('家族登録エラー:', error);
      
      let errorMessage = '家族登録に失敗しました。';
      
      // エラーの種類に応じてメッセージを変更
      if (error instanceof Error) {
        if (error.message.includes('duplicate')) {
          errorMessage = '既に使用されている家族IDです。別のIDを入力してください。';
        } else if (error.message.includes('validation')) {
          errorMessage = '入力内容に不備があります。確認してください。';
        } else if (error.message.includes('network')) {
          errorMessage = 'ネットワークエラーが発生しました。接続を確認してください。';
        }
      }
      
      Alert.alert('エラー', errorMessage);
    } finally {
      // ローディング終了
      setLoading(false);
    }
  }, [currentForm, registerFamily, onSubmitComplete, setLoading]);

  return {
    handleSubmit,
  };
};
