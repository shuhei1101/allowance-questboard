import { LanguageId } from './languageId';
import { LanguageCode } from './languageCode';
import { LanguageName } from './languageName';
import { LanguageEntity } from '@backend/features/language/entity/languageEntity';
import z from 'zod';
import { BaseSimpleEnumValue } from '@shared/core/enum/baseEnum';

export const LanguageTypeValueSchema = z.object({
  id: z.number(),
  code: z.string().optional(),
  name: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

/**
 * 言語タイプの値オブジェクト集約
 * PythonのLanguageTypeValueクラスのTypeScript
 */
export class LanguageTypeValue extends BaseSimpleEnumValue<LanguageId, LanguageEntity, typeof LanguageTypeValueSchema> {
  private _code: LanguageCode;
  private _name: LanguageName;
  private _isActive: boolean;
  private _sortOrder: number;

  constructor(
    id: LanguageId,
    code: LanguageCode = new LanguageCode('unknown'),
    name: LanguageName = new LanguageName('Unknown'),
    isActive: boolean = false,
    sortOrder: number = 0
  ) {
    super(id);
    this._code = code;
    this._name = name;
    this._isActive = isActive;
    this._sortOrder = sortOrder;
  }

  /**
   * エンティティから値を設定する
   * @param entity 言語エンティティ
   */
  setFromEntity(entity: LanguageEntity): void {
    this._code = new LanguageCode(entity.code);
    this._name = new LanguageName(entity.name);
    this._isActive = entity.is_active;
    this._sortOrder = entity.sort_order;
  }

  /**
   * 言語コードを返す
   */
  get code(): LanguageCode {
    return this._code;
  }

  /**
   * 言語名を返す
   */
  get name(): LanguageName {
    return this._name;
  }

  /**
   * 有効フラグを返す
   */
  get isActive(): boolean {
    return this._isActive;
  }

  /**
   * 表示順序を返す
   */
  get sortOrder(): number {
    return this._sortOrder;
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof LanguageTypeValueSchema> {
    return {
      id: this._id.value,
      code: this._code.value,
      name: this._name.value,
      isActive: this._isActive,
      sortOrder: this._sortOrder,
    };
  }

  /**
   * Zodスキーマから値オブジェクトを初期化する
   * @param data Zodスキーマに準拠したデータ
   */
  setFromZodData(data: z.infer<typeof LanguageTypeValueSchema>): void {
    if (data.id !== this._id.value) {
      throw new Error(`ID mismatch: expected ${this._id.value}, got ${data.id}`);
    }
    this._code = new LanguageCode(data.code || 'unknown');
    this._name = new LanguageName(data.name || 'Unknown');
    this._isActive = data.isActive ?? false;
    this._sortOrder = data.sortOrder ?? 0;
  }
}
