# TypeScript Entity 作業進捗状況 ✨


## 📋 作業ルール
- すでに作成されている場合、命名規則や記述が正しいことを確認し修正すること

- 翻訳テーブルは通常エンティティと同じファイルに記述
- 履歴テーブルも通常エンティティと同じファイルに記述
- FastAPIのPythonエンティティを参考に実装
- TypeORMの規約に従ってアノテーション記述
- シードデータも忘れずに実装
- ファイル名: {テーブル名の単数形}Entity.ts
- クラス名: {テーブル名の単数形}Entity



### 🏗️ 基底クラス
- [ ] AppBaseEntityEntity（既存）
- [ ] BaseTranslationEntity
- [ ] BaseHistoryEntity

### 🔧 共通/システム系
- [ ] ScreenEntityEntity（screens）
- [x] LanguageEntity（languages）

### 👥 ユーザ/家族管理系
- [x] FamilyMemberEntity（family_members）
- [x] FamilyMemberHistoryEntity（family_members_history）
- [x] FamilyEntity（families）
- [x] ParentEntity（parents）
- [x] ChildEntity（children）

### 🎨 アイコン/UI系
- [x] IconCategoryEntity（icon_categories）
- [x] IconCategoryTranslationEntity（icon_categories_translations）
- [x] IconEntity（icons）

### 💰 お小遣いテーブル系
- [x] AllowanceByAgeEntity（allowance_by_age）

## 📝 作成待ちエンティティ

### 🔗 認証/ログイン系
- [ ] UserSettingsEntity（user_settings）

### 👥 家族メンバー系
- [ ] FamilyMemberTypesEntity（family_member_types）

### 💰 通貨/為替系
- [ ] CurrenciesEntity（currencies）
- [ ] CurrencyByLanguageEntity（currency_by_language）
- [ ] ExchangeRatesEntity（exchange_rates）

### 🔄 通知系
- [ ] NotificationsEntity（notifications）

### 🎯 クエスト系
- [ ] QuestsEntity（quests）
- [ ] QuestTranslationEntity（quests_translation）
- [ ] QuestTypesEntity（quest_types）
- [ ] QuestMemberStatusesEntity（quest_member_statuses）
- [ ] QuestMemberStatusTranslationEntity（quest_member_statuses_translation）
- [ ] QuestCategoriesEntity（quest_categories）
- [ ] QuestCategoryTypesEntity（quest_category_types）
- [ ] QuestCategoryTranslationEntity（quest_categories_translation）
- [ ] QuestMembersEntity（quest_members）
- [ ] QuestRequestsEntity（quest_requests）
- [ ] QuestRequestStatusesEntity（quest_request_statuses）
- [ ] QuestDetailsByLevelEntity（quest_details_by_level）
- [ ] QuestExpByLevelEntity（quest_exp_by_level）
- [ ] FamilyQuestsEntity（family_quests）
- [ ] SharedQuestsEntity（shared_quests）
- [ ] TemplateQuestsEntity（template_quests）
- [ ] SavedQuestsEntity（saved_quests）
- [ ] CustomQuestCategoriesEntity（custom_quest_categories）
- [ ] TemplateQuestCategoriesEntity（template_quest_categories）

### 👶 子供管理系
- [ ] ChildSettingsEntity（child_settings）
- [ ] ChildSettingsHistoryEntity（child_settings_history）
- [ ] ChildStatusesEntity（child_statuses）
- [ ] EducationsEntity（educations）
- [ ] ChildGradesEntity（child_grades）
- [ ] EducationPeriodsEntity（education_periods）

### 📊 レベルテーブル系
- [ ] LevelTablesEntity（level_tables）
- [ ] LevelTableTypesEntity（level_table_types）
- [ ] SharedLevelTablesEntity（shared_level_tables）
- [ ] FamilyLevelTablesEntity（family_level_tables）
- [ ] ChildLevelTablesEntity（child_level_tables）
- [ ] AllowanceByLevelEntity（allowance_by_level）

### 🏦 銀行/お小遣い系
- [ ] AllowanceRecordsEntity（allowance_records）
- [ ] SavingsRecordsEntity（savings_records）
- [ ] AllowanceableTypesEntity（allowanceable_types）
- [ ] WithdrawalRequestsEntity（withdrawal_requests）
- [ ] WithdrawalRequestStatusesEntity（withdrawal_request_statuses）

### 💬 コメント系
- [ ] CommentsEntity（comments）
- [ ] CommentsHistoryEntity（comments_history）

###  レポート系
- [ ] ReportStatusesEntity（report_statuses）
- [ ] ReportableTypesEntity（reportable_types）
- [ ] ReportsEntity（reports）

###  お小遣いテーブル系
- [ ] AllowanceTableTypesEntity（allowance_table_types）
- [ ] FamilyAllowanceTablesEntity（family_allowance_tables）
