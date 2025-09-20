import { useSessionStore } from '../../../../core/constants/sessionStore';
import { useChildCreateHandler } from './handlers/useChildCreateHandler';
import { useChildLoginHandler } from './handlers/useChildLoginHandler';
import { useFamilyCreateHandler } from './handlers/useFamilyCreateHandler';
import { useFamilyJoinHandler } from './handlers/useFamilyJoinHandler';
import { useParentCreateHandler } from './handlers/useParentCreateHandler';
import { useParentLoginHandler } from './handlers/useParentLoginHandler';

/** ロール選択ページの全ハンドラーを統合したカスタムフック
 * 
 * ロール選択ページで使用する全てのイベントハンドラーを一括で提供 */
export const createRoleSelectPageHandlers = () => {
  const sessionStore = useSessionStore();

  // 家族作成ハンドラー
  const handleFamilyCreate = useFamilyCreateHandler();

  // 家族参加ハンドラー
  const handleFamilyJoin = useFamilyJoinHandler();

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
    handleFamilyJoin,
    handleParentLogin,
    handleParentCreate,
    handleChildLogin,
    handleChildCreate,
  };
};
