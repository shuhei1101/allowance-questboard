import { Icons } from '@backend/features/icon/domain/icons';
import { IconCategoryEntity, IconCategoryTranslationEntity } from '../entity/iconCategoryEntity';
import { IconCategory } from './iconCategory';
import { IconCategoryId } from '../value-objects/iconCategoryId';
import { SortOrder } from '@backend/features/shared/value-object/sortOrder';
import { fromEntity as createIconCategoryNamesFromEntity } from './iconCategoryNamesFactory';


  /**
   * エンティティからドメインモデルを生成
   * @param entity アイコンカテゴリエンティティ
   * @param translationDict 言語IDをキーとした翻訳エンティティのマッピング
   * @param icons このカテゴリに属するアイコン一覧（省略時は空のコレクション）
   */
export const fromEntity = (params: {
    entity: IconCategoryEntity,
    translationDict: { [languageId: number]: IconCategoryTranslationEntity },
    icons: Icons
  }): IconCategory => {
    const nameByLanguages = createIconCategoryNamesFromEntity(params.translationDict);
    return new IconCategory(
      new IconCategoryId(params.entity.id),
      nameByLanguages,
      new SortOrder(params.entity.sortOrder),
      params.entity.isActive,
      params.icons
    );
  }
