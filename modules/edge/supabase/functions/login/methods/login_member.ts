import {
    GetMemberByUserIdCommand,
    GetMemberByUserIdResult,
    GetMemberByUserIdUseCase,
} from "../../member/usecase/get_memberid_by_userid_usecase.ts";

export interface LoginMemberParams {
    userId: string;
    since?: string;
}
export async function loginMember(
    params: LoginMemberParams,
): Promise<GetMemberByUserIdResult | null> {
    if (!params.userId) {
        throw new Error("userIdが指定されていません");
    }

    const command = new GetMemberByUserIdCommand(
        params.userId,
        params.since ? new Date(params.since) : undefined,
    );

    return await new GetMemberByUserIdUseCase().execute(command);
}
