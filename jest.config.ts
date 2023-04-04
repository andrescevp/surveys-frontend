import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    testMatch: ['./tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    setupFiles: ["fake-indexeddb/auto"]
};

export default config;