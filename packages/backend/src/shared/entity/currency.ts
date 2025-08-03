import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { Language } from "@backend/features/language/entity/language";

/**
 * 通貨マスタエンティティ
 */
@Entity("currencies")
export class Currency extends AppBaseEntity {
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
  protected static seedData(): Currency[] {
    return [
      Object.assign(new Currency(), {
        code: "JPY",
        name: "Japanese Yen",
        symbol: "¥",
        is_active: true,
        sort_order: 1
      }),
      Object.assign(new Currency(), {
        code: "USD",
        name: "US Dollar",
        symbol: "$",
        is_active: true,
        sort_order: 2
      }),
    ];
  }
}

/**
 * 通貨と言語の関連エンティティ
 */
@Entity("currencies_by_language")
export class CurrencyByLanguage extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "通貨コード(外部キー：currencies.id)" })
  currency_id!: number;

  @Column({ type: "int", nullable: false, comment: "言語コード" })
  language_id!: number;

  @ManyToOne(() => Currency, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_currency_by_language_currency_id" })
  currency!: Currency;

  @ManyToOne(() => Language, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "language_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_currency_by_language_language_id" })
  language!: Language;

  /**
   * シード用データ取得
   */
  protected static seedData(): CurrencyByLanguage[] {
    return [
      Object.assign(new CurrencyByLanguage(), {
        currency_id: 1,
        language_id: 1  // JPY
      }),
      Object.assign(new CurrencyByLanguage(), {
        currency_id: 2,
        language_id: 2  // USD
      }),
    ];
  }
}
