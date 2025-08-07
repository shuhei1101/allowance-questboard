# 基底_API
## コンテキスト
- 物理名: 
### パラメータ
- ユーザID: 文字列(UUID)
  - supabaseのユーザID
- 言語ID: 文字列
  - 1: 日本語
  - 2: 英語
- セッション: TypeORMのセッション

## createContextメソッド
- AppDataSourceからセッションの取得
- リクエストのヘッダー`languageid`から言語IDを取得
- リクエストのヘッダー`authorization`からJWTトークンを取得
- JWTトークンをデコードしてユーザIDを取得

## authenticatedProcedure
- 認証済みかどうかを確認
- 認証されていない場合は401エラーを返す
- 認証されている場合は、ユーザIDとセッションをコンテキストに追加

## publicProcedure
- 認証が不要なプロシージャを定義
