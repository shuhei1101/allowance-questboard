import { BaseEnum } from '@shared/core/enum/baseEnum';
import { EnumMixin } from '@shared/core/enum/enumMixin';
import { LanguageId } from '../value-object/languageId';
import { LanguageTypeValue } from '../value-object/languageTypeValue';
import { LanguageEntity } from '@backend/features/language/entity/languageEntity';

/**
 * 言語の種類
 * PythonのLanguageTypeクラスのTypeScript版
 */
export class LanguageType extends BaseEnum {
  static readonly JAPANESE = new LanguageTypeValue(new LanguageId(1));
  static readonly ENGLISH = new LanguageTypeValue(new LanguageId(2));

  /**
   * すべてのEnum値を取得する
   */
  static getValues(): LanguageTypeValue[] {
    return EnumMixin.getValues<LanguageTypeValue>(LanguageType);
  }

  /**
   * IDでEnum値を検索する
   */
  static findById(id: LanguageId): LanguageTypeValue | null {
    return EnumMixin.findById<LanguageTypeValue>(LanguageType, id);
  }

  /**
   * エンティティリストからEnum値を初期化する
   */
  static initializeFromEntities(entities: LanguageEntity[]): void {
    EnumMixin.initializeFromEntities<LanguageTypeValue>(LanguageType, entities);
  }

  /**
   * Enum値をtRPC/Zod送信用のプレーンオブジェクトに変換する
   */
  static toTrpcFormat(): Array<{
    id: number;
    code: string;
    name: string;
    isActive: boolean;
    sortOrder: number;
  }> {
    return EnumMixin.toTrpcFormat<LanguageTypeValue>(LanguageType) as Array<{
      id: number;
      code: string;
      name: string;
      isActive: boolean;
      sortOrder: number;
    }>;
  }

  /**
   * tRPC/ZodフォーマットのデータからEnum値を初期化する
   */
  static fromTrpcFormat(trpcData: Array<{
    id: number;
    code?: string;
    name?: string;
    isActive?: boolean;
    sortOrder?: number;
    [key: string]: any;
  }>): void {
    EnumMixin.fromTrpcFormat<LanguageTypeValue>(LanguageType, trpcData);
  }
}
