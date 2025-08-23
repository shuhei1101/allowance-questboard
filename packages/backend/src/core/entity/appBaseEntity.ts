import {
  BaseEntity,
  Column,
  DataSource,
  Repository,
} from "typeorm";

export interface BaseEntityProtocol {
  id: number;
  version: number;
}

/**
 * アプリケーション全体の基底エンティティクラス
 * 共通的なメソッドのみを提供
 */
export abstract class AppBaseEntity extends BaseEntity implements BaseEntityProtocol {
  // 抽象的なIDプロパティ（継承先で具体的に実装）
  abstract id: number;
  @Column({ type: "int", default: 1, nullable: false, comment: "バージョン" })
  version!: number;

  // シード用データ取得（抽象）
  protected static seedData(): AppBaseEntity[] {
    throw new Error("seedData must be implemented in subclass");
  }

  /**
   * シードデータを投入する
   */
  static async seed(dataSource: DataSource): Promise<void> {
    const repo: Repository<any> = dataSource.getRepository(this as any);
    const count = await repo.count();
    
    if (count > 0) {
      console.log(`${this.name} データはすでに存在します`);
      return;
    }

    const seeds = (this as any).seedData();
    await repo.save(seeds);
    console.log(`${this.name} の初期データを投入しました`);
  }
}
