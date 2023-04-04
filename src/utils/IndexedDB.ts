interface IDBWrapperOptions {
    name: string;
    version?: number;
    storeName?: string;
}

export type IDBValue = { [key: string]: IDBValue } | string | number | object | boolean | null

interface IDBWrapperEntry {
    key: string;
    value: IDBValue;
}

class IDBWrapper {
    private dbPromise: Promise<IDBDatabase>;

    constructor({name, version = 1, storeName = 'store'}: IDBWrapperOptions) {
        this.dbPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(name, version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName);
                }
            };
        });
    }

    async setItem(key: string, value: IDBValue): Promise<void> {
        const db = await this.dbPromise;
        const tx = db.transaction(db.objectStoreNames[0], 'readwrite');
        const store = tx.objectStore(db.objectStoreNames[0]);
        store.put(value, key);
    }

    async getItem(key: string): Promise<IDBValue | undefined> {
        const db = await this.dbPromise;
        const tx = db.transaction(db.objectStoreNames[0], 'readonly');
        const store = tx.objectStore(db.objectStoreNames[0]);
        const request = store.get(key);
        await new Promise<void>((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
        return request.result as IDBValue;
    }

    async removeItem(key: string): Promise<void> {
        const db = await this.dbPromise;
        const tx = db.transaction(db.objectStoreNames[0], 'readwrite');
        const store = tx.objectStore(db.objectStoreNames[0]);
        store.delete(key);
    }

    async clear(): Promise<void> {
        const db = await this.dbPromise;
        const tx = db.transaction(db.objectStoreNames[0], 'readwrite');
        const store = tx.objectStore(db.objectStoreNames[0]);
        store.clear();
    }

    async getAll(): Promise<IDBRequest<IDBWrapperEntry[]>> {
        const db = await this.dbPromise;
        const tx = db.transaction(db.objectStoreNames[0], 'readonly');
        const store = tx.objectStore(db.objectStoreNames[0]);
        return store.getAll();
    }

    async forEach(callbackfn: (value: IDBValue, key: string, index: number) => void): Promise<void> {
        const entries = await this.getAll();
        entries.result.forEach((entry, index) => callbackfn(entry.value, entry.key, index));
    }
}

export const IdbOptions: IDBWrapperOptions = {
    name: 'my-db',
    version: 1,
    storeName: 'my-store',
};

export default IDBWrapper