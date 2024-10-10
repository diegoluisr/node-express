import { Entity } from "../database/entities/entity";
import { entityRepository } from "../database/repositories/entityRepository";

export default class ServiceProvider {

  private _entities: Array<any> = [];

  public async getInfo(accountId?: string, serviceId?: string) {
    const entities = await entityRepository.getEntities(accountId, serviceId);
    return entities;
  }
}
