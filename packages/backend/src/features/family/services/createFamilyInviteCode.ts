import { FamilyId } from "../value-object/familyId";
import { FamilyInvite } from "../models/familyInvite";
import { FamilyInviteRepository } from "../repository/familyInviteRepository";
import { AppError } from "@backend/core/errors/appError";
import { LocaleString } from "@backend/core/messages/localeString";

/**
 * 招待コード作成サービスのパラメータ
 */
export interface CreateFamilyInviteCodeParams {
  familyId: FamilyId;
  familyInviteRepository: FamilyInviteRepository;
}

/**
 * 招待コード作成サービスの結果
 */
export interface CreateFamilyInviteCodeResult {
  invite: FamilyInvite;
}

/**
 * 家族招待コード作成ビジネスロジック
 * 
 * 新しい家族招待コードを作成する。同一家族の
 * 有効な招待コードが既に存在する場合はエラーとする。
 */
export async function createFamilyInviteCode(params: CreateFamilyInviteCodeParams): Promise<CreateFamilyInviteCodeResult> {
  // 既存の有効な招待コードをチェック（重複防止）
  const existingInvite = await params.familyInviteRepository.findActiveByFamilyId(
    params.familyId
  );

  // 有効な招待コードが既に存在する場合はエラー
  if (existingInvite) {
    throw new AppError({
      errorType: "VALIDATION_ERROR",
      message: new LocaleString({
        ja: "この家族には既に有効な招待コードが存在します",
        en: "An active invitation code already exists for this family"
      })
    });
  }

  // 新しい招待コードを作成
  const newInvite = FamilyInvite.createNew({
    familyId: params.familyId,
  });

  // リポジトリに保存
  const inviteId = await params.familyInviteRepository.create(newInvite);

  // IDが設定された招待インスタンスを返す
  const createdInvite = new FamilyInvite({
    id: inviteId,
    familyId: newInvite.familyId,
    inviteCode: newInvite.inviteCode,
    expiresAt: newInvite.expiresAt,
    isUsed: newInvite.isUsed,
  });

  return {
    invite: createdInvite
  };
}
