import { BaseEnumValue } from './baseEnumValue';
import { BaseId } from '../value-object/base_id';
import { TranslationEnumValueProtocol } from './translationEnumValueProtocol';
import { AppBaseEntity } from '../../../backend/src/core/entity/appBaseEntity';
import { BaseTranslationEntity } from '../../../backend/src/core/entity/baseTranslationEntity';
import { BaseTranslationCollection } from '../entity/baseTranslationCollection';
import { EnumMixin } from './enumMixin';

/**
 * 翻訳対応のEnumの値を定義するためのヘルパー型
 */
export type TranslationEnumValueType<IdType extends BaseId, EntityType extends AppBaseEntity> = 
  BaseEnumValue<IdType> & TranslationEnumValueProtocol<IdType, EntityType>;

/**
 * 翻訳対応のEnumの値を定義するためのミックスインクラス
 * PythonのTranslationEnumMixinクラスのTypeScript版
 */
export class TranslationEnumMixin {
  
  /**
   * 翻訳対応エンティティリストからEnum値を初期化する
   */
  static initializeFromTranslationEntities<T extends TranslationEnumValueType<any, any>>(
    enumClass: any,
    entities: AppBaseEntity[]
  ): void {
    // EnumMixinの初期化メソッドを呼び出す
    EnumMixin.initializeFromEntities<T>(enumClass, entities);
  }

  /**
   * 翻訳対応エンティティリストからEnum値を初期化する（翻訳コレクション使用）
   * PythonのTranslationEnumMixin.update_from_entitiesと同等の機能
   */
  static initializeFromTranslationEntitiesWithCollection<
    T extends TranslationEnumValueType<any, any>,
    TranslationType extends BaseTranslationEntity
  >(
    enumClass: any,
    entities: AppBaseEntity[],
    translations: BaseTranslationCollection<TranslationType>
  ): void {
    const values = EnumMixin.getValues<T>(enumClass);
    
    for (const entity of entities) {
      let enumValue: T | null = null;
      for (const v of values) {
        if (v.id.toNumber() === entity.id) {
          enumValue = v;
          break;
        }
      }
      
      if (enumValue) {
        // 翻訳データを取得
        const translationDict = translations.getBySourceId(entity.id);
        
        // カスタムsetFromEntityWithTranslationメソッドがあれば使用
        if ('setFromEntityWithTranslation' in enumValue && 
            typeof (enumValue as any).setFromEntityWithTranslation === 'function') {
          (enumValue as any).setFromEntityWithTranslation(entity, translationDict);
        } else {
          // 通常のsetFromEntityメソッドを呼び出し
          if ('setFromEntity' in enumValue && 
              typeof (enumValue as any).setFromEntity === 'function') {
            (enumValue as any).setFromEntity(entity);
          }
        }
      }
    }
  }

  /**
   * 指定した言語コードで翻訳されたEnum値を取得する
   */
  static getTranslatedValues<T extends TranslationEnumValueType<any, any>>(
    enumClass: any,
    languageCode: string
  ): Array<{ value: T; translatedText: string }> {
    const values = EnumMixin.getValues<T>(enumClass);
    return values.map(value => ({
      value,
      translatedText: value.getTranslatedText ? value.getTranslatedText(languageCode) : 'N/A'
    }));
  }

  /**
   * 翻訳対応Enum値をtRPC/Zod送信用のプレーンオブジェクトに変換する
   */
  static toTrpcFormat<T extends TranslationEnumValueType<any, any>>(
    enumClass: any,
    languageCode?: string
  ): Array<{
    id: number;
    translatedText?: string;
    [key: string]: any;
  }> {
    const baseFormat = EnumMixin.toTrpcFormat<T>(enumClass);
    const values = EnumMixin.getValues<T>(enumClass);
    
    return baseFormat.map((plainObject, index) => {
      const value = values[index];
      
      // 翻訳テキストを追加
      if (languageCode && value.getTranslatedText) {
        plainObject.translatedText = value.getTranslatedText(languageCode);
      }
      
      return plainObject;
    });
  }

  /**
   * tRPC/Zodフォーマットのデータから翻訳対応Enum値を初期化する
   */
  static fromTrpcFormat<T extends TranslationEnumValueType<any, any>>(
    enumClass: any,
    trpcData: Array<{
      id: number;
      translatedText?: string;
      [key: string]: any;
    }>
  ): void {
    // ベースのEnumMixinの機能を使用
    EnumMixin.fromTrpcFormat<T>(enumClass, trpcData);
    
    // 翻訳固有の処理があれば追加
    const values = EnumMixin.getValues<T>(enumClass);
    
    for (const data of trpcData) {
      let enumValue: T | null = null;
      for (const value of values) {
        if (value.id.toNumber() === data.id) {
          enumValue = value;
          break;
        }
      }
      
      if (enumValue && data.translatedText && 'setTranslatedText' in enumValue) {
        // 翻訳テキストを設定するカスタムメソッドがある場合
        (enumValue as any).setTranslatedText(data.translatedText);
      }
    }
  }
}
