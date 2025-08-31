import { FamilyId } from "../value-object/familyId";
import { Email } from "@backend/features/auth/value-object/email";
import { FamilyInvite } from "../models/familyInvite";
import { FamilyInviteRepository } from "../repository/familyInviteRepository";
import { AppError } from "@backend/core/errors/appError";
import { LocaleString } from "@backend/core/messages/localeString";

/**
 * 招待作成サービスのパラメータ
 */
export interface CreateFamilyInviteParams {
  familyId: FamilyId;
  email: Email;
  familyInviteRepository: FamilyInviteRepository;
}

/**
 * 招待作成サービスの結果
 */
export interface CreateFamilyInviteResult {
  invite: FamilyInvite;
}

/**
 * 家族招待作成ビジネスロジック
 * 
 * 新しい家族招待を作成する。同一家族・同一メールアドレスの
 * 未使用招待が既に存在する場合はエラーとする。
 */
export async function createFamilyInvite(params: CreateFamilyInviteParams): Promise<CreateFamilyInviteResult> {
  // 既存の招待をチェック（重複防止）
  const existingInvite = await params.familyInviteRepository.findByFamilyAndEmail(
    params.familyId,
    params.email
  );

  // 有効な招待が既に存在する場合はエラー
  if (existingInvite && existingInvite.isAvailable()) {
    throw new AppError({
      errorType: "VALIDATION_ERROR",
      message: new LocaleString({
        ja: "この家族とメールアドレスの組み合わせには既に有効な招待が存在します",
        en: "An active invitation already exists for this family and email combination"
      })
    });
  }

  // 新しい招待を作成
  const newInvite = FamilyInvite.createNew({
    familyId: params.familyId,
    email: params.email,
  });

  // リポジトリに保存
  const inviteId = await params.familyInviteRepository.create(newInvite);

  // IDが設定された招待インスタンスを返す
  const createdInvite = new FamilyInvite({
    id: inviteId,
    familyId: newInvite.familyId,
    email: newInvite.email,
    token: newInvite.token,
    expiresAt: newInvite.expiresAt,
    isUsed: newInvite.isUsed,
  });

  return {
    invite: createdInvite
  };
}
