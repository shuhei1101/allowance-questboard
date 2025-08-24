import { Entity, Column, PrimaryColumn } from "typeorm";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";

/** スクリーンエンティティ */
@Entity("screens")
export class ScreenEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", length: 20, nullable: false, unique: true, comment: "スクリーンコード" })
  code!: string;
  @Column({ type: "text", nullable: true, comment: "スクリーンの説明" })
  description?: string;

  /** シード用データ取得 */
  protected static seedData(): ScreenEntity[] {
    return [
      Object.assign(new ScreenEntity(), { id: 1, code: "HOME", description: "ホーム画面" }),
      Object.assign(new ScreenEntity(), { id: 2, code: "QUEST_LIST", description: "クエスト一覧" }),
      Object.assign(new ScreenEntity(), { id: 3, code: "QUEST_DETAIL", description: "クエスト詳細" }),
    ];
  }
}
