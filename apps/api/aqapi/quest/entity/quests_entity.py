from typing import List, override
from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey, String, Text, func, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class QuestsEntity(BaseEntity):
    """クエストエンティティ"""

    __tablename__ = "quests"
    __table_args__ = (
        # 年齢下限は0以上
        CheckConstraint("age_from >= 0", name="chk_quests_age_from_non_negative"),
        # 年齢上限は下限以上
        CheckConstraint("age_to >= age_from", name="chk_quests_age_to_greater_equal_age_from"),
        # 開始月は1-12の範囲またはNULL
        CheckConstraint("month_from IS NULL OR (month_from >= 1 AND month_from <= 12)", name="chk_quests_month_from_valid"),
        # 終了月は1-12の範囲またはNULL
        CheckConstraint("month_to IS NULL OR (month_to >= 1 AND month_to <= 12)", name="chk_quests_month_to_valid"),
    )

    subclass_type: Mapped[int] = mapped_column(Integer, ForeignKey("quest_types.id", ondelete="RESTRICT"), nullable=False, comment="サブクラスタイプ")
    category_id: Mapped[int] = mapped_column(Integer, ForeignKey("quest_categories.id", ondelete="RESTRICT"), nullable=False, comment="クエストカテゴリID")
    icon_id: Mapped[int] = mapped_column(Integer, ForeignKey("icons.id", ondelete="RESTRICT"), nullable=False, comment="アイコンID")
    age_from: Mapped[int] = mapped_column(Integer, nullable=False, comment="対象年齢下限")
    age_to: Mapped[int] = mapped_column(Integer, nullable=False, comment="対象年齢上限")
    has_published_month: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False, comment="季節限定フラグ")
    month_from: Mapped[int] = mapped_column(Integer, nullable=True, comment="公開開始月")
    month_to: Mapped[int] = mapped_column(Integer, nullable=True, comment="公開終了月")

    subclass_type_ref = relationship("QuestTypesEntity", foreign_keys=[subclass_type])
    category = relationship("QuestCategoriesEntity", foreign_keys=[category_id])
    icon = relationship("IconsEntity", foreign_keys=[icon_id])

    @override
    @classmethod
    def _seed_data(cls) -> List[BaseEntity]:
        return [
            QuestsEntity(subclass_type=1, category_id=1, icon_id=1, age_from=6, age_to=12),
            QuestsEntity(subclass_type=1, category_id=2, icon_id=2, age_from=3, age_to=10),
            QuestsEntity(subclass_type=1, category_id=3, icon_id=3, age_from=5, age_to=15),
        ]

    @classmethod
    def from_model(cls, model) -> 'QuestsEntity':
        # 基本的なフィールドのみを設定（DB側で管理される項目は除く）
        return cls(
            id=model.id().value if model.id().value else None,
            version=model.version().value,
            # DB側で管理される項目（created_at, updated_at など）は含めない
        )

class QuestsTranslationEntity(BaseTranslationEntity):
    """クエスト翻訳エンティティ"""

    __tablename__ = "quests_translation"
    __table_args__ = (
        UniqueConstraint("quest_id", "language_id", name="uq_quests_translation_quest_language"),
        CheckConstraint("length(title) > 0", name="chk_quests_translation_title_not_empty"),
        CheckConstraint("length(client) > 0", name="chk_quests_translation_client_not_empty"),
    )

    quest_id: Mapped[int] = mapped_column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=False, comment="クエストID")
    title: Mapped[str] = mapped_column(String(200), nullable=False, comment="クエストタイトルの翻訳")
    client: Mapped[str] = mapped_column(String(100), nullable=False, comment="クライアント名の翻訳")
    request_detail: Mapped[str] = mapped_column(Text, nullable=True, comment="依頼詳細の翻訳")

    quest = relationship("QuestsEntity", foreign_keys=[quest_id])

    @override
    @classmethod
    def _seed_data(cls) -> List['BaseEntity']:
        return [
            QuestsTranslationEntity(quest_id=1, language_id=1, title="クエスト1", client="クライアントA", request_detail="依頼内容A"),
            QuestsTranslationEntity(quest_id=2, language_id=1, title="クエスト2", client="クライアントB", request_detail="依頼内容B"),
            QuestsTranslationEntity(quest_id=3, language_id=1, title="クエスト3", client="クライアントC", request_detail="依頼内容C"),
        ]
