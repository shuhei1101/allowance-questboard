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
@Unique("uq_exchange_rates_currencies_date", ["base_currency_id", "target_currency_id"])
@Check("chk_exchange_rates_different_currencies", "base_currency_id != target_currency_id")
@Check("chk_exchange_rates_rate_positive", "rate > 0")
export class ExchangeRateEntity extends BaseMasterEntity {
  @PrimaryGeneratedColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "int", nullable: false, comment: "基準通貨ID" })
  base_currency_id!: number;
  @Column({ type: "int", nullable: false, comment: "対象通貨ID" })
  target_currency_id!: number;
  @Column({ type: "decimal", precision: 15, scale: 6, nullable: false, comment: "為替レート" })
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
      Object.assign(new ExchangeRateEntity(), { base_currency_id: 1, target_currency_id: 2, rate: 0.007 }), // JPY to USD
      Object.assign(new ExchangeRateEntity(), { base_currency_id: 2, target_currency_id: 1, rate: 143.0 }), // USD to JPY
    ];
  }
}
