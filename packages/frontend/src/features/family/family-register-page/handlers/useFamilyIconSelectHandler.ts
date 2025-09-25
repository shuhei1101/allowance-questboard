import { useCallback } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FamilyRegisterForm } from '../models/familyRegisterForm';
import { Icon } from '@backend/features/icon/domain/icon';
import { AppStackParamList } from '../../../../../AppNavigator';
import { CommonStackMeta } from '../../../shared/CommonNavigator';
import { useIconStore } from '../../../../core/constants/iconStore';

export type HandleFamilyIconSelect = () => void;

export interface UseFamilyIconSelectHandlerResult {
  /** 家紋選択ハンドラー */
  handleFamilyIconSelect: HandleFamilyIconSelect;
}

/** 家紋選択ハンドラー
 * 
 * 家紋選択画面への遷移を行う */
export const useFamilyIconSelectHandler = (params: {
  /** 現在のフォーム */
  currentForm: FamilyRegisterForm;
  /** フォーム更新関数 */
  setForm: (form: FamilyRegisterForm) => void;
}): UseFamilyIconSelectHandlerResult => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const iconStore = useIconStore();

  const handleFamilyIconSelect = useCallback(() => {
    // 現在選択されているアイコンを取得（iconIdがあれば対応するIconオブジェクトを探す）
    const allIcons = iconStore.getAllIcons();
    const currentSelectedIcon = params.currentForm.family.iconId && allIcons
      ? allIcons.get(params.currentForm.family.iconId)
      : undefined;

    // アイコン選択画面への遷移
    navigation.navigate(CommonStackMeta.name, {
      screen: CommonStackMeta.screens.iconSelect,
      params: {
        initialSelectedIcon: currentSelectedIcon,
        onIconSelected: (selectedIcon: Icon) => {
          // 選択されたアイコンのIDでフォームを更新
          const updatedForm = params.currentForm.updateFamily({ 
            iconId: selectedIcon.id 
          });
          params.setForm(updatedForm);
        },
      },
    });
  }, [params.currentForm, params.setForm, navigation, iconStore]);

  return {
    handleFamilyIconSelect,
  };
};
