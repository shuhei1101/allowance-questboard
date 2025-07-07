from sqlalchemy.exc import IntegrityError

from aqapi.allowance_tables.entity.allowance_table_types_entity import AllowanceTableTypesEntity
from aqapi.bank.entity.allowanceable_types_entity import AllowanceableTypesEntity
from aqapi.bank.entity.withdrawal_request_statuses_entity import WithdrawalRequestStatusesEntity, WithdrawalRequestStatusesTranslationEntity
from aqapi.child.entity.educations_entity import EducationsEntity, EducationsTranslationEntity
from aqapi.core.config.db_config import DB_CONF
from aqapi.family.entity.family_member_types import FamilyMemberTypesEntity
from aqapi.notification.entity.notifiable_types_entity import NotifiableTypesEntity
from aqapi.quest.entity.child_quest_statuses_entity import MemberQuestStatusesEntity, MemberQuestStatusesTranslationEntity
from aqapi.quest.entity.quest_category_types_entity import QuestCategoryTypesEntity
from aqapi.quest.entity.quest_request_statuses_entity import QuestRequestStatusesEntity, QuestRequestStatusesTranslationEntity
from aqapi.quest.entity.quest_types_entity import QuestTypesEntity
from aqapi.report.entity.report_statuses_entity import ReportStatusesEntity, ReportStatusesTranslationEntity
from aqapi.report.entity.reportable_types_entity import ReportableTableTypesEntity
from aqapi.shared.entity.currencies_entity import CurrenciesEntity
from aqapi.shared.entity.currency_by_language_entity import CurrencyByLanguageEntity
from aqapi.shared.entity.exchange_rates_entity import ExchangeRatesEntity
from aqapi.shared.entity.icon_categories_entity import IconCategoriesEntity, IconCategoriesTranslationEntity
from aqapi.shared.entity.icon_platform_keys import IconNameByPlatormEntity
from aqapi.shared.entity.icon_platforms import IconPlatforms
from aqapi.shared.entity.icons_entity import IconsEntity
from aqapi.shared.entity.languages_entity import LanguagesEntity
from aqapi.shared.entity.screens_entity import ScreensEntity

class MasterSeedr:

    def seed(self):
        """マスタデータを投入"""
        print("マスタデータを投入中...")
        session = DB_CONF.SessionLocal()
        try:
            LanguagesEntity.seed(session)
            CurrenciesEntity.seed(session)
            CurrencyByLanguageEntity.seed(session)
            IconCategoriesEntity.seed(session)
            IconCategoriesTranslationEntity.seed(session)
            IconsEntity.seed(session)
            IconPlatforms.seed(session)
            IconNameByPlatormEntity.seed(session)
            FamilyMemberTypesEntity.seed(session)
            QuestTypesEntity.seed(session)
            QuestCategoryTypesEntity.seed(session)
            AllowanceTableTypesEntity.seed(session)
            AllowanceableTypesEntity.seed(session)
            ReportStatusesEntity.seed(session)
            ReportStatusesTranslationEntity.seed(session)
            WithdrawalRequestStatusesEntity.seed(session)
            WithdrawalRequestStatusesTranslationEntity.seed(session)
            NotifiableTypesEntity.seed(session)
            ReportableTableTypesEntity.seed(session)
            EducationsEntity.seed(session)
            EducationsTranslationEntity.seed(session)
            ExchangeRatesEntity.seed(session)
            QuestRequestStatusesEntity.seed(session)
            QuestRequestStatusesTranslationEntity.seed(session)
            MemberQuestStatusesEntity.seed(session)
            MemberQuestStatusesTranslationEntity.seed(session)
            ScreensEntity.seed(session)

            session.commit()
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
