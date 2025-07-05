export class MemberId {
    constructor(
        private readonly _value: number,
    ) {}
    valueOf(): number {
        return this._value;
    }
    equals(other: MemberId): boolean {
        return this._value == other._value;
    }
}
