import { create } from 'zustand';
import { FamilyMemberTypeValue } from "../../../../backend/src/features/family-member/value-object/familyMemberTypeValue";
import { LanguageType } from "../../../../backend/src/features/language/enum/languageType";
import { LanguageTypeValue } from "../../../../backend/src/features/language/value-object/languageTypeValue";
import { createJwtStorage, GetJwtToken, IJwtStorage } from "../../features/auth/services/jwtStorage";
import { BaseStore, BaseStoreProperties, BaseStoreActions } from '../stores/BaseStore';

// シグネチャ定義
export type SetFamilyMemberType = (familyMemberType: FamilyMemberTypeValue) => void;
export type SetLanguageType = (languageType: LanguageTypeValue) => void;
export type Clear = () => void;

interface SessionProperties extends BaseStoreProperties {
  /** 家族メンバータイプ */
  familyMemberType?: FamilyMemberTypeValue;
  /** 言語タイプ */
  languageType: LanguageTypeValue;
  /** JWTストレージ */
  jwtStorage: IJwtStorage;
}

interface SessionActions extends BaseStoreActions {
  /** 家族メンバータイプ設定 */
  setFamilyMemberType: SetFamilyMemberType;
  /** 言語タイプ設定 */
  setLanguageType: SetLanguageType;
  /** セッション変数クリア */
  clear: Clear;
}

export type SessionStore = SessionProperties & SessionActions;

class SessionStoreClass extends BaseStore<SessionProperties, SessionActions> {
  
  /** 家族メンバータイプ設定 */
  protected setFamilyMemberType(set: any): SetFamilyMemberType {
    return (familyMemberType: FamilyMemberTypeValue) => {
      set({ familyMemberType }, false, 'setFamilyMemberType');
    };
  }

  /** 言語タイプ設定 */
  protected setLanguageType(set: any): SetLanguageType {
    return (languageType: LanguageTypeValue) => {
      set({ languageType }, false, 'setLanguageType');
    };
  }

  /** セッション変数クリア */
  protected clear(set: any): Clear {
    return () => {
      set(this.buildDefaultProperties(), false, 'clear');
    };
  }

  /** デフォルトプロパティ構築 */
  protected buildDefaultProperties(): SessionProperties {
    return {
      ...super.buildDefaultProperties(),
      familyMemberType: undefined,
      languageType: LanguageType.ENGLISH,
      jwtStorage: createJwtStorage(),
    };
  }

  /** アクション構築 */
  protected buildActions(set: any, get: any): SessionActions {
    return {
      ...super.buildActions(set, get),
      setFamilyMemberType: this.setFamilyMemberType(set),
      setLanguageType: this.setLanguageType(set),
      clear: this.clear(set),
    };
  }
}

export const useSessionStore = create<SessionStore>((set, get) =>
  new SessionStoreClass().createStore(set, get)
);
