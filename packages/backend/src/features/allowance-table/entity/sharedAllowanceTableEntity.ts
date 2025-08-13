import { Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { FamilyAllowanceTableEntity } from "./familyAllowanceTable";
import { FamilyEntity } from "src/features/family/entity/familyEntity";
import { BaseTransactionEntity } from "src/core/entity/baseTransactionEntity";

export class SharedAllowanceTableEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "共有お小遣いテーブルID" })
  family_allowance_table_id!: number;
  @Column({ type: "int", nullable: false, comment: "共有元家族ID" })
  shared_by!: number;

  @OneToOne(() => FamilyAllowanceTableEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "family_allowance_table_id", referencedColumnName: "family_allowance_table_id", foreignKeyConstraintName: "fk_shared_allowance_tables_family_allowance_table_id" })
  family_allowance_table?: FamilyAllowanceTableEntity;
  @ManyToOne(() => FamilyEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "shared_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_allowance_tables_shared_by" })
  family?: FamilyEntity;
}

export class SharedAllowanceTableHistoryEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false })
  family_allowance_table_id!: number;
  @Column({ type: "int", nullable: false })
  shared_by!: number;

  protected static setSpecificAttrs(instance: SharedAllowanceTableHistoryEntity, source: SharedAllowanceTableEntity): void {
    instance.family_allowance_table_id = source.family_allowance_table_id;
    instance.shared_by = source.shared_by;
  }
}
