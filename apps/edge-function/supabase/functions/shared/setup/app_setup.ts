import { FamilyDao } from "../../family/infrastructure/interface/family_dao.ts";
import { SbFamilyDao } from "../../family/infrastructure/superbase/sb_family_dao.ts";
import { FamilyRepository } from "../../family/repository/family_repository.ts";
import { FamilyRepositoryImpl } from "../../family/repository/family_repository_impl.ts";
import { MemberDao } from "../../member/infrastructure/interface/member_dao.ts";
import { SbMemberDao } from "../../member/infrastructure/superbase/sb_member_dao.ts";
import { MemberRepository } from "../../member/repository/member_repository.ts";
import { MemberRepositoryImpl } from "../../member/repository/member_repository_impl.ts";
import { QuestDao } from "../../quest/infrastructure/interface/quest_dao.ts";
import { SbQuestDao } from "../../quest/infrastructure/superbase/sb_quest_dao.ts";
import { QuestRepository } from "../../quest/repository/quest_repository.ts";
import { QuestRepositoryImpl } from "../../quest/repository/quest_repository_impl.ts";
import { AppLogger } from "../app_logger.ts";
import { SUPABASE_CLIENT } from "../config.ts";
import { DIContainer } from "../di_container.ts";

export function setupApp() {
    AppLogger.initialize();

    DIContainer.instance
        .register(FamilyDao, new SbFamilyDao(SUPABASE_CLIENT))
        .register(FamilyRepository, new FamilyRepositoryImpl())
        .register(MemberDao, new SbMemberDao(SUPABASE_CLIENT))
        .register(MemberRepository, new MemberRepositoryImpl())
        .register(QuestDao, new SbQuestDao(SUPABASE_CLIENT))
        .register(QuestRepository, new QuestRepositoryImpl());
}
