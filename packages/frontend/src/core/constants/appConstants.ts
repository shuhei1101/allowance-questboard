export type GetAllIcons = () => Map<any, any> | undefined;
export type GetAppIcon = (icon: Icon) => AppIcon | undefined;

class Constants {
  constructor(params: {
    public iconCategories: IconCategories,
    public appIcon?: AppIcon,
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