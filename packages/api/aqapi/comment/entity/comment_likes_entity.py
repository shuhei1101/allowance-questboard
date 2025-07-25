from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import db_config


class CommentLikesEntity(BaseEntity):
    """コメントのいいねエンティティ"""

    __tablename__ = "comment_likes"
   
    comment_id: Mapped[int] = mapped_column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=False, comment="コメントID(外部キー)")
    liked_by: Mapped[int] = mapped_column(Integer, ForeignKey("family_members.id", ondelete="SET NULL"), nullable=False, comment="家族メンバーID")
    liked_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="いいねした日時")

    comment = relationship("CommentsEntity", foreign_keys=[comment_id])
    family_member = relationship("FamilyMembersEntity", foreign_keys=[liked_by])
