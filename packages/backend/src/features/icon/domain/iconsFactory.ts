import { IconEntity } from "../entity/iconEntity";
import { Icon } from "./icon";
import { fromEntity } from "./iconFactory";
import { Icons } from "./icons";

export const fromEntities = (params: {entities: IconEntity[]}): Icons => {
  const iconList: Icon[] = params.entities.map((iconEntity) => fromEntity({entity: iconEntity}));
  return new Icons(iconList);
}
