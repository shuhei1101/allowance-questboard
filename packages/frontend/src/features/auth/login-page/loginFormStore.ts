import { create } from 'zustand';
import { BaseFormStore, BaseFormProperties, BaseFormActions, FormErrors, SetForm } from '../../../core/stores/baseFormStore';
import { LoginForm } from './models/loginForm';

// 関数シグネチャ
export type SetEmailError = (error: string | undefined) => void;
export type SetPasswordError = (error: string | undefined) => void;

// フォーム固有のエラー型
export interface LoginFormErrors extends FormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProperties extends BaseFormProperties<LoginForm, LoginFormErrors> {}

interface LoginFormActions extends BaseFormActions<LoginForm, LoginFormErrors> {
  setForm: SetForm<LoginForm>;
  setEmailError: SetEmailError;
  setPasswordError: SetPasswordError;
}

class LoginFormStoreClass extends BaseFormStore<LoginForm, LoginFormErrors, LoginFormProperties, LoginFormActions> {
  /** setLoginFormアクションを生成 */
  protected setForm(set: any): SetForm<LoginForm> {
    return (form) => set({ form });
  }

  /** setEmailErrorアクションを生成 */
  protected setEmailError(set: any): SetEmailError {
    return (error) => set((state: LoginFormProperties) => ({ errors: { ...state.errors, email: error } }));
  }

  /** setPasswordErrorアクションを生成 */
  protected setPasswordError(set: any): SetPasswordError {
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

  protected buildActions(set: any): LoginFormActions {
    return {
      ...super.buildActions(set),
      setEmailError: this.setEmailError(set),
      setPasswordError: this.setPasswordError(set),
      setForm: this.setForm(set),
    };
  }
}

const loginFormStore = new LoginFormStoreClass();

/** ログインフォーム状態管理ストア */
export const createLoginFormStore = () => create<LoginFormProperties & LoginFormActions>()(
  (set) => loginFormStore.createStore(set)
);
