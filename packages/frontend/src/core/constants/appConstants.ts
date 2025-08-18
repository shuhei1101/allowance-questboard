import { IconCategories } from '@backend/features/icon-category/domain/iconCategories';

class Constants {
  iconCategories?: IconCategories;

  setIconCategories(iconCategories: IconCategories) {
    this.iconCategories = iconCategories;
  }
}

export const AppConstants = new Constants();
