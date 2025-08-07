import { BaseEnumValue } from '@shared/core/enum/baseEnumValue';
import { LanguageId } from './languageId';
import { LanguageCode } from './languageCode';
import { LanguageName } from './languageName';
import { EnumValueProtocol } from '@shared/core/enum/enumValueProtocol';
import { LanguageEntity } from '@backend/features/language/entity/languageEntity';

/**
 * 言語タイプの値オブジェクト集約
 * PythonのLanguageTypeValueクラスのTypeScript版
 */
export class LanguageTypeValue extends BaseEnumValue<LanguageId> implements EnumValueProtocol<LanguageId, LanguageEntity> {
  private _code: LanguageCode;
  private _name: LanguageName;
  private _isActive: boolean;
  private _sortOrder: number;

  constructor(
    id: LanguageId,
    code: LanguageCode = new LanguageCode(''),
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
   * tRPC/Zodフォーマットのデータから値を設定する
   * @param data プレーンオブジェクトデータ
   */
  setFromTrpcData(data: {
    id: number;
    code?: string;
    name?: string;
    isActive?: boolean;
    sortOrder?: number;
    [key: string]: any;
  }): void {
    if (data.code !== undefined) {
      this._code = new LanguageCode(data.code);
    }
    if (data.name !== undefined) {
      this._name = new LanguageName(data.name);
    }
    if (data.isActive !== undefined) {
      this._isActive = data.isActive;
    }
    if (data.sortOrder !== undefined) {
      this._sortOrder = data.sortOrder;
    }
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
}
