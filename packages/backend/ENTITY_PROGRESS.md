# TypeScript Entity 作業進捗状況 ✨

## 基本エンティティ (Core)
| No  | Entity名                | FastAPI | TypeScript          | 備考             |
| --- | ----------------------- | ------- | ------------------- | ---------------- |
| 1   | `BaseEntity`            | ◯       | ◯ (`AppBaseEntity`) | 基底クラス       |
| 2   | `BaseHistoryEntity`     | ◯       | ◯                   | 履歴用基底クラス |
| 3   | `BaseTranslationEntity` | ◯       | ◯                   | 翻訳用基底クラス |

## 言語・通貨・為替関連
| No  | Entity名                   | FastAPI | TypeScript           | 備考       |
| --- | -------------------------- | ------- | -------------------- | ---------- |
| 4   | `LanguagesEntity`          | ◯       | ◯ (`LanguageEntity`) | 言語マスタ |
| 5   | `CurrenciesEntity`         | ◯       | ◯ (`CurrencyEntity`) | 通貨マスタ |
| 6   | `CurrencyByLanguageEntity` | ◯       | ✅ (完了)                | 言語別通貨 |
| 7   | `ExchangeRatesEntity`      | ◯       | ✅ (完了)                | 為替レート |

## アイコン関連
| No  | Entity名                          | FastAPI | TypeScript               | 備考                         |
| --- | --------------------------------- | ------- | ------------------------ | ---------------------------- |
| 8   | `IconCategoriesEntity`            | ◯       | ◯ (`IconCategoryEntity`) | アイコンカテゴリ             |
| 9   | `IconCategoriesTranslationEntity` | ◯       | ✅ (完了)               | アイコンカテゴリ翻訳         |
| 10  | `IconsEntity`                     | ◯       | ◯ (`IconEntity`)         | アイコン                     |
| 11  | `IconPlatforms`                   | ◯       | ✅ (完了)                | アイコンプラットフォーム     |
| 12  | `IconNameByPlatormEntity`         | ◯       | ✅ (完了)                | プラットフォーム別アイコン名 |

## 家族・メンバー関連
| No  | Entity名                     | FastAPI | TypeScript                   | 備考               |
| --- | ---------------------------- | ------- | ---------------------------- | ------------------ |
| 13  | `FamiliesEntity`             | ◯       | ◯ (`FamilyEntity`)           | 家族               |
| 14  | `FamiliesHistoryEntity`      | ◯       | ✅ (完了)                | 家族履歴           |
| 15  | `FamilyMemberTypesEntity`    | ◯       | ◯ (`FamilyMemberTypeEntity`) | 家族メンバータイプ |
| 16  | `FamilyMembersEntity`        | ◯       | ◯ (`FamilyMemberEntity`)     | 家族メンバー       |
| 17  | `FamilyMembersHistoryEntity` | ◯       | ✅ (完了)               | 家族メンバー履歴   |
| 18  | `ParentsEntity`              | ◯       | ◯ (`ParentEntity`)           | 親                 |
| 19  | `ChildrenEntity`             | ◯       | ◯ (`ChildEntity`)            | 子供               |

## 子供関連
| No  | Entity名                      | FastAPI | TypeScript                  | 備考           |
| --- | ----------------------------- | ------- | --------------------------- | -------------- |
| 20  | `ChildStatusesEntity`         | ◯       | ◯ (`ChildStatusEntity`)     | 子供ステータス |
| 21  | `ChildSettingsEntity`         | ◯       | ◯ (`ChildSettingEntity`)    | 子供設定       |
| 22  | `ChildSettingsHistoryEntity`  | ◯       | ✅ (完了)               | 子供設定履歴   |
| 23  | `EducationsEntity`            | ◯       | ◯ (`EducationEntity`)       | 教育           |
| 24  | `EducationsTranslationEntity` | ◯       | ✅ (完了)               | 教育翻訳       |
| 24  | `EducationsTranslationEntity` | ◯       | ❌                          | 教育翻訳       |
| 25  | `EducationPeriodsEntity`      | ◯       | ◯ (`EducationPeriodEntity`) | 教育期間       |
| 26  | `ChildGradesEntity`           | ◯       | ◯ (`ChildGradeEntity`)      | 子供学年       |

