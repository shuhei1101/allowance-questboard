from sqlalchemy.exc import IntegrityError

from aqapi.allowance_tables.entity.allowance_table_types_entity import AllowanceTableTypesEntity
from aqapi.bank.entity.allowanceable_types_entity import AllowanceableTypesEntity
from aqapi.bank.entity.withdrawal_request_statuses_entity import WithdrawalRequestStatusesEntity, WithdrawalRequestStatusesTranslationEntity
from aqapi.child.entity.educations_entity import EducationsEntity, EducationsTranslationEntity
from aqapi.core.config.db_config import DB_CONF
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

    def seed(self):
        """マスタデータを投入"""
        print("マスタデータを投入中...")
        session = DB_CONF.SessionLocal()
        try:
            self._seed_and_commit(session, LanguagesEntity)
            self._seed_and_commit(session, CurrenciesEntity)
            self._seed_and_commit(session, CurrencyByLanguageEntity)
            self._seed_and_commit(session, IconCategoriesEntity)
            self._seed_and_commit(session, IconCategoriesTranslationEntity)
            self._seed_and_commit(session, IconsEntity)
            self._seed_and_commit(session, IconPlatforms)
            self._seed_and_commit(session, IconNameByPlatormEntity)
            self._seed_and_commit(session, FamilyMemberTypesEntity)
            self._seed_and_commit(session, QuestTypesEntity)
            self._seed_and_commit(session, QuestCategoryTypesEntity)
            self._seed_and_commit(session, AllowanceTableTypesEntity)
            self._seed_and_commit(session, AllowanceableTypesEntity)
            self._seed_and_commit(session, ReportStatusesEntity)
            self._seed_and_commit(session, ReportStatusesTranslationEntity)
            self._seed_and_commit(session, WithdrawalRequestStatusesEntity)
            self._seed_and_commit(session, WithdrawalRequestStatusesTranslationEntity)
            self._seed_and_commit(session, NotifiableTypesEntity)
            self._seed_and_commit(session, ReportableTypesEntity)
            self._seed_and_commit(session, EducationsEntity)
            self._seed_and_commit(session, EducationsTranslationEntity)
            self._seed_and_commit(session, ExchangeRatesEntity)
            self._seed_and_commit(session, QuestRequestStatusesEntity)
            self._seed_and_commit(session, QuestRequestStatusesTranslationEntity)
            self._seed_and_commit(session, QuestMemberStatusesEntity)
            self._seed_and_commit(session, MemberQuestStatusesTranslationEntity)
            self._seed_and_commit(session, ScreensEntity)
            self._seed_and_commit(session, QuestCategoriesEntity)
            self._seed_and_commit(session, TemplateQuestCategoriesEntity)
            self._seed_and_commit(session, QuestsEntity)
            self._seed_and_commit(session, TemplateQuestsEntity)

            print("マスタデータの投入が完了しました")

        except IntegrityError as e:
            session.rollback()
            print(f"重複エラーでロールバックされました: {e}")
            raise
        except Exception as e:
            session.rollback()
            print(f"マスタデータ投入でエラーが発生しました: {e}")
            raise
        finally:
            session.close()


    def _seed_and_commit(self, session, entity_class):
        """エンティティのシードデータを投入しコミット"""
        entity_class.seed(session)
        session.commit()
