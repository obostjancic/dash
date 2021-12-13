export interface Repository<T extends { id: string }> {
  findAll(): T[];
  findById(id: string): T | undefined;
  find(query: Partial<T>): T[];
  create(item: Partial<T>): Promise<T>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<void>;
}

export const matcher = <T>(p: T, q: Partial<T>) => {
  for (const key of Object.keys(q)) {
    //@ts-ignore
    if (p[key] !== q[key]) {
      return false;
    }
  }
  return true;
};

export const id = () => {
  return Math.random().toString(36).slice(2, 9);
};

export class MockRepository<T extends { id: string }> implements Repository<T> {
  private entities: T[] = [];

  findAll(): T[] {
    return this.entities;
  }

  findById(id: string): T | undefined {
    return this.entities.find(en => en.id === id);
  }

  find(query: Partial<T>): T[] {
    return this.entities.filter(en => matcher(en, query));
  }

  create(entity: Partial<T>): Promise<T> {
    const newEntity = { ...entity, id: id() } as T;
    this.entities.push(newEntity);
    return Promise.resolve(newEntity);
  }

  update(id: string, entity: T): Promise<T> {
    const index = this.entities.findIndex(en => en.id === id);
    if (index === -1) {
      throw new Error("T not found");
    }
    this.entities[index] = entity;
    return Promise.resolve(entity);
  }

  delete(id: string): Promise<void> {
    const index = this.entities.findIndex(en => en.id === id);
    if (index === -1) {
      throw new Error("T not found");
    }
    this.entities.splice(index, 1);
    return Promise.resolve();
  }
}
