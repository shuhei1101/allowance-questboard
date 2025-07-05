from sqlalchemy.exc import IntegrityError
from aqapi.api.v1.allowance_tables.entity.allowance_table_types_entity import (
    AllowanceTableTypesEntity,
)
from aqapi.api.v1.master.entity.currency_by_language_entity import (
    CurrencyByLanguageEntity,
)
from aqapi.api.v1.master.entity.educations_translation_entity import (
    EducationsTranslationEntity,
)
from aqapi.api.v1.master.entity.icon_categories_translation_entity import (
    IconCategoriesTranslationEntity,
)
from aqapi.api.v1.master.entity.icon_platform_keys import IconNameByPlatormEntity
from aqapi.api.v1.master.entity.icon_platforms import IconPlatforms
from aqapi.api.v1.master.entity.report_statuses_translation_entity import (
    ReportStatusesTranslationEntity,
)
from aqapi.api.v1.quest.entity.quest_request_statuses_translation_entity import (
    QuestRequestStatusesTranslationEntity,
)
from aqapi.core.config.db_config import DB_CONF
from aqapi.api.v1.master.entity.languages_entity import LanguagesEntity
from aqapi.api.v1.master.entity.currencies_entity import CurrenciesEntity
from aqapi.api.v1.master.entity.icon_categories_entity import IconCategoriesEntity
from aqapi.api.v1.master.entity.icons_entity import IconsEntity
from aqapi.api.v1.master.entity.user_table_types_entity import UserTableTypesEntity
from aqapi.api.v1.quest.entity.quest_subclass_table_types_entity import (
    QuestSubclassTableTypesEntity,
)
from aqapi.api.v1.quest.entity.quest_category_types_entity import (
    QuestCategorySubclassTableTypesEntity,
)
from aqapi.api.v1.master.entity.allowanceable_table_types_entity import (
    AllowanceableTableTypesEntity,
)
from aqapi.api.v1.master.entity.report_statuses_entity import ReportStatusesEntity
from aqapi.api.v1.master.entity.withdrawal_request_statuses_entity import (
    WithdrawalRequestStatusesEntity,
)
from aqapi.api.v1.notification.entity.notifiable_types_entity import (
    NotifiableTypesEntity,
)
from aqapi.api.v1.master.entity.reportable_types_entity import (
    ReportableTableTypesEntity,
)
from aqapi.api.v1.master.entity.educations_entity import EducationsEntity
from aqapi.api.v1.master.entity.exchange_rates_entity import ExchangeRatesEntity
from aqapi.api.v1.quest.entity.quest_request_statuses_entity import (
    QuestRequestStatusesEntity,
)
from aqapi.api.v1.quest.entity.child_quest_statuses_entity import (
    MemberQuestStatusesEntity,
)
from aqapi.api.v1.master.entity.screens_entity import ScreensEntity


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
            UserTableTypesEntity.seed(session)
            QuestSubclassTableTypesEntity.seed(session)
            QuestCategorySubclassTableTypesEntity.seed(session)
            AllowanceTableTypesEntity.seed(session)
            AllowanceableTableTypesEntity.seed(session)
            ReportStatusesEntity.seed(session)
            ReportStatusesTranslationEntity.seed(session)
            WithdrawalRequestStatusesEntity.seed(session)
            NotifiableTypesEntity.seed(session)
            ReportableTableTypesEntity.seed(session)
            EducationsEntity.seed(session)
            EducationsTranslationEntity.seed(session)
            ExchangeRatesEntity.seed(session)
            QuestRequestStatusesEntity.seed(session)
            QuestRequestStatusesTranslationEntity.seed(session)
            MemberQuestStatusesEntity.seed(session)
            ScreensEntity.seed(session)

            session.commit()
            print("マスタデータの投入が完了しました")

        except IntegrityError as e:
            session.rollback()
            print(f"重複エラーでロールバックされました: {e}")
        except Exception as e:
            session.rollback()
            print(f"マスタデータ投入でエラーが発生しました: {e}")
        finally:
            session.close()
