from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, func, CheckConstraint
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.config.db_config import DB_CONF


class ReportStatusesEntity(BaseEntity):
    """レポートステータスエンティティ"""

    __tablename__ = "report_statuses"

    code = Column(String(20), nullable=False, unique=True, comment="ステータスコード")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            ReportStatusesEntity(code="pending"),
            ReportStatusesEntity(code="approved"),
            ReportStatusesEntity(code="rejected"),
            ReportStatusesEntity(code="resolved"),
        ]

class ReportStatusesTranslationEntity(BaseEntity):
    """レポートステータス翻訳エンティティ"""

    __tablename__ = "report_statuses_translation"

    report_status_id = Column(Integer, ForeignKey("report_statuses.id", ondelete="CASCADE"), nullable=False, comment="レポートステータスID")
    language_id = Column(Integer, ForeignKey("languages.id", ondelete="SET NULL"), nullable=False, comment="言語コード")
    status = Column(String(50), nullable=False, comment="翻訳されたステータス名")


    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
                ReportStatusesTranslationEntity(id=1, language_id=1, status="審査待ち"),
                ReportStatusesTranslationEntity(id=1, language_id=2, status="pending"),
                ReportStatusesTranslationEntity(id=2, language_id=1, status="承認済み"),
                ReportStatusesTranslationEntity(id=2, language_id=2, status="approved"),
                ReportStatusesTranslationEntity(id=3, language_id=1, status="却下"),
                ReportStatusesTranslationEntity(id=3, language_id=2, status="rejected"),
                ReportStatusesTranslationEntity(id=4, language_id=1, status="解決済み"),
                ReportStatusesTranslationEntity(id=4, language_id=2, status="resolved"),
            ]
