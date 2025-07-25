from sqlalchemy.exc import IntegrityError

from aqapi.allowance_tables.entity.allowance_table_types_entity import AllowanceTableTypesEntity
from aqapi.bank.entity.allowanceable_types_entity import AllowanceableTypesEntity
from aqapi.bank.entity.withdrawal_request_statuses_entity import WithdrawalRequestStatusesEntity, WithdrawalRequestStatusesTranslationEntity
from aqapi.child.entity.educations_entity import EducationsEntity, EducationsTranslationEntity
from aqapi.core.config.db_config import db_config
from aqapi.notification.entity.notifiable_types_entity import NotifiableTypesEntity
from aqapi.quest.entity.quest_categories_entity import QuestCategoriesEntity
from aqapi.quest.entity.quest_member_statuses_entity import QuestMemberStatusesEntity, MemberQuestStatusesTranslationEntity
from aqapi.quest.entity.quest_category_types_entity import QuestCategoryTypesEntity
from aqapi.quest.entity.quest_request_statuses_entity import QuestRequestStatusesEntity, QuestRequestStatusesTranslationEntity
from aqapi.quest.entity.quest_types_entity import QuestTypesEntity
from aqapi.quest.entity.quests_entity import QuestsEntity
from aqapi.quest.entity.template_quest_categories_entity import TemplateQuestCategoriesEntity
from aqapi.quest.entity.template_quests_entity import TemplateQuestsEntity
from aqapi.report.entity.report_statuses_entity import ReportStatusesEntity, ReportStatusesTranslationEntity
from aqapi.report.entity.reportable_types_entity import ReportableTypesEntity
from aqapi.shared.entity.currencies_entity import CurrenciesEntity
from aqapi.shared.entity.currency_by_language_entity import CurrencyByLanguageEntity
from aqapi.shared.entity.exchange_rates_entity import ExchangeRatesEntity
from aqapi.shared.entity.screens_entity import ScreensEntity
from aqapi.language.entity.languages_entity import LanguagesEntity
from aqapi.icon_category.entity.icon_categories_entity import IconCategoriesEntity, IconCategoriesTranslationEntity
from aqapi.icon.entity.icons_entity import IconsEntity
from aqapi.icon.entity.icon_platforms import IconPlatforms
from aqapi.icon.entity.icon_platform_keys import IconNameByPlatormEntity
from aqapi.family_member.entity.family_member_types_entity import FamilyMemberTypesEntity

class MasterSeedr:

    async def seed(self):
        """マスタデータを投入"""
        print("マスタデータを投入中...")
        async with db_config.SessionLocal() as session:
            try:
                await self._seed_and_commit(session, LanguagesEntity)
                await self._seed_and_commit(session, CurrenciesEntity)
                await self._seed_and_commit(session, CurrencyByLanguageEntity)
                await self._seed_and_commit(session, IconCategoriesEntity)
                await self._seed_and_commit(session, IconCategoriesTranslationEntity)
                await self._seed_and_commit(session, IconsEntity)
                await self._seed_and_commit(session, IconPlatforms)
                await self._seed_and_commit(session, IconNameByPlatormEntity)
                await self._seed_and_commit(session, FamilyMemberTypesEntity)
                await self._seed_and_commit(session, QuestTypesEntity)
                await self._seed_and_commit(session, QuestCategoryTypesEntity)
                await self._seed_and_commit(session, AllowanceTableTypesEntity)
                await self._seed_and_commit(session, AllowanceableTypesEntity)
                await self._seed_and_commit(session, ReportStatusesEntity)
                await self._seed_and_commit(session, ReportStatusesTranslationEntity)
                await self._seed_and_commit(session, WithdrawalRequestStatusesEntity)
                await self._seed_and_commit(session, WithdrawalRequestStatusesTranslationEntity)
                await self._seed_and_commit(session, NotifiableTypesEntity)
                await self._seed_and_commit(session, ReportableTypesEntity)
                await self._seed_and_commit(session, EducationsEntity)
                await self._seed_and_commit(session, EducationsTranslationEntity)
                await self._seed_and_commit(session, ExchangeRatesEntity)
                await self._seed_and_commit(session, QuestRequestStatusesEntity)
                await self._seed_and_commit(session, QuestRequestStatusesTranslationEntity)
                await self._seed_and_commit(session, QuestMemberStatusesEntity)
                await self._seed_and_commit(session, MemberQuestStatusesTranslationEntity)
                await self._seed_and_commit(session, ScreensEntity)
                await self._seed_and_commit(session, QuestCategoriesEntity)
                await self._seed_and_commit(session, TemplateQuestCategoriesEntity)
                await self._seed_and_commit(session, QuestsEntity)
                await self._seed_and_commit(session, TemplateQuestsEntity)

                print("マスタデータの投入が完了しました")

            except IntegrityError as e:
                await session.rollback()
                print(f"重複エラーでロールバックされました: {e}")
                raise
            except Exception as e:
                await session.rollback()
                print(f"マスタデータ投入でエラーが発生しました: {e}")
                raise


    async def _seed_and_commit(self, session, entity_class):
        """エンティティのシードデータを投入しコミット"""
        await entity_class.seed(session)
        await session.commit()
