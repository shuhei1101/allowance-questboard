import z from 'zod';
import { BaseId } from '../value-object/base_id';
import { BaseEntityProtocol } from '@backend/core/entity/appBaseEntity';
import { TranslationEntityProtocol } from '@backend/core/entity/baseTranslationEntity';


/**
 * Enumの値を表す基底抽象クラス
 * @template IdType ID型
 * @template TSchema Zodスキーマ型
 */
abstract class BaseEnumValue<
  IdType extends BaseId,
  TSchema extends z.ZodType = z.ZodType
> {
  protected _id: IdType;

  constructor(id: IdType) {
    this._id = id;
  }

  /**
   * 値オブジェクトのIDを返す
   */
  get id(): IdType {
    return this._id;
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  abstract toZodData(): z.infer<TSchema>;

  /**
   * Zodスキーマから値オブジェクトを初期化
   * @param data Zodスキーマに準拠したデータ
   */
  abstract setFromZodData(data: z.infer<TSchema>): void;
}

/**
 * 翻訳なしのEnumの値を表す基底クラス
 * PythonのEnumValueProtocolのTypeScript版
 * @template IdType ID型
 * @template TEntity エンティティ型（BaseEntityProtocolを実装）
 * @template TSchema Zodスキーマ型
 */
export abstract class BaseSimpleEnumValue<
  IdType extends BaseId,
  TEntity extends BaseEntityProtocol,
  TSchema extends z.ZodType = z.ZodType
> extends BaseEnumValue<IdType, TSchema> {

  /**
   * エンティティから値を設定する
   * PythonのEnumValueProtocol.set_from_entityのTypeScript版
   * @param entity 更新に使用するエンティティ
   */
  abstract setFromEntity(entity: TEntity): void;
}


/**
 * 翻訳ありのEnumの値を表す基底クラス
 * PythonのTranslationEnumValueProtocolのTypeScript版
 * @template IdType ID型
 * @template TEntity エンティティ型
 * @template TTranslationEntity 翻訳エンティティ型
 * @template TSchema Zodスキーマ型
 */
export abstract class BaseTranslationEnumValue<
  IdType extends BaseId,
  TEntity,
  TTranslationEntity,
  TSchema extends z.ZodType = z.ZodType
> extends BaseEnumValue<IdType, TSchema> {

  /**
   * エンティティと翻訳辞書から値を設定する
   * PythonのTranslationEnumValueProtocol.set_from_entityのTypeScript版
   * @param entity 更新に使用するエンティティ
   * @param translationDict 言語IDをキーとした翻訳エンティティのマッピング
   */
  abstract setFromEntity(entity: TEntity, translationDict: Map<number, TTranslationEntity>): void;
}


/**
 * Enumの基底クラス
 * PythonのBaseEnumクラスのTypeScript版
 * 静的メソッドは各サブクラスで実装し、EnumMixinを使用する
 * @template TEnumValue BaseEnumValueのサブクラス
 * @template TId BaseIdのサブクラス
 * @template TSchema Zodスキーマ型
 */
abstract class BaseEnum<
  TEnumValue extends BaseEnumValue<any, any>, 
  TId extends BaseId,
  TSchema extends z.ZodType = z.ZodType
> {
  
  /**
   * すべてのEnumの値を返す
   * 各サブクラスで実装が必要
   */
  protected abstract getAllValues(): TEnumValue[];

  /**
   * IDでEnum値を検索
   * PythonのBaseEnum.from_idメソッドのTypeScript版
   * 見つからない場合はErrorを投げる
   * @param id 検索するID
   * @returns 該当するEnumValue
   * @throws Error 該当するIDが見つからない場合
   */
  getValueById(id: TId): TEnumValue {
    const allValues = this.getAllValues();
    for (const value of allValues) {
      if (value.id.equals(id)) {
        return value;
      }
    }
    throw new Error(`ID ${id.value} is not valid for ${this.constructor.name}`);
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  abstract toZodData(): z.infer<TSchema>;

  /**
   * Zodスキーマから値オブジェクトを初期化
   * @param data Zodスキーマに準拠したデータ
   */
  abstract setFromZodData(data: z.infer<TSchema>): void;
}


/**
 * 翻訳なしのEnumの基底クラス
 * PythonのEnumMixinのTypeScript版
 * @template TEnumValue BaseSimpleEnumValueのサブクラス
 * @template TId BaseIdのサブクラス
 * @template TEntity エンティティ型（BaseEntityProtocolを実装）
 * @template TSchema Zodスキーマ型
 */
export abstract class BaseSimpleEnum<
  TEnumValue extends BaseSimpleEnumValue<any, any, any>,
  TId extends BaseId,
  TEntity extends BaseEntityProtocol,
  TSchema extends z.ZodType = z.ZodType
> extends BaseEnum<TEnumValue, TId, TSchema> {

  /**
   * エンティティリストから列挙型の値を更新する（翻訳テーブルなし）
   * PythonのEnumMixin.update_from_entitiesのTypeScript版
   * @param entities 更新に使用するエンティティのリスト
   */
  updateFromEntities(entities: TEntity[]): void {
    const enumValues = this.getAllValues();
    
    for (const entity of entities) {
      for (const enumValue of enumValues) {
        // エンティティのIDとEnum値のIDが一致するかチェック
        if (enumValue.id.value === entity.id) {
          enumValue.setFromEntity(entity);
          break;
        }
      }
    }
  }
}

/**
 * 翻訳ありのEnumの基底クラス
 * @template TEnumValue BaseTranslationEnumValueのサブクラス
 * @template TId BaseIdのサブクラス
 * @template TEntity エンティティ型（TranslationEntityProtocolを実装）
 * @template TTranslationEntity 翻訳エンティティ型
 * @template TSchema Zodスキーマ型
 */
export abstract class BaseTranslationEnum<
  TEnumValue extends BaseTranslationEnumValue<any, any, any, any>,
  TId extends BaseId,
  TEntity extends TranslationEntityProtocol,
  TTranslationEntity,
  TSchema extends z.ZodType = z.ZodType
> extends BaseEnum<TEnumValue, TId, TSchema> {

  /**
   * エンティティリストから列挙型の値を更新する（翻訳テーブルあり）
   * PythonのTranslationEnumMixin.update_from_entitiesのTypeScript版
   * @param entities 更新に使用するエンティティのリスト
   * @param translations 翻訳データのコレクション
   */
  updateFromEntities(entities: TEntity[], translations: Map<number, Map<number, TTranslationEntity>>): void {
    const enumValues = this.getAllValues();
    
    for (const entity of entities) {
      for (const enumValue of enumValues) {
        // エンティティのIDとEnum値のIDが一致するかチェック
        if (enumValue.id.value === entity.id) {
          const translationDict = translations.get(entity.id) || new Map<number, TTranslationEntity>();
          enumValue.setFromEntity(entity, translationDict);
          break;
        }
      }
    }
  }
}
