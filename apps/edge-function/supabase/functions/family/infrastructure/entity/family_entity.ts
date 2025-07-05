export class FamilyEntity {
    constructor(
        public id: number,
        public userId: string,
        public iconCode: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}

    static fromMap(map: Record<string, unknown>): FamilyEntity {
        return new FamilyEntity(
            map["id"] as number,
            map["user_id"] as string,
            map["icon_code"] as string,
            new Date(map["created_at"] as string),
            new Date(map["updated_at"] as string),
        );
    }

    toMap(): Record<string, unknown> {
        return {
            id: this.id,
            user_id: this.userId,
            icon_code: this.iconCode,
            created_at: this.createdAt.toISOString(),
            updated_at: this.updatedAt.toISOString(),
        };
    }
}
