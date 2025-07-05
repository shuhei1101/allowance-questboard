import { AppLogger } from "../../shared/app_logger.ts";
import { ERROR_MESSAGES } from "../../shared/constants/error_messages.ts";
import { DIContainer } from "../../shared/di_container.ts";
import { UserId } from "../../user/domain/value_object/user_id.ts";
import { Members } from "../domain/members.ts";
import { Member } from "../domain/member.ts";
import { MemberId } from "../domain/value_object/member_id.ts";
import { MemberDao } from "../infrastructure/interface/member_dao.ts";
import { MemberRepository } from "./member_repository.ts";
import { FamilyId } from "../../family/domain/value_object/family_id.ts";

export class MemberRepositoryImpl implements MemberRepository {
    constructor(
        private readonly _dao = DIContainer.instance.get(MemberDao),
    ) {}
    async findByFamilyId(familyId: FamilyId): Promise<Members> {
        try {
            const members = await this._dao.findByFamilyId(Number(familyId));
            return Members.fromEntities(members);
        } catch (_error) {
            AppLogger.I.info(
                `${ERROR_MESSAGES.FAMILY_NOT_FOUND} ${Number(familyId)}`,
            );
            return Members.empty();
        }
    }

    async findByUserId(userId: UserId): Promise<Member | null> {
        try {
            const family = await this._dao.findByUserId(String(userId));
            return family ? Member.fromEntity(family) : null;
        } catch (_error) {
            AppLogger.I.info(
                `${ERROR_MESSAGES.USER_NOT_FOUND} ${userId}`,
            );
            return null;
        }
    }

    async findAll(): Promise<Members> {
        return Members.fromEntities(
            await this._dao.findAll(),
        );
    }
    async findById(familyId: MemberId): Promise<Member | null> {
        try {
            const family = await this._dao.findById(Number(familyId));
            return family ? Member.fromEntity(family) : null;
        } catch (_error) {
            AppLogger.I.info(
                `${ERROR_MESSAGES.FAMILY_NOT_FOUND} ${Number(familyId)}`,
            );
            return null;
        }
    }
}
