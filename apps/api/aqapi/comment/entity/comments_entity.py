from sqlalchemy import Column, Integer, ForeignKey, String, Text, DateTime, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity
from aqapi.core.config.db_config import DB_CONF


class CommentsEntity(BaseEntity):
    """コメントエンティティ"""

    __tablename__ = "comments"
    __table_args__ = (
        # 本文は空文字不可
        CheckConstraint("length(body) > 0", name="chk_comments_body_not_empty"),
    )

    commented_by = Column(Integer, nullable=False, comment="ユーザID(ポリモーフィック：family_id または child_id)")
    commentable_type = Column(Integer, ForeignKey("commentable_types.id", ondelete="RESTRICT"), nullable=False, comment="コメント対象タイプID")
    commentable_id = Column(Integer, nullable=False, comment="コメント対象ID")
    parent_comment_id = Column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=True, comment="親コメントID")
    body = Column(Text, nullable=False, comment="コメント本文")
    commented_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="コメント投稿日時")

    user_type_ref = relationship("UserTypesEntity")
    commentable_type_ref = relationship("CommentableTypesEntity")
    parent_comment = relationship("CommentsEntity")


class CommentsHistoryEntity(BaseHistoryEntity):
    """コメント履歴エンティティ"""

    __tablename__ = "comments_history"

    commented_by = Column(Integer)
    commentable_type = Column(Integer)
    commentable_id = Column(Integer)
    parent_comment_id = Column(Integer)
    body = Column(Text)
    commented_at = Column(DateTime(timezone=True))

    @classmethod
    def from_source(cls, source: "CommentsEntity"):
        """元のレコードから履歴エンティティを生成"""
        return cls(
            source_id=source.id,
            commented_by=source.commented_by,
            commentable_type=source.commentable_type,
            commentable_id=source.commentable_id,
            parent_comment_id=source.parent_comment_id,
            body=source.body,
            commented_at=source.commented_at,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )


class CommentsTranslationEntity(BaseTranslationEntity):
    """コメント翻訳エンティティ"""

    __tablename__ = "comments_translation"
    __table_args__ = (
        # 本文は空文字不可
        CheckConstraint("length(body) > 0", name="chk_comments_translation_body_not_empty"),
        # 一意制約
        UniqueConstraint("comment_id", "language_id"),
    )

    comment_id = Column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=False, comment="コメントID")
    body = Column(Text, nullable=False, comment="コメント本文の翻訳")

    comment = relationship("CommentsEntity")
