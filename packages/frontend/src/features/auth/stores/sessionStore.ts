import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FamilyMemberTypeValue } from '@backend/features/family-member/value-object/familyMemberTypeValue';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { FamilyMemberType } from '../../../../../backend/src/features/family-member/enum/familyMemberType';
import { LanguageType } from '../../../../../backend/src/features/language/enum/languageType';

export type SetJwt = (jwt: string) => void;
export type SetFamilyMemberType = (familyMemberType: FamilyMemberTypeValue) => void;
export type SetLanguageType = (languageType: LanguageTypeValue) => void;
export type Clear = () => void;
export type IsAuthenticated = () => boolean;

interface SessionState {
  jwt: string;
  familyMemberType: FamilyMemberTypeValue;
  languageType: LanguageTypeValue;
  setJwt: SetJwt;
  setFamilyMemberType: SetFamilyMemberType;
  setLanguageType: SetLanguageType;
  clear: Clear;
  isAuthenticated: IsAuthenticated;
}

const initialState = {
  jwt: "",
  familyMemberType: FamilyMemberType.PARENT,
  languageType: LanguageType.JAPANESE,
};

/**
 * セッション状態管理ストア
 * Zustandを使用してセッション情報を管理
 */
export const useSessionStore = create<SessionState>()(
  devtools(
    (set, get) => ({
      ...initialState,

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
        set(() => ({ ...initialState }), false, 'clear');
      },
      isAuthenticated: () => {
        const state = get();
        return Boolean(state.jwt);
      },
    }),
    {
      name: 'session-store',
    }
  )
);