## クエスト関連
| No  | Entity名                             | FastAPI | TypeScript                        | 備考                         |
| --- | ------------------------------------ | ------- | --------------------------------- | ---------------------------- |
| 27  | `QuestTypesEntity`                   | ◯       | ◯ (`QuestTypeEntity`)             | クエストタイプ               |
| 28  | `QuestCategoryTypesEntity`           | ◯       | ◯ (`QuestCategoryTypeEntity`)     | クエストカテゴリタイプ       |
| 29  | `QuestCategoriesEntity`              | ◯       | ◯ (`QuestCategoryEntity`)         | クエストカテゴリ             |
| 30  | `QuestCategoriesTranslationEntity`   | ◯       | ✅ (完了)                     | クエストカテゴリ翻訳         |
| 31  | `QuestsEntity`                       | ◯       | ◯ (`QuestEntity`)                 | クエスト                     |
| 32  | `QuestsTranslationEntity`            | ◯       | ✅ (完了)                     | クエスト翻訳                 |
| 33  | `QuestDetailsLevelEntity`            | ◯       | ◯ (`QuestDetailsByLevelEntity`)   | レベル別クエスト詳細         |
| 34  | `QuestDetailsLevelTranslationEntity` | ◯       | ✅ (完了)                     | レベル別クエスト詳細翻訳     |
| 35  | `QuestExpByLevelEntity`              | ◯       | ◯                                 | クエスト経験値               |
| 36  | `FamilyQuestsEntity`                 | ◯       | ◯ (`FamilyQuestEntity`)           | 家族クエスト                 |
| 37  | `SharedQuestsEntity`                 | ◯       | ◯ (`SharedQuestEntity`)           | 共有クエスト                 |
| 38  | `SavedQuestsEntity`                  | ◯       | ◯ (`SavedQuestEntity`)            | 保存クエスト                 |
| 39  | `TemplateQuestCategoriesEntity`      | ◯       | ◯ (`TemplateQuestCategoryEntity`) | テンプレートクエストカテゴリ |
| 40  | `TemplateQuestsEntity`               | ◯       | ◯ (`TemplateQuestEntity`)         | テンプレートクエスト         |
| 41  | `CustomQuestCategoriesEntity`        | ◯       | ◯ (`CustomQuestCategoryEntity`)   | カスタムクエストカテゴリ     |

## クエスト申請・メンバー関連
| No  | Entity名                                | FastAPI | TypeScript                     | 備考                           |
| --- | --------------------------------------- | ------- | ------------------------------ | ------------------------------ |
| 42  | `QuestRequestStatusesEntity`            | ◯       | ◯ (`QuestRequestStatusEntity`) | クエスト申請ステータス         |
| 43  | `QuestRequestStatusesTranslationEntity` | ◯       | ✅ (完了)                  | クエスト申請ステータス翻訳     |
| 44  | `QuestRequestsEntity`                   | ◯       | ◯ (`QuestRequestsEntity`)      | クエスト申請                   |
| 45  | `QuestRequestsHistoryEntity`            | ◯       | ✅ (完了)                  | クエスト申請履歴               |
| 46  | `QuestMemberStatusesEntity`             | ◯       | ◯ (`QuestMemberStatusEntity`)  | クエストメンバーステータス     |
| 47  | `QuestMemberStatusesTranslationEntity`  | ◯       | ✅ (完了)                  | クエストメンバーステータス翻訳 |
| 48  | `QuestMembersEntity`                    | ◯       | ◯ (`QuestMembersEntity`)       | クエストメンバー               |
| 49  | `QuestMembersHistoryEntity`             | ◯       | ✅ (完了)                  | クエストメンバー履歴           |

