from typing import Any, List, Tuple
from math import ceil
from sqlalchemy.orm import Query

from aqapi.core.pagination.pagination_meta import PaginationMeta

class Paginator:
    def __init__(self, page: int = 1, size: int = 10):
        self.page = page
        self.size = size

    def paginate(self, query: Query) -> Tuple[PaginationMeta, List[Any]]:
        total = query.order_by(None).count()
        total_pages = ceil(total / self.size) if self.size else 1

        meta = PaginationMeta(
            total=total,
            page=self.page,
            size=self.size,
            total_pages=total_pages,
            has_next=self.page < total_pages,
            has_prev=self.page > 1,
        )

        rows = query.offset((self.page - 1) * self.size).limit(self.size).all()
        return meta, rows
