import type {Middleware} from 'redux';

import IDBWrapper, {IDBValue} from "../utils/IndexedDB";

interface Whitelist {
    [key: string]: boolean;
}

interface IndexedDBState {
    [key: string]: IDBValue;
}

const createIndexedDBMiddleware = (
    whitelist: Whitelist,
    idbWrapper: IDBWrapper
): Middleware => (store) => (next) => async (action) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = next(action);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const state = store.getState();
    console.log([state])

    const indexedDBState: IndexedDBState = {};
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.keys(state).forEach((key) => {
        console.log(key)
        if (whitelist[key]) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            indexedDBState[key] = state[key];
        }
    });
    console.log(indexedDBState, whitelist)
    await Promise.all(
        Object.keys(indexedDBState).map((key) => {
                idbWrapper.setItem(key, indexedDBState[key]).then(() => console.log(`Saved item ${key}`)).catch(() => console.log('Error saving state'));
            }
        )
    ).catch(() => console.log('Error saving state'));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
};

export default createIndexedDBMiddleware;
