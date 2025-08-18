import { BaseMasterModel } from '@backend/core/models/baseMasterModel';
import { IconCategoryId, IconCategoryIdSchema } from '../value-objects/iconCategoryId';
import { IconCategoryNames, IconCategoryNamesSchema } from '../value-objects/iconCategoryNames';
import { IconCategoryEntity, IconCategoryTranslationEntity } from '../entity/iconCategoryEntity';
import { Version, VersionSchema } from '@backend/features/shared/value-object/version';
import { Icons, IconsSchema } from '../../icon/domain/icons';
import { z } from 'zod';
import { SortOrder, SortOrderSchema } from '@backend/features/shared/value-object/sortOrder';
import { id } from 'zod/v4/locales/index.cjs';

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
export class IconCategory extends BaseMasterModel<IconCategoryId, IconCategoryEntity> {

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
   * エンティティからドメインモデルを生成
   * @param entity アイコンカテゴリエンティティ
   * @param translationDict 言語IDをキーとした翻訳エンティティのマッピング
   * @param icons このカテゴリに属するアイコン一覧（省略時は空のコレクション）
   */
  static fromEntity(
    entity: IconCategoryEntity, 
    translationDict: { [languageId: number]: IconCategoryTranslationEntity },
    icons: Icons = new Icons([])
  ): IconCategory {
    const nameByLanguages = IconCategoryNames.fromEntity(translationDict);
    return new IconCategory(
      new IconCategoryId(entity.id),
      new Version(entity.version),
      nameByLanguages,
      new SortOrder(entity.sort_order),
      entity.is_active,
      icons
    );
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
   * エンティティに変換する
   */
  toEntity(): IconCategoryEntity {
    const entity = new IconCategoryEntity();
    entity.id = this.id.value;
    entity.sort_order = this.sortOrder.value;
    entity.is_active = this.isActive;
    entity.version = this.version.value;
    return entity;
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
