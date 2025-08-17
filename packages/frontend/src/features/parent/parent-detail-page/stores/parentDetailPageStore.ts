import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ParentForm } from '../models/parentForm';

export type IsLoading = boolean;
export type NameError = string | null;
export type EmailError = string | null;
export type PasswordError = string | null;
export type BirthdayError = string | null;

export type UpdateParentForm = (form: ParentForm) => void;
export type SetLoading = (loading: boolean) => void;
export type SetNameError = (error: string | null) => void;
export type SetEmailError = (error: string | null) => void;
export type SetPasswordError = (error: string | null) => void;
export type SetBirthdayError = (error: string | null) => void;
export type ClearErrors = () => void;

interface ParentDetailPageState {
  isLoading: IsLoading;
  parentForm: ParentForm;
  nameError: NameError;
  emailError: EmailError;
  passwordError: PasswordError;
  birthdayError: BirthdayError;

  updateParentForm: UpdateParentForm;
  setLoading: SetLoading;
  setNameError: SetNameError;
  setEmailError: SetEmailError;
  setPasswordError: SetPasswordError;
  setBirthdayError: SetBirthdayError;
  clearErrors: ClearErrors;
}

/**
 * 親情報登録画面状態管理ストア
 */
export const useParentDetailPageStore = create<ParentDetailPageState>()(
  devtools(
    (set) => ({
      isLoading: false,
      parentForm: ParentForm.initialize(),
      nameError: null,
      emailError: null,
      passwordError: null,
      birthdayError: null,

      updateParentForm: (parentForm: ParentForm) => {
        set({ parentForm }, false, 'updateParentForm');
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
    }),
    {
      name: 'parent-detail-page-store',
    }
  )
);
