import { useCallback } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FamilyRegisterForm } from '../models/familyRegisterForm';
import { ParentForm } from '../../../parent/parent-edit-page/models/parentForm';
import { AppStackParamList } from '../../../../../AppNavigator';
import { ParentStackMeta } from '../../../parent/ParentNavigator';

export type HandleParentEdit = () => void;

export interface UseParentEditHandlerResult {
  /** 親情報編集ハンドラー */
  handleParentEdit: HandleParentEdit;
}

/** 親情報編集ハンドラー
 * 
 * 親編集画面への遷移を行う */
export const useParentEditHandler = (params: {
  /** 現在のフォーム */
  currentForm: FamilyRegisterForm;
  /** フォーム更新関数 */
  setForm: (form: FamilyRegisterForm) => void;
}): UseParentEditHandlerResult => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const handleParentEdit = useCallback(() => {
    // 親編集画面への遷移
    navigation.navigate(ParentStackMeta.name, {
      screen: ParentStackMeta.screens.parentEdit,
      params: {
        shouldUpdate: false, // 更新せずに戻るだけ
        parentId: undefined, // 新規作成時は親IDは未定
        handleParentForm: (parentForm: ParentForm) => {
          // 親フォームの情報でfamilyRegisterFormを更新
          const updatedForm = params.currentForm.updateParent({
            name: parentForm.name,
            birthday: parentForm.birthday,
            iconId: parentForm.icon?.id,
            familyMemberId: params.currentForm.parent.familyMemberId, // 既存の家族メンバーIDは保持
          });
          params.setForm(updatedForm);
        },
      },
    });
  }, [params.currentForm, params.setForm, navigation]);

  return {
    handleParentEdit,
  };
};
