import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { AllowanceTableEntity } from "./allowanceTableEntity";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";

/**
 * 家族お小遣いテーブルエンティティ
 */
@Entity("family_allowance_tables")
export class FamilyAllowanceTableEntity extends BaseTransactionEntity {
  @Column({ name: "superclass_id", type: "int", nullable: false, comment: "お小遣いテーブルID" })
  superclassId!: number;
  @Column({ name: "family_id", type: "int", nullable: false, comment: "家族ID" })
  familyId!: number;
  @Column({ name: "is_public", type: "boolean", default: false, nullable: false, comment: "公開フラグ" })
  isPublic!: boolean;

  @OneToOne(() => AllowanceTableEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "superclass_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_allowance_tables_superclass_id" })
  allowanceTable?: AllowanceTableEntity;
  @ManyToOne(() => FamilyEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_allowance_tables_family_id" })
  family?: FamilyEntity;
}

/**
 * 家族お小遣いテーブル履歴エンティティ
 */
@Entity("family_allowance_tables_history")
export class FamilyAllowanceTableHistoryEntity extends BaseTransactionEntity {
  @Column({ name: "superclass_id", type: "int", nullable: false })
  superclassId!: number;
  @Column({ name: "family_id", type: "int", nullable: false })
  familyId!: number;
  @Column({ name: "is_public", type: "boolean", default: false, nullable: false })
  isPublic!: boolean;

  protected static setSpecificAttrs(instance: FamilyAllowanceTableHistoryEntity, source: FamilyAllowanceTableEntity): void {
    instance.superclassId = source.superclassId;
    instance.familyId = source.familyId;
    instance.isPublic = source.isPublic;
  }
}
