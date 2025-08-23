import { LocaleString } from "@backend/core/messages/localeString";
import { BaseValueObject } from "@backend/core/value-object/baseValueObject";
import z from "zod";

export const FamilyIntroductionSchema = z.object({
  value: z.string()
});


export class FamilyIntroduction extends BaseValueObject<string, typeof FamilyIntroductionSchema> {
  constructor(value: string) {
    super({ value });
  }
  protected validate(): void {
    this.validator.maxLength(100);
  }
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "家族紹介",
      en: "Family Introduction"
    });
  }
  static fromZodData(data: z.infer<typeof FamilyIntroductionSchema>): FamilyIntroduction {
    return new FamilyIntroduction(data.value);
  }
}
