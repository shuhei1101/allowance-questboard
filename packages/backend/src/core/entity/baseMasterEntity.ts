import { AppBaseEntity } from "./appBaseEntity";

/**
 * マスタテーブル用の基底エンティティクラス
 * IDは各実装側で@PrimaryColumnまたは@PrimaryGeneratedColumnを選択
 */
export abstract class BaseMasterEntity extends AppBaseEntity {}
