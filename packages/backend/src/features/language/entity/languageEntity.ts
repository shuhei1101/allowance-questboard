import {
  Entity,
  Column,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * 言語マスタエンティティ
 */
@Entity("languages")
export class LanguageEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 10, nullable: false, unique: true, comment: "言語コード(選択肢表示用)" })
  code!: string;
  @Column({ type: "varchar", length: 100, nullable: false, comment: "言語名(説明用)" })
  name!: string;
  @Column({ type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  is_active!: boolean;
  @Column({ type: "int", nullable: false, default: 0, comment: "表示順序" })
  sort_order!: number;

  /**
   * シード用データ取得
   */
  protected static seedData(): LanguageEntity[] {
    return [
      Object.assign(new LanguageEntity(), { code: "ja", name: "Japanese", is_active: true, sort_order: 1 }),
      Object.assign(new LanguageEntity(), { code: "en", name: "English", is_active: true, sort_order: 2 }),
    ];
  }
}
