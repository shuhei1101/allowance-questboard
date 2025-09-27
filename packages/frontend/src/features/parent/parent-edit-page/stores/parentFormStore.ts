import { create } from 'zustand';
import { BaseFormStore, BaseFormProperties, BaseFormActions, FormErrors, SetForm, SetFormError, FormError } from '../../../../core/stores/baseFormStore';
import { ParentForm } from '../models/parentForm';

// フォーム固有のエラー型
export interface ParentFormErrors extends FormErrors {
  name: FormError;
  email: FormError;
  password: FormError;
  birthday: FormError;
}

interface ParentFormProperties extends BaseFormProperties<ParentForm, ParentFormErrors> {}

interface ParentFormActions extends BaseFormActions<ParentForm, ParentFormErrors> {
  setForm: SetForm<ParentForm>;
  setNameError: SetFormError;
  setEmailError: SetFormError;
  setPasswordError: SetFormError;
  setBirthdayError: SetFormError;
}

class ParentFormStoreClass extends BaseFormStore<ParentForm, ParentFormErrors, ParentFormProperties, ParentFormActions> {
  /** setFormアクションを生成 */
  protected setForm(set: any): SetForm<ParentForm> {
    return (form) => set({ form }, false, 'setForm');
  }

  /** setNameErrorアクションを生成 */
  protected setNameError(set: any): SetFormError {
    return (error) => set((state: ParentFormProperties) => ({ 
      errors: { ...state.errors, name: error } 
    }), false, 'setNameError');
  }

  /** setEmailErrorアクションを生成 */
  protected setEmailError(set: any): SetFormError {
    return (error) => set((state: ParentFormProperties) => ({ 
      errors: { ...state.errors, email: error } 
    }), false, 'setEmailError');
  }

  /** setPasswordErrorアクションを生成 */
  protected setPasswordError(set: any): SetFormError {
    return (error) => set((state: ParentFormProperties) => ({ 
      errors: { ...state.errors, password: error } 
    }), false, 'setPasswordError');
  }

  /** setBirthdayErrorアクションを生成 */
  protected setBirthdayError(set: any): SetFormError {
    return (error) => set((state: ParentFormProperties) => ({ 
      errors: { ...state.errors, birthday: error } 
    }), false, 'setBirthdayError');
  }

  /** フォームの初期化 */
  protected initializeForm(): ParentForm {
    return ParentForm.initialize();
  }

  protected buildDefaultProperties(): ParentFormProperties {
    return {
      ...super.buildDefaultProperties(),
      errors: {
        name: undefined,
        email: undefined,
        password: undefined,
        birthday: undefined,
      } as ParentFormErrors,
    };
  }

  protected buildActions(set: any, get: any): ParentFormActions {
    return {
      ...super.buildActions(set, get),
      setForm: this.setForm(set),
      setNameError: this.setNameError(set),
      setEmailError: this.setEmailError(set),
      setPasswordError: this.setPasswordError(set),
      setBirthdayError: this.setBirthdayError(set),
    };
  }
}

const parentFormStore = new ParentFormStoreClass();

/** 親フォーム状態管理ストア */
export const useParentFormStore = create<ParentFormStore>()(
  (set, get) => parentFormStore.createStore(set, get)
);

/** ParentFormStoreの型エクスポート */
export type ParentFormStore = ParentFormProperties & ParentFormActions;
