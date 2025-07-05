import {
    GetFamilyByUserIdCommand,
    GetFamilyByUserIdResult,
    GetFamilyByUserIdUseCase,
} from "../usecase/get_familyid_by_userid_usecase.ts";

export interface GetFamilyByUserIdParams {
    userId: string;
    since?: string;
}
export async function getFamilyIdByUserId(
    params: GetFamilyByUserIdParams,
): Promise<GetFamilyByUserIdResult | null> {
    if (!params.userId) {
        throw new Error("userIdが指定されていません");
    }

    const command = GetFamilyByUserIdCommand.fromParams(params);

    return await new GetFamilyByUserIdUseCase().execute(command);
}
