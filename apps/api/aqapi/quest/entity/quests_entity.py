from typing import List
from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey, String, Text, func, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import relationship
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class QuestsEntity(BaseEntity):
    """クエストエンティティ"""

    __tablename__ = "quests"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("subclass_type", "subclass_id", name="uq_quests_subclass_type_id"),
        # 年齢下限は0以上
        CheckConstraint("age_from >= 0", name="chk_quests_age_from_non_negative"),
        # 年齢上限は下限以上
        CheckConstraint("age_to >= age_from", name="chk_quests_age_to_greater_equal_age_from"),
        # 開始月は1-12の範囲またはNULL
        CheckConstraint("month_from IS NULL OR (month_from >= 1 AND month_from <= 12)", name="chk_quests_month_from_valid"),
        # 終了月は1-12の範囲またはNULL
        CheckConstraint("month_to IS NULL OR (month_to >= 1 AND month_to <= 12)", name="chk_quests_month_to_valid"),
    )

    subclass_type = Column(Integer, ForeignKey("quest_types.id", ondelete="RESTRICT"), nullable=False, comment="サブクラスタイプ")
    subclass_id = Column(Integer, nullable=False, comment="サブクラスID")
    category_id = Column(Integer, ForeignKey("quest_categories.id", ondelete="RESTRICT"), nullable=False, comment="クエストカテゴリID")
    icon_id = Column(Integer, ForeignKey("icons.id", ondelete="RESTRICT"), nullable=False, comment="アイコンID")
    age_from = Column(Integer, nullable=False, comment="対象年齢下限")
    age_to = Column(Integer, nullable=False, comment="対象年齢上限")
    has_published_month = Column(Boolean, nullable=False, default=False, comment="季節限定フラグ")
    month_from = Column(Integer, nullable=True, comment="公開開始月")
    month_to = Column(Integer, nullable=True, comment="公開終了月")

    subclass_type_ref = relationship("QuestSubclassTypesEntity")
    category = relationship("QuestCategoriesEntity")
    icon = relationship("IconsEntity")

    @classmethod
    def _seed_data(cls) -> List[BaseEntity]:
        return [
            QuestsEntity(subclass_type=1, subclass_id=1, category_id=1, icon_id=1, age_from=6, age_to=12),
            QuestsEntity(subclass_type=2, subclass_id=1, category_id=2, icon_id=2, age_from=3, age_to=10),
            QuestsEntity(subclass_type=3, subclass_id=1, category_id=3, icon_id=3, age_from=5, age_to=15),
        ]

class QuestsTranslationEntity(BaseTranslationEntity):
    """クエスト翻訳エンティティ"""

    __tablename__ = "quests_translation"
    __table_args__ = (
        UniqueConstraint("quest_id", "language_id", name="uq_quests_translation_quest_language"),
        CheckConstraint("length(title) > 0", name="chk_quests_translation_title_not_empty"),
        CheckConstraint("length(client) > 0", name="chk_quests_translation_client_not_empty"),
    )

    quest_id = Column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=False, comment="クエストID")
    title = Column(String(200), nullable=False, comment="クエストタイトルの翻訳")
    client = Column(String(100), nullable=False, comment="クライアント名の翻訳")
    request_detail = Column(Text, nullable=True, comment="依頼詳細の翻訳")

    quest = relationship("QuestsEntity")
