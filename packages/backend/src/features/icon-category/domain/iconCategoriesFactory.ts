import { Icons } from "@backend/features/icon/domain/icons";
import { IconCategory } from "./iconCategory";
import { IconCategoryEntity, IconCategoryTranslationEntities, IconCategoryTranslationEntity } from "../entity/iconCategoryEntity";
import { fromEntity as createIconCategoryFromEntity } from "./iconCategoryFactory";
import { IconCategories } from "./iconCategories";

export const fromEntity = (params: {
    entities: IconCategoryEntity[],
    translationEntities: IconCategoryTranslationEntities,
    icons: Icons
  }): IconCategories => {
    const iconCategoryList: IconCategory[] = [];
    
    for (const entity of params.entities) {
      // このカテゴリの翻訳データを抽出
      const translations = params.translationEntities.getBySourceId(entity.id);
      
      // ドメインモデルに変換
      const iconCategory = createIconCategoryFromEntity({
        entity,
        translationDict: translations,
        icons: params.icons
      });
      const categoryIcons = params.icons.getByCategory(iconCategory.key);
      iconCategory.icons = new Icons(categoryIcons);
      iconCategoryList.push(iconCategory);
    }
    
    return new IconCategories(iconCategoryList);
  }
