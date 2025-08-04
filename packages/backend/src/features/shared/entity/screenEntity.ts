import { Entity, Column } from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * スクリーンエンティティ
 */
@Entity("screens")
export class ScreenEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 20, nullable: false, unique: true, comment: "スクリーンコード" })
  code!: string;

  @Column({ type: "text", nullable: true, comment: "スクリーンの説明" })
  description?: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): ScreenEntity[] {
    return [
      Object.assign(new ScreenEntity(), { code: "HOME", description: "ホーム画面" }),
      Object.assign(new ScreenEntity(), { code: "QUEST_LIST", description: "クエスト一覧" }),
      Object.assign(new ScreenEntity(), { code: "QUEST_DETAIL", description: "クエスト詳細" }),
    ];
  }
}
