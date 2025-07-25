from typing import List, override
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, UniqueConstraint, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class EducationsEntity(BaseEntity):
    """学歴マスタエンティティ"""

    __tablename__ = "educations"

    code: Mapped[str] = mapped_column(String(20), nullable=False, unique=True, comment="学歴コード")

    @override
    @classmethod
    def _seed_data(cls) -> List[BaseEntity]:
        return [
            EducationsEntity(code="elementary"),
            EducationsEntity(code="junior_high"),
            EducationsEntity(code="high_school"),
            EducationsEntity(code="university"),
            EducationsEntity(code="graduate_school"),
        ]
    
class EducationsTranslationEntity(BaseTranslationEntity):
    """学歴翻訳エンティティ"""

    __tablename__ = "educations_translation"
    __table_args__ = (
        UniqueConstraint("education_id", "language_id", name="uq_educations_translation_education_language"),
    )

    education_id: Mapped[int] = mapped_column(Integer, ForeignKey("educations.id", ondelete="CASCADE"), nullable=False, comment="学歴ID(外部キー)")
    name: Mapped[str] = mapped_column(String(100), nullable=False, comment="学歴名の翻訳")

    educations = relationship("EducationsEntity", foreign_keys=[education_id])

    @override
    @classmethod
    def _seed_data(cls) -> List[BaseEntity]:
        return [
            EducationsTranslationEntity(id=1, education_id=1, language_id=1, name="小学校"),
            EducationsTranslationEntity(id=2, education_id=1, language_id=2, name="Elementary School"),
            EducationsTranslationEntity(id=3, education_id=2, language_id=1, name="中学校"),
            EducationsTranslationEntity(id=4, education_id=2, language_id=2, name="Junior High School"),
        ]
