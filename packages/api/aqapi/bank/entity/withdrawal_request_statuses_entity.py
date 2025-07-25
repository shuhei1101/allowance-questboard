from typing import override
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, UniqueConstraint, func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.config.db_config import db_config


class WithdrawalRequestStatusesEntity(BaseEntity):
    """引き落とし申請ステータスエンティティ"""

    __tablename__ = "withdrawal_request_statuses"

    code: Mapped[str] = mapped_column(String(20), nullable=False, unique=True, comment="ステータスコード")

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            WithdrawalRequestStatusesEntity(code="pending"),
            WithdrawalRequestStatusesEntity(code="approved"),
            WithdrawalRequestStatusesEntity(code="rejected"),
            WithdrawalRequestStatusesEntity(code="completed"),
        ]

class WithdrawalRequestStatusesTranslationEntity(BaseTranslationEntity):
    """引き落とし申請ステータス翻訳エンティティ"""

    __tablename__ = "withdrawal_request_statuses_translation"

    withdrawal_request_status_id: Mapped[int] = mapped_column(Integer, ForeignKey("withdrawal_request_statuses.id", ondelete="CASCADE"), nullable=False, comment="ステータスID")
    name: Mapped[str] = mapped_column(String(100), nullable=False, comment="ステータス名の翻訳")

    withdrawal_request_status = relationship("WithdrawalRequestStatusesEntity", foreign_keys=[withdrawal_request_status_id])

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            WithdrawalRequestStatusesTranslationEntity(withdrawal_request_status_id=1, language_id=1, name="審査中"),
            WithdrawalRequestStatusesTranslationEntity(withdrawal_request_status_id=1, language_id=2, name="Pending"),
            WithdrawalRequestStatusesTranslationEntity(withdrawal_request_status_id=2, language_id=1, name="承認済"),
            WithdrawalRequestStatusesTranslationEntity(withdrawal_request_status_id=2, language_id=2, name="Approved"),
            WithdrawalRequestStatusesTranslationEntity(withdrawal_request_status_id=3, language_id=1, name="却下"),
            WithdrawalRequestStatusesTranslationEntity(withdrawal_request_status_id=3, language_id=2, name="Rejected"),
        ]
