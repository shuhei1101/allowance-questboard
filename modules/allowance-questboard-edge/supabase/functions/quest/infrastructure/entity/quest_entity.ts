export class QuestEntity {
    constructor(
        public id: number,
        public title: string,
        public iconCode: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}

    static fromMap(map: Record<string, unknown>): QuestEntity {
        return new QuestEntity(
            map["id"] as number,
            map["quest_title"] as string,
            map["icon_code"] as string,
            new Date(map["created_at"] as string),
            new Date(map["updated_at"] as string),
        );
    }

    toMap(): Record<string, unknown> {
        return {
            id: this.id,
            quest_title: this.title,
            icon_code: this.iconCode,
            created_at: this.createdAt.toISOString(),
            updated_at: this.updatedAt.toISOString(),
        };
    }
}
