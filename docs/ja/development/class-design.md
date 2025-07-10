# 📐 クラス設計規約

## コンストラクタ

### 書式設定
- コンストラクタの引数は、横に40文字〜60文字もしくは引数3つが最大まで改行せず続けて記述する
- それを超える長さの場合は改行して記述する
- 可読性を重視し、縦に長くなりすぎないようにバランスを取る

```python
# 良い例: 短い場合は1行で記述
def __init__(self, id: int, name: str):
    self.id = id
    self.name = name

# 良い例: 長い場合は改行して記述
def __init__(self, id: QuestId, title: QuestTitle,
             description: QuestDescription, level: QuestLevel,
             created_at: Optional[datetime], updated_at: Optional[datetime]
):
    super().__init__(version)
    self._id = id
    self._title = title
    # ...
```

## 継承とポリモーフィズム

### 抽象クラス
- 抽象クラスは`ABC`を継承し、`@abstractmethod`デコレーターを使用する
- 具象クラスで抽象メソッドのオーバーライド時は、特に理由がない限り関数コメントは書かなくてよい
- ただし、実装側にのみ特定のロジックを含む場合はその限りではない

```python
from abc import ABC, abstractmethod

class BaseClass(ABC):
    @abstractmethod
    def process(self) -> None:
        """処理を実行する"""
        pass

class ConcreteClass(BaseClass):
    def process(self) -> None:  # 実装時はコメント不要
        # 具体的な処理
        pass
```