# from sqlalchemy.exc import IntegrityError
# from aqapi.core.config.db_config import DB_CONF
# from aqapi.api.v1.family.entity.families_entity import FamiliesEntity
# from aqapi.api.v1.child.entity.children_entity import ChildrenEntity
# from aqapi.api.v1.auth.entity.user_settings_entity import UserSettingsEntity
# from aqapi.api.v1.quest.entity.template_quest_categories_entity import (
#     TemplateQuestCategoriesEntity,
# )
# from aqapi.api.v1.quest.entity.template_quests_entity import TemplateQuestsEntity
# from aqapi.api.v1.quest.entity.quest_categories_entity import QuestCategoriesEntity
# from aqapi.api.v1.quest.entity.quests_entity import QuestsEntity
# from aqapi.api.v1.quest.entity.quests_translation_entity import QuestsTranslationEntity
# from aqapi.api.v1.quest.entity.quest_members_entity import QuestMembersEntity
# from aqapi.api.v1.allowance_tables.allowance_tables_entity import AllowanceTablesEntity
# from aqapi.api.v1.allowance_tables.family_allowance_tables_entity import (
#     FamilyAllowanceTablesEntity,
# )
# from aqapi.api.v1.allowance_tables.child_allowance_tables_entity import (
#     ChildAllowanceTablesEntity,
# )
# from aqapi.api.v1.allowance.entity.allowance_records_entity import (
#     AllowanceRecordsEntity,
# )
# from aqapi.api.v1.notification.entity.notifications_entity import NotificationsEntity
# from aqapi.api.v1.comment.entity.comments_entity import CommentsEntity
# import uuid
# from datetime import datetime, timedelta, date


# class SampleSeedr:

#     def seed(self):
#         """サンプルデータを投入"""
#         print("サンプルデータを投入中...")
#         session = DB_CONF.SessionLocal()
#         try:
#             FamiliesEntity.seed(session)
#             ChildrenEntity.seed(session)
#             UserSettingsEntity.seed(session)
#             TemplateQuestCategoriesEntity.seed(session)
#             TemplateQuestsEntity.seed(session)
#             QuestCategoriesEntity.seed(session)
#             QuestsEntity.seed(session)
#             QuestsTranslationEntity.seed(session)
#             QuestMembersEntity.seed(session)
#             AllowanceTablesEntity.seed(session)
#             FamilyAllowanceTablesEntity.seed(session)
#             ChildAllowanceTablesEntity.seed(session)
#             AllowanceRecordsEntity.seed(session)
#             NotificationsEntity.seed(session)
#             CommentsEntity.seed(session)

#             session.commit()
#             print("サンプルデータの投入が完了しました")

#         except IntegrityError as e:
#             session.rollback()
#             print(f"重複エラーでロールバックされました: {e}")
#         except Exception as e:
#             session.rollback()
#             print(f"サンプルデータ投入でエラーが発生しました: {e}")
#         finally:
#             session.close()
