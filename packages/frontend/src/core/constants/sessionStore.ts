import { create } from 'zustand';
import { FamilyMemberTypeValue } from "../../../../backend/src/features/family-member/value-object/familyMemberTypeValue";
import { LanguageType } from "../../../../backend/src/features/language/enum/languageType";
import { LanguageTypeValue } from "../../../../backend/src/features/language/value-object/languageTypeValue";
import { createJwtStorage, GetJwtToken, IJwtStorage } from "../../features/auth/services/jwtStorage";
import { BaseStore, BaseStoreProperties, BaseStoreActions } from '../stores/BaseStore';

// シグネチャ定義
export type UpdateFamilyMemberType = (familyMemberType: FamilyMemberTypeValue) => void;
export type UpdateLanguageType = (languageType: LanguageTypeValue) => void;
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
  updateFamilyMemberType: UpdateFamilyMemberType;
  /** 言語タイプ設定 */
  updateLanguageType: UpdateLanguageType;
  /** セッション変数クリア */
  clear: Clear;
}

export type SessionStore = SessionProperties & SessionActions;

class SessionStoreClass extends BaseStore<SessionProperties, SessionActions> {
  
  /** 家族メンバータイプ設定 */
  protected updateFamilyMemberType(set: any): UpdateFamilyMemberType {
    return (familyMemberType: FamilyMemberTypeValue) => {
      set({ familyMemberType }, false, 'updateFamilyMemberType');
    };
  }

  /** 言語タイプ設定 */
  protected updateLanguageType(set: any): UpdateLanguageType {
    return (languageType: LanguageTypeValue) => {
      set({ languageType }, false, 'updateLanguageType');
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
      updateFamilyMemberType: this.updateFamilyMemberType(set),
      updateLanguageType: this.updateLanguageType(set),
      clear: this.clear(set),
    };
  }
}

export const useSessionStore = create<SessionStore>((set, get) =>
  new SessionStoreClass().createStore(set, get)
);
