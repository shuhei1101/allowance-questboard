from sqlalchemy import Column, Integer, ForeignKey, Boolean, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class SharedQuestsEntity(BaseEntity):
    """共有クエストエンティティ
    
    家族クエストを作成した際に自動で生成される(公開フラグはFalse)
    """

    __tablename__ = "shared_quests"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("shared_by", "quest_id"),
    )

    quest_id: Mapped[int] = mapped_column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=False, comment="クエストID(外部キー)")
    source_family_quest_id: Mapped[int] = mapped_column(Integer, ForeignKey("family_quests.id", ondelete="CASCADE"), nullable=False, comment="共有元の家族クエストID")
    shared_by: Mapped[int] = mapped_column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="共有元の家族ID")
    pinned_comment_id: Mapped[int] = mapped_column(Integer, ForeignKey("comments.id", ondelete="SET NULL"), nullable=True, comment="ピン留めコメントID")
    is_shared: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False, comment="共有フラグ")
    shared_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="共有日時")

    quest = relationship("QuestsEntity", foreign_keys=[quest_id])
    source_family_quest = relationship("FamilyQuestsEntity", foreign_keys=[source_family_quest_id])
    family = relationship("FamiliesEntity", foreign_keys=[shared_by])
    pinned_comment = relationship("CommentsEntity", foreign_keys=[pinned_comment_id], uselist=False, lazy="joined")
