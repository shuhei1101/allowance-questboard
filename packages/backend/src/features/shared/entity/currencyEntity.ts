import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";

/**
 * 通貨マスタエンティティ
 */
@Entity("currencies")
export class CurrencyEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
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
      Object.assign(new CurrencyEntity(), { id: 1, code: "JPY", name: "Japanese Yen", symbol: "¥", is_active: true, sort_order: 1 }),
      Object.assign(new CurrencyEntity(), { id: 2, code: "USD", name: "US Dollar", symbol: "$", is_active: true, sort_order: 2 }),
    ];
  }
}
