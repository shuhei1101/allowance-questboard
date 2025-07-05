export class UserId {
    constructor(public readonly _value: string) {}
    toString(): string {
        return this._value;
    }
    equals(other: UserId): boolean {
        return this._value === other._value;
    }
}
