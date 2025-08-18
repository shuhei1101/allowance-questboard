import { BaseMasterModel } from '@backend/core/models/baseMasterModel';
import { IconId } from '../value-objects/iconId';
import { IconEntity } from '../entity/iconEntity';
import { Version } from '@backend/features/shared/value-object/version';
import { IconCategoryId } from '../../icon-category/value-objects/iconCategoryId';
import { IconName } from '../value-objects/iconName';
import { SortOrder } from '@backend/features/shared/value-object/sortOrder';

/**
 * アイコンドメインモデル
 */
export class Icon extends BaseMasterModel<IconId, IconEntity> {

  constructor(
    id: IconId,
    version: Version,
    public readonly name: IconName,
    public readonly sortOrder: SortOrder = new SortOrder(0),
    public readonly isActive: boolean = true,
    public readonly iconCategoryId?: IconCategoryId
  ) {
    super(id, version);
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
   * エンティティに変換する
   */
  toEntity(): IconEntity {
    const entity = new IconEntity();
    entity.id = this.id.value;
    entity.category_id = this.iconCategoryId?.value;
    entity.name = this.name.value;
    entity.sort_order = this.sortOrder.value;
    entity.is_active = this.isActive;
    entity.version = this.version.value;
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
