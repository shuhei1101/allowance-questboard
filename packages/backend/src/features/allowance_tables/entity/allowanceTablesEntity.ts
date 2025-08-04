import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { FamilyMemberEntity } from "../../family-member/entity/familyMemberEntity";
import { AllowanceTablesHistoryEntity } from "./allowanceTablesHistoryEntity";

@Entity("allowance_tables")
export class AllowanceTablesEntity extends AppBaseEntity {
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

  @Column({ type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  is_active!: boolean;

  // Relations
  @ManyToOne(() => FamilyMemberEntity)
  @JoinColumn({ name: "family_member_id" })
  familyMember?: FamilyMemberEntity;

  @OneToMany(() => AllowanceTablesHistoryEntity, history => history.allowanceTable)
  histories?: AllowanceTablesHistoryEntity[];

  /**
   * シードデータ
   */
  protected static seedData(): AllowanceTablesEntity[] {
    return [
      Object.assign(new AllowanceTablesEntity(), {
        family_member_id: 1,
        level: 1,
        amount: 100.00,
        currency_code: "JPY",
        effective_from: new Date("2024-01-01"),
        is_active: true,
      }),
      Object.assign(new AllowanceTablesEntity(), {
        family_member_id: 1,
        level: 2,
        amount: 200.00,
        currency_code: "JPY",
        effective_from: new Date("2024-01-01"),
        is_active: true,
      }),
      Object.assign(new AllowanceTablesEntity(), {
        family_member_id: 2,
        level: 1,
        amount: 150.00,
        currency_code: "JPY",
        effective_from: new Date("2024-01-01"),
        is_active: true,
      }),
    ];
  }
}
