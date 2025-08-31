import { BaseRepository, BaseRepositoryDependencies } from "@backend/core/repository/baseRepository";
import { FamilyDao } from "../dao/familyDao";
import { Family } from "../models/family";
import { FamilyId } from "../value-object/familyId";
import { FamilyName } from "../value-object/familyName";
import { IconId } from "@backend/features/icon/value-objects/iconId";
import { FamilyIntroduction } from "../value-object/familyIntroduction";
import { FamilyEntity } from "../entity/familyEntity";
import { FamilyDisplayId } from "../value-object/familyDisplayId";

export interface FamilyRepositoryDependencies extends BaseRepositoryDependencies {
  familyDao: FamilyDao;
}

export class FamilyRepository extends BaseRepository {
  private familyDao: FamilyDao;
  constructor(deps: FamilyRepositoryDependencies) {
    super( deps );
    this.familyDao = deps.familyDao;
  }
  async findById(id: number) : Promise<Family | undefined> {
    const result = await this.familyDao.fetchById(id);
    if (!result) {
      return undefined;
    }
    return new Family({
      id: new FamilyId(result.id),
      displayId: new FamilyDisplayId(result.displayId),
      name: new FamilyName(result.name),
      iconId: result.iconId ? new IconId(result.iconId) : undefined,
      introduction: new FamilyIntroduction(result.introduction),
    });
  }

  async create(family: Family): Promise<FamilyId> {
    const entity = FamilyEntity.fromRaw({
      id: family.id ? family.id.value : undefined,
      displayId: family.displayId.value,
      name: family.name.value,
      iconId: family.iconId ? family.iconId.value : undefined,
      introduction: family.introduction.value,
    });
    const id = await this.familyDao.insertWithCache(entity);
    return new FamilyId(id);
  }
}
