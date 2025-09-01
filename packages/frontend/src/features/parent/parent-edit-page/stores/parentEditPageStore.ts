import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ParentForm } from '../models/parentForm';

export type IsLoading = boolean;
export type NameError = string | undefined;
export type EmailError = string | undefined;
export type PasswordError = string | undefined;
export type BirthdayError = string | undefined;
export type IsConfirmed = boolean;

export type SetParentForm = (form: ParentForm) => void;
export type SetLoading = (loading: boolean) => void;
export type SetNameError = (error: string | undefined) => void;
export type SetEmailError = (error: string | undefined) => void;
export type SetPasswordError = (error: string | undefined) => void;
export type SetBirthdayError = (error: string | undefined) => void;
export type ClearErrors = () => void;
export type SetConfirmed = (confirmed: boolean) => void;
export type Reset = () => void;

interface FormErrors {
  name?: NameError;
  email?: EmailError;
  password?: PasswordError;
  birthday?: BirthdayError;
}

interface Properties {
  isLoading: IsLoading;
  parentForm: ParentForm;
  errors: FormErrors;
  isConfirmed: IsConfirmed;
}

const defaultProperties: Properties = {
  isLoading: false,
  parentForm: ParentForm.initialize(),
  errors: {
    name: undefined,
    email: undefined,
    password: undefined,
    birthday: undefined,
  },
  isConfirmed: false,
};

interface ParentEditPageState extends Properties {
  setParentForm: SetParentForm;
  setLoading: SetLoading;
  setNameError: SetNameError;
  setEmailError: SetEmailError;
  setPasswordError: SetPasswordError;
  setBirthdayError: SetBirthdayError;
  clearErrors: ClearErrors;
  setConfirmed: SetConfirmed;
  reset: Reset;
}

/** 親情報登録画面状態管理ストア */
export const useParentEditPageStore = create<ParentEditPageState>()(
  devtools(
    (set) => ({
      ...defaultProperties,

      setParentForm: (parentForm: ParentForm) => {
        set({ parentForm }, false, 'setParentForm');
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading }, false, 'setLoading');
      },

      setNameError: (error: string | undefined) => {
        set((state) => ({ errors: { ...state.errors, name: error } }), false, 'setNameError');
      },

      setEmailError: (error: string | undefined) => {
        set((state) => ({ errors: { ...state.errors, email: error } }), false, 'setEmailError');
      },

      setPasswordError: (error: string | undefined) => {
        set((state) => ({ errors: { ...state.errors, password: error } }), false, 'setPasswordError');
      },

      setBirthdayError: (error: string | undefined) => {
        set((state) => ({ errors: { ...state.errors, birthday: error } }), false, 'setBirthdayError');
      },

      clearErrors: () => {
        set({ errors: {} }, false, 'clearErrors');
      },

      setConfirmed: (confirmed: boolean) => {
        set({ isConfirmed: confirmed }, false, 'setConfirmed');
      },

      reset: () => {
        set({ ...defaultProperties }, false, 'reset');
      },
    }),
    {
      name: 'parent-edit-page-store',
    }
  )
);
