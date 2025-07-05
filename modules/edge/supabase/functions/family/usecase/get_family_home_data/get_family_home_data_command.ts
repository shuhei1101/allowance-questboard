export class GetFamilyHomeDataCommand {
    constructor(
        public readonly familyId: number,
    ) {}
    static fromParams(params: { familyId: number }) {
        return new GetFamilyHomeDataCommand(params.familyId);
    }
}
