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
src/features/demo/
├── DemoNavigator.tsx              # メインのデモナビゲーター
├── components/
│   ├── ComponentShowcase.tsx     # コンポーネント表示確認
│   └── StoreInspector.tsx        # ストア状態検査
├── providers/
│   └── DemoMockProvider.tsx      # モック状態管理
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
