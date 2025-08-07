import { BaseId } from '../value-object/base_id';
import { BaseEnumValue } from './baseEnumValue';
import { EnumValueProtocol } from './enumValueProtocol';
import { AppBaseEntity } from '../../../backend/src/core/entity/appBaseEntity';

/**
 * Enumの値を定義するためのヘルパー型
 * PythonのEnumMixinのTypeScript版
 */
export type EnumValueType<IdType extends BaseId, EntityType extends AppBaseEntity> = 
  BaseEnumValue<IdType> & EnumValueProtocol<IdType, EntityType>;

/**
 * Enumの基本機能を提供するミックスインクラス
 * PythonのEnumMixinクラスのTypeScript版
 */
export class EnumMixin {
  
  /**
   * すべてのEnum値を取得する
   */
  static getValues<T extends BaseEnumValue<any>>(enumClass: any): T[] {
    const values: T[] = [];
    for (const key in enumClass) {
      const value = enumClass[key];
      if (value instanceof BaseEnumValue) {
        values.push(value as T);
      }
    }
    return values;
  }

  /**
   * IDでEnum値を検索する
   */
  static findById<T extends BaseEnumValue<any>>(
    enumClass: any, 
    id: BaseId
  ): T | null {
    const values = this.getValues<T>(enumClass);
    for (const value of values) {
      if (value.id.equals(id)) {
        return value;
      }
    }
    return null;
  }

  /**
   * エンティティリストからEnum値を初期化する
   */
  static initializeFromEntities<T extends EnumValueType<any, any>>(
    enumClass: any,
    entities: AppBaseEntity[]
  ): void {
    const values = this.getValues<T>(enumClass);
    for (const entity of entities) {
      let enumValue: T | null = null;
      for (const v of values) {
        if (v.id.toNumber() === entity.id) {
          enumValue = v;
          break;
        }
      }
      if (enumValue) {
        enumValue.setFromEntity(entity);
      }
    }
  }

  /**
   * Enum値をtRPC/Zod送信用のプレーンオブジェクトに変換する
   */
  static toTrpcFormat<T extends BaseEnumValue<any>>(
    enumClass: any
  ): Array<{
    id: number;
    [key: string]: any;
  }> {
    const values = this.getValues<T>(enumClass);
    return values.map(value => {
      const plainObject: any = {
        id: value.id.toNumber(),
      };

      // 値オブジェクトの全プロパティを取得
      const prototype = Object.getPrototypeOf(value);
      const propertyNames = Object.getOwnPropertyNames(prototype);
      
      for (const propName of propertyNames) {
        if (propName !== 'constructor' && propName.startsWith('get ')) {
          // getterメソッドを実行して値を取得
          const getterName = propName.substring(4); // 'get ' を除去
          try {
            const getter = (value as any)[getterName];
            if (typeof getter !== 'undefined') {
              // 値オブジェクトの場合は.valueで中身を取得
              if (getter && typeof getter.value !== 'undefined') {
                plainObject[getterName] = getter.value;
              } else {
                plainObject[getterName] = getter;
              }
            }
          } catch (error) {
            // getter実行でエラーが出た場合はスキップ
          }
        }
      }

      return plainObject;
    });
  }

  /**
   * tRPC/ZodフォーマットのデータからEnum値を初期化する
   */
  static fromTrpcFormat<T extends EnumValueType<any, any>>(
    enumClass: any,
    trpcData: Array<{
      id: number;
      [key: string]: any;
    }>
  ): void {
    const values = this.getValues<T>(enumClass);
    
    for (const data of trpcData) {
      let enumValue: T | null = null;
      for (const v of values) {
        if (v.id.toNumber() === data.id) {
          enumValue = v;
          break;
        }
      }
      
      if (enumValue) {
        // カスタムsetFromTrpcDataメソッドがあれば使用、なければ汎用的に設定
        if ('setFromTrpcData' in enumValue && typeof (enumValue as any).setFromTrpcData === 'function') {
          (enumValue as any).setFromTrpcData(data);
        } else {
          // 汎用的な設定（プロパティマッピング）
          this.setPropertiesFromPlainObject(enumValue, data);
        }
      }
    }
  }

  /**
   * プレーンオブジェクトから値オブジェクトのプロパティを設定する（汎用的）
   */
  private static setPropertiesFromPlainObject<T extends BaseEnumValue<any>>(
    enumValue: T,
    data: { [key: string]: any }
  ): void {
    // この実装は各Enum値オブジェクトで具体的に実装する必要がある
    // デフォルトでは何もしない（カスタムsetFromTrpcDataメソッドの使用を推奨）
    console.warn('汎用的なプロパティ設定は実装されていません。setFromTrpcDataメソッドを実装してください。');
  }
}
