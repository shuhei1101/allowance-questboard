/**
 * エラー解析ユーティリティ
 */

export interface FileLocationInfo {
  component?: string;
  file: string;
  line: string;
  column: string;
}

/**
 * エラースタックからファイル名と行数を抽出する
 * @param stack - エラースタック文字列
 * @returns ファイル情報の配列
 */
export const extractFileInfo = (stack: string): FileLocationInfo[] => {
  const stackLines = stack.split('\n');
  const fileMatches: FileLocationInfo[] = [];
  
  stackLines.forEach(line => {
    // パターン1: at Component (file.tsx:line:column)
    const match1 = line.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/);
    if (match1) {
      fileMatches.push({
        component: match1[1],
        file: match1[2],
        line: match1[3],
        column: match1[4]
      });
      return;
    }
    
    // パターン2: at file.tsx:line:column
    const match2 = line.match(/at\s+(.+?):(\d+):(\d+)/);
    if (match2) {
      fileMatches.push({
        file: match2[1],
        line: match2[2],
        column: match2[3]
      });
    }
  });
  
  return fileMatches;
};

/**
 * エラー情報を詳細に解析する
 * @param error - エラーオブジェクト
 * @param errorInfo - React ErrorInfoオブジェクト
 * @returns 解析されたエラー情報
 */
export const analyzeError = (error: Error, errorInfo: React.ErrorInfo) => {
  const errorStackInfo = error.stack ? extractFileInfo(error.stack) : [];
  const componentStackInfo = errorInfo.componentStack ? extractFileInfo(errorInfo.componentStack) : [];

  return {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    errorInfo: {
      componentStack: errorInfo.componentStack,
    },
    analysisInfo: {
      errorStackInfo: errorStackInfo.slice(0, 3), // 上位3件のみ
      componentStackInfo: componentStackInfo.slice(0, 5), // 上位5件のみ
      primaryErrorLocation: errorStackInfo[0] || componentStackInfo[0],
    },
    timestamp: new Date().toISOString(),
  };
};
