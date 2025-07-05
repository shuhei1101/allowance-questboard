export class MemberName {
    constructor(
        private readonly _value: string,
    ) {}
    toString(): string {
        return this._value;
    }
    equals(other: MemberName): boolean {
        return this._value == other._value;
    }
}
