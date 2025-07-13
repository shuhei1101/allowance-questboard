from datetime import datetime
from typing import TYPE_CHECKING, Optional
from aqapi.auth.domain.user import User
from aqapi.auth.domain.value_object.user_id import UserId
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version
from aqapi.icon.domain.value_object.icon_id import IconId
from aqapi.icon.entity.icons_entity import IconsEntity
from aqapi.icon_category.domain.icon_category import IconCategory
from aqapi.icon_category.domain.value_object.icon_category_id import IconCategoryId
from aqapi.shared.entity.sort_order import SortOrder
if TYPE_CHECKING:
    from aqapi.shared.domain.screen import Screen


class Icon(BaseModel[IconId, IconsEntity]):
    """アイコンドメインモデル"""

    def __init__(self, 
                 category: IconCategory,
                 sort_order: SortOrder,
                 is_active: bool,
                 id: IconId, version: Version, 
                 created_at: Optional[datetime] = None, created_by: Optional[User] = None, created_from: Optional['Screen'] = None,
                 updated_at: Optional[datetime] = None, updated_by: Optional[User] = None, updated_from: Optional['Screen'] = None):
        super().__init__(id, version, created_at, created_by, created_from, updated_at, updated_by, updated_from)
        self._category = category
        self._sort_order = sort_order
        self._is_active = is_active

    @classmethod
    def from_entity(cls, entity: IconsEntity) -> 'Icon':
        return cls(
            category=IconCategory.from_id(IconCategoryId(entity.category_id)),
            sort_order=SortOrder(entity.sort_order),
            is_active=entity.is_active,
            id=IconId(entity.id),
            version=Version(entity.version),
            created_at=entity.created_at,
            created_by=User(UserId(entity.created_by)),
            created_from=entity.created_from,
            updated_at=entity.updated_at,
            updated_by=User(entity.updated_by),
            updated_from=entity.updated_from
        )
