import { InviteCode } from "../value-object/inviteCode";
import { FamilyInvite } from "../models/familyInvite";
import { FamilyInviteRepository } from "../repository/familyInviteRepository";
import { AppError } from "@backend/core/errors/appError";
import { LocaleString } from "@backend/core/messages/localeString";

/**
 * 招待コード検証サービスのパラメータ
 */
export interface VerifyInviteCodeParams {
  inviteCode: InviteCode;
  familyInviteRepository: FamilyInviteRepository;
}

/**
 * 招待コード検証サービスの結果
 */
export interface VerifyInviteCodeResult {
  invite: FamilyInvite;
}

/**
 * 家族招待コード検証ビジネスロジック
 * 
 * 招待コードの有効性を検証し、有効な招待データを返す。
 * コードが存在しない、期限切れ、使用済みの場合はエラーとする。
 */
export async function verifyInviteCode(params: VerifyInviteCodeParams): Promise<VerifyInviteCodeResult> {
  // 招待コードで招待を検索
  const invite = await params.familyInviteRepository.findByInviteCode(params.inviteCode);

  // 招待が存在しない場合
  if (!invite) {
    throw new AppError({
      errorType: "NOT_FOUND",
      message: new LocaleString({
        ja: "招待コードが見つかりません",
        en: "Invitation code not found"
      })
    });
  }

  // 招待が使用済みの場合
  if (invite.isUsed) {
    throw new AppError({
      errorType: "VALIDATION_ERROR",
      message: new LocaleString({
        ja: "この招待コードは既に使用済みです",
        en: "This invitation code has already been used"
      })
    });
  }

  // 招待が期限切れの場合
  if (invite.isExpired()) {
    throw new AppError({
      errorType: "VALIDATION_ERROR",
      message: new LocaleString({
        ja: "この招待コードは期限切れです",
        en: "This invitation code has expired"
      })
    });
  }

  // 有効な招待を返す
  return {
    invite
  };
}

/**
 * 招待コード検証・使用済みマーキングサービスのパラメータ
 */
export interface VerifyAndUseInviteCodeParams {
  inviteCode: InviteCode;
  familyInviteRepository: FamilyInviteRepository;
}

/**
 * 招待コード検証・使用済みマーキングサービスの結果
 */
export interface VerifyAndUseInviteCodeResult {
  invite: FamilyInvite;
}

/**
 * 家族招待コード検証・使用済みマーキングビジネスロジック
 * 
 * 招待コードを検証し、有効な場合は使用済みにマークする。
 * 主に家族参加処理で使用する。
 */
export async function verifyAndUseInviteCode(params: VerifyAndUseInviteCodeParams): Promise<VerifyAndUseInviteCodeResult> {
  // まず招待コードを検証
  const { invite } = await verifyInviteCode({
    inviteCode: params.inviteCode,
    familyInviteRepository: params.familyInviteRepository,
  });

  // 招待を使用済みにマーク
  const usedInvite = invite.markAsUsed();
  await params.familyInviteRepository.update(usedInvite);

  return {
    invite: usedInvite
  };
}
