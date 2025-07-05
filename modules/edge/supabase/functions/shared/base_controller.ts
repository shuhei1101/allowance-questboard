import { AppLogger } from "./app_logger.ts";
import { setupApp } from "./setup/app_setup.ts";
import { Eparser } from "./utils/e_parser.ts";
import { JsonRpcHandler } from "./utils/json_rpc_handler.ts";

export abstract class BaseController {
    async execute(req: Request): Promise<Response> {
        setupApp();

        const raw = await req.text();
        const handler = new JsonRpcHandler(raw);
        try {
            AppLogger.I.debug(
                `${handler.request.method}メソッドを実行します`,
            );
            const result = await this.callMethod(
                handler.request.method,
                handler.request.params,
            );
            AppLogger.I.debug(
                `Method: ${handler.request.method}, Params: ${
                    JSON.stringify(handler.request.params)
                }, Result: ${JSON.stringify(result)}`,
            );
            return new Response(JSON.stringify(handler.buildResponse(result)), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (e) {
            const errorResponse = handler.buildErrorResponse(e);
            AppLogger.I.error(Eparser.parse(e));
            return new Response(JSON.stringify(errorResponse), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
    }

    protected abstract callMethod(method: string, params: any): Promise<any>;
}
