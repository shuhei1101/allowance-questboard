import { Entity, Column, PrimaryColumn } from "typeorm";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";

/** クエストサブクラスタイプエンティティ */
@Entity("quest_types")
export class QuestTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "table_name", type: "varchar", length: 20, nullable: false, unique: true, comment: "サブクラスタイプテーブル名" })
  tableName!: string;
  @Column({ name: "description", type: "text", nullable: false, comment: "タイプの説明" })
  description!: string;

  /** シード用データ取得 */
  protected static seedData(): QuestTypeEntity[] {
    return [
      Object.assign(new QuestTypeEntity(), { id: 1, tableName: "template_quests", description: "テンプレートクエストテーブル" }),
      Object.assign(new QuestTypeEntity(), { id: 2, tableName: "shared_quests", description: "共有クエストテーブル" }),
      Object.assign(new QuestTypeEntity(), { id: 3, tableName: "family_quests", description: "家族クエストテーブル" }),
    ];
  }
}
