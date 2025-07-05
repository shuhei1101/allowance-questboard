# 📄 ページネーション

## 関連ドキュメント
- 🔧 [DIコンテナ](di-container.md) - 依存性注入システム
- 🏗️ [アーキテクチャ責務](../architecture/responsibilities.md) - レイヤー責務とアーキテクチャルール
- 🧱 [ディレクトリ構成](../architecture/directory-structure.md) - プロジェクト構成

## 関連モジュール
- 📄 [Paginator](../../aqapi/core/pagination/paginator.py) - ページネーション実行クラス
- 📄 [PaginationMeta](../../aqapi/core/pagination/pagination_meta.py) - ページネーションメタデータクラス

## 概要
`core/pagination/`でページネーション機能を提供しています。SQLAlchemyのQueryオブジェクトに対してページネーション機能を追加し、メタデータと結果を返すシンプルなシステムを実装しています。

## 主な機能
- `Paginator`: SQLAlchemyクエリのページネーション実行
- `PaginationMeta`: ページネーションのメタデータ管理
- ページング情報の自動計算（総ページ数、前後ページの有無等）
- 大きなデータセットの効率的な分割取得

## 使用方法

### 基本的な使用例
```python
from aqapi.core.pagination.paginator import Paginator
from sqlalchemy.orm import Session

# Paginatorインスタンスの作成
paginator = Paginator(page=1, size=10)

# SQLAlchemyクエリの準備
query = session.query(SomeEntity).filter(SomeEntity.active == True)

# ページネーション実行
meta, rows = paginator.paginate(query)

print(f"総件数: {meta.total}")
print(f"現在のページ: {meta.page}")
print(f"ページサイズ: {meta.size}")
print(f"総ページ数: {meta.total_pages}")
print(f"次のページがあるか: {meta.has_next}")
print(f"前のページがあるか: {meta.has_prev}")
```

### FastAPIでの使用例
```python
from fastapi import APIRouter, Query, Depends
from sqlalchemy.orm import Session
from aqapi.core.pagination.paginator import Paginator
from aqapi.core.pagination.pagination_meta import PaginationMeta

@router.get("/items")
async def get_items(
    page: Optional[int] = Query(None, ge=1),
    size: Optional[int] = Query(None, ge=1),
    db: Session = Depends(get_db),
):
    # ページネーション設定
    paginator = Paginator(page=page, size=size) if page and size else None
    
    # クエリの準備
    query = db.query(ItemEntity)
    
    if paginator:
        meta, items = paginator.paginate(query)
    else:
        meta = None
        items = query.all()
    
    return {
        "meta": meta,
        "items": items
    }
```

### オプショナルページネーション
```python
from typing import Optional

def fetch_data(
    session: Session, 
    paginator: Optional[Paginator] = None
) -> tuple[Optional[PaginationMeta], List[Any]]:
    """ページネーション機能付きデータ取得
    
    :param Session session: データベースセッション
    :param Optional[Paginator] paginator: ページネーターインスタンス
    :return: メタデータと結果のタプル
    :rtype: tuple[Optional[PaginationMeta], List[Any]]
    """
    query = session.query(DataEntity)
    
    if paginator:
        # ページネーションあり
        meta, rows = paginator.paginate(query)
    else:
        # 全件取得
        meta = None
        rows = query.all()
    
    return meta, rows
```

## クラス詳細

### Paginator
SQLAlchemyクエリにページネーション機能を提供するクラスです。

#### コンストラクタ
```python
def __init__(self, page: int = 1, size: int = 10):
    """Paginatorインスタンスを初期化
    
    :param int page: ページ番号（1から開始）
    :param int size: 1ページあたりの件数
    """
```

#### メソッド
```python
def paginate(self, query: Query) -> Tuple[PaginationMeta, List[Any]]:
    """SQLAlchemyクエリにページネーションを適用
    
    :param Query query: SQLAlchemyのQueryオブジェクト
    :return: ページネーションメタデータと結果のタプル
    :rtype: Tuple[PaginationMeta, List[Any]]
    """
```

### PaginationMeta
ページネーションのメタデータを保持するPydanticモデルです。

#### フィールド
- `total: int` - 総件数
- `page: int` - 現在のページ番号
- `size: int` - 1ページあたりの件数
- `total_pages: int` - 総ページ数
- `has_next: bool` - 次のページの有無
- `has_prev: bool` - 前のページの有無

## 設計思想
- シンプルで理解しやすいインターフェース
- SQLAlchemyとの緊密な統合
- オプショナルページネーション対応（全件取得も可能）
- レスポンス用のメタデータ自動生成
- 大量データの効率的な処理

## 注意事項
- ページ番号は1から開始します（0ベースではありません）
- `size`が0の場合は総ページ数を1として扱います
- クエリの`order_by(None)`を呼び出してカウント取得時の性能を最適化しています
- 大きなデータセットでは`count()`クエリが重くなる可能性があります