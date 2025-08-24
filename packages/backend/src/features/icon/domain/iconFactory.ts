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
  return new Icon({
    id: new IconId(params.entity.id),
    name: new IconName(params.entity.name),
    sortOrder: new SortOrder(params.entity.sortOrder),
    isActive: params.entity.isActive,
    iconCategoryId: params.entity.categoryId ? new IconCategoryId(params.entity.categoryId) : undefined
  });
}
