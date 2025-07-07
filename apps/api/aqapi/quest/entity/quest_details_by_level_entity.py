from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, func, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import relationship
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.config.db_config import DB_CONF


class QuestDetailsByLevelEntity(BaseEntity):
    """クエスト詳細(レベル別)エンティティ"""

    __tablename__ = "quest_details_by_level"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("quest_id", "level", name="uq_quest_details_by_level_quest_level"),
        # レベルは0より大きい
        CheckConstraint("level > 0", name="chk_quest_details_by_level_level_positive"),
        # 成功条件は空文字不可
        CheckConstraint("length(success_criteria) > 0", name="chk_quest_details_by_level_success_criteria_not_empty"),
        # 目標回数は0より大きい
        CheckConstraint("target_count > 0", name="chk_quest_details_by_level_target_count_positive"),
        # 報酬は0以上
        CheckConstraint("reward >= 0", name="chk_quest_details_by_level_reward_non_negative"),
        # 子供経験値は0以上
        CheckConstraint("child_exp >= 0", name="chk_quest_details_by_level_child_exp_non_negative"),
        # クエスト経験値は0以上
        CheckConstraint("quest_exp >= 0", name="chk_quest_details_by_level_quest_exp_non_negative"),
    )

    quest_id = Column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=False, comment="クエストID")
    level = Column(Integer, nullable=False, comment="レベル")
    success_criteria = Column(Text, nullable=False, comment="成功条件")
    target_count = Column(Integer, nullable=False, comment="目標回数")
    reward = Column(Integer, nullable=False, comment="報酬金額")
    currency_id = Column(Integer, ForeignKey("currencies.id", ondelete="RESTRICT"), nullable=False, comment="通貨ID")
    child_exp = Column(Integer, nullable=False, comment="子供獲得経験値")
    quest_exp = Column(Integer, nullable=False, comment="クエスト獲得経験値")

    quest = relationship("QuestsEntity")
    currency = relationship("CurrenciesEntity")

class QuestDetailsByLevelTranslationEntity(BaseEntity):
    """クエスト詳細翻訳エンティティ"""

    __tablename__ = "quest_details_by_level_translation"
    __table_args__ = (
        UniqueConstraint("quest_details_by_level_id", "language_id", name="uq_quest_details_by_level_translation_details_language"),
    )

    quest_details_by_level_id = Column(Integer, ForeignKey("quest_details_by_level.id", ondelete="CASCADE"), nullable=False, comment="クエスト詳細ID")
    language_id = Column(Integer, ForeignKey("languages.id", ondelete="SET NULL"), nullable=False, comment="言語コード")
    success_criteria = Column(Text, nullable=False, comment="成功条件の翻訳")

    quest_details_by_level = relationship("QuestDetailsByLevelEntity")
    language = relationship("LanguagesEntity")
