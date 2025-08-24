import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";
import {
  Entity,
  Column,
  PrimaryColumn,
} from "typeorm";

/** 言語マスタエンティティ */
@Entity("languages")
export class LanguageEntity extends BaseMasterEntity {
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "code", type: "varchar", length: 10, nullable: false, unique: true, comment: "言語コード(選択肢表示用)" })
  code!: string;
  @Column({ name: "name", type: "varchar", length: 100, nullable: false, comment: "言語名(説明用)" })
  name!: string;
  @Column({ name: "is_active", type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  isActive!: boolean;
  @Column({ name: "sort_order", type: "int", nullable: false, default: 0, comment: "表示順序" })
  sortOrder!: number;

  /** シード用データ取得 */
  protected static seedData(): LanguageEntity[] {
    return [
      Object.assign(new LanguageEntity(), { id: 1, code: "ja", name: "Japanese", isActive: true, sortOrder: 1 }),
      Object.assign(new LanguageEntity(), { id: 2, code: "en", name: "English", isActive: true, sortOrder: 2 }),
    ];
  }
}
