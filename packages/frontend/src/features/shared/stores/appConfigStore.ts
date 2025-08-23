import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AppIcons } from '@/features/icon/models/AppIcons';
import { IconCategories } from '@backend/features/icon-category/domain/iconCategories';

export type SetIconCategories = (iconCategories: IconCategories) => void;
export type SetIconByName = (iconByName: AppIcons) => void;
export type GetAllIcons = () => Map<any, any> | undefined;

interface AppConfigState {
  iconCategories?: IconCategories;
  iconByName?: AppIcons;

  setIconCategories: SetIconCategories;
  setIconByName: SetIconByName;
  getAllIcons: GetAllIcons;
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
    }),
    {
      name: 'app-config-store',
    }
  )
);
