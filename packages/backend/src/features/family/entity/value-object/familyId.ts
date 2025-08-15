import { BaseId } from "@backend/core/value-object/base_id";

export class FamilyId extends BaseId {
  constructor(value: number) {
    super(value);
  }
}
