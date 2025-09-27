import { create } from 'zustand';
import { FamilyMemberTypeValue } from "../../../../backend/src/features/family-member/value-object/familyMemberTypeValue";
import { LanguageType } from "../../../../backend/src/features/language/enum/languageType";
import { LanguageTypeValue } from "../../../../backend/src/features/language/value-object/languageTypeValue";
import { BaseStore, BaseStoreProperties, BaseStoreActions } from '../stores/BaseStore';
import { useEffect, useState } from 'react';
import { JwtStorage } from '../../features/auth/services/jwtStorage';

// シグネチャ定義
export type UpdateFamilyMemberType = (familyMemberType: FamilyMemberTypeValue) => void;
export type UpdateLanguageType = (languageType: LanguageTypeValue) => void;
export type SetJwtToken = (token?: string) => void;
export type Clear = () => void;

interface SessionProperties extends BaseStoreProperties {
  /** 家族メンバータイプ */
  familyMemberType?: FamilyMemberTypeValue;
  /** 言語タイプ */
  languageType: LanguageTypeValue;
  /** JWTトークン */
  jwtToken?: string;
}

interface SessionActions extends BaseStoreActions {
  /** 家族メンバータイプ設定 */
  updateFamilyMemberType: UpdateFamilyMemberType;
  /** 言語タイプ設定 */
  updateLanguageType: UpdateLanguageType;
  /** JWTトークン設定 */
  setJwtToken: SetJwtToken;
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

  /** JWTトークン設定 */
  protected setJwtToken(set: any): SetJwtToken {
    return (token?: string) => {
      set({ jwtToken: token }, false, 'setJwtToken');
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
      jwtToken: undefined,
    };
  }

  /** アクション構築 */
  protected buildActions(set: any, get: any): SessionActions {
    return {
      ...super.buildActions(set, get),
      updateFamilyMemberType: this.updateFamilyMemberType(set),
      updateLanguageType: this.updateLanguageType(set),
      setJwtToken: this.setJwtToken(set),
      clear: this.clear(set),
    };
  }
}

export const useSessionStore = create<SessionStore>((set, get) =>
  new SessionStoreClass().createStore(set, get)
);


/** jwtトークン読み込みフック */
export const useLoadToken = (params: {
  setLoading: (loading: boolean) => void;
}): void => {
  const sessionStore = useSessionStore();

  useEffect(() => {
    const loadToken = async () => {
      params.setLoading(true);
      try {
        const token = await JwtStorage.getToken();
        sessionStore.setJwtToken(token);  // sessionStoreにトークンを設定
      } catch (error) {
        console.error('JWT初期化エラー:', error);
        sessionStore.setJwtToken(undefined);
      } finally {
        params.setLoading(false);
      }
    };

    loadToken();
  }, []); // 空の依存配列で初回のみ実行
};
