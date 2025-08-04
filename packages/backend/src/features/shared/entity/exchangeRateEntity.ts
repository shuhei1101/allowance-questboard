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
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { CurrencyEntity } from "./currencyEntity";

@Entity("exchange_rates")
@Unique("uq_exchange_rates_currencies_date", ["base_currency_id", "target_currency_id", "effective_date"])
@Check("chk_exchange_rates_different_currencies", "base_currency_id != target_currency_id")
@Check("chk_exchange_rates_rate_positive", "rate > 0")
export class ExchangeRateEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "基準通貨ID" })
  base_currency_id!: number;

  @Column({ type: "int", nullable: false, comment: "対象通貨ID" })
  target_currency_id!: number;

  @Column({ type: "decimal", precision: 15, scale: 6, nullable: false, comment: "為替レート" })
  rate!: number;

  @Column({ type: "date", nullable: false, default: () => "CURRENT_DATE", comment: "適用日" })
  effective_date!: Date;

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
      Object.assign(new ExchangeRateEntity(), { 
        base_currency_id: 1, 
        target_currency_id: 2, 
        rate: 0.007,
        effective_date: new Date()
      }), // JPY to USD
      Object.assign(new ExchangeRateEntity(), { 
        base_currency_id: 2, 
        target_currency_id: 1, 
        rate: 143.0,
        effective_date: new Date()
      }), // USD to JPY
    ];
  }
}
