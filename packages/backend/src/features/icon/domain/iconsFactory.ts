import { IconEntity } from "../entity/iconEntity";
import { Icon } from "./icon";
import { IconFactory } from "./iconFactory";
import { Icons } from "./icons";

class Factory {
  fromEntity(params: {entities: IconEntity[]}): Icons {
    const iconList: Icon[] = params.entities.map((iconEntity) => IconFactory.fromEntity({entity: iconEntity}));
    return new Icons(iconList);
  }
}

export const IconsFactory = new Factory();
