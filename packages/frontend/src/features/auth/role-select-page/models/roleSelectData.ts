import { BaseModel } from '@backend/core/models/baseModel';
import { FamilyName } from '@backend/features/family/value-object/familyName';
import { BaseId } from '@backend/core/value-object/base_id';

/** ロール選択画面データモデル
 *
 * loginRouter.loginのレスポンスから得られるデータを管理 */
export class RoleSelectData extends BaseModel {
  /** 家族メンバーID */
  public readonly familyMemberId?: BaseId;
  /** 家族ID */
  public readonly familyId?: BaseId;
  /** 家族名 */
  public readonly familyName?: FamilyName;
  /** 親ID */
  public readonly parentId?: BaseId;
  /** 子供ID */
  public readonly childId?: BaseId;

  constructor(params: {
    familyMemberId?: BaseId;
    familyId?: BaseId;
    familyName?: FamilyName;
    parentId?: BaseId;
    childId?: BaseId;
  }) {
    super();
    this.familyMemberId = params.familyMemberId;
    this.familyId = params.familyId;
    this.familyName = params.familyName;
    this.parentId = params.parentId;
    this.childId = params.childId;
  }

  /** モデルの値を検証 */
  protected validate(): void {
    // バリデーションなし（undefinedが許可されるため）
  }

  /** 家族情報が存在するか判定 */
  public hasFamily(): boolean {
    return this.familyId !== undefined && this.familyName !== undefined;
  }

  /** 親情報が存在するか判定 */
  public hasParent(): boolean {
    return this.parentId !== undefined;
  }

  /** 子供情報が存在するか判定 */
  public hasChild(): boolean {
    return this.childId !== undefined;
  }

  /** 家族作成ボタンを表示するか判定 */
  public shouldShowFamilyCreateButton(): boolean {
    return !this.hasFamily();
  }

  /** 親ログインボタンを表示するか判定 */
  public shouldShowParentLoginButton(): boolean {
    return this.hasParent();
  }

  /** 親ユーザ作成ボタンを表示するか判定 */
  public shouldShowParentCreateButton(): boolean {
    return this.hasFamily() && !this.hasParent();
  }

  /** 子ログインボタンを表示するか判定 */
  public shouldShowChildLoginButton(): boolean {
    return this.hasChild();
  }

  /** 子供ユーザ作成ボタンを表示するか判定 */
  public shouldShowChildCreateButton(): boolean {
    return !this.hasChild();
  }

  /** 家族名の文字列表現を取得 */
  public getFamilyNameString(): string {
    return this.familyName?.value ?? '';
  }

  /** 初期状態のデータを作成 */
  public static initialize(): RoleSelectData {
    return new RoleSelectData({});
  }

  /** loginRouterのレスポンスからデータを作成 */
  public static fromLoginResponse(response: {
    familyMemberId?: number;
    familyId?: number;
    familyName?: string;
    parentId?: number;
    childId?: number;
  }): RoleSelectData {
    return new RoleSelectData({
      familyMemberId: response.familyMemberId ? new BaseId(response.familyMemberId) : undefined,
      familyId: response.familyId ? new BaseId(response.familyId) : undefined,
      familyName: response.familyName ? new FamilyName(response.familyName) : undefined,
      parentId: response.parentId ? new BaseId(response.parentId) : undefined,
      childId: response.childId ? new BaseId(response.childId) : undefined,
    });
  }
}
