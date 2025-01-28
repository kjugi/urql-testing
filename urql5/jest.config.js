export default {
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testMatch: [
        '<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ],
    testEnvironment: 'jest-environment-jsdom',
    moduleDirectories: [
        'node_modules',
        // 'utils', // a utility folder
        // __dirname, // the root directory
    ],
}