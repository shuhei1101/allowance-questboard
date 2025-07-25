from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from aqapi.core.config.db_config import db_config
import uuid
from datetime import date

# 必要なエンティティをインポート
from aqapi.family.entity.families_entity import FamiliesEntity
from aqapi.family_member.entity.family_members_entity import FamilyMembersEntity
from aqapi.child.entity.children_entity import ChildrenEntity
from aqapi.quest.entity.quests_entity import QuestsEntity, QuestsTranslationEntity
from aqapi.quest.entity.family_quests_entity import FamilyQuestsEntity
from aqapi.quest.entity.quest_members_entity import QuestMembersEntity
from aqapi.quest.entity.shared_quests_entity import SharedQuestsEntity

class SampleSeedr:
    """サンプルデータを投入するクラス"""

    async def seed(self):
        """サンプルデータを投入"""
        print("サンプルデータを投入中...")
        async with db_config.SessionLocal() as session:
            try:
                # 以下ユーザはアプリ画面で登録しておくこと
                parent_uuid = uuid.UUID('70fea579-0870-4738-b3b4-ef3ecc471d9a')  # 私
                child1_uuid = uuid.UUID('70fea579-0870-4738-b3b4-ef3ecc471d9a')  # 私
                child2_uuid = uuid.UUID('4c0a0b33-11b2-4c2d-a1c5-e071b8bb4120')
                
                # 家族のサンプルデータ
                session.add_all([FamiliesEntity(id=1, name="テスト家族", icon_id=1)])
                await session.flush()

                # 家族メンバーのサンプルデータ
                session.add_all([
                    FamilyMembersEntity(id=1, user_id=parent_uuid, name="テスト親", icon_id=1, birthday=date(1990, 1, 1)),
                    FamilyMembersEntity(id=2, user_id=child1_uuid, name="テスト子供1", icon_id=2, birthday=date(2010, 1, 1)),
                    FamilyMembersEntity(id=3, user_id=child2_uuid, name="テスト子供2", icon_id=3, birthday=date(2012, 1, 1))
                ])
                await session.flush()

                # 子供エンティティのサンプルデータ
                session.add_all([
                    ChildrenEntity(id=1, family_id=1, family_member_id=2),
                    ChildrenEntity(id=2, family_id=1, family_member_id=3)
                ])
                await session.flush()

                # クエストのサンプルデータ
                session.add_all([
                    QuestsEntity(id=101, subclass_type=1, category_id=1, icon_id=1, age_from=3, age_to=18, has_published_month=False),
                    QuestsEntity(id=102, subclass_type=1, category_id=2, icon_id=2, age_from=3, age_to=18, has_published_month=False),
                    QuestsEntity(id=103, subclass_type=1, category_id=1, icon_id=3, age_from=3, age_to=18, has_published_month=False)
                ])
                await session.flush()

                # クエスト翻訳のサンプルデータ（日本語）
                session.add_all([
                    QuestsTranslationEntity(quest_id=101, language_id=1, title="お部屋のお掃除", client="ママ", request_detail="自分の部屋をキレイに片付けよう！"),
                    QuestsTranslationEntity(quest_id=102, language_id=1, title="食器洗い", client="パパ", request_detail="食事後の食器をキレイに洗おう！"),
                    QuestsTranslationEntity(quest_id=103, language_id=1, title="宿題を完了", client="ママ", request_detail="学校の宿題をしっかりと終わらせよう！")
                ])

                # 家族クエストのサンプルデータ
                session.add_all([
                    FamilyQuestsEntity(id=1, family_id=1, quest_id=101, is_public=True),
                    FamilyQuestsEntity(id=2, family_id=1, quest_id=102, is_public=True),
                    FamilyQuestsEntity(id=3, family_id=1, quest_id=103, is_public=False)
                ])
                await session.flush()

                # クエストメンバーのサンプルデータ
                session.add_all([
                    QuestMembersEntity(id=1, family_quest_id=1, member_id=1, status_id=1),
                    QuestMembersEntity(id=2, family_quest_id=3, member_id=1, status_id=1),
                    QuestMembersEntity(id=3, family_quest_id=2, member_id=2, status_id=1)
                ])

                # 共有クエストのサンプルデータ（全クエストに対して作成）
                session.add_all([
                    SharedQuestsEntity(id=1, quest_id=101, source_family_quest_id=1, shared_by=1, is_shared=True),
                    SharedQuestsEntity(id=2, quest_id=102, source_family_quest_id=2, shared_by=1, is_shared=False),
                    SharedQuestsEntity(id=3, quest_id=103, source_family_quest_id=3, shared_by=1, is_shared=False)
                ])

                await session.commit()
                print("サンプルデータの投入が完了しました ✨")

            except IntegrityError as e:
                await session.rollback()
                print(f"重複エラーでロールバックされました: {e}")
                raise
            except Exception as e:
                await session.rollback()
                print(f"サンプルデータ投入でエラーが発生しました: {e}")
                raise
