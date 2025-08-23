import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ParentForm } from '../models/parentForm';

export type IsLoading = boolean;
export type NameError = string | null;
export type EmailError = string | null;
export type PasswordError = string | null;
export type BirthdayError = string | null;
export type IsConfirmed = boolean;

export type SetParentForm = (form: ParentForm) => void;
export type SetLoading = (loading: boolean) => void;
export type SetNameError = (error: string | null) => void;
export type SetEmailError = (error: string | null) => void;
export type SetPasswordError = (error: string | null) => void;
export type SetBirthdayError = (error: string | null) => void;
export type ClearErrors = () => void;
export type SetConfirmed = (confirmed: boolean) => void;
export type Reset = () => void;
interface ParentEditPageState {
  isLoading: IsLoading;
  parentForm: ParentForm;
  nameError: NameError;
  emailError: EmailError;
  passwordError: PasswordError;
  birthdayError: BirthdayError;
  isConfirmed: IsConfirmed;

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

const initialState = {
  isLoading: false,
  parentForm: ParentForm.initialize(),
  nameError: null,
  emailError: null,
  passwordError: null,
  birthdayError: null,
  isConfirmed: false,
};

/**
 * 親情報登録画面状態管理ストア
 */
export const useParentEditPageStore = create<ParentEditPageState>()(
  devtools(
    (set) => ({
      ...initialState,

      setParentForm: (parentForm: ParentForm) => {
        set({ parentForm }, false, 'setParentForm');
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading }, false, 'setLoading');
      },

      setNameError: (error: string | null) => {
        set({ nameError: error }, false, 'setNameError');
      },

      setEmailError: (error: string | null) => {
        set({ emailError: error }, false, 'setEmailError');
      },

      setPasswordError: (error: string | null) => {
        set({ passwordError: error }, false, 'setPasswordError');
      },

      setBirthdayError: (error: string | null) => {
        set({ birthdayError: error }, false, 'setBirthdayError');
      },

      clearErrors: () => {
        set({ 
          nameError: null, 
          emailError: null, 
          passwordError: null, 
          birthdayError: null 
        }, false, 'clearErrors');
      },

      setConfirmed: (confirmed: boolean) => {
        set({ isConfirmed: confirmed }, false, 'setConfirmed');
      },

      reset: () => {
        set(initialState, false, 'reset');
      },
    }),
    {
      name: 'parent-edit-page-store',
    }
  )
);
