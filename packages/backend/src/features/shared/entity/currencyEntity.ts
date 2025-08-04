import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { LanguageEntity } from "@backend/features/language/entity/languageEntity";

/**
 * 通貨マスタエンティティ
 */
@Entity("currencies")
export class CurrencyEntity extends AppBaseEntity {
  @Column({ type: "varchar", nullable: false, unique: true, comment: "通貨コード" })
  code!: string;

  @Column({ type: "varchar", nullable: false, comment: "通貨名" })
  name!: string;

  @Column({ type: "varchar", nullable: false, comment: "通貨記号" })
  symbol!: string;

  @Column({ type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  is_active!: boolean;

  @Column({ type: "int", nullable: false, default: 0, comment: "表示順序" })
  sort_order!: number;

  /**
   * シード用データ取得
   */
  protected static seedData(): CurrencyEntity[] {
    return [
      Object.assign(new CurrencyEntity(), {
        code: "JPY",
        name: "Japanese Yen",
        symbol: "¥",
        is_active: true,
        sort_order: 1,
      }),
      Object.assign(new CurrencyEntity(), {
        code: "USD",
        name: "US Dollar",
        symbol: "$",
        is_active: true,
        sort_order: 2,
      }),
    ];
  }
}

/**
 * 通貨と言語の関連エンティティ
 */
@Entity("currencies_by_language")
@Unique("uq_currency_by_language", ["currency_id", "language_id"])
export class CurrencyByLanguageEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "通貨ID(外部キー：currencies.id)" })
  currency_id!: number;

  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @ManyToOne(() => CurrencyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_currency_by_language_currency_id" })
  currency!: CurrencyEntity;

  @ManyToOne(() => LanguageEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "language_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_currency_by_language_language_id" })
  language!: LanguageEntity;

  /**
   * シード用データ取得
   */
  protected static seedData(): CurrencyByLanguageEntity[] {
    return [
      Object.assign(new CurrencyByLanguageEntity(), {
        currency_id: 1,
        language_id: 1, // JPY - Japanese
      }),
      Object.assign(new CurrencyByLanguageEntity(), {
        currency_id: 2,
        language_id: 2, // USD - English
      }),
    ];
  }
}

/**
 * 為替レートエンティティ
 */
@Entity("exchange_rates")
@Unique("uq_exchange_rates_currencies_date", ["base_currency_id", "target_currency_id", "effective_date"])
@Check("chk_exchange_rates_rate_positive", "rate > 0")
@Check("chk_exchange_rates_different_currencies", "base_currency_id != target_currency_id")
export class ExchangeRateEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "基準通貨ID" })
  base_currency_id!: number;

  @Column({ type: "int", nullable: false, comment: "対象通貨ID" })
  target_currency_id!: number;

  @Column({ type: "decimal", precision: 15, scale: 6, nullable: false, comment: "為替レート" })
  rate!: number;

  @Column({ type: "date", nullable: false, default: () => "CURRENT_DATE", comment: "適用日" })
  effective_date!: Date;

  @ManyToOne(() => CurrencyEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "base_currency_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_exchange_rate_base_currency_id" })
  base_currency!: CurrencyEntity;

  @ManyToOne(() => CurrencyEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "target_currency_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_exchange_rate_target_currency_id" })
  target_currency!: CurrencyEntity;

  /**
   * シード用データ取得
   */
  protected static seedData(): ExchangeRateEntity[] {
    return [
      Object.assign(new ExchangeRateEntity(), {
        base_currency_id: 1,
        target_currency_id: 2,
        rate: 110.123456,
        effective_date: new Date("2023-10-01"),
      }),
      Object.assign(new ExchangeRateEntity(), {
        base_currency_id: 2,
        target_currency_id: 1,
        rate: 0.009123,
        effective_date: new Date("2023-10-01"),
      }),
    ];
  }
}
