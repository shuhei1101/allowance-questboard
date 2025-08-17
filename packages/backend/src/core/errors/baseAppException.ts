import { LocaleString } from '../messages/localeString';
import { LocalizedTRPCErrorSchema } from './localizedTRPCError';

/**
 * アプリケーション共通の基底例外クラス
 */
export class BaseAppException extends Error {
  public readonly errorType: string;
  public readonly localeMessage: LocaleString;

  constructor(params: {
    errorType: string;
    message: LocaleString;
  }) {
    super(params.message.en);
    this.errorType = params.errorType;
    this.localeMessage = params.message;
    this.name = 'ValidationException';
  }

  /**
   * tRPCエラーからLocalizedTRPCErrorの情報を抽出し、
   * BaseAppExceptionに変換するヘルパー関数
   * 
   * @param error tRPCから投げられたエラー
   * @param fallbackErrorType フォールバック用のエラータイプ
   * @param fallbackMessage フォールバック用のメッセージ
   * @returns BaseAppException
   */
  static fromTRPCError(params: {
    error: unknown,
    fallbackErrorType: string,
    fallbackMessage: LocaleString
  }): BaseAppException {
    // tRPCエラーかどうかをチェック
    if (params.error && typeof params.error === 'object' && 'data' in params.error) {
      const trpcError = params.error as LocalizedTRPCErrorSchema;
      
      // LocalizedTRPCErrorの場合
      if (trpcError.data?.cause?.errorType && trpcError.data?.cause?.localeMessage) {
        return new BaseAppException({
          errorType: trpcError.data.cause.errorType,
          message: new LocaleString({
            ja: trpcError.data.cause.localeMessage.ja,
            en: trpcError.data.cause.localeMessage.en,
          })
        });
      }
      
      // 通常のtRPCエラーの場合（messageのみ）
      if (trpcError.message) {
        return new BaseAppException({
          errorType: params.fallbackErrorType,
          message: new LocaleString({
            ja: trpcError.message,
            en: trpcError.message,
          })
        });
      }
    }
    
    // その他のエラーの場合
    return new BaseAppException({
      errorType: params.fallbackErrorType,
      message: params.fallbackMessage
    });
  }
}
