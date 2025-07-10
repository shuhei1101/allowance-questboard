# 🧱 ディレクトリ構成

参考: [アーキテクチャ図](../../../../docs/ja/shared/uml/flutter_supabase_clsd.md)

## Flutterアプリ全体の構成

```plaintext
apps/flutter/
├── lib/                          ... メインのソースコード
│   ├── main.dart                 ... アプリケーションのエントリーポイント
│   ├── application/              ... フロントエンド用UseCaseクラス
│   │   ├── family/              ... 家族関連のUseCase
│   │   ├── member/              ... メンバー関連のUseCase
│   │   └── quest/               ... クエスト関連のUseCase
│   ├── core/                    ... コア機能・設定
│   │   ├── constants/           ... 定数定義
│   │   ├── router/              ... ルーティング設定
│   │   └── setup/               ... アプリ初期化
│   ├── domain/                  ... フロントエンド用DTO・モデル
│   │   ├── model/               ... データ転送オブジェクト（DTO）
│   │   └── repository/          ... QueryService・APIクライアントのインターフェース
│   ├── family/                  ... 家族機能
│   │   ├── api/                ... API通信クライアント
│   │   ├── home/               ... ホーム画面関連
│   │   ├── query_service/      ... Supabaseからのデータ取得
│   │   └── shared/             ... 家族機能共通
│   ├── generated/              ... 自動生成ファイル
│   │   └── l10n.dart          ... 多言語対応
│   ├── infrastracture/         ... 外部システム連携
│   │   ├── dao/               ... Supabaseアクセス
│   │   └── entity/            ... データベースエンティティ
│   ├── l10n/                  ... 多言語リソース
│   ├── login/                 ... ログイン機能
│   │   └── page/             ... ログインページ・StateNotifier
│   ├── member/                ... メンバー機能
│   │   └── query_service/    ... メンバー関連データ取得
│   ├── presentation/          ... 画面・UI要素
│   │   ├── member/           ... メンバー関連画面
│   │   └── quest/            ... クエスト関連画面
│   ├── quest/                 ... クエスト機能
│   │   ├── api/              ... クエストAPI通信
│   │   └── query_service/    ... クエスト関連データ取得
│   ├── sandbox/               ... 実験・テスト用
│   └── shared/                ... 共通機能
│       ├── api/              ... 共通API通信機能
│       ├── page/             ... 共通ページコンポーネント
│       ├── state/            ... 共通状態管理（バリデーション等）
│       ├── theme/            ... テーマ設定
│       └── util/             ... ユーティリティ
├── test/                      ... テストコード
│   ├── shared/               ... 共通機能のテスト
│   └── ...                   ... 各機能のテスト
├── android/                   ... Android固有の設定
├── ios/                      ... iOS固有の設定
├── linux/                    ... Linux固有の設定
├── macos/                    ... macOS固有の設定
├── web/                      ... Web固有の設定
├── windows/                  ... Windows固有の設定
└── pubspec.yaml              ... Dart/Flutterの依存関係設定
```

## ディレクトリの責務（フロントエンドアーキテクチャに基づく）

### application/ - フロントエンド用UseCase
- APIとの通信とデータ変換を担当
- サーバーから取得したデータをDTOに変換
- バックエンドのビジネスロジックは呼び出すのみ

**例**:
```dart
class GetQuestsUseCase {
  Future<GetQuestsResult> execute(int familyId) async {
    final queryModels = await questQueryService.findByFamilyId(familyId);
    return GetQuestsResult(quests: queryModels.map(QuestSummaryDto.fromModel).toList());
  }
}
```

### domain/ - フロントエンド用DTO・モデル
- サーバーから受信するデータの型定義
- **注意**: ビジネスロジックは含まない（サーバー側にあるため）
- バリデーション用のStateクラス

**例**:
```dart
class QuestSummaryDto {
  final String id;
  final String title;
  final String description;
  
  // DTOのみ - ビジネスロジックなし
}

class QuestTitleState with InputState {
  // バリデーション処理のみ
}
```

### infrastracture/ - 外部システム連携
- Supabaseとの直接的なデータアクセス
- API通信の実装
- リアルタイムデータ同期

### query_service/ - データ取得サービス
- Supabaseからのデータ取得専用
- リアルタイム同期の実装
- フロントエンド用のQueryModel生成

**例**:
```dart
class QuestQueryService {
  Stream<List<QuestQueryModel>> watchByFamilyId(int familyId) {
    return supabaseClient.from('quests').stream()...;
  }
}
```

### api/ - API通信
- バックエンドAPIサーバーとの通信
- JSON-RPC 2.0を使用したリクエスト・レスポンス処理

**例**:
```dart
class QuestApiClient {
  Future<ApplyQuestResponse> applyQuest(ApplyQuestRequest request) async {
    // APIサーバーにビジネスロジック実行を依頼
  }
}
```

### presentation/ - UI層
- StateNotifierを使った状態管理
- ページ・コンポーネントの実装
- ユーザー操作の処理

### shared/state/ - 共通状態管理
- バリデーション用のmixin・基底クラス
- 共通的な状態管理パターン

## アーキテクチャパターンの特徴

### 1. 責務の分離
- **フロントエンド**: バリデーション、状態管理、UI表示
- **バックエンド**: すべてのビジネスロジック

### 2. データフロー
```
UI → StateNotifier → UseCase → QueryService/ApiClient → Supabase/APIServer
```

### 3. リアルタイム同期
- SupabaseのRealtimeを使用したデータ同期
- QueryServiceでストリームベースのデータ取得

## 命名規則

- ディレクトリ名: snake_case
- ファイル名: snake_case  
- クラス名: PascalCase
- 変数・メソッド名: camelCase
- StateNotifierクラス: `XxxPageStateNotifier`
- UseCaseクラス: `XxxUseCase`
- DTOクラス: `XxxDto`