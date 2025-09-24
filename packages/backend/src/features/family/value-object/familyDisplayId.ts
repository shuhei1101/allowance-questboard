import { LocaleString } from "@backend/core/messages/localeString";
import { BaseValueObject } from "@backend/core/value-object/baseValueObject";
import z from "zod";

export const FamilyDisplayIdSchema = z.string();


export class FamilyDisplayId extends BaseValueObject<string, typeof FamilyDisplayIdSchema> {
  constructor(value: string) {
    super({ value });
  }
  protected validate(): void {
    this.validator.maxLength(10);
    this.validator.minLength(4);
    this.validator.alphanumeric();
  }
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "家族表示ID",
      en: "Family Display ID"
    });
  }
  static fromZodData(data: z.infer<typeof FamilyDisplayIdSchema>): FamilyDisplayId {
    return new FamilyDisplayId(data);
  }
}
