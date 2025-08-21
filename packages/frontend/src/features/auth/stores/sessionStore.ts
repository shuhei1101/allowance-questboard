import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { FamilyMemberTypeValue } from '@backend/features/family-member/value-object/familyMemberTypeValue';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UpdateJwt = (jwt: string) => void;
export type UpdateFamilyMemberType = (familyMemberType: FamilyMemberTypeValue) => void;
export type SetLanguageType = (languageType: LanguageTypeValue) => void;

interface SessionState {
  jwt?: string;
  familyMemberType?: FamilyMemberTypeValue;
  languageType?: LanguageTypeValue;
  updateJwt: UpdateJwt;
  updateFamilyMemberType: UpdateFamilyMemberType;
  updateLanguageType: SetLanguageType;
}

const getStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage;
  } else {
    return AsyncStorage;
  }
};

/**
 * セッション状態管理ストア
 * Zustandを使用してセッション情報を管理
 */
export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set, get) => ({
        jwt: undefined,
        familyMemberType: undefined,
        languageType: undefined,

        updateJwt: (jwt: string) => {
          set((_) => ({ jwt }), false, 'updateJwt');
        },
        updateFamilyMemberType: (familyMemberType: FamilyMemberTypeValue) => {
          set((_) => ({ familyMemberType }), false, 'updateFamilyMemberType');
        },
        updateLanguageType: (languageType: LanguageTypeValue) => {
          set((_) => ({ languageType }), false, 'setLanguageType');
        },
        clear: () => {
          set(() => ({ jwt: undefined, familyMemberType: undefined, languageType: undefined }), false, 'clear');
        },
        isAuthenticated: () => {
          const state = get();
          return Boolean(state.jwt);
        },
      }),
      {
        name: 'session',
        storage: createJSONStorage(() => getStorage()), 
      }
    )
  )
);
