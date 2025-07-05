# Issue #4: seed_dataメソッドが定義されていないエンティティの調査レポート 🔍

## 📋 調査概要
本レポートでは、`apps/api/aqapi`配下の全エンティティファイルを調査し、`seed_data`メソッドまたは`seed`メソッドが定義されていないエンティティを洗い出しました。

## 📊 調査対象
- **調査範囲**: `apps/api/aqapi/`配下の全エンティティファイル
- **調査方法**: 各ファイルで`def seed`、`def seed_data`、`def _seed_data`メソッドの有無を確認
- **総エンティティ数**: 60

## 🎯 調査結果サマリー
- ✅ **seedメソッドを持つエンティティ**: 23個
- ❌ **seedメソッドを持たないエンティティ**: 37個
- 🔄 **master_seedr.pyで使用中**: 24個
- 💤 **sample_seedr.pyで定義済み（コメントアウト）**: 15個

## ✅ seedメソッドを持つエンティティ一覧
以下のエンティティは既に`_seed_data`メソッドが定義されています：

- **AllowanceTableTypesEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/allowance_tables/entity/allowance_table_types_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/allowance_tables/entity/allowance_table_types_entity.py)
- **AllowanceableTableTypesEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/bank/entity/allowanceable_table_types_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/bank/entity/allowanceable_table_types_entity.py)
- **WithdrawalRequestStatusesEntity** (`_seed_data, _seed_data`) - [allowance-questboard/apps/api/aqapi/bank/entity/withdrawal_request_statuses_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/bank/entity/withdrawal_request_statuses_entity.py)
- **EducationsEntity** (`_seed_data, _seed_data`) - [allowance-questboard/apps/api/aqapi/child/entity/educations_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/child/entity/educations_entity.py)
- **CommentableTypesEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/comment/entity/commentable_types_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/comment/entity/commentable_types_entity.py)
- **NotifiableTypesEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/notification/entity/notifiable_types_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/notification/entity/notifiable_types_entity.py)
- **MemberQuestStatusesEntity** (`_seed_data, _seed_data`) - [allowance-questboard/apps/api/aqapi/quest/entity/child_quest_statuses_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/child_quest_statuses_entity.py)
- **MemberQuestsEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/quest/entity/child_quests_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/child_quests_entity.py)
- **QuestCategoryTypesEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/quest/entity/quest_category_types_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/quest_category_types_entity.py)
- **QuestRequestStatusesEntity** (`_seed_data, _seed_data`) - [allowance-questboard/apps/api/aqapi/quest/entity/quest_request_statuses_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/quest_request_statuses_entity.py)
- **QuestSubclassTableTypesEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/quest/entity/quest_subclass_table_types_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/quest_subclass_table_types_entity.py)
- **QuestsEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/quest/entity/quests_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/quests_entity.py)
- **TemplateQuestCategoriesEntity** (`_seed_data, _seed_data`) - [allowance-questboard/apps/api/aqapi/quest/entity/template_quest_categories_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/template_quest_categories_entity.py)
- **TemplateQuestsEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/quest/entity/template_quests_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/template_quests_entity.py)
- **ReportStatusesEntity** (`_seed_data, _seed_data`) - [allowance-questboard/apps/api/aqapi/report/entity/report_statuses_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/report/entity/report_statuses_entity.py)
- **ReportableTableTypesEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/report/entity/reportable_types_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/report/entity/reportable_types_entity.py)
- **CurrenciesEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/shared/entity/currencies_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/shared/entity/currencies_entity.py)
- **CurrencyByLanguageEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/shared/entity/currency_by_language_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/shared/entity/currency_by_language_entity.py)
- **ExchangeRatesEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/shared/entity/exchange_rates_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/shared/entity/exchange_rates_entity.py)
- **IconCategoriesEntity** (`_seed_data, _seed_data`) - [allowance-questboard/apps/api/aqapi/shared/entity/icon_categories_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/shared/entity/icon_categories_entity.py)
- **IconsEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/shared/entity/icons_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/shared/entity/icons_entity.py)
- **LanguagesEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/shared/entity/languages_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/shared/entity/languages_entity.py)
- **ScreensEntity** (`_seed_data`) - [allowance-questboard/apps/api/aqapi/shared/entity/screens_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/shared/entity/screens_entity.py)


## ❌ seedメソッドが定義されていないエンティティ一覧
以下の37個のエンティティでは、seedメソッドが定義されていません：

