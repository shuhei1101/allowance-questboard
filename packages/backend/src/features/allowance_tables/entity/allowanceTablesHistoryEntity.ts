import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  DataSource,
} from "typeorm";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { FamilyMemberEntity } from "../../family-member/entity/familyMemberEntity";

@Entity("allowance_tables_history")
export class AllowanceTablesHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int", nullable: false, comment: "元テーブルのレコードID" })
  original_id!: number;

  @Column({ type: "int", nullable: false, comment: "ファミリーメンバーID" })
  family_member_id!: number;

  @Column({ type: "int", nullable: false, comment: "レベル" })
  level!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false, comment: "金額" })
  amount!: number;

  @Column({ type: "varchar", length: 3, nullable: false, comment: "通貨コード" })
  currency_code!: string;

  @Column({ type: "datetime", nullable: true, comment: "有効開始日" })
  effective_from?: Date;

  @Column({ type: "datetime", nullable: true, comment: "有効終了日" })
  effective_to?: Date;

  // Relations
  @ManyToOne(() => AllowanceTablesEntity)
  @JoinColumn({ name: "original_id" })
  allowanceTable?: AllowanceTablesEntity;

  @ManyToOne(() => FamilyMemberEntity)
  @JoinColumn({ name: "family_member_id" })
  familyMember?: FamilyMemberEntity;

  /**
   * シードデータ
   */
  protected static seedData(): AllowanceTablesHistoryEntity[] {
    return [
      Object.assign(new AllowanceTablesHistoryEntity(), {
        original_id: 1,
        family_member_id: 1,
        level: 1,
        amount: 100.00,
        currency_code: "JPY",
        effective_from: new Date("2024-01-01"),
        effective_to: new Date("2024-06-30"),
        operation_type: "UPDATE" as const,
        operation_timestamp: new Date("2024-06-30T10:00:00Z"),
        operated_by: 1,
      }),
      Object.assign(new AllowanceTablesHistoryEntity(), {
        original_id: 1,
        family_member_id: 1,
        level: 1,
        amount: 150.00,
        currency_code: "JPY",
        effective_from: new Date("2024-07-01"),
        operation_type: "UPDATE" as const,
        operation_timestamp: new Date("2024-07-01T09:00:00Z"),
        operated_by: 1,
      }),
    ];
  }
}
