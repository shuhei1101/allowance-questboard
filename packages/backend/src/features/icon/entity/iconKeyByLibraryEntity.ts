import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseTransactionEntity } from "../../../core/entity/baseTransactionEntity";
import { IconEntity } from "./iconEntity";
import { IconLibraryEntity as IconLibraryEntity } from "./iconLibraryEntity";
import { BaseMasterEntity } from "src/core/entity/baseMasterEntity";

/**
 * アイコンとライブラリのキーエンティティ
 * アイコンIDとライブラリIDの組み合わせで一意に識別される
 * アイコン名はライブラリごとに異なる可能性がある
 */
@Entity("icon_key_by_library")
@Unique("uq_icon_library_mapping", ["icon_id", "library_id"])
export class IconKeyByLibraryEntity extends BaseMasterEntity {
  @PrimaryGeneratedColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "int", nullable: false, comment: "アイコンID(外部キー)" })
  icon_id!: number;
  @Column({ type: "int", nullable: false, comment: "ライブラリID" })
  library_id!: number;
  @Column({ type: "varchar", length: 100, nullable: false, comment: "アイコン名(例: 'Add', 'Delete')" })
  name!: string;
  @Column({ type: "varchar", length: 100, nullable: true, comment: "アイコンの説明" })
  description?: string;

  @ManyToOne(() => IconEntity)
  @JoinColumn({ name: "icon_id" })
  icon?: IconEntity;
  @ManyToOne(() => IconLibraryEntity)
  @JoinColumn({ name: "library_id" })
  library?: IconLibraryEntity;

  /**
   * シードデータ
   */
  protected static seedData(): IconKeyByLibraryEntity[] {
    return [
      Object.assign(new IconKeyByLibraryEntity(), { icon_id: 1, library_id: 1, name: "Camera", description: "カメラアイコン" }),
      Object.assign(new IconKeyByLibraryEntity(), { icon_id: 2, library_id: 1, name: "Heart", description: "ハートアイコン" }),
      Object.assign(new IconKeyByLibraryEntity(), { icon_id: 3, library_id: 1, name: "Star", description: "スターアイコン" }),
    ];
  }
}
