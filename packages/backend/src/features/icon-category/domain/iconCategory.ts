import { BaseDomainModel } from '@backend/core/models/baseDomainModel';
import { IconCategoryId } from '../value-objects/iconCategoryId';
import { IconCategoryNames } from '../value-objects/iconCategoryNames';
import { IconCategoryEntity, IconCategoryTranslationEntity } from '../entity/iconCategoryEntity';
import { Version } from '@backend/features/shared/value-object/version';
import { FamilyMemberId } from '@backend/features/family-member/value-object/familyMemberId';
import { ScreenId } from '@backend/features/shared/value-object/screenId';

/**
 * アイコンカテゴリドメインモデル
 */
export class IconCategory extends BaseDomainModel<IconCategoryId, IconCategoryEntity> {
  private _nameByLanguages: IconCategoryNames;
  private _sortOrder: number;
  private _isActive: boolean;

  constructor(
    id: IconCategoryId,
    version: Version,
    nameByLanguages: IconCategoryNames = IconCategoryNames.fromEmpty(),
    sortOrder: number = 0,
    isActive: boolean = true,
    createdAt?: Date,
    createdBy?: FamilyMemberId,
    createdFrom?: ScreenId,
    updatedAt?: Date,
    updatedBy?: FamilyMemberId,
    updatedFrom?: ScreenId
  ) {
    super(id, version, createdAt, createdBy, createdFrom, updatedAt, updatedBy, updatedFrom);
    this._nameByLanguages = nameByLanguages;
    this._sortOrder = sortOrder;
    this._isActive = isActive;
  }

  /**
   * エンティティからドメインモデルを生成
   * @param entity アイコンカテゴリエンティティ
   * @param translationDict 言語IDをキーとした翻訳エンティティのマッピング
   */
  static fromEntity(
    entity: IconCategoryEntity, 
    translationDict: { [languageId: number]: IconCategoryTranslationEntity }
  ): IconCategory {
    const nameByLanguages = IconCategoryNames.fromEntity(translationDict);
    return new IconCategory(
      new IconCategoryId(entity.id),
      new Version(entity.version),
      nameByLanguages,
      entity.sort_order,
      entity.is_active
    );
  }

  /**
   * 名前の多言語オブジェクトを取得
   */
  get nameByLanguages(): IconCategoryNames {
    return this._nameByLanguages;
  }

  /**
   * 表示順序を取得
   */
  get sortOrder(): number {
    return this._sortOrder;
  }

  /**
   * アクティブフラグを取得
   */
  get isActive(): boolean {
    return this._isActive;
  }

  /**
   * エンティティに変換する
   */
  toEntity(): IconCategoryEntity {
    const entity = new IconCategoryEntity();
    entity.id = this._id.value;
    entity.sort_order = this._sortOrder;
    entity.is_active = this._isActive;
    entity.version = this._version.value;
    return entity;
  }

  /**
   * ドメインモデルの検証
   */
  protected validate(): void {
    // 必要に応じてビジネスルールの検証を実装
  }
}
