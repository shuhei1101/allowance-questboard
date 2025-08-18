import { BaseDomainModel } from '@backend/core/models/baseDomainModel';
import { IconId } from '../value-objects/iconId';
import { IconEntity } from '../entity/iconEntity';
import { Version } from '@backend/features/shared/value-object/version';
import { FamilyMemberId } from '@backend/features/family-member/value-object/familyMemberId';
import { ScreenId } from '@backend/features/shared/value-object/screenId';
import { IconCategoryId } from '../../icon-category/value-objects/iconCategoryId';
import { IconName } from '../value-objects/iconName';
import { SortOrder } from '@backend/features/shared/value-object/sortOrder';

/**
 * アイコンドメインモデル
 */
export class Icon extends BaseDomainModel<IconId, IconEntity> {
  private _iconCategoryId?: IconCategoryId;
  private _name: IconName;
  private _sortOrder: SortOrder;
  private _isActive: boolean;

  constructor(
    id: IconId,
    version: Version,
    name: IconName,
    sortOrder: SortOrder = new SortOrder(0),
    isActive: boolean = true,
    iconCategoryId?: IconCategoryId
  ) {
    super(id, version);
    this._iconCategoryId = iconCategoryId;
    this._name = name;
    this._sortOrder = sortOrder;
    this._isActive = isActive;
  }

  /**
   * エンティティからドメインモデルを生成
   * @param entity アイコンエンティティ
   */
  static fromEntity(entity: IconEntity): Icon {
    return new Icon(
      new IconId(entity.id),
      new Version(entity.version),
      new IconName(entity.name),
      new SortOrder(entity.sort_order),
      entity.is_active,
      entity.category_id ? new IconCategoryId(entity.category_id) : undefined
    );
  }

  /**
   * アイコンカテゴリIDを取得
   */
  get iconCategoryId(): IconCategoryId | undefined {
    return this._iconCategoryId;
  }

  /**
   * アイコン名を取得
   */
  get name(): IconName {
    return this._name;
  }

  /**
   * 表示順序を取得
   */
  get sortOrder(): SortOrder {
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
  toEntity(): IconEntity {
    const entity = new IconEntity();
    entity.id = this._id.value;
    entity.category_id = this._iconCategoryId?.value;
    entity.name = this._name.value;
    entity.sort_order = this._sortOrder.value;
    entity.is_active = this._isActive;
    entity.version = this._version.value;
    return entity;
  }

  /**
   * ドメインモデルの検証
   */
  protected validate(): void {
    // 必要に応じてビジネスルールの検証を実装
    // 例：アクティブなアイコンはカテゴリが必須など
  }
}
