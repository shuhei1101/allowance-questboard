import { DataSource } from 'typeorm';
import { LanguageEntity } from '../features/language/entity/languageEntity';
import { IconCategoryEntity, IconCategoryTranslationEntity } from '../features/icon-category/entity/iconCategoryEntity';
import { IconEntity } from '../features/icon/entity/iconEntity';
import { FamilyMemberTypeEntity } from '../features/family-member/entity/familyMemberTypeEntity';
import { ReportableTypeEntity } from '../features/report/entity/reportableTypeEntity';
import { ScreenEntity } from '../features/shared/entity/screenEntity';

// 追加のエンティティをimport (FastAPIのmaster_seedr.pyと同じ31個)
import { AllowanceableTypeEntity } from '../features/bank/entity/allowanceableTypeEntity';
import { WithdrawalRequestStatusEntity, WithdrawalRequestStatusTranslationEntity } from '../features/bank/entity/withdrawalRequestStatusEntity';
import { EducationEntity, EducationTranslationEntity } from '../features/child/entity/educationEntity';
import { QuestCategoryEntity } from '../features/quest/entity/questCategoryEntity';
import { QuestMemberStatusEntity, QuestMemberStatusTranslationEntity } from '../features/quest/entity/questMemberStatusEntity';
import { QuestCategoryTypeEntity } from '../features/quest/entity/questCategoryTypeEntity';
import { QuestRequestStatusEntity, QuestRequestStatusTranslationEntity } from '../features/quest/entity/questRequestStatusEntity';
import { QuestTypeEntity } from '../features/quest/entity/questTypeEntity';
import { QuestEntity } from '../features/quest/entity/questEntity';
import { TemplateQuestCategoryEntity } from '../features/quest/entity/templateQuestCategoryEntity';
import { TemplateQuestEntity } from '../features/quest/entity/templateQuestEntity';
import { ReportStatusEntity, ReportStatusTranslationEntity } from '../features/report/entity/reportStatusEntity';
import { AllowanceTableTypeEntity } from '@backend/features/allowance-table/entity/allowanceTableTypeEntity';
import { IconLibraryEntity } from '@backend/features/icon/entity/iconLibraryEntity';
import { IconKeyByLibraryEntity } from '@backend/features/icon/entity/iconKeyByLibraryEntity';
import { NotifiableTypeEntity } from '@backend/features/notification/entity/notifiableTypeEntity';
import { CurrencyByLanguageEntity } from '@backend/features/shared/entity/currencyByLanguageEntity';
import { CurrencyEntity } from '@backend/features/shared/entity/currencyEntity';
import { ExchangeRateEntity } from '@backend/features/shared/entity/exchangeRateEntity';
/**
 * マスタデータを投入する関数
 * 各エンティティのseed()メソッドを呼び出す
 */
export async function seedMasterData(dataSource: DataSource): Promise<void> {
  console.log('マスタデータを投入中...');
  
  try {
    await LanguageEntity.seed(dataSource);
    await CurrencyEntity.seed(dataSource);
    await CurrencyByLanguageEntity.seed(dataSource);
    await IconCategoryEntity.seed(dataSource);
    await IconCategoryTranslationEntity.seed(dataSource);
    await IconEntity.seed(dataSource);
    await IconLibraryEntity.seed(dataSource)
    await IconKeyByLibraryEntity.seed(dataSource)
    await FamilyMemberTypeEntity.seed(dataSource);
    await ReportableTypeEntity.seed(dataSource);
    await ScreenEntity.seed(dataSource);
    await QuestTypeEntity.seed(dataSource);
    await QuestCategoryTypeEntity.seed(dataSource);
    await AllowanceTableTypeEntity.seed(dataSource);
    await AllowanceableTypeEntity.seed(dataSource);
    await ReportStatusEntity.seed(dataSource);
    await ReportStatusTranslationEntity.seed(dataSource);
    await WithdrawalRequestStatusEntity.seed(dataSource);
    await WithdrawalRequestStatusTranslationEntity.seed(dataSource);
    await NotifiableTypeEntity.seed(dataSource);
    await EducationEntity.seed(dataSource);
    await EducationTranslationEntity.seed(dataSource);
    await ExchangeRateEntity.seed(dataSource);
    await QuestRequestStatusEntity.seed(dataSource);
    await QuestRequestStatusTranslationEntity.seed(dataSource);
    await QuestMemberStatusEntity.seed(dataSource);
    await QuestMemberStatusTranslationEntity.seed(dataSource);
    await QuestCategoryEntity.seed(dataSource);
    await TemplateQuestCategoryEntity.seed(dataSource);
    await QuestEntity.seed(dataSource);
    await TemplateQuestEntity.seed(dataSource);
    console.log('マスタデータの投入が完了しました ✨');
    
  } catch (error) {
    console.error('マスタデータ投入でエラーが発生しました:', error);
    throw error;
  }
}
