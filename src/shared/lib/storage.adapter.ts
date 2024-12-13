export class StorageAdapter {
  constructor(private readonly storage: Storage = localStorage) {}

  public save<T>(key: string, data: T): void {
    try {
      const stringifyValue = JSON.stringify(data);
      this.storage.setItem(key, stringifyValue);
    } catch (err) {
      console.error(`Failed to save data for key "${key}":`, err);
    }
  }

  public get<T>(key: string): T | null {
    try {
      const result = this.storage.getItem(key);
      return result ? (JSON.parse(result) as T) : null;
    } catch (err) {
      console.error(`Failed to parse data for key "${key}":`, err);
      return null;
    }
  }

  public getOrDefault<T>(key: string, defaultValue: T): T {
    const result = this.get<T>(key);
    return result !== null ? result : defaultValue;
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}

export const storageAdapter = new StorageAdapter();
