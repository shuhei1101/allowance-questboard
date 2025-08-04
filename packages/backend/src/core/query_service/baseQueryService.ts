/**
 * クエリサービスの基底クラス
 */
export abstract class BaseQueryService {
  protected session: any; // TypeORM EntityManager or Session

  constructor(session: any) {
    this.session = session;
  }
}
