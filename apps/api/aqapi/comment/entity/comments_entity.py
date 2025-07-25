from typing import override
from sqlalchemy import Column, Integer, ForeignKey, String, Text, DateTime, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import db_config


class CommentsEntity(BaseEntity):
    """コメントエンティティ"""

    __tablename__ = "comments"
    __table_args__ = (
        # 本文は空文字不可
        CheckConstraint("length(body) > 0", name="chk_comments_body_not_empty"),
    )

    commented_by: Mapped[int] = mapped_column(Integer, ForeignKey("family_members.id", ondelete="CASCADE"), nullable=False, comment="コメント投稿者ID")
    commentable_type: Mapped[int] = mapped_column(Integer, ForeignKey("commentable_types.id", ondelete="RESTRICT"), nullable=False, comment="コメント対象タイプID")
    parent_comment_id: Mapped[int] = mapped_column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=True, comment="親コメントID")
    body: Mapped[str] = mapped_column(Text, nullable=False, comment="コメント本文")
    commented_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="コメント投稿日時")

    family_member = relationship("FamilyMembersEntity", foreign_keys=[commented_by])
    commentable_type_ref = relationship("CommentableTypesEntity", foreign_keys=[commentable_type])
    parent_comment = relationship("CommentsEntity", foreign_keys=[parent_comment_id])


class CommentsHistoryEntity(BaseHistoryEntity[CommentsEntity]):
    """コメント履歴エンティティ"""

    __tablename__ = "comments_history"

    commented_by: Mapped[int] = mapped_column(Integer)
    commentable_type: Mapped[int] = mapped_column(Integer)
    parent_comment_id: Mapped[int] = mapped_column(Integer)
    body: Mapped[str] = mapped_column(Text)
    commented_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True))

    @override
    @classmethod
    def _set_specific_attrs(cls, instance: 'CommentsHistoryEntity', source: CommentsEntity) -> None:
        instance.commented_by = source.commented_by
        instance.commentable_type = source.commentable_type
        instance.parent_comment_id = source.parent_comment_id
        instance.body = source.body
        instance.commented_at = source.commented_at


class CommentsTranslationEntity(BaseTranslationEntity):
    """コメント翻訳エンティティ"""

    __tablename__ = "comments_translation"
    __table_args__ = (
        # 本文は空文字不可
        CheckConstraint("length(body) > 0", name="chk_comments_translation_body_not_empty"),
        # 一意制約
        UniqueConstraint("comment_id", "language_id"),
    )

    comment_id: Mapped[int] = mapped_column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=False, comment="コメントID")
    body: Mapped[str] = mapped_column(Text, nullable=False, comment="コメント本文の翻訳")

    comment = relationship("CommentsEntity", foreign_keys=[comment_id])
