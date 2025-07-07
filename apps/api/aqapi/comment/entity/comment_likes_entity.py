from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class CommentLikesEntity(BaseEntity):
    """コメントのいいねエンティティ"""

    __tablename__ = "comment_likes"
   
    comment_id = Column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=False, comment="コメントID(外部キー)")
    liked_by = Column(Integer, ForeignKey("family_members.id", ondelete="SET NULL"), nullable=False, comment="家族メンバーID")
    liked_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="いいねした日時")

    comment = relationship("CommentsEntity", foreign_keys=[comment_id])
    family_member = relationship("FamilyMembersEntity", foreign_keys=[liked_by])
