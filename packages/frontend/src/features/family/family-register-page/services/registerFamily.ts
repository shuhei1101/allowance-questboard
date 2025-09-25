import { trpcClient } from '../../../../core/api/trpcClient';
import { familyRegisterForm } from '../models/familyRegisterForm';

export type RegisterFamily = (params: {
  /** 登録フォームデータ */
  form: familyRegisterForm;
}) => Promise<RegisterFamilyResult>;

export interface RegisterFamilyResult {
  /** 作成された家族ID */
  familyId: number;
  /** 作成された親ID */
  parentId: number;
}

/** 家族と親の登録処理
 * 
 * authRouter.registerFamilyを呼び出して家族と親の情報を登録する */
export const registerFamily: RegisterFamily = async (params) => {
  const { form } = params;
  
  try {
    // tRPCクライアントを使用してバックエンドAPIを呼び出し
    const result = await trpcClient.auth.registerFamily.mutate({
      family: {
        displayId: form.family.displayId.toZodData(),
        name: form.family.name.toZodData(),
        onlineName: form.family.onlineName.toZodData(),
        iconId: form.family.iconId?.toZodData(),
        introduction: form.family.introduction?.toZodData(),
      },
      parent: {
        name: form.parent.name.toZodData(),
        birthday: form.parent.birthday.toZodData(),
        iconId: form.parent.iconId?.toZodData(),
        familyMemberId: form.parent.familyMemberId?.toZodData(),
      },
    });
    
    return {
      familyId: result.familyId,
      parentId: result.parentId,
    };
  } catch (error) {
    // エラーを再スローしてハンドラー側で処理
    throw error;
  }
};
