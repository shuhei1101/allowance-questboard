import { IconEntity } from '../entity/iconEntity';
import { IconId } from '../value-objects/iconId';
import { Icon } from './icon';
import { IconName } from '../value-objects/iconName';
import { SortOrder } from '@backend/features/shared/value-object/sortOrder';
import { IconCategoryId } from '@backend/features/icon-category/value-objects/iconCategoryId';

/**
 * エンティティからドメインモデルを生成
 * @param entity アイコンエンティティ
 */
export const fromEntity = (params: {entity: IconEntity}): Icon => {
  return new Icon(
    new IconId(params.entity.id),
    new IconName(params.entity.name),
    new SortOrder(params.entity.sort_order),
    params.entity.is_active,
    params.entity.category_id ? new IconCategoryId(params.entity.category_id) : undefined
  );
}
