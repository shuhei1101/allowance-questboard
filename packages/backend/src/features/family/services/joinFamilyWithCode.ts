import { InviteCode } from "../value-object/inviteCode";
import { FamilyInviteRepository } from "../repository/familyInviteRepository";
import { verifyAndUseInviteCode } from "./verifyInviteCode";
import { AppError } from "@backend/core/errors/appError";
import { LocaleString } from "@backend/core/messages/localeString";

export type JoinFamilyWithCode = (params: JoinFamilyWithCodeParams) => Promise<JoinFamilyWithCodeResult>;

/** 家族参加サービスのパラメータ */
export interface JoinFamilyWithCodeParams {
  /** 招待コード */
  inviteCode: InviteCode;
  /** 子供のユーザーID */
  childUserId: string; // Supabase Auth User ID
  /** 招待コードリポジトリ */
  familyInviteRepository: FamilyInviteRepository;
  // 他のリポジトリ（ChildRepository, FamilyMemberRepository等）は後で追加
}

/** 家族参加サービスの結果 */
export interface JoinFamilyWithCodeResult {
  familyId: number;
  success: boolean;
}

/** 家族参加ビジネスロジック
 * 
 * 招待コードを検証し、子供を家族に参加させる。
 * 1. 招待コードを検証・使用済みにマーク
 * 2. 子供のfamilyIdを設定
 * 3. FamilyMemberとして登録 */
export const joinFamilyWithCode: JoinFamilyWithCode = async (params: JoinFamilyWithCodeParams): Promise<JoinFamilyWithCodeResult> => {
  try {
    // 招待コードを検証し、使用済みにマーク
    const { invite } = await verifyAndUseInviteCode({
      inviteCode: params.inviteCode,
      familyInviteRepository: params.familyInviteRepository,
    });

    // TODO: 子供のfamilyIdを設定する処理
    // const childRepository = params.childRepository;
    // await childRepository.updateFamilyId(params.childUserId, invite.familyId);

    // TODO: FamilyMemberとして登録する処理
    // const familyMemberRepository = params.familyMemberRepository;
    // await familyMemberRepository.create(new FamilyMember({
    //   familyId: invite.familyId,
    //   userId: params.childUserId,
    //   role: FamilyMemberRole.CHILD,
    // }));

    return {
      familyId: invite.familyId.value,
      success: true,
    };
  } catch (error) {
    // 招待コード関連のエラーはそのまま再throw
    if (error instanceof AppError) {
      throw error;
    }

    // その他のエラーはラップして返す
    throw new AppError({
      errorType: "INTERNAL_ERROR",
      message: new LocaleString({
        ja: "家族参加処理中にエラーが発生しました",
        en: "An error occurred during family join process"
      }),
    });
  }
}
