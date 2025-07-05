export class FamilyId {
    constructor(
        private readonly _value: number,
    ) {}
    valueOf(): number {
        return this._value;
    }
    equals(other: FamilyId): boolean {
        return this._value == other._value;
    }
}
