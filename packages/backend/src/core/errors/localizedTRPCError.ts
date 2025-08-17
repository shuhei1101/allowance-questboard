import { TRPCError } from '@trpc/server';
import type { TRPC_ERROR_CODE_KEY } from '@trpc/server';
import { LocaleString } from '../messages/localeString';

export interface LocalizedErrorCause {
  errorType: string;
  localeMessage: {
    ja: string;
    en: string;
  };
}

export interface LocalizedTRPCErrorSchema {
  data?: {
    code?: string;
    cause?: {
      errorType: string;
      localeMessage: {
        ja: string;
        en: string;
      };
    };
  };
  message?: string;
}


export class LocalizedTRPCError extends TRPCError implements LocalizedTRPCErrorSchema {
  constructor(params: {
    code: TRPC_ERROR_CODE_KEY;
    errorType: string;
    localeMessage: LocaleString;
  }) {
    const message = params.localeMessage.en; // デフォルトは英語メッセージ

    super({
      code: params.code,
      message,
      cause: {
        errorType: params.errorType,
        localeMessage: {
          ja: params.localeMessage.ja,
          en: params.localeMessage.en
        },
      } satisfies LocalizedErrorCause
    });
  }
}
