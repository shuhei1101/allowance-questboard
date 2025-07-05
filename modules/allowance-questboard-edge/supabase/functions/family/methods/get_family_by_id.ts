import {
    GetFamilyCommand,
    GetFamilyResult,
    GetFamilyUseCase,
} from "../usecase/get_family_usecase.ts";

interface GetFamilyByIdParams {
    familyId: number;
}

export async function getFamilyById(
    param: GetFamilyByIdParams,
): Promise<GetFamilyResult | null> {
    if (!param.familyId) {
        throw new Error("familyIdが指定されていません");
    }

    const command = new GetFamilyCommand(param.familyId);
    return await new GetFamilyUseCase().execute(command);
}
