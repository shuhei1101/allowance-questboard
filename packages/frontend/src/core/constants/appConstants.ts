import { IconByName } from '@/features/icon/models/IconByName';
import { IconCategories } from '@backend/features/icon-category/domain/iconCategories';

class Constants {
  iconCategories?: IconCategories;
  iconByName?: IconByName;
}

export const AppConstants = new Constants();
