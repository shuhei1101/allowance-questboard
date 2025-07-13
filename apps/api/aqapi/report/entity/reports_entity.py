from sqlalchemy import Column, Index, Integer, Boolean, DateTime, ForeignKey, String, Text, func, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column

from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class ReportsEntity(BaseEntity):
    """レポート(通報)エンティティ"""

    __tablename__ = "reports"

    reported_by: Mapped[int] = mapped_column(Integer, ForeignKey("family_members.id", ondelete="CASCADE"), nullable=False, comment="レポートしたユーザID")
    reportable_type: Mapped[int] = mapped_column(Integer, ForeignKey("reportable_types.id", ondelete="RESTRICT"), nullable=False, comment="レポート対象タイプID")
    status_id: Mapped[int] = mapped_column(Integer, ForeignKey("report_statuses.id", ondelete="RESTRICT"), nullable=False, comment="ステータスID")
    reported_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False, default=func.now(), comment="レポート作成日時")
    resolved_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=True, comment="レポート解決日時")

    # Relationships
    reporter = relationship("FamilyMembersEntity", foreign_keys=[reported_by])
    reportable_type_ref = relationship("ReportableTypesEntity", foreign_keys=[reportable_type])
    status = relationship("ReportStatusesEntity", foreign_keys=[status_id])


class ReportsHistoryEntity(BaseHistoryEntity):
    """レポート履歴エンティティ"""

    __tablename__ = "reports_history"

    reported_by: Mapped[int] = mapped_column(Integer)
    reportable_type: Mapped[int] = mapped_column(Integer)
    status_id: Mapped[int] = mapped_column(Integer)
    reported_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True))
    resolved_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True))

    @classmethod
    def from_source(cls, source: "ReportsEntity"):
        """元のレコードから履歴エンティティを生成"""
        return cls(
            source_id=source.id,
            reported_by=source.reported_by,
            reportable_type=source.reportable_type,
            status_id=source.status_id,
            reported_at=source.reported_at,
            resolved_at=source.resolved_at,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
