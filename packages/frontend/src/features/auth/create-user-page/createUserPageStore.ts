import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserCreateForm } from './models/userCreateForm';

export type IsLoading = boolean;
export type EmailError = string | undefined;
export type PasswordError = string | undefined;

export type SetUserCreateForm = (form: UserCreateForm) => void;
export type SetLoading = (loading: boolean) => void;
export type SetEmailError = (error: string | undefined) => void;
export type SetPasswordError = (error: string | undefined) => void;
export type ClearErrors = () => void;

interface CreateUserPageState {
  isLoading: IsLoading;
  userCreateForm: UserCreateForm;
  emailError?: EmailError;
  passwordError?: PasswordError;

  setUserCreateForm: SetUserCreateForm;
  setLoading: SetLoading;
  setEmailError: SetEmailError;
  setPasswordError: SetPasswordError;
  clearErrors: ClearErrors;
}

/** 新規登録画面状態管理ストア */
export const useCreateUserPageStore = create<CreateUserPageState>()(
  devtools(
    (set) => ({
      isLoading: false,
      userCreateForm: UserCreateForm.initialize(),
      emailError: undefined,
      passwordError: undefined,

      setUserCreateForm: (userCreateForm: UserCreateForm) => {
        set({ userCreateForm }, false, 'setUserCreateForm');
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading }, false, 'setLoading');
      },

      setEmailError: (error: string | undefined) => {
        set({ emailError: error }, false, 'setEmailError');
      },

      setPasswordError: (error: string | undefined) => {
        set({ passwordError: error }, false, 'setPasswordError');
      },

      clearErrors: () => {
        set({ emailError: undefined, passwordError: undefined }, false, 'clearErrors');
      },
    }),
    {
      name: 'create-user-page-store',
    }
  )
);
