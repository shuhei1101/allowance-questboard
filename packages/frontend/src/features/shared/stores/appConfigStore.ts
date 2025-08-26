import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AppIcons } from '@/features/icon/models/AppIcons';
import { IconCategories } from '@backend/features/icon-category/domain/iconCategories';
import { AppIcon } from '@/features/icon/models/AppIcon';
import { Icon } from '@backend/features/icon/domain/icon';

export type SetIconCategories = (iconCategories: IconCategories) => void;
export type SetAppIcons = (appIcons: AppIcons) => void;
export type GetAllIcons = () => Map<any, any> | undefined;
export type GetAppIcon = (icon: Icon) => AppIcon | undefined;

interface AppConfigState {
  iconCategories: IconCategories;
  appIcons: AppIcons;

  setIconCategories: SetIconCategories;
  setAppIcons: SetAppIcons;
  getAllIcons: GetAllIcons;
  getAppIcon: GetAppIcon;
}

const initialState = {
  iconCategories: IconCategories.fromEmpty(),
  appIcons: AppIcons.fromEmpty(),
};

/**
 * アプリ設定状態管理ストア
 * 
 * 従来のAppConstantsをZustandで管理するためのストア
 */
export const useAppConfigStore = create<AppConfigState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setIconCategories: (iconCategories: IconCategories) => {
        set({ iconCategories }, false, 'setIconCategories');
      },

      setAppIcons: (appIcons: AppIcons) => {
        set({ appIcons }, false, 'setIconByName');
      },

      getAllIcons: () => {
        const state = get();
        return state.iconCategories?.getAllIcons();
      },

      getAppIcon: (icon: Icon): AppIcon | undefined => {
        const state = get();
        return state.appIcons.get(icon) || undefined;
      },
    }),
    {
      name: 'app-config-store',
    }
  )
);
