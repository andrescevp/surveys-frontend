import {beforeEach, describe, expect, it} from '@jest/globals';

import IDBWrapper, {IDBValue} from "../../src/utils/IndexedDB";

const dbName = 'testDb';

describe('IDBWrapper', () => {
    let idbWrapper: IDBWrapper;

    beforeEach(async () => {
        idbWrapper = new IDBWrapper({name: dbName});
        await idbWrapper.clear();
    });

    afterEach(async () => {
        await idbWrapper.clear();
    });

    it('should set and get an item', async () => {
        const key = 'testKey';
        const value: IDBValue = {name: 'testValue'};
        await idbWrapper.setItem(key, value);
        const retrievedValue = await idbWrapper.getItem(key);
        expect(retrievedValue).toEqual(value);
    });

    it('should remove an item', async () => {
        const key = 'testKey';
        const value: IDBValue = {name: 'testValue'};
        await idbWrapper.setItem(key, value);
        await idbWrapper.removeItem(key);
        const retrievedValue = await idbWrapper.getItem(key);
        expect(retrievedValue).toBeUndefined();
    });

    it('should clear all items', async () => {
        const key1 = 'testKey1';
        const value1: IDBValue = {name: 'testValue1'};
        const key2 = 'testKey2';
        const value2: IDBValue = {name: 'testValue2'};
        await idbWrapper.setItem(key1, value1);
        await idbWrapper.setItem(key2, value2);
        await idbWrapper.clear();
        const retrievedValue1 = await idbWrapper.getItem(key1);
        const retrievedValue2 = await idbWrapper.getItem(key2);
        expect(retrievedValue1).toBeUndefined();
        expect(retrievedValue2).toBeUndefined();
    });
});
