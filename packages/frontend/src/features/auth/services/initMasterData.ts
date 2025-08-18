import { trpcClient } from "@/core/api/trpcClient";
import { LanguageType } from "@backend/features/language/enum/languageType";
import { FamilyMemberType } from "@backend/features/family-member/enum/familyMemberType";

/**
 * マスタデータを初期化する
 * 
 * - tRPC経由でバックエンドからマスタデータを取得する
 * - フロントエンドのEnum値を更新する
 * - マスタデータをsessionStorageに保存する
 * @returns Promise<void>
 */
export async function initMasterData(): Promise<void> {
  try {
    console.log('🚧 マスタデータ初期化は一時的に無効化されています');
    // tRPC経由でマスタデータを取得
    const masterData = await trpcClient.init.getMasterData.query();
    
    // LanguageType Enumの値を更新
    if (masterData.languages) {
      LanguageType.setFromZodData(masterData.languages);
      console.log('✨ LanguageType Enum更新完了！');
    }
    
    // FamilyMemberType Enumの値を更新
    if (masterData.familyMemberTypes) {
      FamilyMemberType.setFromZodData(masterData.familyMemberTypes);
      console.log('✨ FamilyMemberType Enum更新完了！');
    }
    
    console.log('🌟 マスタデータ初期化完了！');
    
  } catch (error) {
    console.error('❌ マスタデータ初期化エラー:', error);
    throw new Error(`マスタデータの初期化に失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
