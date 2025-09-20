import { create } from 'zustand';
import { IconCategories } from "../../../../backend/src/features/icon-category/domain/iconCategories";
import { Icon } from "../../../../backend/src/features/icon/domain/icon";
import { Icons } from "../../../../backend/src/features/icon/domain/icons";
import { AppIcon } from "../../features/icon/models/AppIcon";
import { AppIcons } from "../../features/icon/models/AppIcons";
import { BaseStore, BaseStoreProperties, BaseStoreActions } from '../stores/BaseStore';

// シグネチャ定義
export type GetAllIcons = () => Icons | undefined;
export type GetAppIcon = (icon: Icon) => AppIcon | undefined;
export type SetIconCategories = (iconCategories: IconCategories) => void;
export type SetAppIcons = (appIcons: AppIcons) => void;

interface IconProperties extends BaseStoreProperties {
  /** アイコンカテゴリ */
  iconCategories: IconCategories;
  /** アプリアイコン */
  appIcons: AppIcons;
}

interface IconActions extends BaseStoreActions {
  /** 全アイコン取得 */
  getAllIcons: GetAllIcons;
  /** アプリアイコン取得 */
  getAppIcon: GetAppIcon;
  /** アイコンカテゴリ設定 */
  setIconCategories: SetIconCategories;
  /** アプリアイコン設定 */
  setAppIcons: SetAppIcons;
}

export type IconStore = IconProperties & IconActions;

class IconStoreClass extends BaseStore<IconProperties, IconActions> {
  
  /** 全アイコン取得 */
  protected getAllIcons(get: any): GetAllIcons {
    return () => {
      const state = get();
      return state.iconCategories?.getAllIcons();
    };
  }

  /** アプリアイコン取得 */
  protected getAppIcon(get: any): GetAppIcon {
    return (icon: Icon) => {
      const state = get();
      return state.appIcons.get(icon);
    };
  }

  /** アイコンカテゴリ設定 */
  protected setIconCategories(set: any): SetIconCategories {
    return (iconCategories: IconCategories) => {
      set({ iconCategories }, false, 'setIconCategories');
    };
  }

  /** アプリアイコン設定 */
  protected setAppIcons(set: any): SetAppIcons {
    return (appIcons: AppIcons) => {
      set({ appIcons }, false, 'setAppIcons');
    };
  }

  /** デフォルトプロパティ構築 */
  protected buildDefaultProperties(): IconProperties {
    return {
      ...super.buildDefaultProperties(),
      iconCategories: IconCategories.fromEmpty() as IconCategories,
      appIcons: AppIcons.fromEmpty() as AppIcons,
    };
  }

  /** アクション構築 */
  protected buildActions(set: any, get: any): IconActions {
    return {
      ...super.buildActions(set, get),
      getAllIcons: this.getAllIcons(get),
      getAppIcon: this.getAppIcon(get),
      setIconCategories: this.setIconCategories(set),
      setAppIcons: this.setAppIcons(set),
    };
  }
}

/** Icon Zustand Store */
export const useIconStore = create<IconStore>((set, get) =>
  new IconStoreClass().createStore(set, get)
);
