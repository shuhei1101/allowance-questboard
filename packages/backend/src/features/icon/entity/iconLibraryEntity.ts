import {
  Entity,
  Column,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "../../../core/entity/baseMasterEntity";

/**
 * アイコンライブラリエンティティ
 * アイコンが使用されるライブラリを表す
 */
@Entity("icon_libraries")
export class IconLibraryEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "varchar", length: 50, nullable: false, unique: true, comment: "ライブラリ名(一意制約)" })
  name!: string;

  /**
   * シードデータ
   */
  protected static seedData(): IconLibraryEntity[] {
    return [
      Object.assign(new IconLibraryEntity(), { id: 1, name: "Lucide React", }),
    ];
  }
}
