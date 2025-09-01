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
export type Reset = () => void;

interface FormErrors {
  email?: string;
  password?: string;
}

interface Properties {
  isLoading: IsLoading;
  userCreateForm: UserCreateForm;
  errors: FormErrors;
}

const defaultProperties: Properties = {
  isLoading: false,
  userCreateForm: UserCreateForm.initialize(),
  errors: {
    email: undefined,
    password: undefined,
  },
};

interface CreateUserPageState extends Properties {
  setUserCreateForm: SetUserCreateForm;
  setLoading: SetLoading;
  setEmailError: SetEmailError;
  setPasswordError: SetPasswordError;
  clearErrors: ClearErrors;
  reset: Reset;
}

/** 新規登録画面状態管理ストア */
export const useCreateUserPageStore = create<CreateUserPageState>()(
  devtools(
    (set) => ({
      ...defaultProperties,

      setUserCreateForm: (userCreateForm: UserCreateForm) => {
        set({ userCreateForm }, false, 'setUserCreateForm');
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading }, false, 'setLoading');
      },

      setEmailError: (error: string | undefined) => {
        set((state) => ({ errors: { ...state.errors, email: error } }), false, 'setEmailError');
      },

      setPasswordError: (error: string | undefined) => {
        set((state) => ({ errors: { ...state.errors, password: error } }), false, 'setPasswordError');
      },

      clearErrors: () => {
        set({ errors: {} }, false, 'clearErrors');
      },

      reset: () => {
        set({ ...defaultProperties }, false, 'reset');
      },

    }),
    {
      name: 'create-user-page-store',
    }
  )
);
