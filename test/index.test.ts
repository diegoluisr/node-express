import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { entityRepository } from '../src/database/repositories/entityRepository';
import ServideProvider from '../src/services/serviceProvider';

// jest.mock('../src/database/repositories/entityRepository');


let provider: ServideProvider;

beforeEach(() => {
  provider = new ServideProvider();
});

describe('index', () => {
  it('adds 1 + 2 to equal 3', async () => {
    const spy = jest.spyOn(entityRepository, 'getEntities');
    const response = await provider.getInfo();

    expect(response).toEqual([]);
    expect(spy).toHaveBeenCalled();
  });
});

