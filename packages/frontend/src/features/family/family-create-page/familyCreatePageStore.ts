import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FamilyForm } from './models/familyForm';

export type IsLoading = boolean;
export type DisplayId = string | undefined;
export type EmailError = string | undefined;
export type PasswordError = string | undefined;
export type BirthdayError = string | undefined;
export type IsConfirmed = boolean;

export type SetFamilyForm = (form: FamilyForm) => void;
export type SetLoading = (loading: boolean) => void;
export type SetDisplayId = (error: string | undefined) => void;
export type SetEmailError = (error: string | undefined) => void;
export type SetPasswordError = (error: string | undefined) => void;
export type SetBirthdayError = (error: string | undefined) => void;
export type ClearErrors = () => void;
export type SetConfirmed = (confirmed: boolean) => void;
export type Reset = () => void;

interface FamilyCreatePageState {
  isLoading: IsLoading;
  familyForm: FamilyForm;
  nameError?: DisplayId;
  emailError?: EmailError;
  passwordError?: PasswordError;
  birthdayError?: BirthdayError;
  isConfirmed: IsConfirmed;

  setFamilyForm: SetFamilyForm;
  setLoading: SetLoading;
  setDisplayId: SetDisplayId;
  setEmailError: SetEmailError;
  setPasswordError: SetPasswordError;
  setBirthdayError: SetBirthdayError;
  clearErrors: ClearErrors;
  setConfirmed: SetConfirmed;
  reset: Reset;
}

const initialState = {
  isLoading: false,
  parentForm: FamilyForm.initialize(),
  displayIdError: undefined,
  emailError: undefined,
  passwordError: undefined,
  birthdayError: undefined,
  isConfirmed: false,
};

/**
 * 親情報登録画面状態管理ストア
 */
export const useFamilyCreatePageStore = create<FamilyCreatePageState>()(
  devtools(
    (set) => ({
      ...initialState,

      setFamilyForm: (familyForm: FamilyForm) => {
        set({ familyForm }, false, 'setFamilyForm');
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading }, false, 'setLoading');
      },

      setDisplayId: (error: string | undefined) => {
        set({ nameError: error }, false, 'setDisplayId');
      },

      setEmailError: (error: string | undefined) => {
        set({ emailError: error }, false, 'setEmailError');
      },

      setPasswordError: (error: string | undefined) => {
        set({ passwordError: error }, false, 'setPasswordError');
      },

      setBirthdayError: (error: string | undefined) => {
        set({ birthdayError: error }, false, 'setBirthdayError');
      },

      clearErrors: () => {
        set({ 
          nameError: undefined, 
          emailError: undefined, 
          passwordError: undefined, 
          birthdayError: undefined 
        }, false, 'clearErrors');
      },

      setConfirmed: (confirmed: boolean) => {
        set({ isConfirmed: confirmed }, false, 'setConfirmed');
      },

      reset: () => {
        set({ ...initialState }, false, 'reset');
      },
    }),
    {
      name: 'family-create-page-store',
    }
  )
);
