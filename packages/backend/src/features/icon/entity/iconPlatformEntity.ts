import {
  Entity,
  Column,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";

@Entity("icon_platforms")
export class IconPlatformEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 50, nullable: false, unique: true, comment: "プラットフォーム名(一意制約)" })
  type!: string;

  /**
   * シードデータ
   */
  protected static seedData(): IconPlatformEntity[] {
    return [
      Object.assign(new IconPlatformEntity(), {
        type: "Flutter",
      }),
    ];
  }
}
