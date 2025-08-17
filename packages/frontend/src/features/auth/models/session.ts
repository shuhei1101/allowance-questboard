import { FamilyMemberTypeValue } from '@backend/features/family-member/value-object/familyMemberTypeValue';

/**
 * セッション認証情報の構造体
 */
export interface AuthInfo {
  /**
   * JWT認証トークン
   * APIリクエスト時のBearerトークンとして使用される
   */
  jwt?: string;

  /**
   * 家族メンバータイプ
   * ログインしたユーザの家族内での役割（親・子など）
   */
  familyMemberType?: FamilyMemberTypeValue;
}
