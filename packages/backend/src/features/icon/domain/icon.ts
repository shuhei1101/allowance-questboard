import { BaseMasterModel } from '@backend/core/models/baseMasterModel';
import { IconId } from '../value-objects/iconId';
import { Version, VersionSchema } from '@backend/features/shared/value-object/version';
import { IconCategoryId } from '../../icon-category/value-objects/iconCategoryId';
import { IconName, IconNameSchema } from '../value-objects/iconName';
import { SortOrder, SortOrderSchema } from '@backend/features/shared/value-object/sortOrder';
import { BaseIdSchema } from '@backend/core/value-object/base_id';
import { z } from 'zod';

/**
 * IconのZodスキーマ
 */
export const IconSchema = z.object({
  id: BaseIdSchema,
  version: VersionSchema,
  name: IconNameSchema,
  sortOrder: SortOrderSchema,
  isActive: z.boolean(),
  iconCategoryId: BaseIdSchema.optional()
});

/**
 * アイコンドメインモデル
 */
export class Icon extends BaseMasterModel<IconId> {

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
  hash(): number | string {
    return this.id.value;
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof IconSchema> {
    return {
      id: this.key.toZodData(),
      version: this.version.toZodData(),
      name: this.name.toZodData(),
      sortOrder: this.sortOrder.toZodData(),
      isActive: this.isActive,
      iconCategoryId: this.iconCategoryId?.toZodData()
    };
  }

  /**
   * Zodスキーマから新しいIconインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof IconSchema>): Icon {
    return new Icon(
      IconId.fromZodData(data.id),
      Version.fromZodData(data.version),
      IconName.fromZodData(data.name),
      SortOrder.fromZodData(data.sortOrder),
      data.isActive,
      data.iconCategoryId ? IconCategoryId.fromZodData(data.iconCategoryId) : undefined
    );
  }

  /**
   * ドメインモデルの検証
   */
  protected validate(): void {
    // 必要に応じてビジネスルールの検証を実装
    // 例：アクティブなアイコンはカテゴリが必須など
  }
}
