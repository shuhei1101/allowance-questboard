export class Eparser {
  public static parse(error: unknown): string {
    if (error instanceof Error) {
      const parsed = this._parseError(error);
      return this._stringify(parsed);
    }

    // 非Errorの場合はJSON文字列化、失敗したらtoString()
    try {
      return JSON.stringify({ message: error });
    } catch {
      return String(error);
    }
  }

  private static _stringify(data: any): string {
    try {
      return JSON.stringify(data, null, 2); // 整形されたログにも使いやすい形式
    } catch {
      return "[Unserializable error object]";
    }
  }

  private static _parseError(error: Error): any {
    const lines = (error.stack || "").split("\n").map((line) => line.trim());
    const firstLine = lines[0] ?? "";
    const errorMatch = firstLine.match(/^(\w+):\s(.+)$/);

    const errorName = errorMatch ? errorMatch[1] : "Error";
    const message = errorMatch ? errorMatch[2] : error.message;

    const stackLines = lines.slice(1).filter((line) => line.startsWith("at "));

    let sourceFile, lineNum, colNum;
    if (stackLines.length > 0) {
      const match = stackLines[0].match(/at .* \((.*):(\d+):(\d+)\)$/);
      if (match) {
        sourceFile = match[1];
        lineNum = parseInt(match[2], 10);
        colNum = parseInt(match[3], 10);
      }
    }

    const result: any = {
      errorName,
      message,
      sourceFile,
      line: lineNum,
      column: colNum,
      stack: stackLines,
    };

    // 再帰的に cause を解析
    if ((error as any).cause instanceof Error) {
      result.causedBy = this._parseError((error as any).cause);
    }

    return result;
  }
}

// 動作確認用
function throwErrorWithCause() {
  try {
    throw new Error("Original error message");
  } catch (originalError) {
    const errorWithCause = new Error("Outer error message", {
      cause: originalError,
    });
    throw errorWithCause;
  }
}

if (import.meta.main) {
  try {
    throwErrorWithCause();
  } catch (error) {
    const converted = Eparser.parse(error);
    console.log("Converted Error:", converted);
  }
}
