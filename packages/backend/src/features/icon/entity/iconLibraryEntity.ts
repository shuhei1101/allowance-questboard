import {
  Entity,
  Column,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";

/**
 * アイコンライブラリエンティティ
 * アイコンが使用されるライブラリを表す
 */
@Entity("icon_libraries")
export class IconLibraryEntity extends AppBaseEntity {
  @Column({ name: "varchar", length: 50, nullable: false, unique: true, comment: "ライブラリ名(一意制約)" })
  name!: string;

  /**
   * シードデータ
   */
  protected static seedData(): IconLibraryEntity[] {
    return [
      Object.assign(new IconLibraryEntity(), { name: "Lucide React", }),
    ];
  }
}
