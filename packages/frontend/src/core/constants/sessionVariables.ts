import { FamilyMemberTypeValue } from "../../../../backend/src/features/family-member/value-object/familyMemberTypeValue";
import { LanguageType } from "../../../../backend/src/features/language/enum/languageType";
import { LanguageTypeValue } from "../../../../backend/src/features/language/value-object/languageTypeValue";
import { createJwtStorage, GetToken, IJwtStorage } from "../../features/auth/services/jwtStorage";

export type SetJwt = (jwt: string) => void;
export type SetFamilyMemberType = (familyMemberType: FamilyMemberTypeValue) => void;
export type SetLanguageType = (languageType: LanguageTypeValue) => void;
export type Clear = () => void;
export type IsAuthenticated = () => boolean;

class SessionVariables {
  familyMemberType?: FamilyMemberTypeValue;
  languageType: LanguageTypeValue;
  jwtStorage: IJwtStorage;

  constructor(params: {
    familyMemberType?: FamilyMemberTypeValue,
    languageType: LanguageTypeValue,
    jwtStorage: IJwtStorage
  }) {
    this.familyMemberType = params.familyMemberType;
    this.languageType = params.languageType;
    this.jwtStorage = params.jwtStorage;
  }

  static initialize(): SessionVariables {
    return new SessionVariables({
      familyMemberType: undefined,
      languageType: LanguageType.ENGLISH,
      jwtStorage: createJwtStorage()
    });
  }

  setFamilyMemberType: SetFamilyMemberType = (familyMemberType: FamilyMemberTypeValue) => {
    this.familyMemberType = familyMemberType;
  }

  setLanguageType: SetLanguageType = (languageType: LanguageTypeValue) => {
    this.languageType = languageType;
  }

  getJwt: GetToken = async () => {
    return await this.jwtStorage.getToken();
  }

  setJwt: SetJwt = async (jwt: string) => {
    await this.jwtStorage.saveToken(jwt);
  }

  isAuthenticated: IsAuthenticated = () => {
    return this.jwtStorage.getToken() !== null;
  }

}

export const Session = SessionVariables.initialize();
