import { IconCategories } from "@backend/features/icon-category/domain/iconCategories";
import { AppIcons } from "@/features/icon/models/AppIcons";
import { GetMasterDataHandler } from "@backend/features/auth/router/initRouter";
import { LanguageType } from "../../../../../backend/src/features/language/enum/languageType";
import { FamilyMemberType } from "../../../../../backend/src/features/family-member/enum/familyMemberType";
import { SetAppIcons, SetIconCategories } from "../../../core/constants/appConstants";

/**
 * マスタデータ初期化のパラメータ
 */
export type InitMasterDataParams = {
  /** tRPCルーター */
  getMasterData: GetMasterDataHandler;
  /** アイコンカテゴリ設定関数 */
  setIconCategories: SetIconCategories;
  /** アイコン名前設定関数 */
  setAppIcons: SetAppIcons;
};

/**
 * マスタデータを初期化する
 * 
 * JWTトークンを使用してマスタデータAPIを呼び出し、
 * フロントエンドのEnum値とストアを更新する
 * 
 * @param params マスタデータ初期化パラメータ
 * @throws AppError マスタデータ取得に失敗した場合
 */
export const initMasterData = async (params: InitMasterDataParams): Promise<void> => {
  try {
    console.log("マスタデータを取得中...");
    const result = await params.getMasterData.query();
    
    console.log("マスタデータ取得結果:", result);
    // 言語
    LanguageType.setFromZodData(result.languages);
    // 家族メンバータイプ
    FamilyMemberType.setFromZodData(result.familyMemberTypes);
    // アイコンカテゴリ
    const iconCategories = IconCategories.fromZodData(result.iconCategories);
    
    // AppConfigStoreに保存
    params.setIconCategories(iconCategories);
    params.setAppIcons(AppIcons.fromIcons(
      iconCategories.getAllIcons()
    ));

  } catch (error) {
    console.error("マスターデータの初期化に失敗しました:", error);
    throw error;
  }
};
