import { Icons } from '@backend/features/icon/domain/icons';
import { IconCategoryEntity, IconCategoryTranslationEntity } from '../entity/iconCategoryEntity';
import { IconCategory } from './iconCategory';
import { IconCategoryId } from '../value-objects/iconCategoryId';
import { Version } from '@backend/features/shared/value-object/version';
import { SortOrder } from '@backend/features/shared/value-object/sortOrder';
import { IconCategoryNamesFactory } from './iconCategoryNamesFactory';


class Factory {
  /**
   * エンティティからドメインモデルを生成
   * @param entity アイコンカテゴリエンティティ
   * @param translationDict 言語IDをキーとした翻訳エンティティのマッピング
   * @param icons このカテゴリに属するアイコン一覧（省略時は空のコレクション）
   */
  fromEntity(params: {
    entity: IconCategoryEntity, 
    translationDict: { [languageId: number]: IconCategoryTranslationEntity },
    icons: Icons
  }): IconCategory {
    const nameByLanguages = IconCategoryNamesFactory.fromEntity(params.translationDict);
    return new IconCategory(
      new IconCategoryId(params.entity.id),
      new Version(params.entity.version),
      nameByLanguages,
      new SortOrder(params.entity.sort_order),
      params.entity.is_active,
      params.icons
    );
  }
}

export const IconCategoryFactory = new Factory();
