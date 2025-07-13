from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class TemplateQuestsEntity(BaseEntity):
    """テンプレートクエストエンティティ"""

    __tablename__ = "template_quests"

    quest_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("quests.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
        comment="クエストID(外部キー、一意制約)",
    )

    quest = relationship("QuestsEntity", foreign_keys=[quest_id])

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            TemplateQuestsEntity(quest_id=1),
            TemplateQuestsEntity(quest_id=2),
            TemplateQuestsEntity(quest_id=3),
        ]
