import { useFamilyCreateHandler } from './useFamilyCreateHandler';
import { useParentLoginHandler } from './useParentLoginHandler';
import { useParentCreateHandler } from './useParentCreateHandler';
import { useChildLoginHandler } from './useChildLoginHandler';
import { useChildCreateHandler } from './useChildCreateHandler';
import { useSessionStore } from '../../../../core/constants/sessionStore';

/** ロール選択ページの全ハンドラーを統合したカスタムフック
 * 
 * ロール選択ページで使用する全てのイベントハンドラーを一括で提供 */
export const useRoleSelectPageHandlers = () => {
  const sessionStore = useSessionStore();

  // 家族作成ハンドラー
  const handleFamilyCreate = useFamilyCreateHandler();

  // 親ログインハンドラー
  const handleParentLogin = useParentLoginHandler({
    updateFamilyMemberType: sessionStore.updateFamilyMemberType,
  });

  // 親作成ハンドラー
  const handleParentCreate = useParentCreateHandler();

  // 子供ログインハンドラー
  const handleChildLogin = useChildLoginHandler({
    updateFamilyMemberType: sessionStore.updateFamilyMemberType,
  });

  // 子供作成ハンドラー
  const handleChildCreate = useChildCreateHandler();

  return {
    handleFamilyCreate,
    handleParentLogin,
    handleParentCreate,
    handleChildLogin,
    handleChildCreate,
  };
};
