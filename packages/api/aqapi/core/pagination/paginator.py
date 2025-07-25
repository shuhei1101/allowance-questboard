from typing import Any, List, Tuple
from math import ceil
from sqlalchemy.orm import Query

from aqapi.core.pagination.pagination_meta import PaginationMeta

class PaginatedQueryCommand:
    """ページネーション付きクエリコマンド"""

    def __init__(self, query: Query, page: int = 1, size: int = 10):
        self.query = query
        self.page = page
        self.size = size

class Paginator:
    def __init__(self, page: int = 1, size: int = 10):
        self.page = page
        self.size = size
    
    def execute(self, command: PaginatedQueryCommand) -> Tuple[PaginationMeta, List[Any]]:
        """ページネーションを適用してクエリを実行する"""
        total = command.query.order_by(None).count()
        total_pages = ceil(total / command.size) if command.size else 1

        meta = PaginationMeta(
            total=total,
            page=command.page,
            size=command.size,
            total_pages=total_pages,
            has_next=command.page < total_pages,
            has_prev=command.page > 1,
        )

        rows = command.query.offset((command.page - 1) * command.size).limit(command.size).all()
        return meta, rows
