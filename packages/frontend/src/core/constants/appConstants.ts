export type GetAllIcons = () => Map<any, any> | undefined;
export type GetAppIcon = (icon: Icon) => AppIcon | undefined;

class Constants {
  constract(params: {
    pubilc iconCategories: IconCategories,
    pubilc appIcon?: AppIcon,
  }){}

  static initialize(): Constants{
    return new Constants(
      iconCategories: IconCategories.fromEmpty(),
      appIcon: AppIcon.fromEmpty()
    )
  }

  getAllIcons: GetAllIcons = () => {
    return this.iconCategories?.getAllIcons();
  },

  getAppIcon: GetAppIcon = (icon) => {
    return this.appIcons.get(icon) || undefined;
  },
}

export AppConstants = Constants.initialize()