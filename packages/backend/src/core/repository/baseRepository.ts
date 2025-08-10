import { BaseModel } from '../domain/baseModel';
import { BaseDao } from '../dao/baseDao';
import { AppBaseEntity } from '../entity/appBaseEntity';
import { BaseId } from '../../../../shared/core/value-object/base_id';

/**
 * リポジトリの基底クラス
 * PythonのBaseRepositoryクラスのTypeScript版
 */
export abstract class BaseRepository<
  TId extends BaseId, 
  TModel extends BaseModel<TId, TEntity>,
  TEntity extends AppBaseEntity
> {
  /**
   * 現在のエンティティが最新バージョンかどうかを確認する
   * 
   * @param model 確認対象のモデル
   * @param dao モデルのIDが属するDAO
   * @returns 最新バージョンの場合true、古いバージョンの場合false
   * @throws エラー エンティティにIDが設定されていない場合、またはDBに該当エンティティが存在しない場合
   */
  protected async isLatestVersion(
    model: TModel, 
    dao: BaseDao<TEntity>
  ): Promise<boolean> {
    const modelId = model.id.toNumber();

    const currentVersion = await dao.getVersion(modelId);
    if (currentVersion === null || currentVersion === undefined) {
      throw new Error(`${modelId}のエンティティが存在しません。`);
    }

    return model.version.value === currentVersion;
  }
}
