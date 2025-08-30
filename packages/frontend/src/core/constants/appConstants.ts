import { IconCategories } from "../../../../backend/src/features/icon-category/domain/iconCategories";
import { Icon } from "../../../../backend/src/features/icon/domain/icon";
import { Icons } from "../../../../backend/src/features/icon/domain/icons";
import { AppIcon } from "../../features/icon/models/AppIcon";
import { AppIcons } from "../../features/icon/models/AppIcons";

export type GetAllIcons = () => Icons | undefined;
export type GetAppIcon = (icon: Icon) => AppIcon | undefined;
export type SetIconCategories = (iconCategories: IconCategories) => void;
export type SetAppIcons = (appIcons: AppIcons) => void;

class AppConstants {
  public iconCategories: IconCategories;
  public appIcons: AppIcons;

  constructor(params: {
    iconCategories: IconCategories,
    appIcons: AppIcons,
  }){
    this.iconCategories = params.iconCategories;
    this.appIcons = params.appIcons;
  }

  static initialize(): AppConstants{
    return new AppConstants({
      iconCategories: IconCategories.fromEmpty() as IconCategories,
      appIcons: AppIcons.fromEmpty() as AppIcons
    })
  }

  getAllIcons: GetAllIcons = () => {
    return this.iconCategories?.getAllIcons();
  }

  getAppIcon: GetAppIcon = (icon) => {
    return this.appIcons.get(icon)
  }

  setIconCategories: SetIconCategories = (iconCategories) => {
    this.iconCategories = iconCategories;
  }

  setAppIcons: SetAppIcons = (appIcons) => {
    this.appIcons = appIcons;
  }

}

export const Constants = AppConstants.initialize()
