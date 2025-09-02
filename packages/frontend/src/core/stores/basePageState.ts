import { StateCreator } from 'zustand';

export interface BasePageProperties {
  isLoading: boolean;
}

export abstract class BasePageStore {
  protected getDefaultProperties(): BasePageProperties {
    return { isLoading: false };
  }

  protected setLoading(set: any) {
    return (loading: boolean) => set({ isLoading: loading }, false, 'setLoading');
  }

  protected reset(set: any) {
    return () => set(this.getDefaultProperties(), false, 'reset');
  }

  createStore(set: any, extraActions: Record<string, any> = {}) {
    return { ...this.getDefaultProperties(), ...extraActions };
  }
}