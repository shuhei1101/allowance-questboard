import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { IconEntity } from "./iconEntity";
import { IconPlatformEntity } from "./iconPlatformEntity";

@Entity("icon_platform_keys")
@Unique("uq_icon_platform_mapping", ["icon_id", "platform_id"])
export class IconNameByPlatformEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "アイコンID(外部キー)" })
  icon_id!: number;

  @Column({ type: "int", nullable: false, comment: "プラットフォームタイプ(外部キー)" })
  platform_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "アイコン名(例: 'Add', 'Delete')" })
  name!: string;

  // Relations
  @ManyToOne(() => IconEntity)
  @JoinColumn({ name: "icon_id" })
  icon?: IconEntity;

  @ManyToOne(() => IconPlatformEntity)
  @JoinColumn({ name: "platform_id" })
  platform?: IconPlatformEntity;

  /**
   * シードデータ
   */
  protected static seedData(): IconNameByPlatformEntity[] {
    return [
      Object.assign(new IconNameByPlatformEntity(), { icon_id: 1, platform_id: 1, name: "directions_run" }),
      Object.assign(new IconNameByPlatformEntity(), { icon_id: 2, platform_id: 1, name: "directions_rounded" }),
      Object.assign(new IconNameByPlatformEntity(), { icon_id: 3, platform_id: 1, name: "chat_bubble_outline" }),
    ];
  }
}
