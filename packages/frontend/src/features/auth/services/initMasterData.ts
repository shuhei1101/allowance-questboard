import { IconCategories } from "@backend/features/icon-category/domain/iconCategories";
import { AppIcons } from "@/features/icon/models/AppIcons";
import { SetIconCategories, SetIconByName } from "@/features/shared/stores/appConfigStore";
import { GetMasterDataHandler } from "@backend/features/auth/router/initRouter";
import { SetFamilyMemberType, SetLanguageType } from "../stores/sessionStore";
import { LanguageType } from "@backend/features/language/enum/languageType";
import { FamilyMemberType } from "@backend/features/family-member/enum/familyMemberType";

/**
 * マスタデータを初期化する
 * 
 * - tRPC経由でバックエンドからマスタデータを取得する
 * - フロントエンドのEnum値を更新する
 * - マスタデータをappConfigStoreに保存する
 * @param params パラメータオブジェクト
 * @returns Promise<void>
 */
export const initMasterData = async (params: {
  /** tRPCハンドラー */
  getMasterDataHandler: GetMasterDataHandler;
  /** 言語タイプ設定関数 */
  setLanguageTypes: SetLanguageType;
  /** ファミリーメンバータイプ設定関数 */
  setFamilyMemberType: SetFamilyMemberType;
  /** アイコンカテゴリ設定関数 */
  setIconCategories: SetIconCategories;
  /** アイコン名前設定関数 */
  setIconByName: SetIconByName;
}) => {
  try {
    const result = await params.getMasterDataHandler.query();
    // 言語
    LanguageType.setFromZodData(result.languages);
    
    // 家族メンバータイプ
    FamilyMemberType.setFromZodData(result.familyMemberTypes);

    // アイコンカテゴリ
    const iconCategories = IconCategories.fromZodData(result.iconCategories);
    
    // AppConfigStoreに保存
    params.setIconCategories(iconCategories);
    params.setIconByName(AppIcons.fromIcons(
      iconCategories.getAllIcons()
    ));

  } catch (error) {
    console.error("マスターデータの初期化に失敗しました:", error);
    throw error;
  }
};
