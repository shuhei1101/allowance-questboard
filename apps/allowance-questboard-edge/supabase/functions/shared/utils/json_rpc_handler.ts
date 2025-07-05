interface JsonRpcRequest<T = any> {
    jsonrpc: "2.0";
    method: string;
    params: T;
    id: number | string;
}

interface JsonRpcResponse<T = any> {
    jsonrpc: "2.0";
    result?: T;
    error?: {
        code: number;
        message: string;
        data?: any;
    };
    id: number | string | null;
}

export class JsonRpcHandler<TParams = any, TResult = any> {
    request: JsonRpcRequest<TParams>;

    constructor(rawBody: string) {
        const req = JSON.parse(rawBody) as JsonRpcRequest<TParams>;
        if (req.jsonrpc !== "2.0") throw new Error("Invalid JSON-RPC version");
        this.request = req;
    }

    buildResponse(result: TResult): JsonRpcResponse<TResult> {
        return {
            jsonrpc: "2.0",
            result,
            id: this.request.id,
        };
    }

    buildErrorResponse(e: unknown): JsonRpcResponse<null> {
        // デフォルトエラーコード
        let code = -32603; // 内部エラー（Internal error）
        let message = "Unknown error";
        let data: any = undefined;

        if (e instanceof Error) {
            message = e.message;
            // もし Error に code プロパティがあればそれを使う（例外的に）
            if (typeof (e as any).code === "number") {
                code = (e as any).code;
            }
        } else if (typeof e === "object" && e !== null) {
            message = JSON.stringify(e);
            data = e;
        } else {
            message = String(e);
        }

        return {
            jsonrpc: "2.0",
            error: { code, message, data },
            id: this.request.id,
        };
    }
}
