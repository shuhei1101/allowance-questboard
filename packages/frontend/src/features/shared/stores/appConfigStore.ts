import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AppIcons } from '@/features/icon/models/AppIcons';
import { IconCategories } from '@backend/features/icon-category/domain/iconCategories';
import { AppIcon } from '@/features/icon/models/AppIcon';
import { Icon } from '@backend/features/icon/domain/icon';

export type SetIconCategories = (iconCategories: IconCategories) => void;
export type SetIconByName = (iconByName: AppIcons) => void;
export type GetAllIcons = () => Map<any, any> | undefined;
export type GetIconByName = (icon: Icon) => AppIcon | undefined;

interface AppConfigState {
  iconCategories?: IconCategories;
  iconByName?: AppIcons;

  setIconCategories: SetIconCategories;
  setIconByName: SetIconByName;
  getAllIcons: GetAllIcons;
  getIconByName: GetIconByName;
}

const initialState = {
  iconCategories: undefined,
  iconByName: undefined,
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

      setIconByName: (iconByName: AppIcons) => {
        set({ iconByName }, false, 'setIconByName');
      },

      getAllIcons: () => {
        const state = get();
        return state.iconCategories?.getAllIcons();
      },

      getIconByName: (icon: Icon) => {
        const state = get();
        return state.iconByName?.get(icon) || undefined;
      },
    }),
    {
      name: 'app-config-store',
    }
  )
);
