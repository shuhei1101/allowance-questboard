import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  DataSource,
} from "typeorm";
import { CurrencyEntity } from "./currencyEntity";
import { LanguageEntity } from "../../language/entity/languageEntity";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";

@Entity("currencies_by_language")
@Unique("uq_currency_by_language", ["currencyId", "languageId"])
export class CurrencyByLanguageEntity extends BaseMasterEntity {
  @PrimaryGeneratedColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "currency_id", type: "int", nullable: false, comment: "通貨ID(外部キー：currencies.id)" })
  currencyId!: number;
  @Column({ name: "language_id", type: "int", nullable: false, comment: "言語ID" })
  languageId!: number;

  // Relations
  @ManyToOne(() => CurrencyEntity)
  @JoinColumn({ name: "currency_id" })
  currency?: CurrencyEntity;
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: "language_id" })
  language?: LanguageEntity;

  /**
   * シードデータ
   */
  protected static seedData(): CurrencyByLanguageEntity[] {
    return [
      Object.assign(new CurrencyByLanguageEntity(), { currencyId: 1, languageId: 1 }), // JPY - Japanese
      Object.assign(new CurrencyByLanguageEntity(), { currencyId: 2, languageId: 2 }), // USD - English
    ];
  }
}
