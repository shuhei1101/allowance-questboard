import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  DataSource,
} from "typeorm";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { ParentEntity } from "./parentEntity";
import { FamilyEntity } from "../../family/entity/familyEntity";

@Entity("parents_history")
export class ParentHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int", nullable: false, comment: "元テーブルのレコードID" })
  original_id!: number;

  @Column({ type: "int", nullable: false, comment: "ファミリーID" })
  family_id!: number;

  @Column({ type: "varchar", length: 255, nullable: false, comment: "親の名前" })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true, comment: "メールアドレス" })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "電話番号" })
  phone?: string;

  @Column({ type: "date", nullable: true, comment: "生年月日" })
  birth_date?: Date;

  @Column({ type: "varchar", length: 10, nullable: true, comment: "性別" })
  gender?: string;

  @Column({ type: "text", nullable: true, comment: "プロフィール画像URL" })
  profile_image_url?: string;

  @Column({ type: "text", nullable: true, comment: "自己紹介" })
  bio?: string;

  // Relations
  @ManyToOne(() => ParentEntity)
  @JoinColumn({ name: "original_id" })
  parent?: ParentEntity;

  @ManyToOne(() => FamilyEntity)
  @JoinColumn({ name: "family_id" })
  family?: FamilyEntity;

  /**
   * シードデータ
   */
  protected static seedData(): ParentHistoryEntity[] {
    return [
      Object.assign(new ParentHistoryEntity(), {
        original_id: 1,
        family_id: 1,
        name: "田中太郎",
        email: "tanaka.taro@example.com",
        phone: "090-1234-5678",
        birth_date: new Date("1980-05-15"),
        gender: "male",
        profile_image_url: "https://example.com/images/parent1.jpg",
        bio: "二児の父です",
        operation_type: "CREATE" as const,
        operation_timestamp: new Date("2024-01-01T10:00:00Z"),
        operated_by: 1,
      }),
      Object.assign(new ParentHistoryEntity(), {
        original_id: 1,
        family_id: 1,
        name: "田中太郎",
        email: "tanaka.taro@example.com",
        phone: "090-1234-5678",
        birth_date: new Date("1980-05-15"),
        gender: "male",
        profile_image_url: "https://example.com/images/parent1_updated.jpg",
        bio: "二児の父です。家族の時間を大切にしています。",
        operation_type: "UPDATE" as const,
        operation_timestamp: new Date("2024-06-01T15:30:00Z"),
        operated_by: 1,
      }),
    ];
  }
}
