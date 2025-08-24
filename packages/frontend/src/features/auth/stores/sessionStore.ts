import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { FamilyMemberTypeValue } from '@backend/features/family-member/value-object/familyMemberTypeValue';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SetJwt = (jwt: string) => void;
export type SetFamilyMemberType = (familyMemberType: FamilyMemberTypeValue) => void;
export type SetLanguageType = (languageType: LanguageTypeValue) => void;

interface SessionState {
  jwt?: string;
  familyMemberType?: FamilyMemberTypeValue;
  languageType?: LanguageTypeValue;
  setJwt: SetJwt;
  setFamilyMemberType: SetFamilyMemberType;
  setLanguageType: SetLanguageType;
}

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

        setJwt: (jwt: string) => {
          set((_) => ({ jwt }), false, 'updateJwt');
        },
        setFamilyMemberType: (familyMemberType: FamilyMemberTypeValue) => {
          set((_) => ({ familyMemberType }), false, 'updateFamilyMemberType');
        },
        setLanguageType: (languageType: LanguageTypeValue) => {
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
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
