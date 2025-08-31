import { t, authenticatedProcedure } from '@backend/core/trpc/trpcContext';
import { LocalizedTRPCError } from '@backend/core/errors/localizedTRPCError';
import { LocaleString } from '@backend/core/messages/localeString';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { AppError } from '@backend/core/errors/appError';
import { FamilyInviteRepository } from '../repository/familyInviteRepository';
import { FamilyInviteDao } from '../dao/familyInviteDao';
import { ParentRepository } from '@backend/features/parent/repository/parentRepository';
import { ParentDao } from '@backend/features/parent/dao/parentDao';
import { FamilyMemberDao } from '@backend/features/family-member/dao/familyMemberDao';
import { createFamilyInviteCode } from '../services/createFamilyInviteCode';
import { getFamilyIdByUser } from '@backend/features/parent/services/getFamilyIdByUser';
import { UserId } from '@backend/features/auth/value-object/userId';
import { InviteCodeSchema } from '../value-object/inviteCode';
import { ExpiresAtSchema } from '../value-object/expiresAt';
import z from 'zod';

// レスポンススキーマ
export const createInviteCodeResponseSchema = z.object({
  inviteCode: InviteCodeSchema,
  expiresAt: ExpiresAtSchema,
});

/**
 * 家族招待ルーター
 */
export const familyInviteRouter = t.router({
  /**
   * 招待コード生成エンドポイント
   * 
   * JWTトークンから親ユーザーを特定し、その親が所属する家族の招待コードを生成する
   */
  createInviteCode: authenticatedProcedure
    .output(createInviteCodeResponseSchema)
    .mutation(async ({ ctx }) => {
      try {
        // 依存関係のセットアップ
        const familyInviteDao = new FamilyInviteDao(ctx.session);
        const familyInviteRepository = new FamilyInviteRepository({
          familyInviteDao,
          session: ctx.session,
        });

        const parentDao = new ParentDao(ctx.session);
        const familyMemberDao = new FamilyMemberDao(ctx.session);
        const parentRepository = new ParentRepository({
          parentDao,
          familyMemberDao,
          session: ctx.session,
        });

        // JWT認証済みユーザーIDから家族IDを取得
        const userId = new UserId(ctx.userId);
        const { familyId } = await getFamilyIdByUser({
          userId,
          parentRepository
        });

        // 招待コード生成サービスを呼び出し
        const result = await createFamilyInviteCode({
          familyId,
          familyInviteRepository,
        });

        return {
          inviteCode: result.invite.inviteCode.toZodData(),
          expiresAt: result.invite.expiresAt.toZodData(),
        };

      } catch (error) {
        // 既にエラーハンドリング済みのLocalizedTRPCErrorはそのまま再スロー
        if (error instanceof LocalizedTRPCError) {
          throw error;
        }

        // AppErrorをLocalizedTRPCErrorに変換
        if (error instanceof AppError) {
          throw new LocalizedTRPCError({
            code: error.errorType === 'PARENT_NOT_FOUND' ? 'NOT_FOUND' : 'INTERNAL_SERVER_ERROR',
            errorType: error.errorType,
            localeMessage: error.localeMessage,
          });
        }

        // 既に有効な招待コードが存在する場合のエラー
        if (error instanceof Error && error.message.includes('既に有効な招待コードが存在')) {
          throw new LocalizedTRPCError({
            code: 'CONFLICT',
            errorType: 'INVITE_CODE_ALREADY_EXISTS',
            localeMessage: new LocaleString({
              ja: 'この家族には既に有効な招待コードが存在します',
              en: 'An active invitation code already exists for this family',
            }),
          });
        }

        // その他の予期しないエラー
        throw new LocalizedTRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          errorType: 'INTERNAL_ERROR',
          localeMessage: new LocaleString({
            ja: AuthErrorMessages.internalError().ja,
            en: AuthErrorMessages.internalError().en,
          }),
        });
      }
    }),
});

export type CreateInviteCodeResponse = z.infer<typeof createInviteCodeResponseSchema>;
