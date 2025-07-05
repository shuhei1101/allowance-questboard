import { assert } from "node:console";
import { JsonRpcHandler } from "../../../shared/utils/json_rpc_handler.ts";

Deno.test(async function constructor(t) {
    await t.step({
        name: "正常に初期化できること",
        async fn() {
            const handler = new JsonRpcHandler(
                JSON.stringify({
                    jsonrpc: "2.0",
                    method: "testMethod",
                    params: { key: "value" },
                    id: 1,
                }),
            );
            assert(handler.request.jsonrpc === "2.0");
        },
    });
});
