import { create } from 'zustand';
import { BaseFormStore, BaseFormProperties, BaseFormActions, FormErrors, SetForm, SetFormError } from '../../../../core/stores/baseFormStore';
import { UserRegisterForm } from '../models/userRegisterForm';

// フォーム固有のエラー型
export interface UserRegisterFormErrors extends FormErrors {
  email?: string;
  password?: string;
}

interface UserRegisterFormProperties extends BaseFormProperties<UserRegisterForm, UserRegisterFormErrors> {}

interface UserRegisterFormActions extends BaseFormActions<UserRegisterForm, UserRegisterFormErrors> {
  setForm: SetForm<UserRegisterForm>;
  setEmailError: SetFormError;
  setPasswordError: SetFormError;
}

class UserRegisterFormStoreClass extends BaseFormStore<UserRegisterForm, UserRegisterFormErrors, UserRegisterFormProperties, UserRegisterFormActions> {
  /** setUserRegisterFormアクションを生成 */
  protected setForm(set: any): SetForm<UserRegisterForm> {
    return (form) => set({ form });
  }

  /** setEmailErrorアクションを生成 */
  protected setEmailError(set: any): SetFormError {
    return (error) => set((state: UserRegisterFormProperties) => ({ errors: { ...state.errors, email: error } }));
  }

  /** setPasswordErrorアクションを生成 */
  protected setPasswordError(set: any): SetFormError {
    return (error) => set((state: UserRegisterFormProperties) => ({ errors: { ...state.errors, password: error } }));
  }

  protected initializeForm(): UserRegisterForm {
    return UserRegisterForm.initialize();
  }

  protected buildDefaultProperties(): UserRegisterFormProperties {
    return {
      ...super.buildDefaultProperties(),
      errors: {
        email: undefined,
        password: undefined,
      } as UserRegisterFormErrors,
    };
  }

  protected buildActions(set: any, get: any): UserRegisterFormActions {
    return {
      ...super.buildActions(set, get),
      setEmailError: this.setEmailError(set),
      setPasswordError: this.setPasswordError(set),
      setForm: this.setForm(set),
    };
  }
}

const userRegisterFormStore = new UserRegisterFormStoreClass();
export type UserRegisterFormStore = UserRegisterFormProperties & UserRegisterFormActions;

/** 新規登録フォーム状態管理ストア */
export const useUserRegisterFormStore = create<UserRegisterFormStore>()(
  (set, get) => userRegisterFormStore.createStore(set, get)
);
