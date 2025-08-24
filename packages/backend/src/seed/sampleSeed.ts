import { DataSource } from 'typeorm';
import { FamilyEntity } from '../features/family/entity/familyEntity';
import { FamilyMemberEntity } from '../features/family-member/entity/familyMemberEntity';
import { ChildEntity } from '../features/child/entity/childEntity';
import { QuestEntity, QuestTranslationEntity } from '../features/quest/entity/questEntity';
import { FamilyQuestEntity } from '../features/quest/entity/familyQuestEntity';
import { QuestMembersEntity } from '../features/quest/entity/questMembersEntity';
import { SharedQuestEntity } from '../features/quest/entity/sharedQuestEntity';

/**
 * サンプルデータを投入する関数
 * Pythonのsample_seedr.pyを参考にしたサンプルデータ投入
 */
export async function seedSampleData(dataSource: DataSource): Promise<void> {
  console.log('サンプルデータを投入中...');
  
  try {
    // 以下ユーザはアプリ画面で登録しておくこと
    const parentUuid = '70fea579-0870-4738-b3b4-ef3ecc471d9a'; // 私
    const child1Uuid = '70fea579-0870-4738-b3b4-ef3ecc471d9a'; // 私
    const child2Uuid = '4c0a0b33-11b2-4c2d-a1c5-e071b8bb4120';
    
    // 家族のサンプルデータ
    const familyRepo = dataSource.getRepository(FamilyEntity);
    const existingFamily = await familyRepo.findOne({ where: { id: 1 } });
    if (!existingFamily) {
      const family = Object.assign(new FamilyEntity(), { id: 1, name: "テスト家族",  iconId: 1 });
      await familyRepo.save(family);
      console.log('家族サンプルデータを投入しました');
    }

    // 家族メンバーのサンプルデータ
    const familyMemberRepo = dataSource.getRepository(FamilyMemberEntity);
    const existingMembers = await familyMemberRepo.find();
    if (existingMembers.length === 0) {
      const members = [
        Object.assign(new FamilyMemberEntity(), { id: 1, userId: parentUuid, name: "テスト親", iconId: 1, birthday: new Date('1990-01-01') }),
        Object.assign(new FamilyMemberEntity(), { id: 2, userId: child1Uuid, name: "テスト子供1", iconId: 2, birthday: new Date('2010-01-01') }),
        Object.assign(new FamilyMemberEntity(), { id: 3, userId: child2Uuid, name: "テスト子供2", iconId: 3, birthday: new Date('2012-01-01') }),
      ];
      await familyMemberRepo.save(members);
      console.log('家族メンバーサンプルデータを投入しました');
    }

    // 子供エンティティのサンプルデータ
    const childRepo = dataSource.getRepository(ChildEntity);
    const existingChildren = await childRepo.find();
    if (existingChildren.length === 0) {
      const children = [
        Object.assign(new ChildEntity(), { id: 1, familyId: 1, familyMemberId: 2 }),
        Object.assign(new ChildEntity(), { id: 2, familyId: 1, familyMemberId: 3 })
      ];
      await childRepo.save(children);
      console.log('子供サンプルデータを投入しました');
    }

    // クエストのサンプルデータ
    const questRepo = dataSource.getRepository(QuestEntity);
    const existingQuests = await questRepo.find();
    if (existingQuests.length === 0) {
      const quests = [
        Object.assign(new QuestEntity(), { id: 101, subclassType: 1, categoryId: 1, iconId: 1, ageFrom: 3, ageTo: 18, hasPublishedMonth: false }),
        Object.assign(new QuestEntity(), { id: 102, subclassType: 1, categoryId: 2, iconId: 2, ageFrom: 3, ageTo: 18, hasPublishedMonth: false }),
        Object.assign(new QuestEntity(), { id: 103, subclassType: 1, categoryId: 1, iconId: 3, ageFrom: 3, ageTo: 18, hasPublishedMonth: false })
      ];
      await questRepo.save(quests);
      console.log('クエストサンプルデータを投入しました');
    }

    // クエスト翻訳のサンプルデータ（日本語）
    const questTranslationRepo = dataSource.getRepository(QuestTranslationEntity);
    const existingTranslations = await questTranslationRepo.find();
    if (existingTranslations.length === 0) {
      const translations = [
        Object.assign(new QuestTranslationEntity(), { questId: 1, languageId: 1, title: "お部屋のお掃除", client: "ママ", requestDetail: "自分の部屋をキレイに片付けよう！", categoryId: 1 }),
        Object.assign(new QuestTranslationEntity(), { questId: 2, languageId: 1, title: "食器洗い", client: "パパ", requestDetail: "食事後の食器をキレイに洗おう！", categoryId: 2 }),
        Object.assign(new QuestTranslationEntity(), { questId: 3, languageId: 1, title: "宿題を完了", client: "ママ", requestDetail: "学校の宿題をしっかりと終わらせよう！", categoryId: 1 })
      ];
      await questTranslationRepo.save(translations);
      console.log('クエスト翻訳サンプルデータを投入しました');
    }

    // 家族クエストのサンプルデータ
    const familyQuestRepo = dataSource.getRepository(FamilyQuestEntity);
    const existingFamilyQuests = await familyQuestRepo.find();
    if (existingFamilyQuests.length === 0) {
      const familyQuests = [
        Object.assign(new FamilyQuestEntity(), { id: 1, familyId: 1, questId: 1, isPublic: true }),
        Object.assign(new FamilyQuestEntity(), { id: 2, familyId: 1, questId: 2, isPublic: true }),
        Object.assign(new FamilyQuestEntity(), { id: 3, familyId: 1, questId: 3, isPublic: false })
      ];
      await familyQuestRepo.save(familyQuests);
      console.log('家族クエストサンプルデータを投入しました');
    }

    // クエストメンバーのサンプルデータ
    const questMemberRepo = dataSource.getRepository(QuestMembersEntity);
    const existingQuestMembers = await questMemberRepo.find();
    if (existingQuestMembers.length === 0) {
      const questMembers = [
        Object.assign(new QuestMembersEntity(), { id: 1, familyQuestId: 1, memberId: 1, statusId: 1, currentLevel: 1 }),
        Object.assign(new QuestMembersEntity(), { id: 2, familyQuestId: 3, memberId: 1, statusId: 1, currentLevel: 1 }),
        Object.assign(new QuestMembersEntity(), { id: 3, familyQuestId: 2, memberId: 2, statusId: 1, currentLevel: 1 })
      ];
      await questMemberRepo.save(questMembers);
      console.log('クエストメンバーサンプルデータを投入しました');
    }

    // 共有クエストのサンプルデータ（全クエストに対して作成）
    const sharedQuestRepo = dataSource.getRepository(SharedQuestEntity);
    const existingSharedQuests = await sharedQuestRepo.find();
    if (existingSharedQuests.length === 0) {
      const sharedQuests = [
        Object.assign(new SharedQuestEntity(), { id: 1, questId: 1, sourceFamilyQuestId: 1, sharedBy: 1, isShared: true }),
        Object.assign(new SharedQuestEntity(), { id: 2, questId: 2, sourceFamilyQuestId: 2, sharedBy: 1, isShared: false }),
        Object.assign(new SharedQuestEntity(), { id: 3, questId: 3, sourceFamilyQuestId: 3, sharedBy: 1, isShared: false })
      ];
      await sharedQuestRepo.save(sharedQuests);
      console.log('共有クエストサンプルデータを投入しました');
    }
    
    console.log('サンプルデータの投入が完了しました ✨');
    
  } catch (error) {
    console.error('サンプルデータ投入でエラーが発生しました:', error);
    throw error;
  }
}
