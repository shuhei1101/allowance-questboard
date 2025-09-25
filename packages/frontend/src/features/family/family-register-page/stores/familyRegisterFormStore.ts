import { create } from 'zustand';
import { BaseFormStore, BaseFormProperties, BaseFormActions, FormErrors, SetForm, SetFormError } from '../../../../core/stores/baseFormStore';
import { familyRegisterForm } from '../models/familyRegisterFormData';

// フォーム固有のエラー型
export interface FamilyRegisterFormErrors extends FormErrors {
  /** 家族表示ID エラー */
  familyDisplayId?: string;
  /** 家族名 エラー */
  familyName?: string;
  /** 家族オンライン名 エラー */
  familyOnlineName?: string;
  /** 親名 エラー */
  parentName?: string;
  /** 親誕生日 エラー */
  parentBirthday?: string;
}

interface FamilyRegisterFormProperties extends BaseFormProperties<familyRegisterForm, FamilyRegisterFormErrors> {}

interface FamilyRegisterFormActions extends BaseFormActions<familyRegisterForm, FamilyRegisterFormErrors> {
  /** フォームを設定 */
  setForm: SetForm<familyRegisterForm>;
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

class FamilyRegisterFormStoreClass extends BaseFormStore<familyRegisterForm, FamilyRegisterFormErrors, FamilyRegisterFormProperties, FamilyRegisterFormActions> {
  /** setFormアクションを生成 */
  protected setForm(set: any): SetForm<familyRegisterForm> {
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

  protected initializeForm(): familyRegisterForm {
    return familyRegisterForm.initialize();
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
