import { create } from 'zustand';
import { BaseFormStore, BaseFormProperties, BaseFormActions, FormErrors, SetForm, SetFormError } from '../../../../core/stores/baseFormStore';
import { LoginForm } from '../models/loginForm';

// フォーム固有のエラー型
export interface LoginFormErrors extends FormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProperties extends BaseFormProperties<LoginForm, LoginFormErrors> {}

interface LoginFormActions extends BaseFormActions<LoginForm, LoginFormErrors> {
  setForm: SetForm<LoginForm>;
  setEmailError: SetFormError;
  setPasswordError: SetFormError;
}

class LoginFormStoreClass extends BaseFormStore<LoginForm, LoginFormErrors, LoginFormProperties, LoginFormActions> {
  /** setLoginFormアクションを生成 */
  protected setForm(set: any): SetForm<LoginForm> {
    return (form) => set({ form });
  }

  /** setEmailErrorアクションを生成 */
  protected setEmailError(set: any): SetFormError {
    return (error) => set((state: LoginFormProperties) => ({ errors: { ...state.errors, email: error } }));
  }

  /** setPasswordErrorアクションを生成 */
  protected setPasswordError(set: any): SetFormError {
    return (error) => set((state: LoginFormProperties) => ({ errors: { ...state.errors, password: error } }));
  }

  protected initializeForm(): LoginForm {
    return LoginForm.initialize();
  }

  protected buildDefaultProperties(): LoginFormProperties {
    return {
      ...super.buildDefaultProperties(),
      errors: {
        email: undefined,
        password: undefined,
      } as LoginFormErrors,
    };
  }

  protected buildActions(set: any, get: any): LoginFormActions {
    return {
      ...super.buildActions(set, get),
      setEmailError: this.setEmailError(set),
      setPasswordError: this.setPasswordError(set),
      setForm: this.setForm(set),
    };
  }
}

const loginFormStore = new LoginFormStoreClass();
export type LoginFormStore = LoginFormProperties & LoginFormActions;

/** ログインフォーム状態管理ストア */
export const useLoginFormStore = create<LoginFormStore>()(
  (set, get) => loginFormStore.createStore(set, get)
);
