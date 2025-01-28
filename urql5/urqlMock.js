import { jest } from "@jest/globals";
import { never } from 'wonka';

export const mockClient = {
    executeQuery: jest.fn(() => never),
    executeMutation: jest.fn(() => never),
    executeSubscription: jest.fn(() => never),
};

