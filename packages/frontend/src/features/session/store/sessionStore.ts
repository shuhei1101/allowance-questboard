import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { FamilyMemberTypeValue } from '@backend/features/family-member/value-object/familyMemberTypeValue';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SessionState {
  jwt?: string;
  familyMemberType?: FamilyMemberTypeValue;
  updateJwt: (jwt: string) => void;
  updateFamilyMemberType: (familyMemberType: FamilyMemberTypeValue) => void;
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

        updateJwt: (jwt: string) => {
          set((_) => ({ jwt }), false, 'updateJwt');
        },
        updateFamilyMemberType: (familyMemberType: FamilyMemberTypeValue) => {
          set((_) => ({ familyMemberType }), false, 'updateFamilyMemberType');
        },
        clear: () => {
          set(() => ({ jwt: undefined, familyMemberType: undefined }), false, 'clear');
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
