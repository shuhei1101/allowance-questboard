export class LocaleString {
  private readonly _ja: string
  private readonly _en: string

  constructor(params: {
    ja: string;
    en: string;
  }) {
    this._ja = params.ja;
    this._en = params.en;
  }

  get ja(): string {
    return this._ja;
  }
  get en(): string {
    return this._en;
  }
}
