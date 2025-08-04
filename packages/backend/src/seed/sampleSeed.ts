import { DataSource } from 'typeorm';
import { FamilyEntity } from '../features/family/entity/familyEntity';

/**
 * サンプルデータを投入する関数
 * 各エンティティのseed()メソッドを呼び出す
 */
export async function seedSampleData(dataSource: DataSource): Promise<void> {
  console.log('サンプルデータを投入中...');
  
  try {
    // まずは家族データだけ投入してみる（DataSourceを渡す）
    await FamilyEntity.seed(dataSource);
    
    // TODO: 他のサンプルデータも追加していく
    // await FamilyMemberEntity.seed();
    // await ChildEntity.seed();
    // await QuestEntity.seed();
    // await QuestTranslationEntity.seed();
    // await FamilyQuestEntity.seed();
    // await QuestMemberEntity.seed();
    // await SharedQuestEntity.seed();
    
    console.log('サンプルデータの投入が完了しました ✨');
    
  } catch (error) {
    console.error('サンプルデータ投入でエラーが発生しました:', error);
    throw error;
  }
}
