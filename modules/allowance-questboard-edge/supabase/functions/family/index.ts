import { getFamilyById } from "./methods/get_family_by_id.ts";
import { BaseController } from "../shared/base_controller.ts";

Deno.serve(async (req) => {
    return await new FamilyController().execute(req);
});

class FamilyController extends BaseController {
    protected async callMethod(method: string, params: any): Promise<any> {
        switch (method) {
            case "getFamilyById":
                return await getFamilyById(params);
            default:
                throw new Error(`Method ${method} not found`);
        }
    }
}
