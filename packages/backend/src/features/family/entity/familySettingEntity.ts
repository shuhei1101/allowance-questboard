import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { FamilyEntity } from "./familyEntity";
import { CurrencyEntity } from "@backend/features/shared/entity/currencyEntity";

@Entity("family_settings")
export class FamilySettingEntity extends BaseTransactionEntity {
  @Column({ name: "family_id", type: "int", nullable: false, comment: "家族ID" })
  familyId!: number;
  // 通貨ID
  @Column({ name: "currency_id", type: "int", nullable: false, comment: "通貨ID" })
  currencyId!: number;
  
  @ManyToOne(() => FamilyEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_settings_family_id" })
  family?: FamilyEntity;
  @ManyToOne(() => CurrencyEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_settings_currency_id" })
  currency?: CurrencyEntity;
}
