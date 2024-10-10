import { Entity } from "../entities/entity";

export const entityRepository = {
  getEntities: (accountId?: string, serviceId?: string): Promise<Array<Entity>> => {
    return new Promise((resolve, reject) => {
      resolve([]);
      reject([]);
    });
  }
}
