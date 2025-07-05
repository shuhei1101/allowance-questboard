import {
    GetFamilyByUserIdCommand,
    GetFamilyByUserIdResult,
    GetFamilyByUserIdUseCase,
} from "../../family/usecase/get_familyid_by_userid_usecase.ts";

interface LoginFamilyParams {
    userId: string;
    since?: string;
}

export async function loginFamily(
    params: LoginFamilyParams,
): Promise<GetFamilyByUserIdResult | null> {
    if (!params.userId) {
        throw new Error("userIdが指定されていません");
    }

    const command = GetFamilyByUserIdCommand.fromParams(params);

    return await new GetFamilyByUserIdUseCase().execute(command);
}
