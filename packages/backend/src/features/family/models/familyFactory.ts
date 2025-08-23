import { FamilyEntity } from "../entity/familyEntity";
import { Family } from "./family";

export interface ToEntityResult {
  familyEntity: FamilyEntity;
}

export const toEntity = (model: Family): ToEntityResult => {
  const entity = new FamilyEntity();
  entity.name = model.name.value;
  entity.iconId = model.iconId ? model.iconId.value : undefined;
  entity.introduction = model.introduction.value;

  return {
    familyEntity: entity
  };
};
