import { loginFamily } from "./methods/login_family.ts";
import { loginMember } from "./methods/login_member.ts";
import { BaseController } from "../shared/base_controller.ts";

Deno.serve(async (req) => {
    return await new LoginController().execute(req);
});

class LoginController extends BaseController {
    protected async callMethod(method: string, params: any): Promise<any> {
        switch (method) {
            case "loginFamily":
                return await loginFamily(params);
            case "loginMember":
                return await loginMember(params);
            default:
                throw new Error(`${method}メソッドは存在しません`);
        }
    }
}
