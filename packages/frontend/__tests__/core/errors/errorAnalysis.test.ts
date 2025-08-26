import React from 'react';
import { extractFileInfo, analyzeError, FileLocationInfo } from '@/core/errors/errorAnalysis';

describe('errorAnalysis', () => {
  describe('extractFileInfo', () => {
    it('コンポーネント名付きスタック情報を正しく解析すること', () => {
      // 準備
      const stack = `Error: テストエラー
    at ErrorComponent (/path/to/ErrorComponent.tsx:8:11)
    at renderComponent (/path/to/renderer.js:123:45)
    at App (/path/to/App.tsx:45:22)`;

      // 実行
      const result = extractFileInfo(stack);

      // 検証
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        component: 'ErrorComponent',
        file: '/path/to/ErrorComponent.tsx',
        line: '8',
        column: '11'
      });
      expect(result[1]).toEqual({
        component: 'renderComponent',
        file: '/path/to/renderer.js',
        line: '123',
        column: '45'
      });
      expect(result[2]).toEqual({
        component: 'App',
        file: '/path/to/App.tsx',
        line: '45',
        column: '22'
      });
    });

    it('ファイルパス直接指定のスタック情報を正しく解析すること', () => {
      // 準備
      const stack = `Error: テストエラー
    at /path/to/module.js:15:20
    at /path/to/another.js:30:40`;

      // 実行
      const result = extractFileInfo(stack);

      // 検証
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        file: '/path/to/module.js',
        line: '15',
        column: '20'
      });
      expect(result[1]).toEqual({
        file: '/path/to/another.js',
        line: '30',
        column: '40'
      });
    });

    it('React ComponentStackを正しく解析すること', () => {
      // 準備
      const componentStack = `
    at ErrorComponent (ErrorComponent.tsx:8:0)
    at App (App.tsx:45:0)
    at ThemeProvider (ThemeProvider.tsx:23:0)
    at AppInitializer (AppInitializer.tsx:34:0)
      `;

      // 実行
      const result = extractFileInfo(componentStack);

      // 検証
      expect(result).toHaveLength(4);
      expect(result[0]).toEqual({
        component: 'ErrorComponent',
        file: 'ErrorComponent.tsx',
        line: '8',
        column: '0'
      });
      expect(result[3]).toEqual({
        component: 'AppInitializer',
        file: 'AppInitializer.tsx',
        line: '34',
        column: '0'
      });
    });

    it('空文字列の場合は空配列を返すこと', () => {
      // 実行
      const result = extractFileInfo('');

      // 検証
      expect(result).toEqual([]);
    });

    it('マッチしない形式の場合は空配列を返すこと', () => {
      // 準備
      const stack = `Error: テストエラー
    マッチしない行1
    マッチしない行2`;

      // 実行
      const result = extractFileInfo(stack);

      // 検証
      expect(result).toEqual([]);
    });
  });

  describe('analyzeError', () => {
    it('エラー情報を正しく解析すること', () => {
      // 準備
      const error = new Error('テストエラー');
      error.stack = `Error: テストエラー
    at ErrorComponent (/path/to/ErrorComponent.tsx:8:11)
    at App (/path/to/App.tsx:45:22)`;

      const errorInfo: React.ErrorInfo = {
        componentStack: `
    at ErrorComponent (ErrorComponent.tsx:8:0)
    at App (App.tsx:45:0)
        `
      };

      // 実行
      const result = analyzeError(error, errorInfo);

      // 検証
      expect(result.error.name).toBe('Error');
      expect(result.error.message).toBe('テストエラー');
      expect(result.error.stack).toContain('ErrorComponent.tsx:8:11');

      expect(result.analysisInfo.errorStackInfo).toHaveLength(2);
      expect(result.analysisInfo.componentStackInfo).toHaveLength(2);
      expect(result.analysisInfo.primaryErrorLocation).toEqual({
        component: 'ErrorComponent',
        file: '/path/to/ErrorComponent.tsx',
        line: '8',
        column: '11'
      });

      expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    it('stackが存在しない場合も正常に処理すること', () => {
      // 準備
      const error = new Error('テストエラー');
      error.stack = undefined;

      const errorInfo: React.ErrorInfo = {
        componentStack: `
    at ErrorComponent (ErrorComponent.tsx:8:0)
        `
      };

      // 実行
      const result = analyzeError(error, errorInfo);

      // 検証
      expect(result.analysisInfo.errorStackInfo).toEqual([]);
      expect(result.analysisInfo.componentStackInfo).toHaveLength(1);
      expect(result.analysisInfo.primaryErrorLocation).toEqual({
        component: 'ErrorComponent',
        file: 'ErrorComponent.tsx',
        line: '8',
        column: '0'
      });
    });

    it('componentStackが存在しない場合も正常に処理すること', () => {
      // 準備
      const error = new Error('テストエラー');
      error.stack = `Error: テストエラー
    at ErrorComponent (/path/to/ErrorComponent.tsx:8:11)`;

      const errorInfo: React.ErrorInfo = {
        componentStack: null as any
      };

      // 実行
      const result = analyzeError(error, errorInfo);

      // 検証
      expect(result.analysisInfo.errorStackInfo).toHaveLength(1);
      expect(result.analysisInfo.componentStackInfo).toEqual([]);
      expect(result.analysisInfo.primaryErrorLocation).toEqual({
        component: 'ErrorComponent',
        file: '/path/to/ErrorComponent.tsx',
        line: '8',
        column: '11'
      });
    });
  });
});
