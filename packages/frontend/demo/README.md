# デモ機能

開発中の画面やコンポーネントを確認するためのデモ環境です。

## 概要

この機能は開発者が以下を行うために作成されました：

- 各ページの表示確認
- コンポーネントの単体確認
- モック状態での動作確認
- Zustandストアの状態デバッグ

## フォルダ構成

```
demo/
├── DemoNavigator.tsx              # メインのデモナビゲーター
├── features/                      # ビジネス機能（srcと同じ構成）
│   ├── auth/                      # 認証機能
│   │   └── login-page/
│   ├── family/                    # 家族機能
│   │   └── create-family-page/
│   ├── parent/                    # 親機能
│   │   └── parent-edit-page/
│   └── shared/                    # 共通機能
│       └── icon-select-page/
├── development/                   # 開発支援機能（デモ専用）
│   ├── development-top-page/      # 開発トップページ
│   ├── component-showcase-page/   # コンポーネント展示
│   ├── component-list-page/       # コンポーネント一覧
│   ├── component-detail-page/     # コンポーネント詳細
│   ├── dependency-component-list-page/
│   ├── screen-list-page/          # 画面一覧
│   ├── screen-launcher-page/      # 画面起動
│   ├── store-inspector-page/      # ストア検査
│   └── component-details/         # 個別コンポーネント詳細
│       ├── email-input-detail-page/
│       ├── password-input-detail-page/
│       ├── birthday-input-detail-page/
│       ├── save-button-detail-page/
│       ├── icon-select-button-detail-page/
│       └── icon-select-page-detail/
├── test-environment/              # テスト環境設定
│   ├── SessionSettingsPage.tsx
│   ├── PageStateSettingsPage.tsx
│   ├── LoginPageSettingsPage.tsx
│   └── ParentEditPageSettingsPage.tsx
├── providers/                     # 共通プロバイダー
│   └── DemoMockProvider.tsx
└── README.md                     # このファイル
```

## 利用方法

### 1. デモ環境の起動

```bash
cd packages/frontend
npm start
```

アプリが起動したら、ウェブブラウザで `http://localhost:8081` にアクセスします。

### 2. デモメニュー

デモ環境では以下の機能を確認できます：

#### 🔐 ログイン画面
- メール・パスワード認証フォーム
- 新規家族作成ボタン
- パスワードリセット機能
- 親・子ログイン選択

#### 👤 親編集画面
- 親の基本情報入力フォーム
- バリデーション機能
- 入力エラー表示

#### 🧩 コンポーネント一覧
- 共通インプットフィールドの動作確認
- リアルタイムの状態表示
- インタラクティブなテスト

#### 🔍 ストア状態検査
- セッションストアの状態表示
- ログインページストアの状態表示
- 親編集ページストアの状態表示
- ストア操作用のアクションボタン

## モック機能

### DemoMockProvider

`DemoMockProvider` は各ストアにモックデータを設定します：

- **セッションストア**: モック言語設定、家族メンバータイプ、JWT
- **ページストア**: サンプル入力データ、エラー状態など

### モック設定の変更

```typescript
// providers/DemoMockProvider.tsx
const setupSessionMock = () => {
  const mockLanguageType = new LanguageTypeValue(new LanguageId(1));
  sessionStore.setLanguageType(mockLanguageType);
};
```

## 開発者向け情報

### 新しいページの追加

1. `DemoStackParamList` に新しいルートを追加
2. `DemoNavigator` に新しいスクリーンを追加
3. `DemoMenuScreen` にメニュー項目を追加

```typescript
// 新しいページの追加例
export type DemoStackParamList = {
  // ... 既存のルート
  NewPage: undefined;
};

// スクリーンの追加
<DemoStack.Screen 
  name="NewPage" 
  component={NewPageScreen}
  options={{ title: '🆕 新しいページ' }}
/>
```

### 新しいコンポーネントの追加

`ComponentShowcase.tsx` に新しいコンポーネントのテストセクションを追加できます。

### ストア状態の追加

`StoreInspector.tsx` に新しいストアの状態表示を追加できます。

## 注意事項

- デモ環境はモック状態で動作するため、実際のAPIは呼び出されません
- 本番環境では使用しないでください
- コンソールにデバッグ情報が出力されます

## トラブルシューティング

### エラーが発生する場合

1. モック設定を確認してください
2. Value Objectの作成方法を確認してください
3. コンソールのエラーメッセージを確認してください

### 状態が反映されない場合

1. ストア状態検査でリアルタイムの状態を確認してください
2. モックプロバイダーが正しく設定されているか確認してください

## 今後の拡張予定

- [ ] より多くのコンポーネントのショーケース
- [ ] APIモック機能
- [ ] スナップショット機能
- [ ] パフォーマンス測定機能
