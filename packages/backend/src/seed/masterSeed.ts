import { DataSource } from 'typeorm';
import { LanguageEntity } from '../features/language/entity/languageEntity';
import { CurrencyEntity } from '../features/shared/entity/currencyEntity';
import { IconCategoryEntity } from '../features/icon-category/entity/iconCategoryEntity';
import { IconEntity } from '../features/icon/entity/iconEntity';
import { FamilyMemberTypeEntity } from '../features/family-member/entity/familyMemberTypeEntity';
import { ReportableTypeEntity } from '../features/report/entity/reportableTypeEntity';
import { ScreenEntity } from '../features/shared/entity/screenEntity';

// 追加のエンティティをimport (FastAPIのmaster_seedr.pyと同じ31個)
import { AllowanceTableTypeEntity } from '../features/allowance-tables/entity/allowanceTableTypeEntity';
import { AllowanceableTypeEntity } from '../features/bank/entity/allowanceableTypeEntity';
import { WithdrawalRequestStatusEntity } from '../features/bank/entity/withdrawalRequestStatusEntity';
import { EducationEntity } from '../features/child/entity/educationEntity';
import { QuestCategoryEntity } from '../features/quest/entity/questCategoryEntity';
import { QuestMemberStatusEntity } from '../features/quest/entity/questMemberStatusEntity';
import { QuestCategoryTypeEntity } from '../features/quest/entity/questCategoryTypeEntity';
import { QuestRequestStatusEntity } from '../features/quest/entity/questRequestStatusEntity';
import { QuestTypeEntity } from '../features/quest/entity/questTypeEntity';
import { QuestEntity } from '../features/quest/entity/questEntity';
import { TemplateQuestCategoryEntity } from '../features/quest/entity/templateQuestCategoryEntity';
import { TemplateQuestEntity } from '../features/quest/entity/templateQuestEntity';
import { ReportStatusEntity } from '../features/report/entity/reportStatusEntity';

// FastAPIにある残りのエンティティを追加
// TODO: 以下のエンティティの正しいパスを確認して追加する必要がある
// import { CurrencyByLanguageEntity } from '../features/shared/entity/currencyByLanguageEntity';
// import { IconCategoriesTranslationEntity } from '../features/icon-category/entity/iconCategoriesTranslationEntity';
// import { IconPlatforms } from '../features/icon/entity/iconPlatforms';
// import { IconNameByPlatormEntity } from '../features/icon/entity/iconNameByPlatormEntity';
// import { ReportStatusesTranslationEntity } from '../features/report/entity/reportStatusesTranslationEntity';
// import { WithdrawalRequestStatusesTranslationEntity } from '../features/bank/entity/withdrawalRequestStatusesTranslationEntity';
// import { NotifiableTypesEntity } from '../features/notification/entity/notifiableTypesEntity';
// import { EducationsTranslationEntity } from '../features/child/entity/educationsTranslationEntity';
// import { ExchangeRatesEntity } from '../features/shared/entity/exchangeRatesEntity';
// import { QuestRequestStatusesTranslationEntity } from '../features/quest/entity/questRequestStatusesTranslationEntity';
// import { MemberQuestStatusesTranslationEntity } from '../features/quest/entity/memberQuestStatusesTranslationEntity';

/**
 * マスタデータを投入する関数
 * 各エンティティのseed()メソッドを呼び出す
 */
export async function seedMasterData(dataSource: DataSource): Promise<void> {
  console.log('マスタデータを投入中...');
  
  try {
    await LanguageEntity.seed(dataSource);
    await CurrencyEntity.seed(dataSource);
    await IconCategoryEntity.seed(dataSource);
    await IconEntity.seed(dataSource);
    await FamilyMemberTypeEntity.seed(dataSource);
    await ReportableTypeEntity.seed(dataSource);
    await ScreenEntity.seed(dataSource);
    await QuestTypeEntity.seed(dataSource);
    await QuestCategoryTypeEntity.seed(dataSource);
    await AllowanceTableTypeEntity.seed(dataSource);
    await AllowanceableTypeEntity.seed(dataSource);
    await ReportStatusEntity.seed(dataSource);
    await WithdrawalRequestStatusEntity.seed(dataSource);
    await EducationEntity.seed(dataSource);
    await QuestRequestStatusEntity.seed(dataSource);
    await QuestMemberStatusEntity.seed(dataSource);
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
