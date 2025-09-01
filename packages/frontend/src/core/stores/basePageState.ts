import { StateCreator } from 'zustand';

export interface BaseProperties<ErrorType> {
  isLoading: boolean;
  errors: ErrorType;
}

export abstract class BasePageStore<ErrorType> {
  /** 子クラスで必ず実装する */
  protected abstract initializeForm(): any;
  protected abstract initializeErrors(): ErrorType;

  /** 共通で使うデフォルトプロパティ */
  protected getDefaultProperties(): BaseProperties<ErrorType> {
    return {
      isLoading: false,
      errors: this.initializeErrors(),
      ...this.initializeForm(),
    };
  }

  protected setLoading(set: any) {
    return (loading: boolean) => set({ isLoading: loading }, false, 'setLoading');
  }

  protected setError(set: any) {
    return <K extends keyof ErrorType>(field: K, error: ErrorType[K]) => {
      set(
        (state: BaseProperties<ErrorType>) => ({
          errors: { ...state.errors, [field]: error },
        }),
        false,
        `set${String(field)}Error`
      );
    };
  }

  protected clearErrors(set: any) {
    return () => set({ errors: this.initializeErrors() }, false, 'clearErrors');
  }

  protected reset(set: any) {
    return () => set(this.getDefaultProperties(), false, 'reset');
  }

  /** ストア生成（子クラスから呼ぶ） */
  createStore(set: any, extraActions: Record<string, any> = {}) {
    return {
      ...this.getDefaultProperties(),
      ...extraActions,
    };
  }
}
