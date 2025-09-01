import { FamilyMemberTypeValue } from "../../../../backend/src/features/family-member/value-object/familyMemberTypeValue";
import { LanguageType } from "../../../../backend/src/features/language/enum/languageType";
import { LanguageTypeValue } from "../../../../backend/src/features/language/value-object/languageTypeValue";
import { createJwtStorage, GetJwtToken, IJwtStorage } from "../../features/auth/services/jwtStorage";

export type SetFamilyMemberType = (familyMemberType: FamilyMemberTypeValue) => void;
export type SetLanguageType = (languageType: LanguageTypeValue) => void;
export type Clear = () => void;

class SessionVariables {
  familyMemberType?: FamilyMemberTypeValue;
  languageType: LanguageTypeValue;
  jwtStorage: IJwtStorage;

  constructor(params: {
    familyMemberType?: FamilyMemberTypeValue,
    languageType?: LanguageTypeValue,
    jwtStorage: IJwtStorage
  }) {
    this.familyMemberType = params.familyMemberType;
    this.languageType = params.languageType || LanguageType.ENGLISH;
    this.jwtStorage = params.jwtStorage;
  }

  static initialize(): SessionVariables {
    return new SessionVariables({
      familyMemberType: undefined,
      languageType: undefined,
      jwtStorage: createJwtStorage()
    });
  }

  setFamilyMemberType: SetFamilyMemberType = (familyMemberType: FamilyMemberTypeValue) => {
    this.familyMemberType = familyMemberType;
  }

  setLanguageType: SetLanguageType = (languageType: LanguageTypeValue) => {
    this.languageType = languageType;
  }
}

export const Session = SessionVariables.initialize();
