# 🧱 ディレクトリ構成

## ディレクトリ構成

```plaintext
apps/flutter/
├── lib/                          ... メインのソースコード
│   ├── main.dart                 ... アプリケーションのエントリーポイント
│   ├── core/                    ... コア機能・基底クラスなど
│   │   ├── constants/           ... 定数定義
│   │   ├── router/              ... ルーティング設定(TypedGoRouter)
│   │   ├── api/              ... 共通API通信機能
│   │   ├── state/            ... 共通状態管理（バリデーション等）
│   │   ├── theme/              ... テーマ設定
│   │   ├── setup/              ... アプリ初期化
│   │   └── ...
│   ├── {関心事名}/                ... 関心事ごとのディレクトリ(例: family, quest)
│   │   ├── api/                  ... API通信クライアント
│   │   ├── page/                 ... ページコンポーネント
│   │   │   ├── component/           ... 共通部品
│   │   │   ├── screen/              ... ページと共通部品の間の画面(例: ページ内のタブ)
│   │   │   ├── *page.dart
│   │   │   └── ...
│   │   ├── state/                     ... 画面の状態に関するコードを配置
│   │   │   ├── state_object/               ... State内で使用する状態の値オブジェクト
│   │   │   ├── *state_notifier.dart   ... StateNotifierクラス
│   │   │   ├── *state.dart           ... StateNotifierの状態
│   │   │   ├── *state_notifier_provider.dart ... StateNotifierProviderクラス
│   │   │   └── ...
│   │   ├── usecase/                     ... ユースケース
│   │   │   ├── *usecase.dart           ... 共通部品
│   │   ├── supabase/             ... Supabaseから直接リアルタイムデータ同期
│   │   │   ├── *supabase_client.dart   ... 共通部品
│   │   └── shared/           ... 関心事内の共通部品
│   ├── sandbox/               ... 試しに実行するコードを配置
│   │   └── ...
│   └── shared/                ... 各関心事フォルダで使い回す共通機能
│        ├── page/             ... 共通ページコンポーネント
│        ├── util/             ... ユーティリティ
│        └── ...
├── test/                      ... テストコード
│   └── ...                   ... 各機能のテスト(lib内のディレクトリ構造に対応)
...
```
## 各層の責務
- [API層の責務](layer-responsibilities/api.md)
- [Component層の責務](layer-responsibilities/component.md)
- [Screen層の責務](layer-responsibilities/screen.md)
- [State層の責務](layer-responsibilities/state.md)
- [UseCase層の責務](layer-responsibilities/usecase.md)
- [Page層の責務](layer-responsibilities/page.md)
- [Supabase層の責務](layer-responsibilities/supabase.md)
