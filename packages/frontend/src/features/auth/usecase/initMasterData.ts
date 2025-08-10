import { LanguageType } from '@shared/features/language/enum/languageType';
import { FamilyMemberType } from '@shared/features/family-member/enum/familyMemberType';
import { trpc } from '@frontend/core/api/trpcClient';

/**
 * マスタデータを初期化する
 * tRPC経由でバックエンドからマスタデータのEnum値を取得し、
 * フロントエンドのEnum値を更新する
 * @returns Promise<void>
 */
export async function initMasterData(): Promise<void> {
  try {
    // tRPC経由でマスタデータを取得
    const masterData = await trpc.init.getMasterData.query();
    
    // LanguageType Enumの値を更新
    if (masterData.language) {
      LanguageType.setFromZodData(masterData.language);
      console.log('✨ LanguageType Enum更新完了！');
    }
    
    // FamilyMemberType Enumの値を更新
    if (masterData.familyMemberType) {
      FamilyMemberType.setFromZodData(masterData.familyMemberType);
      console.log('✨ FamilyMemberType Enum更新完了！');
    }
    
    console.log('🌟 マスタデータ初期化完了！');
    
  } catch (error) {
    console.error('❌ マスタデータ初期化エラー:', error);
    throw new Error(`マスタデータの初期化に失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
