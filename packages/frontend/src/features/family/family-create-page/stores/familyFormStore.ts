import { create } from 'zustand';
import { BaseFormStore, BaseFormProperties, BaseFormActions, FormErrors, SetForm, SetFormError } from '../../../../core/stores/baseFormStore';
import { FamilyForm } from '../models/familyForm';

// フォーム固有のエラー型
export interface FamilyFormErrors extends FormErrors {
  name?: string;
  email?: string;
  password?: string;
  birthday?: string;
}

interface FamilyFormProperties extends BaseFormProperties<FamilyForm, FamilyFormErrors> {}

interface FamilyFormActions extends BaseFormActions<FamilyForm, FamilyFormErrors> {
  setForm: SetForm<FamilyForm>;
  setNameError: SetFormError;
  setEmailError: SetFormError;
  setPasswordError: SetFormError;
  setBirthdayError: SetFormError;
}

class FamilyFormStoreClass extends BaseFormStore<FamilyForm, FamilyFormErrors, FamilyFormProperties, FamilyFormActions> {
  /** setFamilyFormアクションを生成 */
  protected setForm(set: any): SetForm<FamilyForm> {
    return (form) => set({ form });
  }

  /** setNameErrorアクションを生成 */
  protected setNameError(set: any): SetFormError {
    return (error) => set((state: FamilyFormProperties) => ({ errors: { ...state.errors, name: error } }));
  }

  /** setEmailErrorアクションを生成 */
  protected setEmailError(set: any): SetFormError {
    return (error) => set((state: FamilyFormProperties) => ({ errors: { ...state.errors, email: error } }));
  }

  /** setPasswordErrorアクションを生成 */
  protected setPasswordError(set: any): SetFormError {
    return (error) => set((state: FamilyFormProperties) => ({ errors: { ...state.errors, password: error } }));
  }

  /** setBirthdayErrorアクションを生成 */
  protected setBirthdayError(set: any): SetFormError {
    return (error) => set((state: FamilyFormProperties) => ({ errors: { ...state.errors, birthday: error } }));
  }

  protected initializeForm(): FamilyForm {
    return FamilyForm.initialize();
  }

  protected buildDefaultProperties(): FamilyFormProperties {
    return {
      ...super.buildDefaultProperties(),
      errors: {
        name: undefined,
        email: undefined,
        password: undefined,
        birthday: undefined,
      } as FamilyFormErrors,
    };
  }

  protected buildActions(set: any, get: any): FamilyFormActions {
    return {
      ...super.buildActions(set, get),
      setNameError: this.setNameError(set),
      setEmailError: this.setEmailError(set),
      setPasswordError: this.setPasswordError(set),
      setBirthdayError: this.setBirthdayError(set),
      setForm: this.setForm(set),
    };
  }
}

const familyFormStore = new FamilyFormStoreClass();
export type FamilyFormStore = FamilyFormProperties & FamilyFormActions;

/** 家族フォーム状態管理ストア */
export const useFamilyFormStore = create<FamilyFormStore>()(
  (set, get) => familyFormStore.createStore(set, get)
);
