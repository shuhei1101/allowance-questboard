# 🏗️ ドメインルール

## サロゲートキー

### 仕様
- サロゲートキーは**int型の連番**で実装する
- **UUID型は使用しない**
- 自動採番はデータベース側で行う

### ドメインモデルでの扱い
- IDは`Optional[int]`型として定義する
- `None`の場合：まだデータベースに登録されていない新規オブジェクト
- `int`値の場合：データベースに登録済みのオブジェクト

```python
# 例: QuestId値オブジェクト
@dataclass
class QuestId(BaseValueObject):
    value: Optional[int]  # Noneまたは正の整数
```

## タイムスタンプ管理

### 仕様
- `created_at`、`updated_at`の設定はデータベース側で自動実行する
- ドメインモデルでは明示的にタイムスタンプを設定しない

### ドメインモデルでの扱い
- タイムスタンプは`Optional[datetime]`型として定義する
- `None`の場合：データベース側で自動設定される
- 更新処理時は`None`を設定し、データベース側での自動更新に委ねる

```python
# 例: Quest更新メソッド
def update_title(self, title: QuestTitle) -> None:
    self._title = title
    self._updated_at = None  # DB側で更新
    self.increment_version()
```

## エンティティとの関係

### BaseEntity
- データベースレイヤーの`BaseEntity`でサロゲートキーとタイムスタンプを定義
- `id = Column(Integer, primary_key=True)`：自動採番される整数主キー
- `created_at`、`updated_at`：`server_default=func.now()`で自動設定

### ドメインモデル
- ドメインレイヤーでは値オブジェクトとして`Optional[int]`で扱う
- データベース未登録時は`None`、登録済み時は正の整数値