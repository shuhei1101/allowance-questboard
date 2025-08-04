// import { FamilyMemberEntity } from "../../features/family-member/entity/familyMemberEntity";
// import { ScreenEntity } from "../../features/shared/entity/screenEntity";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DataSource,
} from "typeorm";

export abstract class AppBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", default: 1, nullable: false, comment: "バージョン" })
  version!: number;

  @CreateDateColumn({ type: "timestamp with time zone", comment: "作成日時" })
  created_at!: Date;

  @Column({ type: "int", nullable: true, comment: "作成者ID" })
  created_by?: number;

  @Column({ type: "int", nullable: true, comment: "作成元スクリーンID" })
  created_from?: number;

  @UpdateDateColumn({ type: "timestamp with time zone", comment: "更新日時" })
  updated_at!: Date;

  @Column({ type: "int", nullable: true, comment: "更新者ID" })
  updated_by?: number;

  @Column({ type: "int", nullable: true, comment: "更新元スクリーンID" })
  updated_from?: number;

  // リレーションは一旦コメントアウト（循環参照解決のため）
  // @ManyToOne(() => FamilyMemberEntity, { nullable: true, onDelete: "SET NULL" })
  // @JoinColumn({ name: "created_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_app_base_entity_created_by" })
  // created_member?: FamilyMemberEntity;

  // @ManyToOne(() => ScreenEntity, { nullable: true, onDelete: "SET NULL" })
  // @JoinColumn({ name: "created_from", referencedColumnName: "id", foreignKeyConstraintName: "fk_app_base_entity_created_from" })
  // created_screen?: ScreenEntity;

  // @ManyToOne(() => FamilyMemberEntity, { nullable: true, onDelete: "SET NULL" })
  // @JoinColumn({ name: "updated_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_app_base_entity_updated_by" })
  // updated_member?: FamilyMemberEntity;

  // @ManyToOne(() => ScreenEntity, { nullable: true, onDelete: "SET NULL" })
  // @JoinColumn({ name: "updated_from", referencedColumnName: "id", foreignKeyConstraintName: "fk_app_base_entity_updated_from" })
  // updated_screen?: ScreenEntity;

  // ドメインモデルからエンティティ生成（抽象）
  static fromModel(model: any): BaseEntity {
    throw new Error("fromModel must be implemented in subclass");
  }

  // シード用データ取得（抽象）
  protected static seedData(): BaseEntity[] {
    throw new Error("seedData must be implemented in subclass");
  }

  // シード処理（DataSourceを外から受け取る）
  static async seed(dataSource: DataSource): Promise<void> {
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