## お小遣い・レベルテーブル関連
| No  | Entity名                             | FastAPI | TypeScript                       | 備考                     |
| --- | ------------------------------------ | ------- | -------------------------------- | ------------------------ |
| 50  | `AllowanceTableTypesEntity`          | ◯       | ◯ (`AllowanceTableTypeEntity`)   | お小遣いテーブルタイプ   |
| 51  | `AllowanceTablesEntity`              | ◯       | ✅ (完了)                    | お小遣いテーブル         |
| 52  | `AllowanceByAgeEntity`               | ◯       | ◯                                | 年齢別お小遣い           |
| 53  | `AllowanceByAgeHistoryEntity`        | ◯       | ✅ (完了)                        | 年齢別お小遣い履歴       |
| 54  | `FamilyAllowanceTablesEntity`        | ◯       | ◯ (`FamilyAllowanceTableEntity`) | 家族お小遣いテーブル     |
| 55  | `FamilyAllowanceTablesHistoryEntity` | ◯       | ✅ (完了)                        | 家族お小遣いテーブル履歴 |
| 56  | `LevelTableTypesEntity`              | ◯       | ◯ (`LevelTableTypeEntity`)       | レベルテーブルタイプ     |
| 57  | `LevelTablesEntity`                  | ◯       | ◯ (`LevelTableEntity`)           | レベルテーブル           |
| 58  | `FamilyLevelTablesEntity`            | ◯       | ◯ (`FamilyLevelTableEntity`)     | 家族レベルテーブル       |
| 59  | `SharedLevelTablesEntity`            | ◯       | ◯ (`SharedLevelTableEntity`)     | 共有レベルテーブル       |
| 60  | `ChildLevelTablesEntity`             | ◯       | ◯ (`ChildLevelTableEntity`)      | 子供レベルテーブル       |
| 61  | `AllowanceByLevelEntity`             | ◯       | ◯                                | レベル別お小遣い         |

## 銀行・お小遣い記録関連
| No  | Entity名                                     | FastAPI | TypeScript                          | 備考                       |
| --- | -------------------------------------------- | ------- | ----------------------------------- | -------------------------- |
| 62  | `AllowanceableTypesEntity`                   | ◯       | ◯ (`AllowanceableTypeEntity`)       | お小遣い対象タイプ         |
| 63  | `AllowanceRecordsEntity`                     | ◯       | ◯ (`AllowanceRecordEntity`)         | お小遣い記録               |
| 64  | `SavingsRecordsEntity`                       | ◯       | ◯ (`SavingsRecordEntity`)           | 貯金記録                   |
| 65  | `WithdrawalRequestStatusesEntity`            | ◯       | ◯ (`WithdrawalRequestStatusEntity`) | 引き出し申請ステータス     |
| 66  | `WithdrawalRequestStatusesTranslationEntity` | ◯       | ✅ (完了)                       | 引き出し申請ステータス翻訳 |
| 67  | `WithdrawalRequestsEntity`                   | ◯       | ◯ (`WithdrawalRequestEntity`)       | 引き出し申請               |

## レポート・通知関連
| No  | Entity名                          | FastAPI | TypeScript                 | 備考                   |
| --- | --------------------------------- | ------- | -------------------------- | ---------------------- |
| 68  | `ReportStatusesEntity`            | ◯       | ◯ (`ReportStatusEntity`)   | レポートステータス     |
| 69  | `ReportStatusesTranslationEntity` | ◯       | ✅ (完了)                  | レポートステータス翻訳 |
| 70  | `ReportableTypesEntity`           | ◯       | ◯ (`ReportableTypeEntity`) | レポート対象タイプ     |
| 71  | `ReportsEntity`                   | ◯       | ◯ (`ReportEntity`)         | レポート               |
| 72  | `ReportsHistoryEntity`            | ◯       | ✅ (完了)                  | レポート履歴           |
| 73  | `NotifiableTypesEntity`           | ◯       | ✅ (完了)                  | 通知対象タイプ         |
| 74  | `NotificationsEntity`             | ◯       | ◯ (`NotificationEntity`)   | 通知                   |

