export class QuestId {
    constructor(
        private readonly _value: number,
    ) {}
    valueOf(): number {
        return this._value;
    }
    equals(other: QuestId): boolean {
        return this._value == other._value;
    }
}
