import { BaseModel } from '@backend/core/models/baseModel';
import { FamilyName } from '@backend/features/family/value-object/familyName';
import { FamilyMemberId } from '../../../../../../backend/src/features/family-member/value-object/familyMemberId';
import { FamilyId } from '../../../../../../backend/src/features/family/value-object/familyId';
import { ParentId } from '../../../../../../backend/src/features/parent/value-object/parentId';
import { ChildId } from '../../../../../../backend/src/features/child/value-object/childId';

/** ロール選択画面データモデル
 *
 * loginRouter.loginのレスポンスから得られるデータを管理 */
export class RoleSelectData extends BaseModel {
  /** 家族メンバーID */
  public readonly familyMemberId?: FamilyMemberId;
  /** 家族ID */
  public readonly familyId?: FamilyId;
  /** 家族名 */
  public readonly familyName?: FamilyName;
  /** 親ID */
  public readonly parentId?: ParentId;
  /** 子供ID */
  public readonly childId?: ChildId;

  constructor(params: {
    familyMemberId?: FamilyMemberId;
    familyId?: FamilyId;
    familyName?: FamilyName;
    parentId?: ParentId;
    childId?: ChildId;
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
      familyMemberId: response.familyMemberId ? new FamilyMemberId(response.familyMemberId) : undefined,
      familyId: response.familyId ? new FamilyId(response.familyId) : undefined,
      familyName: response.familyName ? new FamilyName(response.familyName) : undefined,
      parentId: response.parentId ? new ParentId(response.parentId) : undefined,
      childId: response.childId ? new ChildId(response.childId) : undefined,
    });
  }
}
