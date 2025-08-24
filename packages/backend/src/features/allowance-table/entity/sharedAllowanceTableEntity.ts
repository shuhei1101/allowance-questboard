import { Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { FamilyAllowanceTableEntity } from "./familyAllowanceTable";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";

export class SharedAllowanceTableEntity extends BaseTransactionEntity {
  @Column({ name: "family_allowance_table_id", type: "int", nullable: false, comment: "共有お小遣いテーブルID" })
  familyAllowanceTableId!: number;
  @Column({ name: "shared_by", type: "int", nullable: false, comment: "共有元家族ID" })
  sharedBy!: number;

  @OneToOne(() => FamilyAllowanceTableEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "family_allowance_table_id", referencedColumnName: "familyAllowanceTableId", foreignKeyConstraintName: "fk_shared_allowance_tables_family_allowance_table_id" })
  familyAllowanceTable?: FamilyAllowanceTableEntity;
  @ManyToOne(() => FamilyEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "shared_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_allowance_tables_shared_by" })
  family?: FamilyEntity;
}

export class SharedAllowanceTableHistoryEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false })
  familyAllowanceTableId!: number;
  @Column({ type: "int", nullable: false })
  sharedBy!: number;

  protected static setSpecificAttrs(instance: SharedAllowanceTableHistoryEntity, source: SharedAllowanceTableEntity): void {
    instance.familyAllowanceTableId = source.familyAllowanceTableId;
    instance.sharedBy = source.sharedBy;
  }
}
