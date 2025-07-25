from datetime import datetime
from typing import Optional
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version
from aqapi.family_member.domain.value_object.family_member_id import FamilyMemberId
from aqapi.icon.domain.value_object.icon_id import IconId
from aqapi.icon.entity.icons_entity import IconsEntity
from aqapi.icon_category.domain.icon_category import IconCategory
from aqapi.icon_category.domain.value_object.icon_category_id import IconCategoryId
from aqapi.shared.domain.value_object.screen_id import ScreenId
from aqapi.shared.entity.sort_order import SortOrder


class Icon(BaseModel[IconId, IconsEntity]):
    """アイコンドメインモデル"""

    def __init__(self, 
                 category: IconCategory,
                 sort_order: SortOrder,
                 is_active: bool,
                 id: IconId, version: Version, 
                 created_at: Optional[datetime] = None, created_by: Optional[FamilyMemberId] = None, created_from: Optional['ScreenId'] = None,
                 updated_at: Optional[datetime] = None, updated_by: Optional[FamilyMemberId] = None, updated_from: Optional['ScreenId'] = None):
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
            created_by=FamilyMemberId(entity.created_by),
            created_from=ScreenId(entity.created_from),
            updated_at=entity.updated_at,
            updated_by=FamilyMemberId(entity.updated_by),
            updated_from=ScreenId(entity.updated_from)
        )
