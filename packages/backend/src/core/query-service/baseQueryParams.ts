import { EntityManager } from "typeorm";

export interface BaseQueryParams {
  session: EntityManager;
}
