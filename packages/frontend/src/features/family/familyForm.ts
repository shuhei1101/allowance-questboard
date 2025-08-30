import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Birthday } from '@backend/features/shared/value-object/birthday';
import { BaseModel } from '@backend/core/models/baseModel';
import { Icon } from '@backend/features/icon/domain/icon';



/** 家族登録フォームモデル */
export class FamilyForm extends BaseModel {
  public readonly name: FamilyName;
  public readonly iconId?: IconId;
  public readonly introduction: FamilyIntroduction;
  public readonly parents?: ParentForm[];

  constructor(params: { 
    parentForm?: ParentForm[];
  }) {
    super();
    this.parentForm = params.parentForm;
    this.runValidate();
  }

  /**
   * モデルの値を検証する
   */
  protected validate(): void {
    this.parentForm.validate,
    this.validator.valuesEmpty(
      // オブジェクトを登録
    )
  }

  appendParent(parent: ParentForm){
    this.parents.append(parent);
  }

  /**
   * 初期状態のフォームを作成
   * @returns 初期状態のParentFormインスタンス
   */
  public static initialize(): ParentForm {
    return new ParentForm({
      parentForm: undefined,
    });
  }
}