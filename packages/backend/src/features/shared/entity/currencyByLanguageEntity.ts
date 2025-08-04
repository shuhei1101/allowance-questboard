import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  DataSource,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { CurrencyEntity } from "./currencyEntity";
import { LanguageEntity } from "../../language/entity/languageEntity";

@Entity("currencies_by_language")
@Unique("uq_currency_by_language", ["currency_id", "language_id"])
export class CurrencyByLanguageEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "通貨ID(外部キー：currencies.id)" })
  currency_id!: number;

  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

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
      Object.assign(new CurrencyByLanguageEntity(), { currency_id: 1, language_id: 1 }), // JPY - Japanese
      Object.assign(new CurrencyByLanguageEntity(), { currency_id: 2, language_id: 2 }), // USD - English
    ];
  }
}
