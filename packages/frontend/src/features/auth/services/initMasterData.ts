import { trpcClient } from "@/core/api/trpcClient";
import { LanguageType } from "@backend/features/language/enum/languageType";
import { FamilyMemberType } from "@backend/features/family-member/enum/familyMemberType";
import { IconCategories } from "@backend/features/icon-category/domain/iconCategories";
import { AppConstants } from "@/core/constants/appConstants";
import { AppIcons } from "@/features/icon/models/AppIcons";

/**
 * マスタデータを初期化する
 * 
 * - tRPC経由でバックエンドからマスタデータを取得する
 * - フロントエンドのEnum値を更新する
 * - マスタデータをsessionStorageに保存する
 * @returns Promise<void>
 */
/**
 * マスターデータを初期化する
 */
export const initMasterData = async () => {
  try {
    const result = await trpcClient.init.getMasterData.query();
    
    // language
    LanguageType.setFromZodData(result.languages);
    
    // family member types
    FamilyMemberType.setFromZodData(result.familyMemberTypes);
    
    // icon categories
    const iconCategories = IconCategories.fromZodData(result.iconCategories);
    AppConstants.iconCategories = iconCategories;
    AppConstants.iconByName = AppIcons.fromIcons(
      iconCategories.getAllIcons()
    )

  } catch (error) {
    console.error("マスターデータの初期化に失敗しました:", error);
    throw error;
  }
};
