import { Entity, Column } from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * レベルサブタイプエンティティ
 */
@Entity("level_table_types")
export class LevelTableTypeEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 255, nullable: false, unique: true, comment: "レベルテーブルサブタイプ名" })
  table_name!: string;

  @Column({ type: "text", nullable: false, comment: "タイプの説明" })
  description!: string;
}
