import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { FamilyMember } from "@backend/features/family-member/entity/familyMember";
import { Screen } from "@backend/shared/entity/screen";

export abstract class AppBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", default: 1, nullable: false, comment: "バージョン" })
  version!: number;

  @CreateDateColumn({ type: "timestamp with time zone", comment: "作成日時" })
  created_at!: Date;

  @ManyToOne(() => FamilyMember, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_created_by" })
  created_by?: FamilyMember;

  @ManyToOne(() => Screen, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "created_from", referencedColumnName: "id", foreignKeyConstraintName: "fk_created_from" })
  created_from?: Screen;

  @UpdateDateColumn({ type: "timestamp with time zone", comment: "更新日時" })
  updated_at!: Date;

  @ManyToOne(() => FamilyMember, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "updated_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_updated_by" })
  updated_by?: FamilyMember;

  @ManyToOne(() => Screen, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "updated_from", referencedColumnName: "id", foreignKeyConstraintName: "fk_updated_from" })
  updated_from?: Screen;

  // ドメインモデルからエンティティ生成（抽象）
  static fromModel(model: any): BaseEntity {
    throw new Error("fromModel must be implemented in subclass");
  }

  // シード用データ取得（抽象）
  protected static seedData(): BaseEntity[] {
    throw new Error("seedData must be implemented in subclass");
  }

  // シード処理
  static async seed(): Promise<void> {
    const dataSource = await import("@backend/core/config/dataSource").then(mod => mod.AppDataSource);
    await dataSource.initialize();

    const repo = dataSource.getRepository(this as any);
    const count = await repo.count();
    if (count > 0) {
      console.log(`${this.name} データはすでに存在します`);
      return;
    }

    const seeds = this.seedData();
    await repo.save(seeds);
    console.log(`${this.name} の初期データを投入しました`);
  }
}
