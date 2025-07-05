import {
    GetFamilyHomeDataUseCase,
} from "../usecase/get_family_home_data/get_family_home_data.ts";
import { GetFamilyHomeDataCommand } from "../usecase/get_family_home_data/get_family_home_data_command.ts";

/// ログイン時の家族に関する情報をすべて取得
export interface GetHomeDataParams {
    familyId: number;
}

export async function getHomeData(params: GetHomeDataParams) {
    const command = GetFamilyHomeDataCommand.fromParams(params);
    return await new GetFamilyHomeDataUseCase().execute(command);
}
