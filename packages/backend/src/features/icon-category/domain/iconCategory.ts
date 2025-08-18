import { BaseMasterModel } from '@backend/core/models/baseMasterModel';
import { IconCategoryId, IconCategoryIdSchema } from '../value-objects/iconCategoryId';
import { IconCategoryNames, IconCategoryNamesSchema } from './iconCategoryNames';
import { Version, VersionSchema } from '@backend/features/shared/value-object/version';
import { Icons, IconsSchema } from '../../icon/domain/icons';
import { z } from 'zod';
import { SortOrder, SortOrderSchema } from '@backend/features/shared/value-object/sortOrder';

/**
 * IconCategoryのZodスキーマ
 */
export const IconCategorySchema = z.object({
  id: IconCategoryIdSchema,
  version: VersionSchema,
  nameByLanguages: IconCategoryNamesSchema,
  sortOrder: SortOrderSchema,
  isActive: z.boolean(),
  icons: IconsSchema
});

/**
 * アイコンカテゴリドメインモデル
 */
export class IconCategory extends BaseMasterModel<IconCategoryId> {

  constructor(
    id: IconCategoryId,
    version: Version,
    public readonly nameByLanguages: IconCategoryNames = new IconCategoryNames([]),
    public readonly sortOrder: SortOrder = new SortOrder(0),
    public readonly isActive: boolean = true,
    public icons: Icons = new Icons([]),
  ) {
    super(id, version);
  }

  /**
   * このカテゴリに属するアクティブなアイコンのみを取得
   */
  getActiveIcons(): Icons {
    const activeIcons = this.icons.getActiveIcons();
    return new Icons(activeIcons);
  }

  /**
   * このカテゴリに属するアクティブかつソート順で並べ替えたアイコンを取得
   */
  getActiveSortedIcons(): Icons {
    const activeSortedIcons = this.icons.getActiveSortedIcons();
    return new Icons(activeSortedIcons);
  }



  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof IconCategorySchema> {
    return {
      id: this.id.toZodData(),
      version: this.version.toZodData(),
      nameByLanguages: this.nameByLanguages.toZodData(),
      sortOrder: this.sortOrder,
      isActive: this.isActive,
      icons: this.icons.toZodData()
    };
  }

  /**
   * Zodスキーマから新しいIconCategoryインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof IconCategorySchema>): IconCategory {
    return new IconCategory(
      IconCategoryId.fromZodData(data.id),
      Version.fromZodData(data.version),
      IconCategoryNames.fromZodData(data.nameByLanguages),
      SortOrder.fromZodData(data.sortOrder),
      data.isActive,
      Icons.fromZodData(data.icons)
    );
  }

  /**
   * ドメインモデルの検証
   */
  protected validate(): void {
    // 必要に応じてビジネスルールの検証を実装
  }
}
