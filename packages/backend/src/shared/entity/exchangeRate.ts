import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { Currency } from "./currency";

/**
 * 為替レートエンティティ
 */
@Entity("exchange_rates")
@Unique("uq_exchange_rates_currencies_date", ["base_currency_id", "target_currency_id", "effective_date"])
@Check("chk_exchange_rates_rate_positive", "rate > 0")
@Check("chk_exchange_rates_different_currencies", "base_currency_id != target_currency_id")
export class ExchangeRate extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "基準通貨ID" })
  base_currency_id!: number;

  @Column({ type: "int", nullable: false, comment: "対象通貨ID" })
  target_currency_id!: number;

  @Column({ type: "decimal", precision: 15, scale: 6, nullable: false, comment: "為替レート" })
  rate!: number;

  @Column({ type: "date", nullable: false, default: () => "CURRENT_DATE", comment: "適用日" })
  effective_date!: Date;

  @ManyToOne(() => Currency, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "base_currency_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_exchange_rates_base_currency_id" })
  base_currency_id_ref!: Currency;

  @ManyToOne(() => Currency, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "target_currency_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_exchange_rates_target_currency_id" })
  target_currency_id_ref!: Currency;

  /**
   * シード用データ取得
   */
  protected static seedData(): ExchangeRate[] {
    return [
      Object.assign(new ExchangeRate(), {
        base_currency_id: 1, // JPY
        target_currency_id: 2, // USD
        rate: 0.0067,
        effective_date: new Date()
      }),
      Object.assign(new ExchangeRate(), {
        base_currency_id: 2, // USD
        target_currency_id: 1, // JPY
        rate: 150.0,
        effective_date: new Date()
      }),
    ];
  }
}
