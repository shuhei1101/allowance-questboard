// エラー解析ヘルパー関数のテスト
const mockError = new Error('Component render error');
mockError.stack = `Error: Component render error
    at ErrorComponent (/path/to/ErrorComponent.tsx:8:11)
    at renderComponent (/path/to/renderer.js:123:45)
    at App (/path/to/App.tsx:45:22)`;

const mockErrorInfo = {
  componentStack: `
    at ErrorComponent (ErrorComponent.tsx:8:0)
    at App (App.tsx:45:0)
    at ThemeProvider (ThemeProvider.tsx:23:0)
    at AppInitializer (AppInitializer.tsx:34:0)
  `
};

console.log('React Error Analysis:');
console.log('Error stack:', mockError.stack);
console.log('Component stack:', mockErrorInfo.componentStack);

// ファイル名と行数を抽出する関数をテスト
function extractFileInfo(stack) {
  const stackLines = stack.split('\n');
  const fileMatches = [];
  
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
    }
    
    // パターン2: at file.tsx:line:column
    const match2 = line.match(/at\s+(.+?):(\d+):(\d+)/);
    if (match2 && !match1) {
      fileMatches.push({
        file: match2[1],
        line: match2[2],
        column: match2[3]
      });
    }
  });
  
  return fileMatches;
}

console.log('Extracted from error.stack:', extractFileInfo(mockError.stack));
console.log('Extracted from componentStack:', extractFileInfo(mockErrorInfo.componentStack));
