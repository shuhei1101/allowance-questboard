export interface BaseFormProperties<FormType, ErrorType> {
  form: FormType;
  errors: ErrorType;
}

export abstract class BaseFormStore<FormType, ErrorType> {
  protected abstract initializeForm(): FormType;
  protected abstract initializeErrors(): ErrorType;

  protected getDefaultProperties(): BaseFormProperties<FormType, ErrorType> {
    return { form: this.initializeForm(), errors: this.initializeErrors() };
  }

  protected setForm(set: any) {
    return (form: FormType) => set({ form }, false, 'setForm');
  }

  protected setError(set: any) {
    return <K extends keyof ErrorType>(field: K, error: ErrorType[K]) => {
      set(
        (state: BaseFormProperties<FormType, ErrorType>) => ({
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

  createStore(set: any, extraActions: Record<string, any> = {}) {
    return { ...this.getDefaultProperties(), ...extraActions };
  }
}