## コメント関連
| No  | Entity名                    | FastAPI | TypeScript          | 備考               |
| --- | --------------------------- | ------- | ------------------- | ------------------ |
| 75  | `CommentableTypesEntity`    | ◯       | ✅ (完了)           | コメント対象タイプ |
| 76  | `CommentsEntity`            | ◯       | ◯ (`CommentEntity`) | コメント           |
| 77  | `CommentsHistoryEntity`     | ◯       | ✅ (完了)           | コメント履歴       |
| 78  | `CommentsTranslationEntity` | ◯       | ✅ (完了)           | コメント翻訳       |
| 79  | `CommentLikesEntity`        | ◯       | ✅ (完了)           | コメントいいね     |

## ログイン・設定関連
| No  | Entity名                    | FastAPI | TypeScript              | 備考             |
| --- | --------------------------- | ------- | ----------------------- | ---------------- |
| 80  | `UserSettingsEntity`        | ◯       | ◯ (`UserSettingEntity`) | ユーザー設定     |
| 81  | `UserSettingsHistoryEntity` | ◯       | ✅ (完了)               | ユーザー設定履歴 |
| 82  | `ScreensEntity`             | ◯       | ◯ (`ScreenEntity`)      | 画面             |

## 統計情報
- **FastAPI合計**: 82エンティティ
- **TypeScript実装済み**: 82エンティティ (100%)
- **TypeScript未実装**: 0エンティティ (0%)

## 🎉 全エンティティ実装完了！！！ 🎉

## 今回の追加作業で完了したエンティティ (残り13個) ✨
1. `IconPlatformEntity` - アイコンプラットフォーム (修正：seedData)
2. `IconNameByPlatformEntity` - プラットフォーム別アイコン名 (修正：seedData)
3. `QuestTranslationEntity` - クエスト翻訳
4. `QuestDetailsByLevelTranslationEntity` - レベル別クエスト詳細翻訳
5. `QuestRequestStatusTranslationEntity` - クエスト申請ステータス翻訳
6. `QuestRequestHistoryEntity` - クエスト申請履歴
7. `QuestMemberStatusTranslationEntity` - クエストメンバーステータス翻訳
8. `QuestMemberHistoryEntity` - クエストメンバー履歴
9. `AllowanceTablesEntity` - お小遣いテーブル
10. `ReportHistoryEntity` - レポート履歴
11. `CommentableTypeEntity` - コメント対象タイプ
12. `CommentTranslationEntity` - コメント翻訳
13. `CommentLikeEntity` - コメントいいね
14. `UserSettingHistoryEntity` - ユーザー設定履歴

## 前回実装分 (15個)
1. `CurrencyByLanguageEntity` - 言語別通貨
2. `ExchangeRateEntity` - 為替レート
3. `IconCategoryTranslationEntity` - アイコンカテゴリ翻訳
4. `NotifiableTypeEntity` - 通知対象タイプ
5. `FamilyHistoryEntity` - 家族履歴
6. `FamilyMemberHistoryEntity` - 家族メンバー履歴
7. `ChildSettingHistoryEntity` - 子供設定履歴
8. `EducationTranslationEntity` - 教育翻訳
9. `QuestCategoryTranslationEntity` - クエストカテゴリ翻訳
10. `ReportStatusTranslationEntity` - レポートステータス翻訳
11. `WithdrawalStatusTranslationEntity` - 引き出し申請ステータス翻訳
12. `AllowanceByAgeHistoryEntity` - 年齢別お小遣い履歴
13. `FamilyAllowanceTableHistoryEntity` - 家族お小遣いテーブル履歴
14. `CommentHistoryEntity` - コメント履歴
15. `ParentHistoryEntity` - 親履歴

✅ **実装率が63.4%→81.7%→100%に完全達成！** 🌟🎊🎉
