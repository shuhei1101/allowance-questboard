import { AppBaseEntity } from '@backend/core/entity/appBaseEntity';
import { BaseId } from '../value-object/base_id';

/**
 * 翻訳対応のEnumの値が実装すべきメソッドを定義するインターフェース
 * PythonのTranslationEnumValueProtocolのTypeScript版
 */
export interface TranslationEnumValueProtocol<IdType extends BaseId, EntityType extends AppBaseEntity> {
  /**
   * 値オブジェクトのIDを返す
   */
  readonly id: IdType;

  /**
   * エンティティから値を設定する
   * @param entity 翻訳対応エンティティ
   */
  setFromEntity(entity: EntityType): void;

  /**
   * エンティティから値を設定し、翻訳辞書も設定する
   * @param entity 翻訳対応エンティティ
   * @param translations 翻訳辞書（language_id -> 翻訳テキスト）
   */
  setFromEntityWithTranslation?(entity: EntityType, translations: Record<string, string>): void;

  /**
   * 翻訳されたテキストを取得する
   * @param languageCode 言語コード
   */
  getTranslatedText?(languageCode: string): string;
}
