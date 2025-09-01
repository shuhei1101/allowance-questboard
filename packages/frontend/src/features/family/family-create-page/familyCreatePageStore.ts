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

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  birthday?: string;
}

interface Properties {
  isLoading: IsLoading;
  familyForm: FamilyForm;
  errors: FormErrors;
  isConfirmed: IsConfirmed;
}

const defaultProperties: Properties = {
  isLoading: false,
  familyForm: FamilyForm.initialize(),
  errors: {
    name: undefined,
    email: undefined,
    password: undefined,
    birthday: undefined,
  },
  isConfirmed: false,
};

interface FamilyCreatePageState extends Properties {
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

/**
 * 親情報登録画面状態管理ストア
 */
export const useFamilyCreatePageStore = create<FamilyCreatePageState>()(
  devtools(
    (set) => ({
      ...defaultProperties,

      setFamilyForm: (familyForm: FamilyForm) => {
        set({ familyForm }, false, 'setFamilyForm');
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading }, false, 'setLoading');
      },

      setDisplayId: (error: string | undefined) => {
        set((state) => ({ errors: { ...state.errors, displayId: error } }), false, 'setDisplayId');
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
      name: 'family-create-page-store',
    }
  )
);
