export class QuestTitle {
    constructor(
        private readonly _value: string,
    ) {}
    toString(): string {
        return this._value;
    }
    equals(other: QuestTitle): boolean {
        return this._value == other._value;
    }
}
