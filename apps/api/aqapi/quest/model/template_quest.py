from dataclasses import dataclass
from datetime import datetime
from typing import Optional
from aqapi.core.domain.value_object.version import Version
from aqapi.quest.model.quest import Quest
from aqapi.quest.model.value_object.quest_id import QuestId


@dataclass
class TemplateQuest(Quest):
    """テンプレートクエストドメインモデル"""
    
    def __init__(self, id: Optional[QuestId], subclass_type: int, subclass_id: int,
                 category_id: int, icon_id: int, age_from: int, age_to: int,
                 has_published_month: bool, month_from: Optional[int], month_to: Optional[int],
                 created_at: Optional[datetime], updated_at: Optional[datetime], version: Version):
        super().__init__(id, subclass_type, subclass_id, category_id, icon_id, age_from, age_to,
                         has_published_month, month_from, month_to, created_at, updated_at, version)
    
    @classmethod
    def create_new(cls, category_id: int, icon_id: int, age_from: int, age_to: int,
                   has_published_month: bool, month_from: Optional[int], month_to: Optional[int]) -> 'TemplateQuest':
        """新しいテンプレートクエストを作成する"""
        return cls(
            id=None,  # DB側で自動採番
            subclass_type=3,  # テンプレートクエストのサブクラスタイプ
            subclass_id=1,  # 仮の値、DB側で設定
            category_id=category_id,
            icon_id=icon_id,
            age_from=age_from,
            age_to=age_to,
            has_published_month=has_published_month,
            month_from=month_from,
            month_to=month_to,
            created_at=None,  # DB側で設定
            updated_at=None,  # DB側で設定
            version=Version(1)
        )
    
    @classmethod
    def from_raw(cls, raw_data: dict):
        """生データからドメインモデルを生成する"""
        # TODO: 実装が必要になったら追加
        pass
