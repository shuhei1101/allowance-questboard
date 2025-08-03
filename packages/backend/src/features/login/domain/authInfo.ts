export class AuthInfo {
  userId: string
  parentId?: number | null

  constructor(userId: string, parentId?: number | null) {
    this.userId = userId
    this.parentId = parentId ?? null
  }
}
