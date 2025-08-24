import { IconCategories } from "@backend/features/icon-category/domain/iconCategories";
import { AppIcons } from "@/features/icon/models/AppIcons";
import { SetIconCategories, SetIconByName } from "@/features/shared/stores/appConfigStore";
import { GetMasterDataHandler } from "@backend/features/auth/router/initRouter";

/**
 * マスタデータ初期化のパラメータ
 */
export type InitMasterDataParams = {
  /** tRPCルーター */
  getMasterData: GetMasterDataHandler;
  /** 言語タイプ設定関数 */
  setLanguageTypes: (data: any) => void;
  /** ファミリーメンバータイプ設定関数 */
  setFamilyMemberType: (data: any) => void;
  /** アイコンカテゴリ設定関数 */
  setIconCategories: SetIconCategories;
  /** アイコン名前設定関数 */
  setIconByName: SetIconByName;
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
    params.setLanguageTypes(result.languages);
    
    // 家族メンバータイプ
    params.setFamilyMemberType(result.familyMemberTypes);

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
