import { AppIcons } from '@/features/icon/models/AppIcons';
import { IconCategories } from '@backend/features/icon-category/domain/iconCategories';

class Constants {
  iconCategories?: IconCategories;
  iconByName?: AppIcons;
}

export const AppConstants = new Constants();
