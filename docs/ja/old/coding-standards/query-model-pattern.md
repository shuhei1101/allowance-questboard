# QueryModelパターン

## 概要
QueryModelは、QueryServiceでJOINしたテーブルの全ての情報を格納するクラスです。SQLクエリ結果とAPIレスポンスの間の中間表現として使用します。

## 設計思想
- **分離責任の原則**: SQLクエリの結果構造とAPIレスポンス構造を分離
- **型安全性**: クエリ結果の型情報を明確に定義
- **再利用性**: 複数のAPIエンドポイントで同じQueryModelを利用可能
- **保守性**: データベース構造の変更時の影響範囲を明確化

## 実装パターン

### 1. QueryModel クラスの定義

```python
class FamilyQuestQueryModel:
    """家族クエスト情報のQueryModel
    
    QueryServiceでJOINしたテーブルの全ての情報を格納するクラス。
    SQLのクエリ結果とAPIレスポンスの間の中間表現として使用。
    """
    
    def __init__(self, id: int, title: str, category_id: int, icon_id: int,
                 is_shared: bool, is_public: Optional[bool], child_id: int,
                 child_icon_id: Optional[int]):
        # FamilyQuestsEntity からの情報
        self.id = id
        self.is_shared = is_shared
        
        # QuestsEntity からの情報  
        self.category_id = category_id
        self.icon_id = icon_id
        
        # QuestsTranslationEntity からの情報
        self.title = title
        
        # SharedQuestsEntity からの情報
        self.is_public = is_public
        
        # ChildrenEntity からの情報
        self.child_id = child_id
        
        # FamilyMembersEntity からの情報
        self.child_icon_id = child_icon_id

    @classmethod
    def from_row(cls, row) -> "FamilyQuestQueryModel":
        """SQLクエリ結果の行からQueryModelを作成"""
        return cls(
            id=row.id,
            title=row.title,
            category_id=row.category_id,
            icon_id=row.icon_id,
            is_shared=row.is_shared,
            is_public=row.is_public,
            child_id=row.child_id,
            child_icon_id=row.child_icon_id
        )
```

### 2. QueryService での使用

```python
class FamilyQuestQueryService:
    def fetch_quest_summary(self, family_id: int, language_id: int, 
                          paginator: Optional[Paginator] = None) -> tuple[Optional[PaginationMeta], List[FamilyQuestQueryModel]]:
        """クエリを実行してQueryModelのリストを返す"""
        query = self.session.query(
            FamilyQuestsEntity.id.label("id"),
            QuestsTranslationEntity.title.label("title"),
            # ... 他のフィールド
        ).join(
            # ... JOIN句
        ).filter(
            # ... フィルタ条件
        )
        
        if paginator:
            meta, rows = paginator.paginate(query)
        else:
            meta = None
            rows = query.all()

        # SQLクエリ結果をQueryModelに変換
        query_models = [FamilyQuestQueryModel.from_row(row) for row in rows]
        return meta, query_models
```

### 3. DTO での QueryModel の使用

```python
class FamilyQuestItem:
    @classmethod
    def from_query_model(cls, id: int, query_models: List[FamilyQuestQueryModel]) -> "FamilyQuestItem":
        """QueryModelから DTOを作成"""
        if not query_models:
            raise ValueError("QueryModel list cannot be empty")
        
        first_model = query_models[0]
        children = [QuestMember.from_query_model(model) for model in query_models]
        
        return cls(
            id=id,
            title=first_model.title,
            category_id=first_model.category_id,
            icon_id=first_model.icon_id,
            is_shared=first_model.is_shared,
            is_public=first_model.is_public,
            children=children
        )
```

## 命名規則
- クラス名: `{Entity名}QueryModel` (例: `FamilyQuestQueryModel`)
- ファイル配置: QueryServiceと同じファイル内、またはquerymodelディレクトリ
- フィールド名: JOIN先のEntityフィールド名をそのまま使用

## 利点
1. **型安全性**: SQLクエリ結果の型情報が明確
2. **保守性**: データベース構造変更時の影響範囲が明確
3. **再利用性**: 複数のエンドポイントで同じQueryModelを使用可能
4. **テスト容易性**: QueryModelを直接作成してテスト可能

## 注意点
- QueryModelはあくまで中間表現であり、APIレスポンスとして直接返すべきではない
- 必ずDTOクラスに変換してからAPIレスポンスとして使用する
- BaseModelは継承しない（ドメインモデル用のため）