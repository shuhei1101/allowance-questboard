import { UserId } from '@shared/features/auth/value-object/userId'
import { ChildId } from '@shared/features/child/value-object/childId'
import { ParentId } from '@shared/features/parent/value-object/parentId'

/**
 * ログインレスポンス
 */
export class LoginResponse {
  constructor(
    public userId: UserId,
    public parentId?: ParentId | null,
    public childId?: ChildId | null,
  ) {}
}
