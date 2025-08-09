import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { AllowanceTableEntity } from "./allowanceTableEntity";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";

/**
 * 家族お小遣いテーブルエンティティ
 */
@Entity("family_allowance_tables")
export class FamilyAllowanceTableEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "お小遣いテーブルID" })
  superclass_id!: number;
  @Column({ type: "int", nullable: false, comment: "家族ID" })
  family_id!: number;
  @Column({ type: "boolean", default: false, nullable: false, comment: "公開フラグ" })
  is_public!: boolean;

  @OneToOne(() => AllowanceTableEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "superclass_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_allowance_tables_superclass_id" })
  allowance_table?: AllowanceTableEntity;
  @ManyToOne(() => FamilyEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_allowance_tables_family_id" })
  family?: FamilyEntity;
}

/**
 * 家族お小遣いテーブル履歴エンティティ
 */
@Entity("family_allowance_tables_history")
export class FamilyAllowanceTableHistoryEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false })
  superclass_id!: number;
  @Column({ type: "int", nullable: false })
  family_id!: number;
  @Column({ type: "boolean", default: false, nullable: false })
  is_public!: boolean;

  protected static setSpecificAttrs(instance: FamilyAllowanceTableHistoryEntity, source: FamilyAllowanceTableEntity): void {
    instance.superclass_id = source.superclass_id;
    instance.family_id = source.family_id;
    instance.is_public = source.is_public;
  }
}
