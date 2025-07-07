from sqlalchemy import Column, Integer, ForeignKey, Boolean, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class SharedQuestsEntity(BaseEntity):
    """共有クエストエンティティ"""

    __tablename__ = "shared_quests"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("shared_by", "quest_id"),
    )

    quest_id = Column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=False, comment="クエストID(外部キー)")
    shared_by = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="共有元の家族ID")
    pinned_comment_id = Column(Integer, ForeignKey("comments.id", ondelete="SET NULL"), nullable=True, comment="ピン留めコメントID")
    is_public = Column(Boolean, nullable=False, default=True, comment="公開フラグ")
    shared_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="共有日時")

    quest = relationship("QuestsEntity", foreign_keys=[quest_id])
    family = relationship("FamiliesEntity", foreign_keys=[shared_by])
    pinned_comment = relationship("CommentsEntity", foreign_keys=[pinned_comment_id], uselist=False, lazy="joined")
