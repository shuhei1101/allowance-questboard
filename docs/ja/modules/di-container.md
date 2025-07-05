# 🔧 DIコンテナ（依存性注入）

## 概要
`core/di_container.py`と`core/setup/`でDIコンテナを提供しています。FlutterのGetItライブラリに似たシンプルなキーバリュー型DIコンテナを実装しています。

## 主な機能
- `register_singleton()`: シングルトンインスタンスの登録
- `register_factory()`: ファクトリ関数の登録（毎回新しいインスタンス作成）
- `register_lazy_singleton()`: 遅延シングルトン（初回取得時にインスタンス作成）
- `get()`: 登録されたインスタンスの取得

## 使用方法

### 基本的な使用例
```python
from aqapi.core.di_container import register_singleton, get

# 登録
register_singleton(ConfigService, ConfigService())

# 取得
config = get(ConfigService)
```

### 複数のタイプでの登録

#### シングルトンの登録
```python
# 一度だけインスタンスを作成し、常に同じインスタンスを返す
register_singleton(DatabaseService, DatabaseService())
```

#### ファクトリの登録
```python
# 取得するたびに新しいインスタンスを作成
register_factory(RequestLogger, lambda: RequestLogger())
```

#### 遅延シングルトンの登録
```python
# 初回取得時にインスタンスを作成し、以降は同じインスタンスを返す
register_lazy_singleton(CacheService, lambda: CacheService())
```

## 設計思想
- シンプルで理解しやすいインターフェース
- Pythonの動的型付けを活用
- テスト時のモック化を容易にする
- 依存関係の管理を一元化

## 注意事項
- 循環依存には注意が必要
- テスト時は適切にモックオブジェクトを登録すること
- 型安全性はPythonの型ヒントに依存