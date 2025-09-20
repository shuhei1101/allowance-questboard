import { BaseRepository } from "@backend/core/repository/baseRepository";
import { Family } from "../models/family";
import { Parent } from "@backend/features/parent/models/parent";
import { FamilyRepository } from "../repository/familyRepository";
import { ParentRepository } from "@backend/features/parent/repository/parentRepository";
import { FamilyId } from "../value-object/familyId";
import { ParentId } from "@backend/features/parent/value-object/parentId";
import { UserId } from "@backend/features/auth/value-object/userId";
import { AppError } from "@backend/core/errors/appError";
import { LocaleString } from "@backend/core/messages/localeString";
import { FamilyDisplayId } from "../value-object/familyDisplayId";
import { FamilyName } from "../value-object/familyName";
import { FamilyOnlineName } from "../value-object/familyOnlineName";
import { FamilyIntroduction } from "../value-object/familyIntroduction";
import { ParentName } from "@backend/features/parent/value-object/parentName";
import { Birthday } from "@backend/features/shared/value-object/birthday";
import { IconId } from "@backend/features/icon/value-objects/iconId";
import { FamilyMemberId } from "@backend/features/family-member/value-object/familyMemberId";

/** createFamilyAndParentの引数型 */
export interface CreateFamilyAndParentParams {
  /** 家族情報 */
  family: {
    /** 家族表示ID */
    displayId: string;
    /** 家族名 */
    name: string;
    /** 家族オンライン名 */
    onlineName: string;
    /** アイコンID（オプション） */
    iconId?: number;
    /** 家族紹介（オプション） */
    introduction?: string;
  };
  /** 親情報 */
  parent: {
    /** 親の名前 */
    name: string;
    /** 誕生日 */
    birthday: Date;
    /** アイコンID（オプション） */
    iconId?: number;
    /** 家族メンバーID（オプション） */
    familyMemberId?: number;
  };
  /** ユーザID */
  userId: string;
  /** 家族リポジトリ */
  familyRepository: FamilyRepository;
  /** 親リポジトリ */
  parentRepository: ParentRepository;
}

/** createFamilyAndParentの戻り値型 */
export interface CreateFamilyAndParentResult {
  /** 作成された家族ID */
  familyId: FamilyId;
  /** 作成された親ID */
  parentId: ParentId;
}

/** createFamilyAndParentのシグネチャ型 */
export type CreateFamilyAndParent = (params: CreateFamilyAndParentParams) => Promise<CreateFamilyAndParentResult>;

/**
 * 家族と親を同時に作成するサービス
 * 
 * トランザクション内で家族情報と親情報の両方を作成し、
 * 作成された家族IDと親IDを返す
 */
export const createFamilyAndParent: CreateFamilyAndParent = async (params: CreateFamilyAndParentParams): Promise<CreateFamilyAndParentResult> => {
  try {
    // 値オブジェクトの変換
    const userId = new UserId(params.userId);

    // 家族ドメインモデルの構築
    const family = new Family({
      id: new FamilyId(0), // 新規作成時は一時ID、リポジトリで実際のIDが割り当てられる
      displayId: new FamilyDisplayId(params.family.displayId),
      name: new FamilyName(params.family.name),
      onlineName: new FamilyOnlineName(params.family.onlineName),
      iconId: params.family.iconId ? new IconId(params.family.iconId) : undefined,
      introduction: params.family.introduction ? new FamilyIntroduction(params.family.introduction) : undefined,
    });

    // 1. 家族を作成
    const familyId = await params.familyRepository.create(family);

    // 2. 親ドメインモデルの構築（作成された家族IDを使用）
    const parentWithFamilyId = Parent.createNew({
      name: new ParentName(params.parent.name),
      birthday: new Birthday(params.parent.birthday),
      iconId: params.parent.iconId ? new IconId(params.parent.iconId) : undefined,
      familyId: familyId,
      familyMemberId: params.parent.familyMemberId ? new FamilyMemberId(params.parent.familyMemberId) : undefined
    });

    // 3. 親を作成
    await params.parentRepository.create({
      parent: parentWithFamilyId,
      userId: userId
    });

    // 4. 作成された親のIDを取得（家族メンバーとして登録されたものから取得）
    const createdParent = await params.parentRepository.findByUserId({ userId: userId });
    if (!createdParent || !createdParent.id) {
      throw new AppError({
        errorType: "PARENT_CREATION_FAILED",
        message: new LocaleString({
          ja: "親の作成に失敗しました",
          en: "Failed to create parent"
        })
      });
    }

    return {
      familyId,
      parentId: createdParent.id
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError({
      errorType: "CREATE_FAMILY_AND_PARENT_ERROR",
      message: new LocaleString({
        ja: "家族と親の作成中にエラーが発生しました",
        en: "An error occurred while creating family and parent"
      })
    });
  }
};
