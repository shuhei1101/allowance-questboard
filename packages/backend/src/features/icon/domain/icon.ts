import { BaseMasterModel } from '@backend/core/models/baseMasterModel';
import { IconId } from '../value-objects/iconId';
import { IconCategoryId } from '../../icon-category/value-objects/iconCategoryId';
import { IconName, IconNameSchema } from '../value-objects/iconName';
import { SortOrder, SortOrderSchema } from '@backend/features/shared/value-object/sortOrder';
import { BaseIdSchema } from '@backend/core/value-object/base_id';
import { z } from 'zod';

/**
 * IconのZodスキーマ
 */
export const IconSchema = z.object({
  id: BaseIdSchema.optional(),
  name: IconNameSchema,
  sortOrder: SortOrderSchema,
  isActive: z.boolean(),
  iconCategoryId: BaseIdSchema.optional()
});

/**
 * アイコンドメインモデル
 */
export class Icon extends BaseMasterModel<IconId> {
  public readonly name: IconName;
  public readonly sortOrder: SortOrder;
  public readonly isActive: boolean;
  public readonly iconCategoryId?: IconCategoryId;

  constructor(params: {
    id?: IconId,
    name: IconName,
    sortOrder?: SortOrder,
    isActive?: boolean,
    iconCategoryId?: IconCategoryId
  }) {
    super(params.id);
    this.name = params.name;
    this.sortOrder = params.sortOrder ? params.sortOrder : new SortOrder(0);
    this.isActive = params.isActive ? params.isActive : true;
    this.iconCategoryId = params.iconCategoryId;
  }

  hash(): number | string {
    return this.id ? this.id.value : '';
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof IconSchema> {
    return {
      id: this.id ? this.id.toZodData() : undefined,
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
    return new Icon({
      id: data.id ? IconId.fromZodData(data.id) : undefined,
      name: IconName.fromZodData(data.name),
      sortOrder: data.sortOrder ? SortOrder.fromZodData(data.sortOrder) : undefined,
      isActive: data.isActive ? data.isActive : true,
      iconCategoryId: data.iconCategoryId ? IconCategoryId.fromZodData(data.iconCategoryId) : undefined,
    });
  }

  /**
   * ドメインモデルの検証
   */
  protected validate(): void {
    // 必要に応じてビジネスルールの検証を実装
    // 例：アクティブなアイコンはカテゴリが必須など
  }
}
