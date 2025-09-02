import { StoreApi } from 'zustand';
import { BaseStore, BaseStoreActions, BaseStoreProperties } from './BaseStore';
import { BaseForm } from '../../../../backend/src/core/models/baseForm';

// シグネチャ
export type SetForm<TForm extends BaseForm> = (form: TForm) => void;
export type SetError<TErrors extends FormErrors> = <K extends keyof TErrors>(field: K, error: TErrors[K]) => void;
export type ClearErrors = () => void;
export type ResetForm = () => BaseForm;

/** フォーム内エントリのエラー */
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
  setForm: SetForm<TForm>;
  setError: SetError<TErrors>;
  clearErrors: ClearErrors;
  resetForm: ResetForm;
}

export abstract class BaseFormStore<
  TForm extends BaseForm = BaseForm,
  TErrors extends FormErrors = FormErrors,
  TProps extends BaseFormProperties<TForm, TErrors> = BaseFormProperties<TForm, TErrors>,
  TActions extends BaseFormActions<TForm, TErrors> = BaseFormActions<TForm, TErrors>,
> extends BaseStore<TProps, TActions> {

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
    } as TActions;
  }
}
