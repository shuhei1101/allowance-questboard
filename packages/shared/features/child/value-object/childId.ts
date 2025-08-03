import { BaseId } from "@shared/core/value-object/base_id";

export class ChildId extends BaseId {
  constructor(value: number) {
    super(value);
  }
}
