# 親編集画面のshouldUpdate対応

## 概要
親編集画面（ParentEditPage）に`shouldUpdate`引数を追加し、更新クエリの送信を制御できるようにしました。

## 変更内容

### 1. ParentEditPage.tsx
- Propsに`shouldUpdate?: boolean`を追加
- デフォルト値はtrue
- `useParentEditPageHandlers`に`shouldUpdate`を渡すように修正

### 2. useParentEditPageHandlers.ts
- 第2引数として`shouldUpdate: boolean = true`を追加
- `useConfirmHandler`に`shouldUpdate`を渡すように修正

### 3. useConfirmHandler.ts
- paramsに`shouldUpdate?: boolean`を追加
- `shouldUpdate`がfalseの場合、更新クエリを送信せずに状態だけ更新
- `shouldUpdate`がtrueまたは未指定の場合、従来通りの動作

## 使用方法

### shouldUpdate=true（デフォルト）
```tsx
<ParentEditPage 
  onConfirm={handleConfirm} 
/>
```
- 更新クエリを送信
- 状態を更新
- `onConfirm`コールバックを実行

### shouldUpdate=false
```tsx
<ParentEditPage 
  onConfirm={handleConfirm} 
  shouldUpdate={false}
/>
```
- 更新クエリを送信しない
- 状態だけ更新
- `onConfirm`コールバックを実行

## メリット
- 親側（呼び出し元）が直接更新されたフォームデータを取得可能
- 処理を継続できる柔軟な設計
- バリデーションは継続して実行される

## テスト
`__tests__/features/parent/parent-edit-page/hooks/useConfirmHandler.test.ts`に以下のテストケースを追加：
- shouldUpdateがtrueの場合の動作テスト
- shouldUpdateがfalseの場合の動作テスト
- shouldUpdateが未指定の場合のデフォルト動作テスト
- バリデーションエラー時の動作テスト
