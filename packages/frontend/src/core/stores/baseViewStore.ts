export interface BaseViewProperties<ItemType> {
  items: ItemType[];
}

export abstract class BaseViewStore<ItemType> {
  protected abstract initializeItems(): ItemType[];

  protected getDefaultProperties(): BaseViewProperties<ItemType> {
    return { items: this.initializeItems() };
  }

  protected setItems(set: any) {
    return (items: ItemType[]) => set({ items }, false, 'setItems');
  }

  protected reset(set: any) {
    return () => set(this.getDefaultProperties(), false, 'reset');
  }

  createStore(set: any, extraActions: Record<string, any> = {}) {
    return { ...this.getDefaultProperties(), ...extraActions };
  }
}