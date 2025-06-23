# ログイン機能の実装について

## 概要
本プロジェクトでは、Supabaseを使用したログイン機能を実装しています。家族ログインとメンバーログインの2つのモードを提供します。

## 機能

### 実装済み機能
- ✅ メールアドレス/パスワードでのログイン (supabase_auth_ui)
- ✅ パスワードリセット機能 (supabase_auth_ui)
- ✅ OAuth機能 (supabase_auth_ui)
- ✅ ローディング状態の表示
- ✅ ログインボタン上のトグルボタン配置
  - 家族状態: ログイン後にfamiliesテーブルからfamily_idを取得し、家族ホーム画面に遷移
  - メンバー状態: ログイン後にmembersテーブルからmember_idを取得し、ユーザーホーム画面に遷移
- ✅ 認証情報の保持 (AuthProvider)

## セットアップ

### 1. Supabase設定
`lib/config/supabase_config.dart`でSupabaseの接続情報を設定してください:

```dart
class SupabaseConfig {
  static const String url = 'https://your-project.supabase.co';
  static const String anonKey = 'your-anon-key';
}
```

### 2. データベーステーブル
以下のテーブルが必要です:

#### familiesテーブル
```sql
CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### membersテーブル
```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  family_id UUID REFERENCES families(id),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## アーキテクチャ

### ディレクトリ構造
```
lib/
├── login/
│   ├── page/
│   │   └── login_page.dart
│   ├── screen/
│   │   └── login_screen.dart
│   └── state/
│       ├── login_state.dart
│       ├── login_state_notifier.dart
│       └── login_state_provider.dart
├── application/auth/
│   ├── auth_provider.dart
│   ├── get_family_id_use_case.dart
│   └── get_member_id_use_case.dart
└── infrastracture/query_service/
    ├── family_query_service.dart
    └── member_query_service.dart
```

### 状態管理
- **AuthProvider**: ChangeNotifierを使用した認証状態の管理
- **LoginStateNotifier**: Riverpodを使用したログイン画面の状態管理
- **GetIt**: 依存性注入コンテナ

### ナビゲーション
- 家族ログイン: `/quests/{familyId}` (家族クエスト画面)
- メンバーログイン: `/members/{familyId}/member/{memberId}` (メンバー詳細画面)

## 使用方法

1. アプリ起動時に認証状態をチェック
2. 未認証の場合は`/login`画面に遷移
3. ユーザーが家族/メンバーを選択
4. supabase_auth_uiでログイン
5. ログイン成功後、選択したタイプに応じて適切な画面に遷移

## 注意事項

- 本番環境では環境変数やSecure Storageを使用してSupabase認証情報を管理してください
- バリデーションは主にsupabase_auth_uiが担っていますが、必要に応じて追加のバリデーションを実装してください
- エラーハンドリングは基本的な実装のみです。プロダクション環境では詳細なエラーハンドリングを追加してください