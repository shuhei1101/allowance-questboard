import { create } from 'zustand';
import { BaseFormStore, BaseFormProperties, BaseFormActions, FormErrors, SetForm, SetFormError, FormError } from '../../../../core/stores/baseFormStore';
import { FamilyRegisterForm } from '../models/familyRegisterForm';

// フォーム固有のエラー型
export interface FamilyRegisterFormErrors extends FormErrors {
  /** 家族表示ID エラー */
  familyDisplayId: FormError;
  /** 家族名 エラー */
  familyName: FormError;
  /** 家族オンライン名 エラー */
  familyOnlineName: FormError;
  /** 親名 エラー */
  parentName: FormError;
  /** 親誕生日 エラー */
  parentBirthday: FormError;
}

interface FamilyRegisterFormProperties extends BaseFormProperties<FamilyRegisterForm, FamilyRegisterFormErrors> {}

interface FamilyRegisterFormActions extends BaseFormActions<FamilyRegisterForm, FamilyRegisterFormErrors> {
  /** フォームを設定 */
  setForm: SetForm<FamilyRegisterForm>;
  /** 家族表示IDエラーを設定 */
  setFamilyDisplayIdError: SetFormError;
  /** 家族名エラーを設定 */
  setFamilyNameError: SetFormError;
  /** 家族オンライン名エラーを設定 */
  setFamilyOnlineNameError: SetFormError;
  /** 親名エラーを設定 */
  setParentNameError: SetFormError;
  /** 親誕生日エラーを設定 */
  setParentBirthdayError: SetFormError;
}

class FamilyRegisterFormStoreClass extends BaseFormStore<FamilyRegisterForm, FamilyRegisterFormErrors, FamilyRegisterFormProperties, FamilyRegisterFormActions> {
  /** setFormアクションを生成 */
  protected setForm(set: any): SetForm<FamilyRegisterForm> {
    return (form) => set({ form }, false, 'setForm');
  }

  /** setFamilyDisplayIdErrorアクションを生成 */
  protected setFamilyDisplayIdError(set: any): SetFormError {
    return (error) => set((state: FamilyRegisterFormProperties) => ({ 
      errors: { ...state.errors, familyDisplayId: error } 
    }), false, 'setFamilyDisplayIdError');
  }

  /** setFamilyNameErrorアクションを生成 */
  protected setFamilyNameError(set: any): SetFormError {
    return (error) => set((state: FamilyRegisterFormProperties) => ({ 
      errors: { ...state.errors, familyName: error } 
    }), false, 'setFamilyNameError');
  }

  /** setFamilyOnlineNameErrorアクションを生成 */
  protected setFamilyOnlineNameError(set: any): SetFormError {
    return (error) => set((state: FamilyRegisterFormProperties) => ({ 
      errors: { ...state.errors, familyOnlineName: error } 
    }), false, 'setFamilyOnlineNameError');
  }

  /** setParentNameErrorアクションを生成 */
  protected setParentNameError(set: any): SetFormError {
    return (error) => set((state: FamilyRegisterFormProperties) => ({ 
      errors: { ...state.errors, parentName: error } 
    }), false, 'setParentNameError');
  }

  /** setParentBirthdayErrorアクションを生成 */
  protected setParentBirthdayError(set: any): SetFormError {
    return (error) => set((state: FamilyRegisterFormProperties) => ({ 
      errors: { ...state.errors, parentBirthday: error } 
    }), false, 'setParentBirthdayError');
  }

  protected initializeForm(): FamilyRegisterForm {
    return FamilyRegisterForm.initialize();
  }

  protected buildDefaultProperties(): FamilyRegisterFormProperties {
    return {
      ...super.buildDefaultProperties(),
      errors: {
        familyDisplayId: undefined,
        familyName: undefined,
        familyOnlineName: undefined,
        parentName: undefined,
        parentBirthday: undefined,
      } as FamilyRegisterFormErrors,
    };
  }

  protected buildActions(set: any, get: any): FamilyRegisterFormActions {
    return {
      ...super.buildActions(set, get),
      setForm: this.setForm(set),
      setFamilyDisplayIdError: this.setFamilyDisplayIdError(set),
      setFamilyNameError: this.setFamilyNameError(set),
      setFamilyOnlineNameError: this.setFamilyOnlineNameError(set),
      setParentNameError: this.setParentNameError(set),
      setParentBirthdayError: this.setParentBirthdayError(set),
    };
  }
}

const familyRegisterFormStore = new FamilyRegisterFormStoreClass();
export type FamilyRegisterFormStore = FamilyRegisterFormProperties & FamilyRegisterFormActions;

/** 家族登録フォーム状態管理ストア */
export const useFamilyRegisterFormStore = create<FamilyRegisterFormStore>()(
  (set, get) => familyRegisterFormStore.createStore(set, get)
);
