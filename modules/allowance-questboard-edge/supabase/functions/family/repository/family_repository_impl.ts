import { AppLogger } from "../../shared/app_logger.ts";
import { ERROR_MESSAGES } from "../../shared/constants/error_messages.ts";
import { DIContainer } from "../../shared/di_container.ts";
import { UserId } from "../../user/domain/value_object/user_id.ts";
import { Families } from "../domain/families.ts";
import { Family } from "../domain/family.ts";
import { FamilyId } from "../domain/value_object/family_id.ts";
import { FamilyDao } from "../infrastructure/interface/family_dao.ts";
import { FamilyRepository } from "./family_repository.ts";

export class FamilyRepositoryImpl implements FamilyRepository {
    constructor(
        private readonly _dao = DIContainer.instance.get(FamilyDao),
    ) {}

    async findByUserId(userId: UserId): Promise<Family | null> {
        try {
            const family = await this._dao.findByUserId(String(userId));
            return family ? Family.fromEntity(family) : null;
        } catch (_error) {
            AppLogger.I.info(
                `${ERROR_MESSAGES.USER_NOT_FOUND} ${userId}`,
            );
            return null;
        }
    }

    async findAll(): Promise<Families> {
        return Families.fromEntities(
            await this._dao.findAll(),
        );
    }
    async findById(familyId: FamilyId): Promise<Family | null> {
        try {
            const family = await this._dao.findById(Number(familyId));
            return family ? Family.fromEntity(family) : null;
        } catch (_error) {
            AppLogger.I.info(
                `${ERROR_MESSAGES.FAMILY_NOT_FOUND} ${Number(familyId)}`,
            );
            return null;
        }
    }
}
