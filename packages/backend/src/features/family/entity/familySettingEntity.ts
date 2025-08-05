import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { FamilyEntity } from "./familyEntity";
import { CurrencyEntity } from "@backend/features/shared/entity/currencyEntity";

@Entity("family_settings")
export class FamilySettingEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "家族ID" })
  family_id!: number;
  // 通貨ID
  @Column({ type: "int", nullable: false, comment: "通貨ID" })
  currency_id!: number;
  
  @ManyToOne(() => FamilyEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_settings_family_id" })
  family?: FamilyEntity;
  @ManyToOne(() => CurrencyEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_settings_currency_id" })
  currency?: CurrencyEntity;
}