- **AllowanceByAgeEntity** - [allowance-questboard/apps/api/aqapi/allowance_tables/entity/allowance_by_age_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/allowance_tables/entity/allowance_by_age_entity.py)
- **AllowanceTablesEntity** - [allowance-questboard/apps/api/aqapi/allowance_tables/entity/allowance_tables_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/allowance_tables/entity/allowance_tables_entity.py)
- **ChildAllowanceTablesEntity** - [allowance-questboard/apps/api/aqapi/allowance_tables/entity/child_allowance_tables_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/allowance_tables/entity/child_allowance_tables_entity.py)
- **FamilyAllowanceTablesEntity** - [allowance-questboard/apps/api/aqapi/allowance_tables/entity/family_allowance_tables_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/allowance_tables/entity/family_allowance_tables_entity.py)
- **SharedAllowanceTablesEntity** - [allowance-questboard/apps/api/aqapi/allowance_tables/entity/shared_allowance_tables_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/allowance_tables/entity/shared_allowance_tables_entity.py)
- **UserSettingsEntity** - [allowance-questboard/apps/api/aqapi/auth/entity/user_settings_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/auth/entity/user_settings_entity.py)
- **AllowanceRecordsEntity** - [allowance-questboard/apps/api/aqapi/bank/entity/allowance_records_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/bank/entity/allowance_records_entity.py)
- **SavingsRecordsEntity** - [allowance-questboard/apps/api/aqapi/bank/entity/savings_records_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/bank/entity/savings_records_entity.py)
- **WithdrawalRequestsEntity** - [allowance-questboard/apps/api/aqapi/bank/entity/withdrawal_requests_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/bank/entity/withdrawal_requests_entity.py)
- **ChildGradesEntity** - [allowance-questboard/apps/api/aqapi/child/entity/child_grades_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/child/entity/child_grades_entity.py)
- **ChildSettingsEntity** - [allowance-questboard/apps/api/aqapi/child/entity/child_settings_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/child/entity/child_settings_entity.py)
- **MemberStatsesEntity** - [allowance-questboard/apps/api/aqapi/child/entity/child_stats_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/child/entity/child_stats_entity.py)
- **ChildrenEntity** - [allowance-questboard/apps/api/aqapi/child/entity/children_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/child/entity/children_entity.py)
- **EducationPeriodsEntity** - [allowance-questboard/apps/api/aqapi/child/entity/education_periods_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/child/entity/education_periods_entity.py)
- **CommentLikesEntity** - [allowance-questboard/apps/api/aqapi/comment/entity/comment_likes_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/comment/entity/comment_likes_entity.py)
- **CommentsEntity** - [allowance-questboard/apps/api/aqapi/comment/entity/comments_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/comment/entity/comments_entity.py)
- **ExpByLevelEntity** - [allowance-questboard/apps/api/aqapi/family/entity/exp_by_level_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/family/entity/exp_by_level_entity.py)
- **FamiliesEntity** - [allowance-questboard/apps/api/aqapi/family/entity/families_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/family/entity/families_entity.py)
- **FamilySettingsEntity** - [allowance-questboard/apps/api/aqapi/family/entity/family_settings_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/family/entity/family_settings_entity.py)
- **FollowsEntity** - [allowance-questboard/apps/api/aqapi/family/entity/follows_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/family/entity/follows_entity.py)
- **AllowanceByLevelEntity** - [allowance-questboard/apps/api/aqapi/level_tables/entity/allowance_by_level_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/level_tables/entity/allowance_by_level_entity.py)
- **ChildLevelTablesEntity** - [allowance-questboard/apps/api/aqapi/level_tables/entity/child_level_tables_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/level_tables/entity/child_level_tables_entity.py)
- **FamilyLevelTablesEntity** - [allowance-questboard/apps/api/aqapi/level_tables/entity/family_level_tables_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/level_tables/entity/family_level_tables_entity.py)
- **LevelTableTypesEntity** - [allowance-questboard/apps/api/aqapi/level_tables/entity/level_table_types_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/level_tables/entity/level_table_types_entity.py)
- **LevelTablesEntity** - [allowance-questboard/apps/api/aqapi/level_tables/entity/level_tables_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/level_tables/entity/level_tables_entity.py)
- **SharedLevelTablesEntity** - [allowance-questboard/apps/api/aqapi/level_tables/entity/shared_level_tables_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/level_tables/entity/shared_level_tables_entity.py)
- **NotificationsEntity** - [allowance-questboard/apps/api/aqapi/notification/entity/notifications_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/notification/entity/notifications_entity.py)
- **ParentsEntity** - [allowance-questboard/apps/api/aqapi/parent/entity/parents_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/parent/entity/parents_entity.py)
- **CustomQuestCategoriesEntity** - [allowance-questboard/apps/api/aqapi/quest/entity/custom_quest_categories_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/custom_quest_categories_entity.py)
- **FamilyQuestsEntity** - [allowance-questboard/apps/api/aqapi/quest/entity/family_quests_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/family_quests_entity.py)
- **QuestCategoriesEntity** - [allowance-questboard/apps/api/aqapi/quest/entity/quest_categories_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/quest_categories_entity.py)
- **QuestDetailsByLevelEntity** - [allowance-questboard/apps/api/aqapi/quest/entity/quest_details_by_level_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/quest_details_by_level_entity.py)
- **QuestExpByLevelEntity** - [allowance-questboard/apps/api/aqapi/quest/entity/quest_exp_by_level_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/quest_exp_by_level_entity.py)
- **QuestRequestsEntity** - [allowance-questboard/apps/api/aqapi/quest/entity/quest_requests_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/quest_requests_entity.py)
- **SavedQuestsEntity** - [allowance-questboard/apps/api/aqapi/quest/entity/saved_quests_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/saved_quests_entity.py)
- **SharedQuestsEntity** - [allowance-questboard/apps/api/aqapi/quest/entity/shared_quests_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/quest/entity/shared_quests_entity.py)
- **ReportsEntity** - [allowance-questboard/apps/api/aqapi/report/entity/reports_entity.py](https://github.com/shuhei1101/allowance-questboard/blob/main/allowance-questboard/apps/api/aqapi/report/entity/reports_entity.py)


## 🔄 現在master_seedr.pyで使用されているエンティティ
以下のエンティティがmaster_seedr.pyで実際に使用されています：

- ✅ **LanguagesEntity** - seedメソッド定義済み
- ✅ **CurrenciesEntity** - seedメソッド定義済み
- ✅ **CurrencyByLanguageEntity** - seedメソッド定義済み
- ✅ **IconCategoriesEntity** - seedメソッド定義済み
- ❌ **IconCategoriesTranslationEntity** - seedメソッド未定義または存在しない
- ✅ **IconsEntity** - seedメソッド定義済み
- ❌ **IconNameByPlatormEntity** - seedメソッド未定義または存在しない
- ❌ **UserTableTypesEntity** - seedメソッド未定義または存在しない
- ✅ **QuestSubclassTableTypesEntity** - seedメソッド定義済み
- ❌ **QuestCategorySubclassTableTypesEntity** - seedメソッド未定義または存在しない
- ✅ **AllowanceTableTypesEntity** - seedメソッド定義済み
- ✅ **AllowanceableTableTypesEntity** - seedメソッド定義済み
- ✅ **ReportStatusesEntity** - seedメソッド定義済み
- ❌ **ReportStatusesTranslationEntity** - seedメソッド未定義または存在しない
- ✅ **WithdrawalRequestStatusesEntity** - seedメソッド定義済み
- ✅ **NotifiableTypesEntity** - seedメソッド定義済み
- ✅ **ReportableTableTypesEntity** - seedメソッド定義済み
- ✅ **EducationsEntity** - seedメソッド定義済み
- ❌ **EducationsTranslationEntity** - seedメソッド未定義または存在しない
- ✅ **ExchangeRatesEntity** - seedメソッド定義済み
- ✅ **QuestRequestStatusesEntity** - seedメソッド定義済み
- ❌ **QuestRequestStatusesTranslationEntity** - seedメソッド未定義または存在しない
- ✅ **MemberQuestStatusesEntity** - seedメソッド定義済み
- ✅ **ScreensEntity** - seedメソッド定義済み


## 💤 sample_seedr.pyで定義されているエンティティ（現在コメントアウト中）
以下のエンティティがsample_seedr.pyで定義されていますが、現在はコメントアウトされています：

- **FamiliesEntity**
- **ChildrenEntity**
- **UserSettingsEntity**
- **TemplateQuestCategoriesEntity**
- **TemplateQuestsEntity**
- **QuestCategoriesEntity**
- **QuestsEntity**
- **QuestsTranslationEntity**
- **MemberQuestsEntity**
- **AllowanceTablesEntity**
- **FamilyAllowanceTablesEntity**
- **ChildAllowanceTablesEntity**
- **AllowanceRecordsEntity**
- **NotificationsEntity**
- **CommentsEntity**


## 🚨 注意事項・問題点

### 1. master_seedr.pyのimportパス問題
現在のmaster_seedr.pyは`aqapi.api.v1.master.entity.*`のようなパスからimportしようとしていますが、実際のファイルは`aqapi.shared.entity.*`や`aqapi.bank.entity.*`などに配置されています。

### 2. 存在しないエンティティ
以下のエンティティがmaster_seedr.pyで使用されていますが、実際のファイルが見つかりません：
- IconNameByPlatormEntity
- UserTableTypesEntity  
- QuestCategorySubclassTableTypesEntity

### 3. seedメソッドの命名規則
現在存在するエンティティでは`_seed_data`メソッドが使用されていますが、master_seedr.pyでは`seed`メソッドを呼び出しています。

## 📝 推奨事項

1. **seedメソッドが未定義のエンティティに`_seed_data`メソッドを追加**
2. **master_seedr.pyのimportパスを修正**
3. **存在しないエンティティの確認と対応**
4. **命名規則の統一（`seed`メソッドまたは`_seed_data`メソッド）**

## 📅 調査実施日
{Path.cwd().name}で調査実施
