import { InviteToken } from "../value-object/inviteToken";
import { FamilyInvite } from "../models/familyInvite";
import { FamilyInviteRepository } from "../repository/familyInviteRepository";
import { AppError } from "@backend/core/errors/appError";
import { LocaleString } from "@backend/core/messages/localeString";

/**
 * 招待トークン検証サービスの依存関係
 */
export interface VerifyInviteTokenDependencies {
  familyInviteRepository: FamilyInviteRepository;
}

/**
 * 招待トークン検証サービスのパラメータ
 */
export interface VerifyInviteTokenParams {
  token: InviteToken;
}

/**
 * 招待トークン検証サービスの結果
 */
export interface VerifyInviteTokenResult {
  invite: FamilyInvite;
}

/**
 * 家族招待トークン検証ビジネスロジック
 * 
 * 招待トークンの有効性を検証し、有効な招待データを返す。
 * トークンが存在しない、期限切れ、使用済みの場合はエラーとする。
 */
export class VerifyInviteTokenService {
  private familyInviteRepository: FamilyInviteRepository;

  constructor(deps: VerifyInviteTokenDependencies) {
    this.familyInviteRepository = deps.familyInviteRepository;
  }

  /**
   * 招待トークンを検証
   */
  async execute(params: VerifyInviteTokenParams): Promise<VerifyInviteTokenResult> {
    // トークンで招待を検索
    const invite = await this.familyInviteRepository.findByToken(params.token);

    // 招待が存在しない場合
    if (!invite) {
      throw new AppError({
        errorType: "NOT_FOUND",
        message: new LocaleString({
          ja: "招待トークンが見つかりません",
          en: "Invitation token not found"
        })
      });
    }

    // 招待が使用済みの場合
    if (invite.isUsed) {
      throw new AppError({
        errorType: "VALIDATION_ERROR",
        message: new LocaleString({
          ja: "この招待は既に使用済みです",
          en: "This invitation has already been used"
        })
      });
    }

    // 招待が期限切れの場合
    if (invite.isExpired()) {
      throw new AppError({
        errorType: "VALIDATION_ERROR",
        message: new LocaleString({
          ja: "この招待は期限切れです",
          en: "This invitation has expired"
        })
      });
    }

    // 有効な招待を返す
    return {
      invite
    };
  }

  /**
   * 招待トークンを検証して使用済みにマーク
   * 
   * 検証に成功した招待を使用済みにマークして永続化する。
   * 通常は子ユーザー登録完了時に呼び出される。
   */
  async executeAndMarkAsUsed(params: VerifyInviteTokenParams): Promise<VerifyInviteTokenResult> {
    // 通常の検証を実行
    const result = await this.execute(params);

    // 使用済みにマーク
    const usedInvite = result.invite.markAsUsed();

    // 更新を永続化
    await this.familyInviteRepository.update(usedInvite);

    return {
      invite: usedInvite
    };
  }
}
