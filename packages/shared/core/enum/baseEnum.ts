import { BaseId } from '../value-object/base_id';

/**
 * Enumの基底クラス
 * PythonのBaseEnumクラスのTypeScript版
 * 静的メソッドは各サブクラスで実装し、EnumMixinを使用する
 */
export abstract class BaseEnum {
  static getValues(enumClass: any): any {
    Error('getValues method must be implemented in the subclass');
  }
  static findById(enumClass: any, id: BaseId): any {
    Error('findById method must be implemented in the subclass');
  }
  static fromEntities(enumClass: any, entities: any[]): void {
    Error('initializeFromEntities method must be implemented in the subclass');
  }
}
