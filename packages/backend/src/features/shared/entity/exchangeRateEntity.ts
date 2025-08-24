import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  DataSource,
  Check,
} from "typeorm";
import { CurrencyEntity } from "./currencyEntity";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";

@Entity("exchange_rates")
@Unique("uq_exchange_rates_currencies_date", ["baseCurrencyId", "targetCurrencyId"])
@Check("chk_exchange_rates_different_currencies", "base_currency_id != target_currency_id")
@Check("chk_exchange_rates_rate_positive", "rate > 0")
export class ExchangeRateEntity extends BaseMasterEntity {
  @PrimaryGeneratedColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "base_currency_id", type: "int", nullable: false, comment: "基準通貨ID" })
  baseCurrencyId!: number;
  @Column({ name: "target_currency_id", type: "int", nullable: false, comment: "対象通貨ID" })
  targetCurrencyId!: number;
  @Column({ name: "rate", type: "decimal", precision: 15, scale: 6, nullable: false, comment: "為替レート" })
  rate!: number;

  // Relations
  @ManyToOne(() => CurrencyEntity)
  @JoinColumn({ name: "base_currency_id" })
  baseCurrency?: CurrencyEntity;
  @ManyToOne(() => CurrencyEntity)
  @JoinColumn({ name: "target_currency_id" })
  targetCurrency?: CurrencyEntity;

  /**
   * シードデータ
   */
  protected static seedData(): ExchangeRateEntity[] {
    return [
      Object.assign(new ExchangeRateEntity(), { baseCurrencyId: 1, targetCurrencyId: 2, rate: 0.007 }), // JPY to USD
      Object.assign(new ExchangeRateEntity(), { baseCurrencyId: 2, targetCurrencyId: 1, rate: 143.0 }), // USD to JPY
    ];
  }
}
