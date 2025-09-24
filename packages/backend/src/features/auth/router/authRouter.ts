import { t, authenticatedProcedure } from '@backend/core/trpc/trpcContext';
import { LocalizedTRPCError } from '@backend/core/errors/localizedTRPCError';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { AppError } from '@backend/core/errors/appError';
import { FamilyRepository } from '@backend/features/family/repository/familyRepository';
import { FamilyDao } from '@backend/features/family/dao/familyDao';
import { ParentRepository } from '@backend/features/parent/repository/parentRepository';
import { ParentDao } from '@backend/features/parent/dao/parentDao';
import { FamilyMemberDao } from '@backend/features/family-member/dao/familyMemberDao';
import { createFamilyAndParent } from '@backend/features/family/services/createFamilyAndParent';
import { UserId } from '@backend/features/auth/value-object/userId';
import { BaseIdSchema } from '@backend/core/value-object/base_id';
import { FamilyDisplayIdSchema } from '@backend/features/family/value-object/familyDisplayId';
import { FamilyNameSchema } from '@backend/features/family/value-object/familyName';
import { FamilyOnlineNameSchema } from '@backend/features/family/value-object/familyOnlineName';
import { FamilyIntroductionSchema } from '@backend/features/family/value-object/familyIntroduction';
import { ParentNameSchema } from '@backend/features/parent/value-object/parentName';
import { BirthdaySchema } from '@backend/features/shared/value-object/birthday';
import z from 'zod';

// 入力スキーマ
export const registerFamilyInputSchema = z.object({
  /** 家族情報 */
  family: z.object({
    /** 家族表示ID */
    displayId: FamilyDisplayIdSchema,
    /** 家族名 */
    name: FamilyNameSchema,
    /** 家族オンライン名 */
    onlineName: FamilyOnlineNameSchema,
    /** アイコンID（オプション） */
    iconId: BaseIdSchema.optional(),
    /** 家族紹介（オプション） */
    introduction: FamilyIntroductionSchema.optional(),
  }),
  /** 親情報 */
  parent: z.object({
    /** 親の名前 */
    name: ParentNameSchema,
    /** 誕生日 */
    birthday: BirthdaySchema,
    /** アイコンID（オプション） */
    iconId: BaseIdSchema.optional(),
    /** 家族メンバーID（オプション） */
    familyMemberId: BaseIdSchema.optional(),
  }),
});

// レスポンススキーマ
export const registerFamilyResponseSchema = z.object({
  /** 作成された家族ID */
  familyId: BaseIdSchema,
  /** 作成された親ID */
  parentId: BaseIdSchema,
});

/**
 * 認証ルーター
 */
export const authRouter = t.router({
  /**
   * 家族と親の同時登録エンドポイント
   * 
   * JWTトークンから認証済みユーザーIDを取得し、
   * 家族情報と親情報を同時に作成する
   */
  registerFamily: authenticatedProcedure
    .input(registerFamilyInputSchema)
    .output(registerFamilyResponseSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // 依存関係のセットアップ
        const familyDao = new FamilyDao(ctx.session);
        const familyRepository = new FamilyRepository({
          familyDao,
          session: ctx.session,
        });

        const parentDao = new ParentDao(ctx.session);
        const familyMemberDao = new FamilyMemberDao(ctx.session);
        const parentRepository = new ParentRepository({
          parentDao,
          familyMemberDao,
          session: ctx.session,
        });

        // JWT認証済みユーザーIDを取得
        const userId = new UserId(ctx.userId);

        // 家族と親の作成サービスを呼び出し
        const result = await createFamilyAndParent({
          family: {
            displayId: input.family.displayId, 
            name: input.family.name, 
            onlineName: input.family.onlineName, 
            iconId: input.family.iconId, 
            introduction: input.family.introduction, 
          },
          parent: {
            name: input.parent.name, 
            birthday: input.parent.birthday, 
            iconId: input.parent.iconId, 
            familyMemberId: input.parent.familyMemberId, 
          },
          userId: userId.value,
          familyRepository,
          parentRepository,
        });

        return registerFamilyResponseSchema.parse({
          familyId: result.familyId.toZodData(),
          parentId: result.parentId.toZodData(),
        });

      } catch (error) {
        console.error('authRouter.registerFamilyでエラー:', error);
        
        if (error instanceof AppError) {
          throw new LocalizedTRPCError({
            code: 'BAD_REQUEST',
            errorType: error.errorType,
            localeMessage: error.localeMessage,
          });
        }
        
        console.error('authRouter.registerFamilyで予期せぬエラー:', error);
        throw new LocalizedTRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          errorType: 'INTERNAL_ERROR',
          localeMessage: AuthErrorMessages.internalError(),
        });
      }
    }),
});

export type RegisterFamilyInput = z.infer<typeof registerFamilyInputSchema>;
export type RegisterFamilyResponse = z.infer<typeof registerFamilyResponseSchema>;
