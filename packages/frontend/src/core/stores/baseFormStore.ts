import { StoreApi } from 'zustand';
import { BaseStore, BaseStoreActions, BaseStoreProperties } from './BaseStore';
import { BaseForm } from '../../../../backend/src/core/models/baseForm';

// 関数シグネチャ
export type ClearErrors = () => void;
export type ResetForm = () => BaseForm;
export type SetForm<TForm extends BaseForm> = (form: TForm) => void;
export type SetError = (error: string | undefined) => void;

/** フォーム内エントリのエラー */
// 関数シグネチャ
export interface FormErrors extends Record<string, string | undefined> {}

export interface BaseFormProperties<
  TForm extends BaseForm,
  TErrors extends FormErrors
> extends BaseStoreProperties {
  form: TForm;
  errors: TErrors;
}

export interface BaseFormActions<
  TForm extends BaseForm,
  TErrors extends FormErrors
> extends BaseStoreActions {
  clearErrors: ClearErrors;
  resetForm: ResetForm;
}

export abstract class BaseFormStore<
  TForm extends BaseForm = BaseForm,
  TErrors extends FormErrors = FormErrors,
  TProps extends BaseFormProperties<TForm, TErrors> = BaseFormProperties<TForm, TErrors>,
  TActions extends BaseFormActions<TForm, TErrors> = BaseFormActions<TForm, TErrors>,
> extends BaseStore<TProps, TActions> {

  protected abstract setForm(set: any): SetForm<TForm>;

  /** フォームのエラークリア */
  protected clearErrors(set: any): ClearErrors {
    return () => set({ errors: {} as TErrors }, false, 'clearErrors');
  }

  /** フォームのリセット */
  protected resetForm(set: any): ResetForm {
    return () => {
      const initialForm = this.initializeForm();
      set({ form: initialForm, errors: {} as TErrors }, false, 'resetForm');
      return initialForm;
    };
  }

  /** フォームの初期化
   * 
   * 継承先で使用するフォーム.initialize()を呼び出して返すこと */
  protected abstract initializeForm(): TForm;

  protected buildDefaultProperties(): TProps {
    return {
      ...super.buildDefaultProperties(),
      form: this.initializeForm(),
      errors: {} as TErrors,
    };
  }

  protected buildActions(
    set: StoreApi<TProps & BaseFormActions<BaseForm, FormErrors> & TActions>['setState']
  ): TActions {
    return {
      ...super.buildActions(set),
      clearErrors: this.clearErrors(set),
      resetForm: this.resetForm(set),
    } as TActions;
  }
}
